-- COPY AND PASTE THIS INTO SUPABASE SQL EDITOR TO ENABLE AUTO-PROFILES

-- 1. Create a function that handles new user inserts
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'student') -- Default to student if missing
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Create the trigger on auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Note: This ensures that whenever a user signs up via the Frontend, 
-- a row uses the metadata (Full Name, Role) to populate the public.profiles table.
