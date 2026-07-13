-- ASHA Worker profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  asha_id text,
  region text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users view own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, asha_id, region)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'ASHA Worker'),
    new.raw_user_meta_data->>'asha_id',
    new.raw_user_meta_data->>'region'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Patients
create table public.patients (
  id uuid primary key default gen_random_uuid(),
  asha_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  age int not null check (age >= 0 and age <= 130),
  gender text not null check (gender in ('male','female','other')),
  village text,
  phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index patients_asha_id_idx on public.patients(asha_id);
alter table public.patients enable row level security;

create policy "ASHA view own patients" on public.patients for select to authenticated using (auth.uid() = asha_id);
create policy "ASHA create own patients" on public.patients for insert to authenticated with check (auth.uid() = asha_id);
create policy "ASHA update own patients" on public.patients for update to authenticated using (auth.uid() = asha_id);
create policy "ASHA delete own patients" on public.patients for delete to authenticated using (auth.uid() = asha_id);

-- Consultations
create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  asha_id uuid not null references auth.users(id) on delete cascade,
  symptoms jsonb not null default '[]'::jsonb,
  diagnoses jsonb not null default '[]'::jsonb,
  urgency text not null default 'self_care' check (urgency in ('self_care','see_doctor','urgent_referral')),
  notes text,
  escalated boolean not null default false,
  created_at timestamptz not null default now()
);

create index consultations_patient_idx on public.consultations(patient_id);
create index consultations_asha_idx on public.consultations(asha_id);

alter table public.consultations enable row level security;

create policy "ASHA view own consultations" on public.consultations for select to authenticated using (auth.uid() = asha_id);
create policy "ASHA create own consultations" on public.consultations for insert to authenticated with check (auth.uid() = asha_id);
create policy "ASHA update own consultations" on public.consultations for update to authenticated using (auth.uid() = asha_id);
create policy "ASHA delete own consultations" on public.consultations for delete to authenticated using (auth.uid() = asha_id);

-- Updated_at triggers
create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger update_patients_updated_at before update on public.patients
  for each row execute function public.update_updated_at_column();