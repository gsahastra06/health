DROP POLICY IF EXISTS "ASHA workers view doctor profiles" ON public.profiles;
CREATE POLICY "ASHA workers view doctor profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles viewer
    WHERE viewer.user_id = auth.uid()
      AND viewer.role = 'asha_worker'
  )
  AND (
    EXISTS (
      SELECT 1 FROM public.user_roles target_role
      WHERE target_role.user_id = profiles.id
        AND target_role.role = 'doctor'
    )
    OR profiles.specialty IS NOT NULL
  )
);

DROP POLICY IF EXISTS "Doctors view ASHA profiles for assigned consultations" ON public.profiles;
CREATE POLICY "Doctors view ASHA profiles for assigned consultations"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles viewer
    WHERE viewer.user_id = auth.uid()
      AND viewer.role = 'doctor'
  )
  AND EXISTS (
    SELECT 1 FROM public.consultations
    WHERE consultations.asha_id = profiles.id
      AND consultations.doctor_id = auth.uid()
  )
);

DROP FUNCTION IF EXISTS public.current_user_role();
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;