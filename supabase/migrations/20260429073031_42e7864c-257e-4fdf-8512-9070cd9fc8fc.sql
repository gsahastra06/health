DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_schema = 'public' AND table_name = 'consultations' AND constraint_name = 'consultations_patient_id_fkey'
  ) THEN
    ALTER TABLE public.consultations
      ADD CONSTRAINT consultations_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_schema = 'public' AND table_name = 'consultations' AND constraint_name = 'consultations_asha_id_fkey'
  ) THEN
    ALTER TABLE public.consultations
      ADD CONSTRAINT consultations_asha_id_fkey FOREIGN KEY (asha_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_schema = 'public' AND table_name = 'consultations' AND constraint_name = 'consultations_doctor_id_fkey'
  ) THEN
    ALTER TABLE public.consultations
      ADD CONSTRAINT consultations_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
  END IF;
END $$;

DROP POLICY IF EXISTS "Doctors view assigned patients" ON public.patients;
CREATE POLICY "Doctors view assigned patients"
ON public.patients
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.consultations
    WHERE consultations.patient_id = patients.id
      AND consultations.doctor_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Doctors view ASHA profiles for assigned consultations" ON public.profiles;
CREATE POLICY "Doctors view ASHA profiles for assigned consultations"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'doctor')
  AND EXISTS (
    SELECT 1 FROM public.consultations
    WHERE consultations.asha_id = profiles.id
      AND consultations.doctor_id = auth.uid()
  )
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'consultations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.consultations;
  END IF;
END $$;