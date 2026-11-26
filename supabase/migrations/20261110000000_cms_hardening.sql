-- Restrict public columns and upload types

revoke select on public.cms_content from anon, authenticated;
grant select (key, en, ar, enabled) on public.cms_content to anon, authenticated;

update storage.buckets
set allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif','image/gif']
where id = 'cms-media';
