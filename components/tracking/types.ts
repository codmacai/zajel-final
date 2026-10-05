// The shapes below are what a real backend response is expected to look
// like. Keeping this as the single source of truth means the mock data,
// the API call, and every page that renders shipment info all agree on
// the same contract — swap trackingApi.ts for a real fetch later and
// nothing else needs to change.

export interface ShipmentParty {
  name: string;
  addressLine: string;
  phone: string;
}

export interface ServiceInfo {
  serviceType: string;
  weightKg: number;
  pieces: number;
}

export type ShipmentStatus =
  | 'created'
  | 'picked_up'
  | 'at_hub'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered';

export interface TimelineStep {
  status: ShipmentStatus;
  label: string;
  location: string;
  // Real API should return an ISO timestamp (e.g. "2026-01-05T09:00:00Z").
  // Formatting for display happens in the UI, not in the data itself.
  datetime: string;
  note: string;
  done: boolean;
}

export interface ProofOfDeliveryInfo {
  receivedBy: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryNotes: string;
  photoUrl: string;
}

export interface Shipment {
  trackingNumber: string;
  status: ShipmentStatus;
  statusLabel: string;
  sender: ShipmentParty;
  receiver: ShipmentParty;
  origin: string;
  destination: string;
  service: ServiceInfo;
  deliveredAtLabel?: string; // e.g. "Jan 5, 2026 at 02:30 PM"
  deliveredOnLabel?: string; // e.g. "Jan 6, 2026"
  routeMapImageUrl?: string;
  timeline: TimelineStep[];
  proofOfDelivery?: ProofOfDeliveryInfo;
}
