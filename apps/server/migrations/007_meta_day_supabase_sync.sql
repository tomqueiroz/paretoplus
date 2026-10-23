ALTER TABLE meta_day_rsvps
  ADD COLUMN supabase_sync_status TEXT NOT NULL DEFAULT 'pending';

ALTER TABLE meta_day_rsvps
  ADD COLUMN supabase_synced_at TEXT;

ALTER TABLE meta_day_rsvps
  ADD COLUMN supabase_sync_error TEXT;
