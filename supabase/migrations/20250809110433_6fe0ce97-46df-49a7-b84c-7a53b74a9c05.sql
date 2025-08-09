-- 1) Ensure pgcrypto for gen_random_uuid
create extension if not exists "pgcrypto";

-- 2) quiz_results: add points_awarded if missing, indexes, constraints, and idempotent policies
alter table public.quiz_results
  add column if not exists points_awarded int not null default 0;

-- Indexes
create index if not exists idx_quiz_results_user_id on public.quiz_results(user_id);
create index if not exists idx_quiz_results_user_child on public.quiz_results(user_id, child_name);
create index if not exists idx_quiz_results_user_cat on public.quiz_results(user_id, category);
create index if not exists idx_quiz_results_created_at on public.quiz_results(created_at desc);

-- Constraints (idempotent add via exception handling)
DO $$
BEGIN
  ALTER TABLE public.quiz_results
    ADD CONSTRAINT quiz_results_positive_scores CHECK (score >= 0 AND max_score > 0 AND score <= max_score);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$
BEGIN
  ALTER TABLE public.quiz_results
    ADD CONSTRAINT quiz_results_points_nonneg CHECK (points_awarded >= 0);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Enable RLS (safe if already enabled)
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Idempotent simple policies in addition to existing ones (only if missing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='quiz_results' AND policyname='quiz_results_select_own'
  ) THEN
    CREATE POLICY "quiz_results_select_own"
    ON public.quiz_results FOR SELECT TO authenticated
    USING (user_id = auth.uid());
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='quiz_results' AND policyname='quiz_results_insert_own'
  ) THEN
    CREATE POLICY "quiz_results_insert_own"
    ON public.quiz_results FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

-- 3) progress: add finished flag if missing, unique index, and composite index
ALTER TABLE public.progress
  ADD COLUMN IF NOT EXISTS finished boolean NOT NULL DEFAULT false;

-- Unique and supporting indexes
DO $$
BEGIN
  CREATE UNIQUE INDEX idx_progress_unique_user_child_cat
    ON public.progress(user_id, child_name, category);
EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_progress_user_child_cat ON public.progress(user_id, child_name, category);
