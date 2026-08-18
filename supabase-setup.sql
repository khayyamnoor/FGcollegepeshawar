-- ============================================================
-- FG College Peshawar — Supabase Setup Script
-- Run this entire file in: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. ADMISSIONS TABLE (form submissions from form.html)
CREATE TABLE IF NOT EXISTS admissions (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  submitted_at        timestamptz DEFAULT now(),
  full_name           text,
  father_name         text,
  dob                 text,
  gender              text,
  cnic                text,
  nationality         text,
  religion            text,
  domicile            text,
  any_disability      boolean DEFAULT false,
  address             text,
  phone               text,
  email               text,
  guardian_phone      text,
  emergency_contact   text,
  matric_board        text,
  matric_year         text,
  matric_roll_no      text,
  matric_institute    text,
  matric_total        integer,
  matric_obtained     integer,
  matric_percentage   text,
  inter_board         text,
  inter_year          text,
  inter_roll_no       text,
  inter_institute     text,
  inter_total         integer,
  inter_obtained      integer,
  inter_percentage    text,
  program_level       text,
  program_choice      text,
  program_reason      text,
  blood_group         text,
  hafiz_quran         text,
  disability          text,
  medical_condition   text,
  reference_number    text
);

-- 2. FACULTY TABLE
CREATE TABLE IF NOT EXISTS faculty (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamptz DEFAULT now(),
  name        text NOT NULL,
  level       text,
  discipline  text,
  designation text,
  category    text NOT NULL CHECK (category IN ('professor','assistant','lecturer')),
  qualification text,
  sort_order  integer DEFAULT 0
);

-- 3. FEE VOUCHER OVERRIDES TABLE
-- When admin uploads a new PDF, its Supabase Storage path is stored here.
-- The public site checks this table and uses the Supabase URL if a row exists.
CREATE TABLE IF NOT EXISTS fee_vouchers (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_key     text UNIQUE NOT NULL,
  storage_path text NOT NULL,
  updated_at   timestamptz DEFAULT now()
);

-- 4. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  submitted_at timestamptz DEFAULT now(),
  name         text NOT NULL,
  email        text NOT NULL,
  subject      text,
  message      text NOT NULL,
  is_read      boolean DEFAULT false
);

-- 5. DOWNLOAD FILE OVERRIDES TABLE
CREATE TABLE IF NOT EXISTS downloads (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_key     text UNIQUE NOT NULL,
  label        text NOT NULL,
  description  text,
  storage_path text NOT NULL,
  updated_at   timestamptz DEFAULT now()
);

-- 6. ANNOUNCEMENT BANNER TABLE (single row, keyed by slot_key = 'main')
-- Drives the banner on index.html: text, button label, and its link —
-- which is either an external URL or a PDF uploaded to the 'announcements' bucket.
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

INSERT INTO announcement (slot_key, message)
VALUES ('main', 'Admissions open for Fall 2025 semester. Last date to apply is August 15, 2025.')
ON CONFLICT (slot_key) DO NOTHING;

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────

ALTER TABLE admissions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty          ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_vouchers     ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement     ENABLE ROW LEVEL SECURITY;

-- admissions: anyone can INSERT, only authenticated admin can SELECT/DELETE
CREATE POLICY "public_insert_admissions"
  ON admissions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_read_admissions"
  ON admissions FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_admissions"
  ON admissions FOR DELETE USING (auth.role() = 'authenticated');

-- contact_messages: anyone can INSERT, only authenticated admin can SELECT/DELETE/UPDATE
CREATE POLICY "public_insert_contact"
  ON contact_messages FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_read_contact"
  ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "admin_update_contact"
  ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_contact"
  ON contact_messages FOR DELETE USING (auth.role() = 'authenticated');

-- faculty: anyone can SELECT, authenticated admin can do everything
CREATE POLICY "public_read_faculty"
  ON faculty FOR SELECT USING (true);

CREATE POLICY "admin_all_faculty"
  ON faculty FOR ALL USING (auth.role() = 'authenticated');

-- fee_vouchers: anyone can SELECT, authenticated admin can do everything
CREATE POLICY "public_read_fee_vouchers"
  ON fee_vouchers FOR SELECT USING (true);

CREATE POLICY "admin_all_fee_vouchers"
  ON fee_vouchers FOR ALL USING (auth.role() = 'authenticated');

-- downloads: anyone can SELECT, authenticated admin can do everything
CREATE POLICY "public_read_downloads"
  ON downloads FOR SELECT USING (true);

CREATE POLICY "admin_all_downloads"
  ON downloads FOR ALL USING (auth.role() = 'authenticated');

-- announcement: anyone can SELECT, authenticated admin can do everything
CREATE POLICY "public_read_announcement"
  ON announcement FOR SELECT USING (true);

CREATE POLICY "admin_all_announcement"
  ON announcement FOR ALL USING (auth.role() = 'authenticated');

-- ─── STORAGE BUCKETS ─────────────────────────────────────────────────────────
-- Run these separately in Supabase Dashboard > Storage > New Bucket
-- OR uncomment and run here:

-- INSERT INTO storage.buckets (id, name, public) VALUES ('fee-vouchers', 'fee-vouchers', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('downloads', 'downloads', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('announcements', 'announcements', true);

-- Storage policies (run after creating buckets):

-- CREATE POLICY "public_read_fee_vouchers_storage"
--   ON storage.objects FOR SELECT USING (bucket_id = 'fee-vouchers');
-- CREATE POLICY "admin_upload_fee_vouchers_storage"
--   ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'fee-vouchers' AND auth.role() = 'authenticated');
-- CREATE POLICY "admin_update_fee_vouchers_storage"
--   ON storage.objects FOR UPDATE USING (bucket_id = 'fee-vouchers' AND auth.role() = 'authenticated');
-- CREATE POLICY "admin_delete_fee_vouchers_storage"
--   ON storage.objects FOR DELETE USING (bucket_id = 'fee-vouchers' AND auth.role() = 'authenticated');

-- CREATE POLICY "public_read_downloads_storage"
--   ON storage.objects FOR SELECT USING (bucket_id = 'downloads');
-- CREATE POLICY "admin_upload_downloads_storage"
--   ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'downloads' AND auth.role() = 'authenticated');
-- CREATE POLICY "admin_update_downloads_storage"
--   ON storage.objects FOR UPDATE USING (bucket_id = 'downloads' AND auth.role() = 'authenticated');
-- CREATE POLICY "admin_delete_downloads_storage"
--   ON storage.objects FOR DELETE USING (bucket_id = 'downloads' AND auth.role() = 'authenticated');

-- ─── ADMIN USER ──────────────────────────────────────────────────────────────
-- Create the admin user in: Supabase Dashboard > Authentication > Users > Add User
-- Email:    admin@fgcollege.edu.pk
-- Password: pakistanzindabadiran
