import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import SendShipment from '@/components/send-shipment/sendshipment';

export const generateMetadata = cmsMetadata('send-shipment', '/send-shipment');

export default async function SendShipmentPage() {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('send-shipment');
  return (
    <main>
      <SendShipment />
    </main>
  );
}