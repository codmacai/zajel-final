import type { ZajelEvent } from './data';

// Parsed as UTC so the day never shifts with the visitor's time zone.
const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  toDate(iso).toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });

/** "17 November – 19 November 2026", or "3 December 2026" for one-day events. */
export function dateRange({ startDate, endDate }: ZajelEvent) {
  const full = { day: 'numeric', month: 'long', year: 'numeric' } as const;
  if (!endDate) return fmt(startDate, full);
  return `${fmt(startDate, { day: 'numeric', month: 'long' })} – ${fmt(endDate, full)}`;
}

/** Today as YYYY-MM-DD (UTC), comparable with the ISO dates in ./data. */
export const todayIso = () => new Date().toISOString().slice(0, 10);
