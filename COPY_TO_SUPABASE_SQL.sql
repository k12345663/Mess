-- COPY AND PASTE THIS INTO SUPABASE SQL EDITOR

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create Tables
-- PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role text not null check (role in ('student','admin','warden','cook','accountant')),
  created_at timestamptz default now()
);

-- MESS
create table if not exists public.mess (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  hostel text,
  created_at timestamptz default now()
);

-- MEMBERSHIPS
create table if not exists public.mess_memberships (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  room text,
  diet text check (diet in ('veg','jain','nonveg')) default 'veg',
  is_active boolean default true,
  unique (mess_id, user_id)
);

-- MENU DAYS
create table if not exists public.menu_days (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  menu_date date not null,
  unique (mess_id, menu_date)
);

-- MENU ITEMS
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  menu_day_id uuid references public.menu_days(id) on delete cascade,
  meal text not null check (meal in ('breakfast','lunch','dinner')),
  item_name text not null,
  is_special boolean default false,
  allergens text[]
);

-- MEAL OPT-IN
create table if not exists public.meal_opt (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  opt_date date not null,
  meal text not null check (meal in ('breakfast','lunch','dinner')),
  is_opted boolean not null default true,
  updated_at timestamptz default now(),
  unique (mess_id, user_id, opt_date, meal)
);

-- MEAL SCANS
create table if not exists public.meal_scans (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  scan_time timestamptz default now(),
  scan_date date default CURRENT_DATE, -- Fixed: standard column instead of immutable generated
  meal text not null check (meal in ('breakfast','lunch','dinner')),
  unique (mess_id, user_id, scan_date, meal)
);

-- 3. Enable RLS
alter table public.profiles enable row level security;
alter table public.mess enable row level security;
alter table public.mess_memberships enable row level security;
alter table public.menu_days enable row level security;
alter table public.menu_items enable row level security;
alter table public.meal_opt enable row level security;
alter table public.meal_scans enable row level security;

-- 4. Create Policies (Simple Permissive for Demo)
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Enable read access for all users" on public.mess for select using (true);
create policy "Enable read access for all users" on public.mess_memberships for select using (true);
create policy "Enable read access for all users" on public.menu_days for select using (true);
create policy "Enable read access for all users" on public.menu_items for select using (true);

-- Allow updates for demo purposes (Refine for production)
create policy "Enable all access for authenticated users" on public.meal_opt for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on public.meal_scans for all using (auth.role() = 'authenticated');
