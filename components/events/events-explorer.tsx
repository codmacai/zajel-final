'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { typo } from '@/components/ui copy/typography';
import { lastDay, type ZajelEvent } from './data';
import { dateRange, fmt, todayIso } from './format';

type Tab = 'upcoming' | 'past';

const TABS: { key: Tab; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past Events' },
];

export default function EventsExplorer({ events }: { events: ZajelEvent[] }) {
  const [tab, setTab] = useState<Tab>('upcoming');

  const { upcoming, past } = useMemo(() => {
    const today = todayIso();
    const isPast = (e: ZajelEvent) => lastDay(e) < today;
    const byStart = (a: ZajelEvent, b: ZajelEvent) => a.startDate.localeCompare(b.startDate);
    return {
      upcoming: events.filter((e) => !isPast(e)).sort(byStart),
      past: events.filter(isPast).sort((a, b) => byStart(b, a)),
    };
  }, [events]);

  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <div>
      {/* Tabs */}
      <div role="tablist" aria-label="Events" className="mb-8 flex gap-2 border-b border-[#1b4332]/10 sm:mb-10">
        {TABS.map(({ key, label }) => {
          const active = tab === key;
          const count = key === 'upcoming' ? upcoming.length : past.length;
          return (
            <button
              key={key}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setTab(key)}
              className={`-mb-px flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-medium transition-colors sm:px-2 sm:text-[15px] ${
                active ? 'border-[#36B936] text-[#1b4332]' : 'border-transparent text-[#1b4332]/45 hover:text-[#1b4332]'
              }`}
            >
              {label}
              <span className="rounded-full bg-[#1b4332]/5 px-2 py-0.5 text-[11px] text-[#1b4332]/60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {list.length === 0 ? (
        <p className={`${typo.body} py-12 text-center text-[#2d6a4f]`}>
          {tab === 'upcoming'
            ? 'No upcoming events right now. Check back soon.'
            : 'No past events yet.'}
        </p>
      ) : (
        <ul className="divide-y divide-[#1b4332]/10 border-b border-[#1b4332]/10">
          {list.map((event) => (
            <li
              key={event.slug}
              className="group relative grid grid-cols-[64px_1fr] gap-x-5 gap-y-4 py-7 sm:grid-cols-[88px_1fr_auto] sm:items-center sm:gap-x-8 sm:py-9"
            >
              {/* Date block */}
              <div className="flex flex-col items-center justify-center self-start rounded-2xl border border-[#1b4332]/10 bg-[#F8F9F8] py-3 text-center">
                <span className="text-2xl font-medium leading-none text-[#1b4332] sm:text-[2rem]">
                  {fmt(event.startDate, { day: '2-digit' })}
                </span>
                <span className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-[#36B936]">
                  {fmt(event.startDate, { month: 'short' })}
                </span>
                <span className="text-[11px] text-[#1b4332]/45">{fmt(event.startDate, { year: 'numeric' })}</span>
              </div>

              {/* Details */}
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="rounded-full border border-[#1b4332]/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#1b4332]/70">
                    {event.type}
                  </span>
                  <span className={`${typo.meta} text-[#1b4332]/50`}>{dateRange(event)}</span>
                </div>
                <h3 className="text-lg font-medium leading-snug tracking-tight text-[#1b4332] transition-colors group-hover:text-[#2ea22e] sm:text-xl">
                  {/* The link covers the whole row, so clicking anywhere opens the event. */}
                  <Link
                    href={`/events/${event.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[#1b4332]"
                  >
                    {event.title}
                  </Link>
                </h3>
                <p className={`${typo.body} mt-2 max-w-[62ch] text-[#2d6a4f]`}>{event.summary}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[13px] text-[#1b4332]/60">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#36B936]" />
                  {event.venue}, {event.city}
                </p>
              </div>

              {/* Action (above the row link, so it keeps its own destination) */}
              <div className="relative z-10 col-start-2 flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-start-3 sm:flex-col sm:items-end">
                {tab === 'upcoming' && event.href && (
                  <Link
                    href={event.href}
                    className="inline-flex items-center gap-2 rounded-full border border-[#1b4332]/15 px-5 py-2.5 text-sm font-medium text-[#1b4332] transition-colors hover:border-[#36B936] hover:bg-[#36B936] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4332]"
                  >
                    Register Interest
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
                <Link
                  href={`/events/${event.slug}`}
                  className="text-[13px] font-medium text-[#1b4332]/60 underline-offset-4 transition-colors hover:text-[#1b4332] hover:underline"
                >
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
