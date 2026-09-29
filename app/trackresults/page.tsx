import { Suspense } from 'react';
import type { Metadata } from 'next';
import TrackingResults from '@/components/tracking/TrackingResults';

export const metadata: Metadata = {
  title: 'Shipment Details | Zajel',
};

export default function TrackResultsPage() {
  // useSearchParams() in the client component requires a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <TrackingResults />
    </Suspense>
  );
}
