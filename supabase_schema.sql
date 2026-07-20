-- ========================================================
-- RATNA COACHING CENTER - SUPABASE DATABASE SCHEMA
-- ========================================================
-- Copy and run this script in your Supabase Dashboard -> SQL Editor
-- URL: https://supabase.com/dashboard/project/mbvggtozllnysjzktoys/sql/new
-- ========================================================

-- 1. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    class_level TEXT,
    school_name TEXT,
    roll_number TEXT UNIQUE,
    password_hash TEXT,
    joined_date TEXT,
    score_correct INTEGER DEFAULT 0,
    score_attempted INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. ADMISSIONS ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.admissions (
    id TEXT PRIMARY KEY,
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    class_level TEXT NOT NULL,
    school_name TEXT,
    mobile_number TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    submitted_at TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email_or_phone TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    submitted_at TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. SITE DATA / ANNOUNCEMENTS TABLE (Key-Value JSON store for notices, toppers, gallery, blogs, etc.)
CREATE TABLE IF NOT EXISTS public.site_data (
    key TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) & POLICIES
-- ========================================================
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_data ENABLE ROW LEVEL SECURITY;

-- Allow Public / Anon access for read & write (Full API access with anon/publishable key)
DROP POLICY IF EXISTS "Public full access to students" ON public.students;
CREATE POLICY "Public full access to students" ON public.students FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access to admissions" ON public.admissions;
CREATE POLICY "Public full access to admissions" ON public.admissions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access to contact_messages" ON public.contact_messages;
CREATE POLICY "Public full access to contact_messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access to site_data" ON public.site_data;
CREATE POLICY "Public full access to site_data" ON public.site_data FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime replication on all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_data;
