-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES: Linked to Supabase Auth
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role text not null check (role in ('student','admin','warden','cook','accountant')),
  created_at timestamptz default now()
);

-- MESS: The entity (Hostel Mess)
create table public.mess (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  hostel text,
  created_at timestamptz default now()
);

-- MEMBERSHIPS: Who belongs to which mess
create table public.mess_memberships (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  room text,
  diet text check (diet in ('veg','jain','nonveg')) default 'veg',
  is_active boolean default true,
  unique (mess_id, user_id)
);

-- MENU DAYS: High-level day entry
create table public.menu_days (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  menu_date date not null,
  unique (mess_id, menu_date)
);

-- MENU ITEMS: Specific food items
create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  menu_day_id uuid references public.menu_days(id) on delete cascade,
  meal text not null check (meal in ('breakfast','lunch','dinner')),
  item_name text not null,
  is_special boolean default false,
  allergens text[] -- Array of strings e.g. ['nuts', 'dairy']
);

-- MEAL OPT-IN/OUT
create table public.meal_opt (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  opt_date date not null,
  meal text not null check (meal in ('breakfast','lunch','dinner')),
  is_opted boolean not null default true, -- true = eating, false = skipped
  updated_at timestamptz default now(),
  unique (mess_id, user_id, opt_date, meal)
);

-- MEAL SCANS: Record of consumption
create table public.meal_scans (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  scan_time timestamptz default now(),
  scan_date date generated always as (scan_time::date) stored,
  meal text not null check (meal in ('breakfast','lunch','dinner')),
  unique (mess_id, user_id, scan_date, meal) -- Prevents double scanning for same meal
);

-- COMPLAINTS
create table public.complaints (
  id uuid primary key default gen_random_uuid(),
  mess_id uuid references public.mess(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  category text not null check (category in ('food', 'cleanliness', 'staff', 'other')),
  title text not null,
  description text,
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz default now(),
  resolved_at timestamptz
);

-- RLS POLICIES (Basic Examples - to be refined)
alter table public.profiles enable row level security;
alter table public.mess enable row level security;
alter table public.mess_memberships enable row level security;
alter table public.menu_days enable row level security;
alter table public.menu_items enable row level security;
alter table public.meal_opt enable row level security;
alter table public.meal_scans enable row level security;
alter table public.complaints enable row level security;

-- Profiles: Users can read everyone (for now) but only update themselves
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Mess: Viewable by active members
create policy "Members can view their mess" on public.mess for select using (
  exists (select 1 from public.mess_memberships where mess_id = id and user_id = auth.uid())
);

-- Menu: Viewable by members
create policy "Members can view menu" on public.menu_days for select using (
  exists (select 1 from public.mess_memberships where mess_id = mess_id and user_id = auth.uid())
);
-- (Similar policies needed for menu_items, etc.)
