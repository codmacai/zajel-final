import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Check, Clock, MapPin } from 'lucide-react';
import { typo } from '@/components/ui copy/typography';
import ContactBand from '../dynamic-contact';
import type { EVENTS_PAGE, ZajelEvent } from './data';
import EventCta from './event-cta';
import EventGallery from './event-gallery';
import { dateRange } from './format';

/** Detail page for one event. Server component; only the gallery and CTA ship client JS. */
export default function EventDetail({ event, page }: { event: ZajelEvent; page: typeof EVENTS_PAGE }) {
  const labels = page.labels;
  const facts = [
    { icon: CalendarDays, label: labels.date, value: dateRange(event) },
    ...(event.time ? [{ icon: Clock, label: labels.time, value: event.time }] : []),
    { icon: MapPin, label: labels.location, value: `${event.venue}, ${event.city}` },
  ];

  return (
    <div className="w-full bg-white font-sans text-[#1b4332]">
      {/* Header */}
      <section className="relative w-full overflow-hidden bg-white pb-8 pt-20 sm:pb-12 sm:pt-24 lg:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[10%] h-[70%] w-[50%] rounded-full bg-[#36B936]/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8">
          <Link
            href="/events"
            className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-[#1b4332]/60 transition-colors hover:text-[#1b4332] sm:mb-10"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            {labels.allEvents}
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="rounded-full border border-[#1b4332]/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#1b4332]/70">
              {event.type}
            </span>
            <span className={`${typo.meta} text-[#1b4332]/50`}>{dateRange(event)}</span>
          </div>

          <h1 className={`${typo.h1Long} max-w-[22ch] text-[#1b4332]`}>{event.title}</h1>
          <p className={`${typo.lead} mt-4 max-w-[60ch] text-[#2d6a4f] sm:mt-5`}>{event.summary}</p>
        </div>
      </section>

      {/* Cover image */}
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] bg-[#1b4332]/5 sm:aspect-[21/9] sm:rounded-[2rem]">
          <Image
            src={event.cover.src}
            alt={event.cover.alt}
            fill
            priority
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Body + sidebar */}
      <section className="w-full py-10 sm:py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="min-w-0">
            <h2 className={`${typo.subheading} mb-4 text-[#1b4332]`}>{labels.about}</h2>
            <div className="space-y-4">
              {event.description.map((p) => (
                <p key={p.slice(0, 40)} className={`${typo.lead} text-[#2d6a4f]`}>
                  {p}
                </p>
              ))}
            </div>

            {event.highlights && event.highlights.length > 0 && (
              <div className="mt-10">
                <h2 className={`${typo.subheading} mb-4 text-[#1b4332]`}>{labels.highlights}</h2>
                <ul className="space-y-3">
                  {event.highlights.map((h) => (
                    <li key={h} className={`${typo.lead} flex items-start gap-3 text-[#2d6a4f]`}>
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#36B936]/15">
                        <Check aria-hidden="true" className="h-3 w-3 text-[#2ea22e]" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.gallery && event.gallery.length > 0 && (
              <div className="mt-12">
                <h2 className={`${typo.subheading} mb-5 text-[#1b4332]`}>{labels.gallery}</h2>
                <EventGallery images={event.gallery} />
              </div>
            )}
          </div>

          {/* Sidebar: first on phones, sticks beside the text on desktop */}
          <aside className="order-first lg:order-none lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.5rem] border border-[#1b4332]/10 bg-[#F8F9F8] p-6 sm:p-7">
              <h2 className={`${typo.cardTitle} mb-5 text-[#1b4332]`}>{labels.eventDetails}</h2>
              <dl className="space-y-4">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#36B936]" />
                    <div>
                      <dt className="text-[11px] font-medium uppercase tracking-wider text-[#1b4332]/50">{label}</dt>
                      <dd className="mt-0.5 text-sm text-[#1b4332]">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-[#1b4332]/10 pt-6">
                <EventCta event={event} labels={labels} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ContactBand {...page.contact} />
    </div>
  );
}
