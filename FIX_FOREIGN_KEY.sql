-- RUN THIS IN SUPABASE SQL EDITOR TO FIX THE FOREIGN KEY ISSUE

-- 1. Insert a default mess (if not exists)
INSERT INTO public.mess (id, name, hostel)
VALUES ('11111111-1111-1111-1111-111111111111', 'Default Mess', 'Main Hostel')
ON CONFLICT (id) DO NOTHING;

-- 2. Update the unique constraint to not require mess_id
-- First drop the old constraint
ALTER TABLE public.meal_scans DROP CONSTRAINT IF EXISTS meal_scans_mess_id_user_id_scan_date_meal_key;

-- 3. Add new unique constraint without mess_id
ALTER TABLE public.meal_scans ADD CONSTRAINT meal_scans_user_id_scan_date_meal_key UNIQUE (user_id, scan_date, meal);

-- 4. Make mess_id have a default value
ALTER TABLE public.meal_scans ALTER COLUMN mess_id SET DEFAULT '11111111-1111-1111-1111-111111111111';

-- 5. Add permissive policy for meal_scans inserts
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.meal_scans;
CREATE POLICY "Enable insert for authenticated users" ON public.meal_scans 
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 6. Add permissive policy for meal_scans selects  
DROP POLICY IF EXISTS "Enable read for all users" ON public.meal_scans;
CREATE POLICY "Enable read for all users" ON public.meal_scans 
FOR SELECT USING (true);
