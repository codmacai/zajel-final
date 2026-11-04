-- Zajel CMS: content, history and image storage.
-- Run once in Supabase → SQL Editor → New query → Run. Safe to run again.

-- One row per editable section, e.g. 'sea-freight.hero'.
-- en: the section's content. ar: Arabic text for each English field, by field path.
create table if not exists public.cms_content (
  key        text primary key,
  en         jsonb not null default '{}'::jsonb,
  ar         jsonb not null default '{}'::jsonb,
  enabled    boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by text
);

-- Every save, so any earlier version can be restored.
create table if not exists public.cms_history (
  id       bigint generated always as identity primary key,
  key      text not null,
  en       jsonb not null,
  ar       jsonb not null,
  enabled  boolean not null,
  saved_at timestamptz not null default now(),
  saved_by text
);
create index if not exists cms_history_key_saved_at on public.cms_history (key, saved_at desc);

-- Keep updated_at current and copy each saved version into the history.
create or replace function public.cms_on_save() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  insert into public.cms_history (key, en, ar, enabled, saved_by)
  values (new.key, new.en, new.ar, new.enabled, new.updated_by);
  return new;
end $$;

drop trigger if exists cms_content_on_save on public.cms_content;
create trigger cms_content_on_save
  before insert or update on public.cms_content
  for each row execute function public.cms_on_save();

-- Access: the website may read content; only the server (secret key) may write.
alter table public.cms_content enable row level security;
alter table public.cms_history enable row level security;

drop policy if exists "Anyone can read site content" on public.cms_content;
create policy "Anyone can read site content" on public.cms_content
  for select to anon, authenticated using (true);

grant select on public.cms_content to anon, authenticated;
grant all on public.cms_content, public.cms_history to service_role;
revoke all on public.cms_history from anon, authenticated;

-- Public image folder for uploads. Uploads go through the server only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 10485760,
        array['image/jpeg','image/png','image/webp','image/avif','image/gif','image/svg+xml'])
on conflict (id) do update set public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
