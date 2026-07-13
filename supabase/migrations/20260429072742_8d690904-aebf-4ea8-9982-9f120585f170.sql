DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('doctor', 'asha_worker');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  role public.app_role NOT NULL DEFAULT 'asha_worker',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = auth.uid()
  LIMIT 1
$$;

DROP POLICY IF EXISTS "Users view own role" ON public.user_roles;
CREATE POLICY "Users view own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users create own role" ON public.user_roles;
CREATE POLICY "Users create own role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS specialty TEXT,
  ADD COLUMN IF NOT EXISTS languages TEXT,
  ADD COLUMN IF NOT EXISTS is_available BOOLEAN NOT NULL DEFAULT true;

DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "ASHA workers view doctor profiles" ON public.profiles;
CREATE POLICY "ASHA workers view doctor profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'asha_worker')
  AND public.has_role(id, 'doctor')
);

ALTER TABLE public.consultations
  ADD COLUMN IF NOT EXISTS doctor_id UUID,
  ADD COLUMN IF NOT EXISTS channel TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'triage_saved';

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id_role ON public.user_roles(user_id, role);
CREATE INDEX IF NOT EXISTS idx_consultations_doctor_status ON public.consultations(doctor_id, status);

DROP POLICY IF EXISTS "Doctors view assigned consultations" ON public.consultations;
CREATE POLICY "Doctors view assigned consultations"
ON public.consultations
FOR SELECT
TO authenticated
USING (auth.uid() = doctor_id);

DROP POLICY IF EXISTS "Doctors update assigned consultations" ON public.consultations;
CREATE POLICY "Doctors update assigned consultations"
ON public.consultations
FOR UPDATE
TO authenticated
USING (auth.uid() = doctor_id)
WITH CHECK (auth.uid() = doctor_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  requested_role public.app_role;
BEGIN
  requested_role := COALESCE((new.raw_user_meta_data->>'role')::public.app_role, 'asha_worker'::public.app_role);

  INSERT INTO public.profiles (id, full_name, asha_id, region, specialty, languages, is_available)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', CASE WHEN requested_role = 'doctor' THEN 'Doctor' ELSE 'ASHA Worker' END),
    new.raw_user_meta_data->>'asha_id',
    new.raw_user_meta_data->>'region',
    new.raw_user_meta_data->>'specialty',
    new.raw_user_meta_data->>'languages',
    true
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    asha_id = EXCLUDED.asha_id,
    region = EXCLUDED.region,
    specialty = EXCLUDED.specialty,
    languages = EXCLUDED.languages,
    is_available = EXCLUDED.is_available;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, requested_role)
  ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;

  RETURN new;
END;
$function$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();