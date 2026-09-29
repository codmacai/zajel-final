import type { Metadata } from 'next';
import SendShipment from '@/components/send-shipment/sendshipment';

export const metadata: Metadata = {
  title: 'Send a Shipment | Zajel',
  description: 'Book a domestic or international shipment with Zajel in a few quick steps.',
};

export default function SendShipmentPage() {
  return <SendShipment />;
}