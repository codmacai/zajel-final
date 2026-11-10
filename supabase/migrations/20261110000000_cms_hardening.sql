-- Zajel CMS, part 2: tighter public access, no SVG uploads, and the contact-form inbox.
-- Run once in Supabase → SQL Editor → New query → Run, after the first CMS migration.
-- Safe to run again.

-- 1. The website reads only the content. Who saved a section, and when, stays private.
revoke select on public.cms_content from anon, authenticated;
grant select (key, en, ar, enabled) on public.cms_content to anon, authenticated;

-- 2. Uploads: photos only. SVG files can carry scripts, so they are no longer accepted.
update storage.buckets
set allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif','image/gif']
where id = 'cms-media';

-- 3. Messages sent from the website's contact form, read in the CMS under Messages.
--    Only the server (secret key) can read or add messages; the public key has no access,
--    so the form can't be used to read or flood the table directly.
create table if not exists public.cms_messages (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  form       text not null default 'contact',
  name       text not null,
  email      text not null,
  phone      text,
  subject    text,
  message    text not null,
  page       text,
  status     text not null default 'new' check (status in ('new', 'read', 'done')),
  handled_by text,
  handled_at timestamptz
);
create index if not exists cms_messages_created_at on public.cms_messages (created_at desc);
create index if not exists cms_messages_status on public.cms_messages (status);

alter table public.cms_messages enable row level security;
revoke all on public.cms_messages from anon, authenticated;
grant all on public.cms_messages to service_role;
