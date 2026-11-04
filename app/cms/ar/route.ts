// Arabic for text edited in the CMS, as { "English text": "Arabic text" }.
// The site translator (lib/i18n/translator.ts) adds these to locales/ar.json, so text an
// editor changes stays in Arabic for Arabic visitors.

import { getAt, normText } from '@/lib/cms/content';
import { readAllRows } from '@/lib/cms/store';

export async function GET() {
  const dict: Record<string, string> = {};
  for (const row of await readAllRows()) {
    for (const [path, ar] of Object.entries(row.ar ?? {})) {
      const en = getAt(row.en, path);
      if (typeof en === 'string' && typeof ar === 'string' && normText(en) && ar.trim()) {
        dict[normText(en)] = normText(ar);
      }
    }
  }
  return Response.json(dict, {
    headers: { 'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=600' },
  });
}
