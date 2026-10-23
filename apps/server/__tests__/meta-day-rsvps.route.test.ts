import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import app from "../_core/create-app";
import { executeSql } from "../_core/db";
import { applyMigrations, fetchWithAuth, resetDatabase, signUpAndGetToken } from "../_test/helpers";
import { buildMetaDayReceiptEmail } from "../services/meta-day-receipt";

vi.mock("../services/supabase-leads", () => ({
  syncMetaDayRsvpToSupabase: vi.fn().mockResolvedValue(true),
  syncPendingMetaDayRsvpsToSupabase: vi.fn().mockResolvedValue({
    scanned: 0,
    synced: 0,
    failed: 0
  })
}));

const validRsvp = {
  fullName: "Maria da Silva",
  cpf: "52998224725",
  company: "Empresa Exemplo",
  jobTitle: "Diretora de Marketing",
  email: "maria@example.com",
  whatsapp: "11987654321",
  institutionalPartner: "sindratar_sp",
  consent: true
};

beforeAll(async () => {
  await applyMigrations();
});

beforeEach(async () => {
  await resetDatabase();
  await executeSql("DELETE FROM meta_day_rsvps");
  vi.spyOn(Date, "now").mockReturnValue(new Date("2026-09-11T12:00:00Z").getTime());
});

afterEach(() => {
  vi.restoreAllMocks();
});

async function submitRsvp() {
  return app.fetch(
    new Request("http://localhost/api/meta-day-rsvps", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validRsvp)
    })
  );
}

async function createAdminToken() {
  const account = await signUpAndGetToken(app, { email: "tom.queiroz@pareto.plus" });
  await executeSql("UPDATE user SET emailVerified = 1 WHERE id = ?", [account.userId!]);
  const claim = await fetchWithAuth(app, account.token, "/api/admin-access/claim", { method: "POST" });
  expect(claim.status).toBe(200);
  return account.token;
}

describe("meta-day-rsvps.route", () => {
  it("accepts a public RSVP and does not require a participant account", async () => {
    const response = await submitRsvp();
    expect(response.status).toBe(201);
    const body = (await response.json()) as {
      data?: { rsvp?: { receiptEmailStatus?: string; adminNotificationStatus?: string } };
    };
    expect(body.data?.rsvp?.receiptEmailStatus).toBe("provider_unavailable");
    expect(["sent", "failed"]).toContain(body.data?.rsvp?.adminNotificationStatus);
  });

  it("treats an identical resubmission as received without creating another record", async () => {
    expect((await submitRsvp()).status).toBe(201);
    const repeated = await submitRsvp();
    expect(repeated.status).toBe(200);
    const body = (await repeated.json()) as {
      data?: { rsvp?: { alreadyReceived?: boolean } };
    };
    expect(body.data?.rsvp?.alreadyReceived).toBe(true);

    const result = await executeSql("SELECT COUNT(*) AS count FROM meta_day_rsvps");
    expect(Number(result.rows[0]?.count)).toBe(1);
  });

  it("rejects CPF or email conflicts that do not identify the same registration", async () => {
    expect((await submitRsvp()).status).toBe(201);
    const conflicting = await app.fetch(
      new Request("http://localhost/api/meta-day-rsvps", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...validRsvp, email: "outro@example.com" })
      })
    );
    expect(conflicting.status).toBe(409);
  });

  it("keeps the list and full CPF behind admin authorization", async () => {
    expect((await submitRsvp()).status).toBe(201);
    expect((await app.fetch(new Request("http://localhost/api/meta-day-rsvps"))).status).toBe(401);

    const token = await createAdminToken();
    const listResponse = await fetchWithAuth(app, token, "/api/meta-day-rsvps");
    expect(listResponse.status).toBe(200);
    const listBody = (await listResponse.json()) as {
      data?: { rsvps?: Array<{ id: string; maskedCpf: string; cpf?: string; email: string }> };
    };
    const rsvp = listBody.data?.rsvps?.[0];
    expect(rsvp?.maskedCpf).toBe("***.***.***-25");
    expect(rsvp?.cpf).toBeUndefined();
    expect(rsvp?.email).toBe("maria@example.com");

    const cpfResponse = await fetchWithAuth(app, token, `/api/meta-day-rsvps/${rsvp?.id}/cpf`);
    expect(cpfResponse.status).toBe(200);
    const cpfBody = (await cpfResponse.json()) as { data?: { cpf?: string } };
    expect(cpfBody.data?.cpf).toBe("52998224725");
  });

  it("keeps the Supabase synchronization endpoint behind admin authorization", async () => {
    const unauthorized = await app.fetch(
      new Request("http://localhost/api/meta-day-rsvps/sync-supabase", { method: "POST" })
    );
    expect(unauthorized.status).toBe(401);

    const token = await createAdminToken();
    const response = await fetchWithAuth(app, token, "/api/meta-day-rsvps/sync-supabase", {
      method: "POST"
    });
    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      data?: { sync?: { scanned?: number; synced?: number; failed?: number } };
    };
    expect(body.data?.sync).toEqual({ scanned: 0, synced: 0, failed: 0 });
  });

  it("allows only the verified initial administrator to claim admin access", async () => {
    const account = await signUpAndGetToken(app, { email: "outra-pessoa@example.com" });
    await executeSql("UPDATE user SET emailVerified = 1 WHERE id = ?", [account.userId!]);
    const response = await fetchWithAuth(app, account.token, "/api/admin-access/claim", { method: "POST" });
    expect(response.status).toBe(403);
  });
});

describe("PARETO + META DAY receipt email", () => {
  it("confirms receipt without promising RSVP approval or exposing CPF", () => {
    const email = buildMetaDayReceiptEmail({ fullName: "Maria da Silva" });
    expect(email.subject).toBe("Recebemos sua inscrição | PARETO + META DAY");
    expect(email.text).toContain("confirma apenas o recebimento");
    expect(email.text).toContain("não garante reserva de convite");
    expect(email.text).toContain("Após o encerramento do prazo de inscrições");
    expect(email.text).not.toContain(validRsvp.cpf);
  });
});
