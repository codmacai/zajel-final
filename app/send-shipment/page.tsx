import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import SendShipment from '@/components/send-shipment/sendshipment';

export const metadata: Metadata = pageMetadata({
  title: "Send a Shipment",
  description:
    "Book a domestic or international courier pickup in about two minutes. Doorstep collection across the UAE and delivery to 195 countries.",
  path: '/send-shipment',
});

export default function SendShipmentPage() {
  return (
    <main>
      <SendShipment />
    </main>
  );
}