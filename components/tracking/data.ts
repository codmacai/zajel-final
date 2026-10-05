// All copy for the tracking pages lives here (English only, no i18n / RTL).
// Edit text in this one file instead of hunting through components.

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
    'Enter your AWB number or mobile number to get instant updates on your package location and delivery status',
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
      fieldLabel: 'Enter your mobile number',
      placeholder: 'e.g. +971 50 123 4567',
    },
  ] as TrackTab[],
  button: 'Track Shipment',
  helperText: 'You can find your AWB number on your shipping receipt or confirmation email.',
} as const;

export const RESULTS_CONTENT = {
  detailsTitle: 'Shipment Details',
  sender: 'SENDER',
  origin: 'ORIGIN',
  receiver: 'RECEIVER',
  destination: 'DESTINATION',
  serviceType: 'SERVICE TYPE',
  weight: 'WEIGHT',
  weightUnit: 'kg',
  pieces: 'PIECES',
  trackingNumber: 'Tracking Number',
  deliveredMessage: 'Successfully Delivered',
  statusBadge: 'Status',
  deliveredOn: 'Delivered On',
} as const;

// Routes used by the tracking flow.
export const TRACK_ROUTES = {
  search: '/track',
  results: '/trackresults',
  timeline: '/shipment-timeline',
} as const;
