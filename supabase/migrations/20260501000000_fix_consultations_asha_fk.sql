DO $$
BEGIN
  -- If the existing ASHA foreign key constraint points at auth.users, replace it with a profiles FK.
  IF EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_schema = 'public'
      AND table_name = 'consultations'
      AND constraint_name = 'consultations_asha_id_fkey'
  ) THEN
    ALTER TABLE public.consultations
      DROP CONSTRAINT IF EXISTS consultations_asha_id_fkey;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_schema = 'public'
      AND table_name = 'consultations'
      AND constraint_name = 'consultations_asha_id_fkey'
  ) THEN
    ALTER TABLE public.consultations
      ADD CONSTRAINT consultations_asha_id_fkey
      FOREIGN KEY (asha_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
