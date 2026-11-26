import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import TrackShipment from '@/components/tracking/TrackShipment';

export const generateMetadata = cmsMetadata('track', '/track');

export default async function TrackPage() {
  await notFoundIfHidden('track');
  return (
    <main>
      <TrackShipment />
    </main>
  );
}
