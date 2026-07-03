-- 面談記録テーブル（Supabase SQL Editor で実行）
-- 1応募者に複数回の面談（採用面談＋稼働フォロー）をぶら下げる

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

DROP POLICY IF EXISTS "interviews_admin_all" ON interviews;
CREATE POLICY "interviews_admin_all" ON interviews FOR ALL USING (is_admin());
