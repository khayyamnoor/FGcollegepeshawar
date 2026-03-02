// ─── Supabase Client ────────────────────────────────────────────────────────
// Project URL and anon/public key for FG College Peshawar
const SUPABASE_URL     = 'https://fzadrrjtrfznuqourqrb.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6YWRycmp0cmZ6bnVxb3VycXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MDQ2OTYsImV4cCI6MjA4Nzk4MDY5Nn0.GcMIyOVeIvNyG6wFiSg94MX8VTFNxPmnK0FL7QDMORk'

const _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
