-- Run this in the Supabase SQL Editor on your live project.
-- Replaces mailchimp_sync_log with club_subscribers for Join the Club signups.

begin;

create table if not exists public.club_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  source text not null default 'newsletter',
  tags text[] not null default '{}',
  subscribed boolean not null default true,
  order_id uuid references public.orders(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists club_subscribers_email_idx on public.club_subscribers(email);
create index if not exists club_subscribers_created_at_idx on public.club_subscribers(created_at desc);

drop trigger if exists trg_club_subscribers_updated_at on public.club_subscribers;
create trigger trg_club_subscribers_updated_at before update on public.club_subscribers
for each row execute function public.set_updated_at();

alter table public.club_subscribers enable row level security;

drop policy if exists "deny_all_club_subscribers" on public.club_subscribers;
create policy "deny_all_club_subscribers" on public.club_subscribers for all to public using (false) with check (false);

drop table if exists public.mailchimp_sync_log;

commit;
