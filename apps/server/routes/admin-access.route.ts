import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { apiFailure, apiSuccess } from "@repo/shared/http";
import { getDb } from "../_core/db";
import { protectedRoute } from "../_core/route-helpers";
import { user } from "../db/schema";

const INITIAL_ADMIN_EMAIL = "tom.queiroz@pareto.plus";

export const adminAccessRouter = new Hono();

adminAccessRouter.post("/claim", protectedRoute, async (c) => {
  const currentUser = c.var.currentUser;
  if (
    !currentUser.emailVerified
    || currentUser.email.trim().toLowerCase() !== INITIAL_ADMIN_EMAIL
  ) {
    return c.json(apiFailure("ADMIN_ACCESS_DENIED", "Esta conta não possui acesso administrativo."), 403);
  }

  await getDb()
    .update(user)
    .set({ role: "admin", updatedAt: new Date() })
    .where(eq(user.id, currentUser.id));

  return c.json(apiSuccess({ role: "admin" }), 200);
});
