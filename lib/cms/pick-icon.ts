export function pickIcon<T>(icons: Record<string, T>, id: string | number | undefined, fallback?: T): T {
  const key = String(id ?? '');
  return icons[key] ?? icons[key.replace(/-\d+$/, '')] ?? fallback ?? Object.values(icons)[0];
}
