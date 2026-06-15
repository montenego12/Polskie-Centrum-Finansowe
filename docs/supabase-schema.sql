-- Run this in Supabase SQL Editor at supabase.com

create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  email text not null,
  city text not null,
  type text[] not null,
  bill_url text,
  language text not null default 'pl',
  status text not null default 'new',
  notes text
);

alter table leads enable row level security;

create policy "service role only" on leads
  using (auth.role() = 'service_role');

-- Storage bucket for bill uploads
insert into storage.buckets (id, name, public)
values ('bills', 'bills', true);

create policy "public read bills" on storage.objects
  for select using (bucket_id = 'bills');

create policy "service role insert bills" on storage.objects
  for insert with check (bucket_id = 'bills' AND auth.role() = 'service_role');
