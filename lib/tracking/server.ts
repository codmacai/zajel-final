import 'server-only';

// Server-only access to the MobileApp.API tracking endpoints behind the YARP gateway.
// The X-AUTH-API-KEY used to live in the React bundle (VITE_YARP_API_KEY) where anyone could
// read it; here it stays on the server and the browser only ever calls /api/track.

const DEFAULT_GET_SHIPMENTS_URL = 'https://api.zajel.com/services/mobileapp/integration/api/GetShipments';
const DEFAULT_SHIPMENT_TRACKING_URL = 'https://api.zajel.com/yarp/cs/api/GetShipmentTracking?awbNumber=';

// Same endpoints/key as the Zajel-2 React app. The VITE_* names are accepted too, so its .env
// can be copied into this project unchanged.
export const trackingServerEnv = {
  getShipmentsUrl:
    process.env.YARP_GET_SHIPMENTS_URL || process.env.VITE_YARP_GET_SHIPMENTS_URL || DEFAULT_GET_SHIPMENTS_URL,
  shipmentTrackingUrl:
    process.env.YARP_SHIPMENT_TRACKING_URL || process.env.VITE_YARP_SHIPMENT_TRACKING_URL || DEFAULT_SHIPMENT_TRACKING_URL,
  apiKey: process.env.YARP_API_KEY || process.env.VITE_YARP_API_KEY || '',
};

export class TrackingError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'TrackingError';
    this.status = status;
  }
}

export async function yarpGet(url: string): Promise<unknown> {
  if (!trackingServerEnv.apiKey) {
    console.error('[tracking] No YARP API key — set YARP_API_KEY (or copy Zajel-2/.env, VITE_YARP_API_KEY) in .env');
    throw new TrackingError(503, 'Tracking is temporarily unavailable. Please try again shortly.');
  }

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json, text/plain, */*', 'X-AUTH-API-KEY': trackingServerEnv.apiKey },
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    console.error(`[tracking] GET ${redact(url)} failed:`, err instanceof Error ? err.message : err);
    throw new TrackingError(502, 'Something went wrong while tracking your shipment.');
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error(`[tracking] GET ${redact(url)} -> ${response.status}: ${body.slice(0, 300)}`);
    if (response.status === 401 || response.status === 403) {
      throw new TrackingError(503, 'Tracking is temporarily unavailable. Please try again shortly.');
    }
    // 400 = the API rejected the number (bad AWB / phone format); 404 = no such shipment.
    if (response.status === 400 || response.status === 404) {
      throw new TrackingError(404, 'No shipment found for this AWB or mobile number.');
    }
    throw new TrackingError(502, 'Something went wrong while tracking your shipment.');
  }
  return response.json();
}

/** Logs the endpoint without phone numbers. */
function redact(url: string): string {
  return url.replace(/(SearchedValue|phoneNumber)=[^&]*/g, '$1=…');
}
