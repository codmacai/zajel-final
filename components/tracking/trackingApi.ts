import { apiFetch } from '@/lib/api/client';
import { mapTrackingEventsToTimeline } from '@/lib/tracking/map';
import type { RawTrackingShipmentResponse, Shipment, ShipmentQuery, TimelineStep } from './types';

async function readMessage(response: Response, fallback: string): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message || fallback;
  } catch {
    return fallback;
  }
}

/**
 * Looks up a shipment by AWB or UAE mobile number via this site's own /api/track route,
 * which calls MobileApp.API GetShipments server-side (the YARP API key never reaches the
 * browser) and returns the mapped Shipment view model.
 */
export async function trackShipment(query: ShipmentQuery): Promise<Shipment> {
  const value = query.value.trim();
  if (!value) {
    throw new Error('Enter an AWB number or mobile number to track your shipment.');
  }

  const params = new URLSearchParams({ q: value, type: query.optionCode === 'phone' ? 'mobile' : 'awb' });
  const response = await fetch(`/api/track?${params.toString()}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(await readMessage(response, 'Something went wrong while tracking your shipment.'));
  }
  return (await response.json()) as Shipment;
}

/**
 * Full event timeline for an AWB via Zajel.PrePaid.Api's api/shipments/tracking (a passthrough
 * of the real TrackingShipment endpoint) — replaces the fixed-stage timeline trackShipment()
 * derives from GetShipments. Best-effort: returns null on any failure so the caller can keep
 * showing the GetShipments-derived timeline instead of breaking the whole results page.
 */
export async function fetchTrackingTimeline(referenceNumber: string): Promise<TimelineStep[] | null> {
  const value = (referenceNumber ?? '').trim();
  if (!value) return null;

  try {
    const response = await apiFetch(`/api/shipments/tracking?referenceNumber=${encodeURIComponent(value)}`, {
      cache: 'no-store',
      skipAuthRetry: true,
    });
    if (!response.ok) return null;

    const data = (await response.json()) as RawTrackingShipmentResponse;
    if (!data?.shipmentEvents?.length) return null;

    return mapTrackingEventsToTimeline(data.shipmentEvents);
  } catch {
    return null;
  }
}

/** Proof-of-delivery image URLs for a delivered AWB (via /api/track/pod). */
export async function fetchPodImages(awb: string): Promise<string[]> {
  const normalizedAwb = (awb ?? '').trim();
  if (!normalizedAwb) return [];

  const response = await fetch(`/api/track/pod?awb=${encodeURIComponent(normalizedAwb)}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(await readMessage(response, 'Unable to load proof of delivery.'));
  }
  const data = (await response.json()) as { urls?: string[] };
  return data.urls ?? [];
}
