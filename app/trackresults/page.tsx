import { Suspense } from 'react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import TrackingResults from '@/components/tracking/TrackingResults';

export const metadata: Metadata = pageMetadata({
  title: "Shipment Details",
  description:
    "Live status, route and delivery details for your Zajel shipment.",
  path: '/trackresults',
  noIndex: true,
});

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
