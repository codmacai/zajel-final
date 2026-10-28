'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { lastDay, type ZajelEvent } from './data';
import { todayIso } from './format';

const noop = () => () => {};

/**
 * Register button, or "This event has ended". Decided in the browser so a page built
 * before the event still shows the right state afterwards.
 */
export default function EventCta({ event }: { event: ZajelEvent }) {
  // Server render (and the first client render) assume upcoming; corrected right after.
  const ended = useSyncExternalStore(noop, () => lastDay(event) < todayIso(), () => false);

  if (ended) {
    return (
      <p className="rounded-full border border-[#1b4332]/10 bg-white px-5 py-3 text-center text-sm font-medium text-[#1b4332]/60">
        This event has ended
      </p>
    );
  }
  if (!event.href) return null;
  return (
    <Link
      href={event.href}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2ea22e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4332]"
    >
      Register Interest
      <span aria-hidden="true" className="rtl:rotate-180">→</span>
    </Link>
  );
}
