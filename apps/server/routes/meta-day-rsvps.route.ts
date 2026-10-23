import { Hono, type Context } from "hono";
import { z } from "zod";
import { apiFailure, apiSuccess } from "@repo/shared/http";
import { adminRoute, publicRoute } from "../_core/route-helpers";
import {
  createMetaDayRsvp,
  getMetaDayRsvpCpf,
  listMetaDayRsvps,
  MetaDayRsvpError,
  syncAllMetaDayRsvpsToSupabase
} from "../services/meta-day-rsvps";

const CreateMetaDayRsvpSchema = z
  .object({
    fullName: z.string().trim().min(3).max(140),
    cpf: z.string().regex(/^\d{11}$/),
    company: z.string().trim().min(2).max(160),
    jobTitle: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    whatsapp: z.string().regex(/^\d{10,11}$/),
    institutionalPartner: z.enum(["abrava", "anapp", "sindratar_sp", "outra"]),
    otherPartner: z.string().trim().max(160).optional(),
    consent: z.literal(true)
  })
  .superRefine((value, context) => {
    if (value.institutionalPartner === "outra" && !value.otherPartner) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherPartner"],
        message: "Informe a parceria institucional."
      });
    }
  });

function isValidCpf(cpf: string) {
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  const digit = (length: number) => {
    let sum = 0;
    for (let index = 0; index < length; index += 1) {
      sum += Number(cpf[index]) * (length + 1 - index);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };
  return digit(9) === Number(cpf[9]) && digit(10) === Number(cpf[10]);
}

function rsvpErrorResponse(c: Context, error: MetaDayRsvpError) {
  return c.json(apiFailure(error.code, error.message), error.status);
}

export const metaDayRsvpsRouter = new Hono();

const createHandler = async (c: Context) => {
  const parsed = CreateMetaDayRsvpSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success || !isValidCpf(parsed.data.cpf)) {
    return c.json(apiFailure("INVALID_INPUT", "Revise os dados informados e tente novamente."), 400);
  }

  try {
    const rsvp = await createMetaDayRsvp(parsed.data);
    return c.json(apiSuccess({ rsvp }), rsvp.alreadyReceived ? 200 : 201);
  } catch (error) {
    if (error instanceof MetaDayRsvpError) {
      return rsvpErrorResponse(c, error);
    }
    throw error;
  }
};

const listHandler = async (c: Context) => {
  return c.json(apiSuccess({ rsvps: await listMetaDayRsvps() }), 200);
};

metaDayRsvpsRouter.post("", publicRoute, createHandler);
metaDayRsvpsRouter.post("/", publicRoute, createHandler);
metaDayRsvpsRouter.post("/sync-supabase", adminRoute, async (c) => {
  const sync = await syncAllMetaDayRsvpsToSupabase();
  return c.json(apiSuccess({ sync }), sync.failed === 0 ? 200 : 207);
});
metaDayRsvpsRouter.get("", adminRoute, listHandler);
metaDayRsvpsRouter.get("/", adminRoute, listHandler);
metaDayRsvpsRouter.get("/:id/cpf", adminRoute, async (c) => {
  try {
    const cpf = await getMetaDayRsvpCpf(c.req.param("id"));
    return c.json(apiSuccess({ cpf }), 200);
  } catch (error) {
    if (error instanceof MetaDayRsvpError) {
      return rsvpErrorResponse(c, error);
    }
    throw error;
  }
});
