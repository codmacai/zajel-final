'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { typo } from '@/components/ui copy/typography';
import { lastDay, type ZajelEvent } from './data';
import { dateRange, fmt, todayIso } from './format';

type Tab = 'upcoming' | 'past';

const TABS: { key: Tab; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past Events' },
];

/** Square date tile laid over a card image. */
function DateTile({ iso }: { iso: string }) {
  return (
    <span className="flex h-[60px] w-[56px] flex-col items-center justify-center rounded-xl bg-white/95 text-center shadow-sm backdrop-blur">
      <span className="text-xl font-medium leading-none text-[#1b4332]">{fmt(iso, { day: '2-digit' })}</span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#36B936]">
        {fmt(iso, { month: 'short' })}
      </span>
    </span>
  );
}

function TypeBadge({ type, light = false }: { type: string; light?: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wider ${
        light ? 'bg-white/95 text-[#1b4332] backdrop-blur' : 'border border-[#1b4332]/10 text-[#1b4332]/70'
      }`}
    >
      {type}
    </span>
  );
}

/** Next upcoming event: wide card with a large image. */
function FeaturedEvent({ event }: { event: ZajelEvent }) {
  return (
    <article className="group relative grid overflow-hidden rounded-[1.75rem] border border-[#1b4332]/10 bg-[#F8F9F8] transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(27,67,50,0.35)] lg:grid-cols-[1.15fr_1fr]">
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
        <Image
          src={event.cover.src}
          alt={event.cover.alt}
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
          <DateTile iso={event.startDate} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1b4332] px-3 py-1 text-[10.5px] font-medium uppercase tracking-wider text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36B936]" />
            Next Event
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <TypeBadge type={event.type} />
            <span className={`${typo.meta} text-[#1b4332]/50`}>{dateRange(event)}</span>
          </div>
          <h3 className="text-2xl font-medium leading-[1.15] tracking-tight text-[#1b4332] sm:text-[2rem]">
            {/* The link covers the whole card, so clicking anywhere opens the event. */}
            <Link
              href={`/events/${event.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[1.75rem] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[#1b4332]"
            >
              {event.title}
            </Link>
          </h3>
          <p className={`${typo.lead} mt-4 max-w-[46ch] text-[#2d6a4f]`}>{event.summary}</p>
          <p className="mt-5 flex items-center gap-2 text-[13px] text-[#1b4332]/60">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-[#36B936]" />
            {event.venue}, {event.city}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#1b4332]/10 pt-6">
          {event.href && (
            <Link
              href={event.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2ea22e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4332]"
            >
              Register Interest
              <span aria-hidden="true" className="rtl:rotate-180">→</span>
            </Link>
          )}
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1b4332] underline-offset-4 hover:underline"
          >
            View Details
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Standard event card: image on top, details below. */
function EventCard({ event, past }: { event: ZajelEvent; past: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#1b4332]/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(27,67,50,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1b4332]/5">
        <Image
          src={event.cover.src}
          alt={event.cover.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.05] ${
            past ? 'grayscale-[35%] group-hover:grayscale-0' : ''
          }`}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5">
          <DateTile iso={event.startDate} />
          <TypeBadge type={event.type} light />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className={`${typo.meta} mb-2 text-[#1b4332]/50`}>{dateRange(event)}</span>
        <h3 className="text-lg font-medium leading-snug tracking-tight text-[#1b4332] transition-colors group-hover:text-[#2ea22e]">
          <Link
            href={`/events/${event.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[1.5rem] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[#1b4332]"
          >
            {event.title}
          </Link>
        </h3>
        <p className={`${typo.body} mb-5 mt-2 line-clamp-3 text-[#2d6a4f]`}>{event.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#1b4332]/10 pt-4">
          <span className="flex min-w-0 items-center gap-1.5 text-[12.5px] text-[#1b4332]/60">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#36B936]" />
            <span className="truncate">{event.city}</span>
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1b4332]/10 text-[#1b4332] transition-colors group-hover:border-[#36B936] group-hover:bg-[#36B936] group-hover:text-white">
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
          </span>
        </div>
      </div>
    </article>
  );
}

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
  // Upcoming leads with the next event as a wide card; past events are all regular cards.
  const featured = tab === 'upcoming' ? list[0] : undefined;
  const rest = featured ? list.slice(1) : list;

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 sm:mb-10">
        <div role="tablist" aria-label="Events" className="inline-flex rounded-full border border-[#1b4332]/10 bg-[#F8F9F8] p-1">
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
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-5 ${
                  active ? 'bg-white text-[#1b4332] shadow-sm' : 'text-[#1b4332]/50 hover:text-[#1b4332]'
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10.5px] ${
                    active ? 'bg-[#36B936]/15 text-[#2ea22e]' : 'bg-[#1b4332]/5 text-[#1b4332]/50'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p className="flex items-center gap-2 text-[13px] text-[#1b4332]/50">
          <CalendarDays aria-hidden="true" className="h-4 w-4 text-[#36B936]" />
          {tab === 'upcoming' ? 'Sorted by date' : 'Most recent first'}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-[#1b4332]/15 bg-[#F8F9F8] px-6 py-16 text-center">
          <p className={`${typo.body} text-[#2d6a4f]`}>
            {tab === 'upcoming' ? 'No upcoming events right now. Check back soon.' : 'No past events yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6">
          {featured && <FeaturedEvent event={featured} />}
          {rest.length > 0 && (
            <ul className={`grid gap-5 sm:grid-cols-2 sm:gap-6 ${rest.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
              {rest.map((event) => (
                <li key={event.slug}>
                  <EventCard event={event} past={tab === 'past'} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
