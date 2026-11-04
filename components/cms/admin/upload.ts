'use client';

import { prepareUploadAction } from '@/app/admin/actions';

/** Uploads an image straight to Supabase Storage and returns its public address. */
export async function uploadImage(sectionKey: string, file: File): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const prep = await prepareUploadAction(sectionKey, file.name, file.type, file.size);
  if (!prep.ok) return prep;
  try {
    const res = await fetch(prep.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type, 'cache-control': 'max-age=31536000' },
      body: file,
    });
    if (!res.ok) return { ok: false, error: `The upload failed (${res.status}). Try again.` };
    return { ok: true, url: prep.publicUrl };
  } catch {
    return { ok: false, error: 'The upload failed. Check your connection and try again.' };
  }
}
