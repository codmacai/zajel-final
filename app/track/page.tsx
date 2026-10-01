import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import TrackShipment from '@/components/tracking/TrackShipment';

export const metadata: Metadata = pageMetadata({
  title: "Track Your Shipment",
  description:
    "Track your Zajel shipment with your AWB or mobile number and get real-time delivery updates across the UAE and worldwide.",
  path: '/track',
});

export default function TrackPage() {
  return (
    <main>
      <TrackShipment />
    </main>
  );
}
