import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  role: text("role").default("user"),
  username: text("username").unique(),
  displayUsername: text("displayUsername")
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull()
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
});

export const todos = sqliteTable(
  "todos",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId").notNull(),
    title: text("title").notNull(),
    done: integer("done", { mode: "boolean" }).notNull().default(false),
    createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updatedAt").notNull().default(sql`CURRENT_TIMESTAMP`)
  },
  (table) => [index("idx_todos_userId").on(table.userId)]
);

export const storageFiles = sqliteTable(
  "storage_files",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId"),
    gatewayFileId: text("gatewayFileId"),
    fileName: text("fileName").notNull(),
    fileSuffix: text("fileSuffix").notNull(),
    contentType: text("contentType").notNull().default("application/octet-stream"),
    fileSize: integer("fileSize").notNull(),
    objectKey: text("objectKey").notNull(),
    path: text("path").notNull(),
    downloadUrl: text("downloadUrl").notNull(),
    status: text("status", { enum: ["pending", "uploaded", "failed", "deleted"] }).notNull().default("pending"),
    errorMessage: text("errorMessage"),
    createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updatedAt").notNull().default(sql`CURRENT_TIMESTAMP`)
  },
  (table) => [
    index("idx_storage_files_userId").on(table.userId),
    index("idx_storage_files_objectKey").on(table.objectKey),
    index("idx_storage_files_status").on(table.status)
  ]
);

export const aiBusinessScenes = sqliteTable(
  "ai_business_scenes",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    sceneKey: text("scene_key").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    definition: text("definition").notNull().default("{}"),
    createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updatedAt").notNull().default(sql`CURRENT_TIMESTAMP`)
  },
  (table) => [index("idx_ai_business_scenes_scene_key").on(table.sceneKey)]
);

export const metaDayRsvps = sqliteTable(
  "meta_day_rsvps",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    fullName: text("full_name").notNull(),
    cpf: text("cpf").notNull().unique(),
    company: text("company").notNull(),
    jobTitle: text("job_title").notNull(),
    email: text("email").notNull().unique(),
    whatsapp: text("whatsapp").notNull(),
    institutionalPartner: text("institutional_partner").notNull(),
    otherPartner: text("other_partner"),
    consentedAt: text("consented_at").notNull(),
    submittedAt: text("submitted_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    receiptEmailStatus: text("receipt_email_status").notNull().default("provider_unavailable"),
    receiptEmailSentAt: text("receipt_email_sent_at"),
    adminNotificationStatus: text("admin_notification_status").notNull().default("pending"),
    adminNotificationSentAt: text("admin_notification_sent_at"),
    notificationError: text("notification_error"),
    supabaseSyncStatus: text("supabase_sync_status").notNull().default("pending"),
    supabaseSyncedAt: text("supabase_synced_at"),
    supabaseSyncError: text("supabase_sync_error")
  },
  (table) => [
    index("idx_meta_day_rsvps_submitted_at").on(table.submittedAt),
    index("idx_meta_day_rsvps_company").on(table.company)
  ]
);

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
export type StorageFile = typeof storageFiles.$inferSelect;
export type NewStorageFile = typeof storageFiles.$inferInsert;
export type AiBusinessScene = typeof aiBusinessScenes.$inferSelect;
export type NewAiBusinessScene = typeof aiBusinessScenes.$inferInsert;
export type MetaDayRsvp = typeof metaDayRsvps.$inferSelect;
export type NewMetaDayRsvp = typeof metaDayRsvps.$inferInsert;
