import { cmsMetadata } from '@/lib/cms/server';
import EventsPage from '@/components/events';

export const generateMetadata = cmsMetadata('events', '/events');

export default function Page() {
  return (
    <main>
      <EventsPage />
    </main>
  );
}
