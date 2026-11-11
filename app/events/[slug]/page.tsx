import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata, SITE } from '@/lib/seo';
import EventDetail from '@/components/events/event-detail';
import { findEvent, getEvents } from '@/components/events/cms';
import { EVENTS_PAGE } from '@/components/events/data';
import { getSection } from '@/lib/cms/server';

// Every event page is built ahead of time; events added later in the CMS are built on first visit.
export async function generateStaticParams() {
  return (await getEvents()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = await findEvent((await params).slug);
  if (!event) return {};
  return pageMetadata({ title: event.title, description: event.summary, path: `/events/${event.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const event = await findEvent((await params).slug);
  if (!event) notFound();

  // Event structured data (lets Google show the date and venue in results)
  const online = event.city === 'Online';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.summary,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventAttendanceMode: `https://schema.org/${online ? 'Online' : 'Offline'}EventAttendanceMode`,
    location: online
      ? { '@type': 'VirtualLocation', url: `${SITE.url}/events/${event.slug}` }
      : { '@type': 'Place', name: event.venue, address: { '@type': 'PostalAddress', addressLocality: event.city, addressCountry: 'AE' } },
    image: [event.cover, ...(event.gallery ?? [])].map((i) => (/^https?:/.test(i.src) ? i.src : `${SITE.url}${i.src}`)),
    organizer: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        // `<` escaped so text can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <EventDetail event={event} page={(await getSection('events.page', EVENTS_PAGE)) ?? EVENTS_PAGE} />
    </main>
  );
}
