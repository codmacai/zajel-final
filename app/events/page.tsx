import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import EventsPage from '@/components/events';

export const generateMetadata = cmsMetadata('events', '/events');

export default async function Page() {
  await notFoundIfHidden('events');
  return (
    <main>
      <EventsPage />
    </main>
  );
}
