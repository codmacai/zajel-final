// All copy for the tracking pages lives here (English only, no i18n / RTL).
// Edit text in this one file instead of hunting through components.

import type { ShipmentQuery } from './types';

export type TrackTabId = 'awb' | 'mobile';

export interface TrackTab {
  id: TrackTabId;
  label: string;
  fieldLabel: string;
  placeholder: string;
}

export const TRACK_CONTENT = {
  title: 'Track Your Shipment',
  subtitle:
    'Enter your AWB number to get instant updates on your package location and delivery status',
  tabs: [
    {
      id: 'awb',
      label: 'AWB Number',
      fieldLabel: 'Enter your AWB number',
      placeholder: 'e.g. ZAJEL123456789',
    },
    {
      id: 'mobile',
      label: 'Mobile Number',
      fieldLabel: 'Enter your UAE mobile number',
      placeholder: 'e.g. 050 123 4567',
    },
  ] as TrackTab[],
  button: 'Track Shipment',
  helperText: 'You can find your AWB number on your shipping receipt or confirmation SMS.',
} as const;

export const RESULTS_CONTENT = {
  detailsTitle: 'Shipment Details',
  timelineTitle: 'Shipment Timeline',
  sender: 'SENDER',
  origin: 'ORIGIN',
  receiver: 'RECEIVER',
  destination: 'DESTINATION',
  serviceType: 'SERVICE TYPE',
  weight: 'WEIGHT',
  weightUnit: 'kg',
  pieces: 'PIECES',
  trackingNumber: 'Tracking Number',
  currentStatus: 'Current Status',
  deliveredOn: 'Delivered On',
  pending: 'Pending',
  viewPod: 'View Proof of Delivery',
  podTitle: 'Proof of Delivery',
  verifyBanner: 'Verify the recipient to see private details',
  verifyPlaceholder: "Last 5 digits of recipient's phone",
  verifyButton: 'Verify',
  verifyPodHint: "Enter the last 5 digits of the recipient's phone number to view proof of delivery.",
  mapAlt: 'Route from origin to destination',
  mapLoading: 'Loading map…',
  mapUnavailable: 'Map unavailable',
  trackAnother: 'Track another shipment',
  needHelp: 'Need help?',
} as const;

// Routes used by the tracking flow.
export const TRACK_ROUTES = {
  search: '/track',
  results: '/trackresults',
} as const;

/** UAE mobile in any common format: 05XXXXXXXX, 5XXXXXXXX, +9715XXXXXXXX, 009715XXXXXXXX. */
const UAE_MOBILE = /^(?:\+?971|00971|0)?5\d{8}$/;

/** Guesses AWB vs mobile when a link only has ?q= (e.g. the homepage hero search box). */
export function detectTrackType(value: string): TrackTabId {
  return UAE_MOBILE.test(value.replace(/[\s-]/g, '')) ? 'mobile' : 'awb';
}

/** /trackresults?q=...&type=awb|mobile — the query lives in the URL so results can be shared. */
export function trackResultsHref(value: string, type?: TrackTabId): string {
  const params = new URLSearchParams({ q: value.trim(), type: type ?? detectTrackType(value) });
  return `${TRACK_ROUTES.results}?${params.toString()}`;
}

/** Reads ?q= and ?type= back into the query the tracking API expects. */
export function parseTrackQuery(params: URLSearchParams | null): ShipmentQuery | null {
  const value = params?.get('q')?.trim();
  if (!value) return null;
  const rawType = params?.get('type');
  const type: TrackTabId = rawType === 'mobile' || rawType === 'awb' ? rawType : detectTrackType(value);
  return { value, optionCode: type === 'mobile' ? 'phone' : 'ref' };
}
