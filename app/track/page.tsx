import type { Metadata } from 'next';
import TrackShipment from '@/components/tracking/TrackShipment';

export const metadata: Metadata = {
  title: 'Track Your Shipment | Zajel',
  description: 'Enter your AWB number or mobile number to get instant updates on your shipment.',
};

export default function TrackPage() {
  return <TrackShipment />;
}
