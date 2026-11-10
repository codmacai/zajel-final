/**
 * An icon chosen by a list item's id, safe for items added in the CMS. A copied item gets an
 * id like "customs-4", so it keeps the icon of the item it came from; any other new item gets
 * `fallback` (by default the first icon), so the section never breaks.
 */
export function pickIcon<T>(icons: Record<string, T>, id: string | number | undefined, fallback?: T): T {
  const key = String(id ?? '');
  return icons[key] ?? icons[key.replace(/-\d+$/, '')] ?? fallback ?? Object.values(icons)[0];
}
