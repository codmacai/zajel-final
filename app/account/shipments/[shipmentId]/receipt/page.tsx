import { Suspense } from 'react';
import type { Metadata } from 'next';
import RequireAuth from '@/components/auth/RequireAuth';
import ShipmentReceiptView from '@/components/account/ShipmentReceiptView';

export const metadata: Metadata = {
  title: 'Shipment receipt',
  robots: { index: false, follow: false },
};

// Standalone printable receipt (no navbar/footer — see components/layout/SiteChrome.tsx).
// Opened in a new tab from My Shipments and from the booking success screen.
export default async function ShipmentReceiptPage({ params }: PageProps<'/account/shipments/[shipmentId]/receipt'>) {
  const { shipmentId } = await params;
  const id = /^\d+$/.test(shipmentId) ? Number(shipmentId) : null;
  return (
    <Suspense fallback={null}>
      <RequireAuth>
        <ShipmentReceiptView shipmentId={id} />
      </RequireAuth>
    </Suspense>
  );
}
