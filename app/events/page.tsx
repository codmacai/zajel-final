import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import EventsPage from '@/components/events';

export const metadata: Metadata = pageMetadata({
  title: 'Logistics Events UAE | Exhibitions, Conferences & Webinars',
  description:
    'Meet Zajel at logistics exhibitions, conferences, webinars and workshops across the UAE. See upcoming events and where our team has been.',
  path: '/events',
});

export default function Page() {
  return (
    <main>
      <EventsPage />
    </main>
  );
}
