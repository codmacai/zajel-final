import { cmsMetadata } from '@/lib/cms/server';
import SendShipment from '@/components/send-shipment/sendshipment';

export const generateMetadata = cmsMetadata('send-shipment', '/send-shipment');

export default function SendShipmentPage() {
  return (
    <main>
      <SendShipment />
    </main>
  );
}