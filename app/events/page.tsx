import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import EventsPage from '@/components/events';

export const generateMetadata = cmsMetadata('events', '/events');

export default async function Page() {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('events');
  return (
    <main>
      <EventsPage />
    </main>
  );
}
