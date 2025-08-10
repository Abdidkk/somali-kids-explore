
-- 0) Helper indexes on child_profiles for faster join and "latest" selection
create index if not exists idx_child_profiles_user_name
  on public.child_profiles(parent_user_id, name);

create index if not exists idx_child_profiles_user_created
  on public.child_profiles(parent_user_id, created_at desc);

-- 1) Dry-run: how many rows are missing child_profile_id
-- Note: SELECTs are safe to run in migrations for diagnostics.
select
  (select count(*) from public.quiz_results  where child_profile_id is null) as quiz_results_missing,
  (select count(*) from public.progress      where child_profile_id is null) as progress_missing;

-- 2) Backfill in quiz_results (only where child_profile_id is null)
begin;

with latest_child as (
  select t.id, t.parent_user_id, t.name
  from (
    select
      id,
      parent_user_id,
      name,
      created_at,
      row_number() over (partition by parent_user_id, name order by created_at desc) as rn
    from public.child_profiles
  ) t
  where t.rn = 1
)
update public.quiz_results qr
set child_profile_id = lc.id
from latest_child lc
where qr.child_profile_id is null
  and qr.user_id = lc.parent_user_id
  and qr.child_name = lc.name;

commit;

-- 3) Backfill in progress (only where child_profile_id is null)
begin;

with latest_child as (
  select t.id, t.parent_user_id, t.name
  from (
    select
      id,
      parent_user_id,
      name,
      created_at,
      row_number() over (partition by parent_user_id, name order by created_at desc) as rn
    from public.child_profiles
  ) t
  where t.rn = 1
)
update public.progress pr
set child_profile_id = lc.id
from latest_child lc
where pr.child_profile_id is null
  and pr.user_id = lc.parent_user_id
  and pr.child_name = lc.name;

commit;

-- 4) Verify result counts after backfill
select
  (select count(*) from public.quiz_results  where child_profile_id is null) as quiz_results_remaining_nulls,
  (select count(*) from public.progress      where child_profile_id is null) as progress_remaining_nulls;

-- 5) Performance indexes for per-child queries

-- quiz_results: fast per-user, per-child lookups
create index if not exists idx_quiz_results_user_child_id
  on public.quiz_results(user_id, child_profile_id);

-- progress: fast per-user, per-child, per-category lookups
create index if not exists idx_progress_user_child_id_cat
  on public.progress(user_id, child_profile_id, category);

-- common sort in UI for child history
create index if not exists idx_quiz_results_user_child_id_created
  on public.quiz_results(user_id, child_profile_id, created_at desc);

-- partial indexes (only rows with a child_profile_id) for compact lookups
create index if not exists idx_quiz_results_user_child_id_notnull
  on public.quiz_results(user_id, child_profile_id)
  where child_profile_id is not null;

create index if not exists idx_progress_user_child_id_cat_notnull
  on public.progress(user_id, child_profile_id, category)
  where child_profile_id is not null;

-- (temporary) legacy fallback on (user_id, child_name) if some views still read by name
create index if not exists idx_quiz_results_user_child_name
  on public.quiz_results(user_id, child_name);

-- 6) (Optional) sanity checks per child
-- distribution of rows per child_profile_id (top 20)
select child_profile_id, count(*) as rows
from public.quiz_results
group by 1
order by 2 desc
limit 20;

-- remaining rows still without child_profile_id (should trend to 0)
select user_id, child_name, count(*) as rows_missing_id
from public.quiz_results
where child_profile_id is null
group by 1,2
order by 3 desc
limit 20;
