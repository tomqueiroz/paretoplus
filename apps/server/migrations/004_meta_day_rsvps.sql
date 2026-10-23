CREATE TABLE IF NOT EXISTS meta_day_rsvps (
  id                        TEXT PRIMARY KEY,
  full_name                 TEXT NOT NULL,
  cpf                       TEXT NOT NULL UNIQUE,
  company                   TEXT NOT NULL,
  job_title                 TEXT NOT NULL,
  email                     TEXT NOT NULL UNIQUE,
  whatsapp                  TEXT NOT NULL,
  institutional_partner     TEXT NOT NULL,
  other_partner             TEXT,
  consented_at              TEXT NOT NULL,
  submitted_at              TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  receipt_email_status      TEXT NOT NULL DEFAULT 'provider_unavailable',
  receipt_email_sent_at     TEXT,
  admin_notification_status TEXT NOT NULL DEFAULT 'pending',
  admin_notification_sent_at TEXT,
  notification_error        TEXT
);

CREATE INDEX IF NOT EXISTS idx_meta_day_rsvps_submitted_at
  ON meta_day_rsvps (submitted_at);

CREATE INDEX IF NOT EXISTS idx_meta_day_rsvps_company
  ON meta_day_rsvps (company);
