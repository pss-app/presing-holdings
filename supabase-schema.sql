-- Presing Holdings Database Schema
-- Supabase SQL Editor で実行してください

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  location TEXT NOT NULL,
  prefecture TEXT,
  city TEXT,
  salary TEXT,
  "employmentType" TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  "startDate" DATE,
  "endDate" DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "companyName" TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin emails table
CREATE TABLE IF NOT EXISTS admin_emails (
  email TEXT PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'staff',
  "addedBy" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recruits table
CREATE TABLE IF NOT EXISTS recruits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "jobId" UUID REFERENCES jobs(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  "nameKanji" TEXT,
  "nameKana" TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  "photoUrl" TEXT,
  "lineId" TEXT,
  "referredBy" TEXT,
  gender TEXT,
  "birthDate" TEXT,
  age TEXT,
  address TEXT,
  "hasCar" TEXT,
  "nearestStation" TEXT,
  "transportToStation" TEXT,
  qualifications TEXT,
  "availableFrom" TEXT,
  "availablePeriod" TEXT,
  "availableShift" TEXT,
  education TEXT,
  "educationDate" TEXT,
  "educationName" TEXT,
  "workHistory1" TEXT,
  "workHistory2" TEXT,
  "workHistory3" TEXT,
  "work1Company" TEXT,
  "work1JobType" TEXT,
  "work1Content" TEXT,
  "work1Period" TEXT,
  "work1Details" TEXT,
  "work2Company" TEXT,
  "work2JobType" TEXT,
  "work2Content" TEXT,
  "work2Period" TEXT,
  "work2Details" TEXT,
  "work3Company" TEXT,
  "work3JobType" TEXT,
  "work3Content" TEXT,
  "work3Period" TEXT,
  "work3Details" TEXT,
  "selfPr" TEXT,
  "emergencyContact" TEXT,
  "emergencyFurigana" TEXT,
  "emergencyName" TEXT,
  "emergencyRelation" TEXT,
  "emergencyTel" TEXT,
  "bankAccount" TEXT,
  "bankName" TEXT,
  "bankBranch" TEXT,
  "bankType" TEXT,
  "bankNumber" TEXT,
  "bankHolder" TEXT,
  "jobTitle" TEXT,
  "employmentType" TEXT,
  "desiredSalary" TEXT,
  "workLocation" TEXT,
  experience TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security を有効化
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruits ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

-- 管理者チェック関数
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  user_email TEXT;
BEGIN
  IF auth.uid() IS NULL THEN RETURN FALSE; END IF;
  SELECT email INTO user_email FROM auth.users WHERE id = auth.uid();
  RETURN (
    user_email = 'paradigm070755@gmail.com' OR
    EXISTS (SELECT 1 FROM admin_emails WHERE email = user_email)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Jobs: 誰でも読める、管理者のみ書き込み
CREATE POLICY "jobs_public_read" ON jobs FOR SELECT USING (true);
CREATE POLICY "jobs_admin_insert" ON jobs FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "jobs_admin_update" ON jobs FOR UPDATE USING (is_admin());
CREATE POLICY "jobs_admin_delete" ON jobs FOR DELETE USING (is_admin());

-- Contacts: 誰でも送信可、管理者のみ読み取り
CREATE POLICY "contacts_public_insert" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "contacts_admin_read" ON contacts FOR SELECT USING (is_admin());

-- Recruits: 誰でも送信可、管理者が管理
CREATE POLICY "recruits_public_insert" ON recruits FOR INSERT WITH CHECK (true);
CREATE POLICY "recruits_admin_select" ON recruits FOR SELECT USING (is_admin());
CREATE POLICY "recruits_admin_update" ON recruits FOR UPDATE USING (is_admin());
CREATE POLICY "recruits_admin_delete" ON recruits FOR DELETE USING (is_admin());

-- Admin emails: 管理者のみ
CREATE POLICY "admin_emails_admin_all" ON admin_emails FOR ALL USING (is_admin());

-- Interviews table（面談記録：1応募者に複数回ぶら下がる）
CREATE TABLE IF NOT EXISTS interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "recruitId" UUID REFERENCES recruits(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'hiring',      -- hiring(採用面談) / followup(稼働フォロー)
  interviewer TEXT,                          -- 面接担当（ログイン中スタッフ）
  "interviewDate" DATE,
  result TEXT,                               -- pass / hold / fail
  responses JSONB DEFAULT '{}'::jsonb,       -- 各ページの面談メモを section単位で保存
  created_at TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS interviews_recruit_idx ON interviews("recruitId");

ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;

-- Interviews: 管理者のみ
CREATE POLICY "interviews_admin_all" ON interviews FOR ALL USING (is_admin());
