-- Run this in the Supabase SQL Editor on your live project.
-- Stores all selected age ranges and reading stages per order (multi-select).

begin;

alter table public.orders
  add column if not exists child_age_ranges age_range[] not null default '{}';

alter table public.orders
  add column if not exists child_reading_stages reading_stage[] not null default '{}';

update public.orders
set
  child_age_ranges = array[child_age_range]::age_range[],
  child_reading_stages = array[child_reading_stage]::reading_stage[]
where child_age_range is not null
  or child_reading_stage is not null;

-- Backfill full multi-select values saved previously inside preferences JSON.
update public.orders o
set
  child_age_ranges = coalesce(
    (
      select array_agg(value::age_range)
      from jsonb_array_elements_text(o.preferences::jsonb -> 'ageRanges') as value
    ),
    o.child_age_ranges
  ),
  child_reading_stages = coalesce(
    (
      select array_agg(value::reading_stage)
      from jsonb_array_elements_text(o.preferences::jsonb -> 'readingStages') as value
    ),
    o.child_reading_stages
  )
where o.preferences is not null
  and o.preferences like '{%'
  and (o.preferences::jsonb ? 'ageRanges' or o.preferences::jsonb ? 'readingStages');

-- Keep only free-text notes in preferences going forward.
update public.orders
set preferences = nullif(preferences::jsonb ->> 'notes', '')
where preferences is not null
  and preferences like '{%'
  and preferences::jsonb ? 'notes';

alter table public.orders drop column if exists child_age_range;
alter table public.orders drop column if exists child_reading_stage;

alter table public.orders alter column child_age_ranges drop default;
alter table public.orders alter column child_reading_stages drop default;

commit;
