import { cmsMetadata } from '@/lib/cms/server';
import TrackShipment from '@/components/tracking/TrackShipment';

export const generateMetadata = cmsMetadata('track', '/track');

export default function TrackPage() {
  return (
    <main>
      <TrackShipment />
    </main>
  );
}
