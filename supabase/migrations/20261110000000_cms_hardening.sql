-- Zajel CMS, part 2: tighter public access and no SVG uploads.
-- Run once in Supabase → SQL Editor → New query → Run, after the first CMS migration.
-- Safe to run again.

-- 1. The website reads only the content. Who saved a section, and when, stays private.
revoke select on public.cms_content from anon, authenticated;
grant select (key, en, ar, enabled) on public.cms_content to anon, authenticated;

-- 2. Uploads: photos only. SVG files can carry scripts, so they are no longer accepted.
update storage.buckets
set allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif','image/gif']
where id = 'cms-media';
