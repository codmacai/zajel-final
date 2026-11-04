import { Suspense } from 'react';
import { cmsMetadata } from '@/lib/cms/server';
import TrackingResults from '@/components/tracking/TrackingResults';

export const generateMetadata = cmsMetadata('trackresults', '/trackresults', { noIndex: true });

export default function TrackResultsPage() {
  // useSearchParams() in the client component requires a Suspense boundary.
  return (
    <main>
      <h1 className="sr-only">Shipment details</h1>
      <Suspense fallback={null}>
        <TrackingResults />
      </Suspense>
    </main>
  );
}
