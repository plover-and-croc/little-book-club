begin;

create extension if not exists pgcrypto;

do $$ begin
  create type order_status as enum ('draft','awaiting_payment','paid','packing','fulfilled','cancelled','refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_status as enum ('pending','paid','failed','refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type reading_stage as enum ('board_books','picture_books','early_readers','independent_readers','chapter_books');
exception when duplicate_object then null; end $$;

do $$ begin
  create type age_range as enum ('0-2','3-5','6-8','9-12');
exception when duplicate_object then null; end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  email text not null,
  first_name text not null,
  last_name text,
  phone text not null,
  delivery_address_line_1 text not null,
  delivery_address_line_2 text,
  city text not null,
  province text not null,
  postcode text,
  country text not null default 'Thailand',
  bundle_type text not null,
  child_age_range age_range not null,
  child_reading_stage reading_stage not null,
  child_interests text[] not null default '{}',
  preferences text,
  avoid_topics text,
  gift_message text,
  delivery_notes text,
  marketing_opt_in boolean not null default false,
  order_status order_status not null default 'draft',
  payment_status payment_status not null default 'pending',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  total_amount integer not null check (total_amount > 0),
  currency text not null default 'THB',
  source text not null default 'website',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mailchimp_sync_log (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  event_type text not null,
  tags text[] not null default '{}',
  status text not null,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_received_books (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  title text not null,
  author text,
  isbn text,
  received_date date not null default current_date,
  condition_notes text,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_email_idx on public.customers(email);
create index if not exists orders_customer_id_idx on public.orders(customer_id);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_order_status_idx on public.orders(order_status);
create index if not exists orders_payment_status_idx on public.orders(payment_status);
create index if not exists customer_received_books_customer_id_idx on public.customer_received_books(customer_id);
create index if not exists customer_received_books_title_idx on public.customer_received_books(title);
create index if not exists customer_received_books_isbn_idx on public.customer_received_books(isbn);

drop trigger if exists trg_customers_updated_at on public.customers;
create trigger trg_customers_updated_at before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists trg_customer_received_books_updated_at on public.customer_received_books;
create trigger trg_customer_received_books_updated_at before update on public.customer_received_books
for each row execute function public.set_updated_at();

alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.mailchimp_sync_log enable row level security;
alter table public.customer_received_books enable row level security;

drop policy if exists "deny_all_customers" on public.customers;
create policy "deny_all_customers" on public.customers for all to public using (false) with check (false);
drop policy if exists "deny_all_orders" on public.orders;
create policy "deny_all_orders" on public.orders for all to public using (false) with check (false);
drop policy if exists "deny_all_mailchimp_sync_log" on public.mailchimp_sync_log;
create policy "deny_all_mailchimp_sync_log" on public.mailchimp_sync_log for all to public using (false) with check (false);
drop policy if exists "deny_all_customer_received_books" on public.customer_received_books;
create policy "deny_all_customer_received_books" on public.customer_received_books for all to public using (false) with check (false);

commit;
