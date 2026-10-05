import type { Shipment } from './types';
import { MOCK_SHIPMENT } from './mockData';

const MOCK_DELAY_MS = 400;

/**
 * Looks up a shipment by AWB (tracking) number or phone number.
 *
 * This is the ONLY function that needs to change to go live. Replace the
 * body with something like:
 *
 *   const res = await fetch(
 *     `${API_BASE_URL}/shipments/track?query=${encodeURIComponent(query)}`
 *   );
 *   if (!res.ok) {
 *     if (res.status === 404) throw new Error('No shipment found for that number.');
 *     throw new Error('Something went wrong while tracking your shipment.');
 *   }
 *   return res.json();
 *
 * Every page that uses useShipment() already handles loading and error
 * states, so nothing downstream needs to change when this does.
 */
export async function trackShipment(query: string): Promise<Shipment> {
  if (!query.trim()) {
    throw new Error('Enter an AWB number or mobile number to track your shipment.');
  }

  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  // PLACEHOLDER: always returns the same mock shipment regardless of query.
  return MOCK_SHIPMENT;
}
