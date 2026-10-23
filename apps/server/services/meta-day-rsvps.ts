import { desc, eq, or } from "drizzle-orm";
import { getDb } from "../_core/db";
import { metaDayRsvps } from "../db/schema";
import { sendTemplateEmail } from "./message";
import {
  syncMetaDayRsvpToSupabase,
  syncPendingMetaDayRsvpsToSupabase
} from "./supabase-leads";

export const META_DAY_REGISTRATION_DEADLINE = new Date("2026-10-01T02:59:59Z");

export type InstitutionalPartner = "abrava" | "anapp" | "sindratar_sp" | "outra";

export type CreateMetaDayRsvpInput = {
  fullName: string;
  cpf: string;
  company: string;
  jobTitle: string;
  email: string;
  whatsapp: string;
  institutionalPartner: InstitutionalPartner;
  otherPartner?: string;
  consent: true;
};

export class MetaDayRsvpError extends Error {
  constructor(
    public readonly code:
      | "REGISTRATION_CLOSED"
      | "DUPLICATE_RSVP"
      | "RSVP_NOT_FOUND"
      | "SUPABASE_WRITE_FAILED",
    message: string,
    public readonly status: 404 | 409 | 410 | 502
  ) {
    super(message);
    this.name = "MetaDayRsvpError";
  }
}

function maskCpf(cpf: string) {
  return `***.***.***-${cpf.slice(-2)}`;
}

function partnerLabel(partner: InstitutionalPartner, otherPartner?: string | null) {
  const labels: Record<Exclude<InstitutionalPartner, "outra">, string> = {
    abrava: "ABRAVA",
    anapp: "ANAPP",
    sindratar_sp: "SINDRATAR-SP"
  };
  return partner === "outra" ? otherPartner?.trim() || "Outra parceria institucional" : labels[partner];
}

function safeAdminListRow(row: typeof metaDayRsvps.$inferSelect) {
  return {
    id: row.id,
    fullName: row.fullName,
    maskedCpf: maskCpf(row.cpf),
    company: row.company,
    jobTitle: row.jobTitle,
    email: row.email,
    whatsapp: row.whatsapp,
    institutionalPartner: partnerLabel(
      row.institutionalPartner as InstitutionalPartner,
      row.otherPartner
    ),
    submittedAt: row.submittedAt,
    receiptEmailStatus: row.receiptEmailStatus,
    adminNotificationStatus: row.adminNotificationStatus
  };
}

async function notifyAdminOfNewRsvp(rsvpId: string, submittedAt: string) {
  try {
    await sendTemplateEmail({
      templateId: "merchant_notification",
      locale: "pt-BR",
      data: {
        event_name: "Nova inscrição no PARETO + META DAY",
        event_content: "Uma nova solicitação de RSVP foi recebida. Acesse a área administrativa do site para consultar os dados com segurança.",
        merchant_name: "Pareto Plus",
        product_name: "PARETO + META DAY",
        occurred_at: new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          dateStyle: "short",
          timeStyle: "short"
        }).format(new Date(submittedAt))
      }
    });

    await getDb()
      .update(metaDayRsvps)
      .set({
        adminNotificationStatus: "sent",
        adminNotificationSentAt: new Date().toISOString(),
        notificationError: null
      })
      .where(eq(metaDayRsvps.id, rsvpId));

    return "sent" as const;
  } catch {
    await getDb()
      .update(metaDayRsvps)
      .set({
        adminNotificationStatus: "failed",
        notificationError: "admin_notification_failed"
      })
      .where(eq(metaDayRsvps.id, rsvpId));

    return "failed" as const;
  }
}

export async function createMetaDayRsvp(input: CreateMetaDayRsvpInput) {
  if (Date.now() > META_DAY_REGISTRATION_DEADLINE.getTime()) {
    throw new MetaDayRsvpError("REGISTRATION_CLOSED", "O prazo de inscrições foi encerrado.", 410);
  }

  const existing = await getDb()
    .select()
    .from(metaDayRsvps)
    .where(or(eq(metaDayRsvps.cpf, input.cpf), eq(metaDayRsvps.email, input.email)))
    .limit(2);

  const exactExisting = existing.find(
    (row) => row.cpf === input.cpf && row.email === input.email
  );

  if (exactExisting) {
    const synced =
      exactExisting.supabaseSyncStatus === "synced"
      || await syncMetaDayRsvpToSupabase(exactExisting);
    if (!synced) {
      throw new MetaDayRsvpError(
        "SUPABASE_WRITE_FAILED",
        "Não foi possível registrar a inscrição no Supabase agora. Tente novamente.",
        502
      );
    }
    const adminNotificationStatus =
      exactExisting.adminNotificationStatus === "pending"
        ? await notifyAdminOfNewRsvp(exactExisting.id, exactExisting.submittedAt)
        : exactExisting.adminNotificationStatus;
    return {
      id: exactExisting.id,
      submittedAt: exactExisting.submittedAt,
      receiptEmailStatus: exactExisting.receiptEmailStatus,
      adminNotificationStatus,
      alreadyReceived: true as const
    };
  }

  if (existing.length > 0) {
    throw new MetaDayRsvpError(
      "DUPLICATE_RSVP",
      "Este CPF ou e-mail já está vinculado a outra solicitação. Confira os dados ou entre em contato com Tom Queiroz.",
      409
    );
  }

  const submittedAt = new Date().toISOString();
  const rows = await getDb()
    .insert(metaDayRsvps)
    .values({
      fullName: input.fullName,
      cpf: input.cpf,
      company: input.company,
      jobTitle: input.jobTitle,
      email: input.email,
      whatsapp: input.whatsapp,
      institutionalPartner: input.institutionalPartner,
      otherPartner: input.institutionalPartner === "outra" ? input.otherPartner?.trim() || null : null,
      consentedAt: submittedAt,
      submittedAt,
      receiptEmailStatus: "provider_unavailable",
      adminNotificationStatus: "pending",
      supabaseSyncStatus: "pending"
    })
    .returning();

  const created = rows[0];
  if (!created) {
    throw new Error("RSVP_INSERT_FAILED");
  }
  const synced = await syncMetaDayRsvpToSupabase(created);
  if (!synced) {
    throw new MetaDayRsvpError(
      "SUPABASE_WRITE_FAILED",
      "Não foi possível registrar a inscrição no Supabase agora. Tente novamente.",
      502
    );
  }
  const adminNotificationStatus = await notifyAdminOfNewRsvp(created.id, submittedAt);

  return {
    id: created.id,
    submittedAt,
    receiptEmailStatus: "provider_unavailable" as const,
    adminNotificationStatus,
    alreadyReceived: false as const
  };
}

export async function syncAllMetaDayRsvpsToSupabase() {
  return syncPendingMetaDayRsvpsToSupabase();
}

export async function listMetaDayRsvps() {
  const rows = await getDb()
    .select()
    .from(metaDayRsvps)
    .orderBy(desc(metaDayRsvps.submittedAt))
    .limit(500);

  return rows.map(safeAdminListRow);
}

export async function getMetaDayRsvpCpf(id: string) {
  const rows = await getDb()
    .select({ cpf: metaDayRsvps.cpf })
    .from(metaDayRsvps)
    .where(eq(metaDayRsvps.id, id))
    .limit(1);

  if (!rows[0]) {
    throw new MetaDayRsvpError("RSVP_NOT_FOUND", "Inscrição não encontrada.", 404);
  }

  return rows[0].cpf;
}
