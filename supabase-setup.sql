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

-- 4. DOWNLOAD FILE OVERRIDES TABLE
CREATE TABLE IF NOT EXISTS downloads (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_key     text UNIQUE NOT NULL,
  label        text NOT NULL,
  description  text,
  storage_path text NOT NULL,
  updated_at   timestamptz DEFAULT now()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────

ALTER TABLE admissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty     ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads   ENABLE ROW LEVEL SECURITY;

-- admissions: anyone can INSERT, only authenticated admin can SELECT/DELETE
CREATE POLICY "public_insert_admissions"
  ON admissions FOR INSERT WITH CHECK (true);

CREATE POLICY "admin_read_admissions"
  ON admissions FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_admissions"
  ON admissions FOR DELETE USING (auth.role() = 'authenticated');

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

-- ─── STORAGE BUCKETS ─────────────────────────────────────────────────────────
-- Run these separately in Supabase Dashboard > Storage > New Bucket
-- OR uncomment and run here:

-- INSERT INTO storage.buckets (id, name, public) VALUES ('fee-vouchers', 'fee-vouchers', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('downloads', 'downloads', true);

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
