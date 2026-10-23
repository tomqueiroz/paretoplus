import { eq, ne } from "drizzle-orm";
import { getDb } from "../_core/db";
import { env } from "../_core/env";
import { metaDayRsvps } from "../db/schema";

type MetaDayRsvpRow = typeof metaDayRsvps.$inferSelect;

const META_DAY_ORIGIN = "pareto-meta-day-rsvp";

function partnerLabel(row: MetaDayRsvpRow) {
  if (row.institutionalPartner === "abrava") return "ABRAVA";
  if (row.institutionalPartner === "anapp") return "ANAPP";
  if (row.institutionalPartner === "sindratar_sp") return "SINDRATAR-SP";
  return row.otherPartner?.trim() || "Outra parceria institucional";
}

function supabaseHeaders(extra?: Record<string, string>) {
  return {
    apikey: env.SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_PUBLISHABLE_KEY}`,
    ...extra
  };
}

function leadsUrl(query = "") {
  return `${env.SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/leads${query}`;
}

async function leadAlreadyExists(row: MetaDayRsvpRow) {
  const query = new URLSearchParams({
    select: "id",
    origem: `eq.${META_DAY_ORIGIN}`,
    email: `eq.${row.email}`,
    limit: "1"
  });
  const response = await fetch(leadsUrl(`?${query.toString()}`), {
    headers: supabaseHeaders()
  });
  if (!response.ok) {
    throw new Error(`SUPABASE_LOOKUP_${response.status}`);
  }
  const rows = (await response.json().catch(() => [])) as unknown[];
  return rows.length > 0;
}

async function insertLead(row: MetaDayRsvpRow) {
  if (await leadAlreadyExists(row)) return;

  const response = await fetch(leadsUrl(), {
    method: "POST",
    headers: supabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    }),
    body: JSON.stringify({
      nome: row.fullName,
      empresa: row.company,
      email: row.email,
      telefone: row.whatsapp,
      cpf: row.cpf,
      cargo: row.jobTitle,
      desafio: JSON.stringify({
        evento: "PARETO + META DAY",
        cpf: row.cpf,
        cargo: row.jobTitle,
        parceria_institucional: partnerLabel(row),
        outra_parceria_institucional:
          row.institutionalPartner === "outra" ? row.otherPartner : null,
        empresa_associada_anapp: row.institutionalPartner === "anapp",
        consentimento_lgpd: true,
        finalidade_cpf: "Controle de acesso ao edifício da Meta Brasil",
        skybase_rsvp_id: row.id
      }),
      origem: META_DAY_ORIGIN,
      criado_em: row.submittedAt
    })
  });

  if (!response.ok) {
    throw new Error(`SUPABASE_INSERT_${response.status}`);
  }
}

export async function syncMetaDayRsvpToSupabase(row: MetaDayRsvpRow) {
  try {
    await insertLead(row);
    await getDb()
      .update(metaDayRsvps)
      .set({
        supabaseSyncStatus: "synced",
        supabaseSyncedAt: new Date().toISOString(),
        supabaseSyncError: null
      })
      .where(eq(metaDayRsvps.id, row.id));
    return true;
  } catch (error) {
    try {
      await getDb()
        .update(metaDayRsvps)
        .set({
          supabaseSyncStatus: "failed",
          supabaseSyncError: error instanceof Error ? error.message.slice(0, 120) : "SUPABASE_SYNC_FAILED"
        })
        .where(eq(metaDayRsvps.id, row.id));
    } catch {
      // Preserve the original synchronization failure.
    }
    return false;
  }
}

export async function syncPendingMetaDayRsvpsToSupabase() {
  const rows = await getDb()
    .select()
    .from(metaDayRsvps)
    .where(ne(metaDayRsvps.supabaseSyncStatus, "synced"))
    .limit(1000);

  let synced = 0;
  let failed = 0;
  for (const row of rows) {
    if (await syncMetaDayRsvpToSupabase(row)) {
      synced += 1;
    } else {
      failed += 1;
    }
  }

  return { scanned: rows.length, synced, failed };
}
