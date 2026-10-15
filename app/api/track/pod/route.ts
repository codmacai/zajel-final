import type { NextRequest } from 'next/server';
import { extractPodImageUrls } from '@/lib/tracking/map';
import { TrackingError, trackingServerEnv, yarpGet } from '@/lib/tracking/server';

// GET /api/track/pod?awb=<AWB>
// Server-side proxy for GetShipmentTracking — returns the proof-of-delivery image URLs.
export async function GET(request: NextRequest) {
  const awb = (request.nextUrl.searchParams.get('awb') ?? '').trim();
  if (!awb || awb.length > 64) {
    return Response.json({ message: 'Missing AWB number.' }, { status: 400 });
  }

  try {
    const data = await yarpGet(`${trackingServerEnv.shipmentTrackingUrl}${encodeURIComponent(awb)}`);
    return Response.json({ urls: extractPodImageUrls(data) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    const status = err instanceof TrackingError ? err.status : 502;
    return Response.json({ message: 'Unable to load proof of delivery.' }, { status });
  }
}
