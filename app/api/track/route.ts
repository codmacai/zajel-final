import type { NextRequest } from 'next/server';
import { mapRawShipmentToViewModel, normalizeUaePhoneNumber } from '@/lib/tracking/map';
import { TrackingError, trackingServerEnv, yarpGet } from '@/lib/tracking/server';
import type { RawShipmentApiResponse } from '@/components/tracking/types';

// GET /api/track?q=<AWB or mobile>&type=awb|mobile
// Server-side proxy for MobileApp.API GetShipments (keeps the YARP API key off the browser)
// and maps the raw response to the Shipment view model the tracking pages render.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const value = (params.get('q') ?? '').trim();
  const type = params.get('type') === 'mobile' ? 'mobile' : 'awb';

  if (!value || value.length > 64) {
    return Response.json({ message: 'Enter an AWB number or mobile number to track your shipment.' }, { status: 400 });
  }

  const upstream =
    type === 'mobile'
      ? new URLSearchParams({
          OptionCode: 'phone',
          SearchedValue: normalizeUaePhoneNumber(value),
          phoneNumber: normalizeUaePhoneNumber(value),
        })
      : new URLSearchParams({ OptionCode: 'ref', SearchedValue: value });

  try {
    const data = (await yarpGet(`${trackingServerEnv.getShipmentsUrl}?${upstream.toString()}`)) as RawShipmentApiResponse;
    const raw = data?.shipments?.[0];
    if (!raw) {
      return Response.json({ message: 'No shipment found for this AWB or mobile number.' }, { status: 404 });
    }
    return Response.json(mapRawShipmentToViewModel(raw), { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    const status = err instanceof TrackingError ? err.status : 502;
    const message =
      status === 404 ? 'No shipment found for this AWB or mobile number.' : err instanceof Error ? err.message : 'Something went wrong.';
    return Response.json({ message }, { status });
  }
}
