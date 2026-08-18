-- ============================================================
-- FG College Peshawar — Announcement Banner Setup
-- Run this entire file in: Supabase Dashboard > SQL Editor
--
-- Safe to re-run: every statement is idempotent.
-- ============================================================

-- 1. ANNOUNCEMENT TABLE (single row, keyed by slot_key = 'main')
CREATE TABLE IF NOT EXISTS announcement (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_key     text UNIQUE NOT NULL DEFAULT 'main',
  is_visible   boolean DEFAULT true,
  label        text    DEFAULT 'Announcement:',
  message      text    DEFAULT '',
  button_text  text    DEFAULT 'Apply Now',
  link_type    text    DEFAULT 'url' CHECK (link_type IN ('url','pdf')),
  button_link  text    DEFAULT 'form.html',
  storage_path text,
  updated_at   timestamptz DEFAULT now()
);

-- Seed the single row with the banner currently hardcoded on index.html.
-- ON CONFLICT DO NOTHING so re-running never overwrites live edits.
INSERT INTO announcement (slot_key, is_visible, label, message, button_text, link_type, button_link)
VALUES (
  'main',
  true,
  'Announcement:',
  'Admissions open for Fall 2025 semester. Last date to apply is August 15, 2025.',
  'Apply Now',
  'url',
  'form.html'
)
ON CONFLICT (slot_key) DO NOTHING;

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────
ALTER TABLE announcement ENABLE ROW LEVEL SECURITY;

-- anyone can read (the public homepage needs it), only admin can write
DROP POLICY IF EXISTS "public_read_announcement" ON announcement;
CREATE POLICY "public_read_announcement"
  ON announcement FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin_all_announcement" ON announcement;
CREATE POLICY "admin_all_announcement"
  ON announcement FOR ALL USING (auth.role() = 'authenticated');

-- ─── STORAGE BUCKET (for the optional attached PDF) ──────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('announcements', 'announcements', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_announcements_storage" ON storage.objects;
CREATE POLICY "public_read_announcements_storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'announcements');

DROP POLICY IF EXISTS "admin_upload_announcements_storage" ON storage.objects;
CREATE POLICY "admin_upload_announcements_storage"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'announcements' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_update_announcements_storage" ON storage.objects;
CREATE POLICY "admin_update_announcements_storage"
  ON storage.objects FOR UPDATE USING (bucket_id = 'announcements' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_delete_announcements_storage" ON storage.objects;
CREATE POLICY "admin_delete_announcements_storage"
  ON storage.objects FOR DELETE USING (bucket_id = 'announcements' AND auth.role() = 'authenticated');
