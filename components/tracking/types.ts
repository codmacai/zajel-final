// View-model types consumed by the tracking pages (TrackShipment / TrackingResults).
// Populated from the *raw* API types below by lib/tracking/map.ts, which runs server-side in
// app/api/track/route.ts — the browser never sees the raw shape (or the YARP API key).

export interface ShipmentParty {
  name: string;
  addressLine: string;
  phone: string;
}

export interface ServiceInfo {
  serviceType: string;
  weightKg: number | null;
  pieces: number;
}

// Real API stage keys are dynamic strings (e.g. "pickup_completed", "accept", "delivered")
// rather than a fixed enum — kept as `string` rather than a union so the UI doesn't break
// when the backend returns a stage it doesn't already know about.
export type ShipmentStatus = string;

export interface LatLng {
  lat: number;
  lng: number;
}

export interface TimelineStep {
  status: ShipmentStatus;
  label: string;
  location: string;
  /** Pre-formatted date/time the API gives per stage (or derived from its events) — '' if not yet reached. */
  dateLabel: string;
  /** True once this stage has been reached. */
  done: boolean;
  /** True for the single stage the shipment is currently sitting at. */
  isActive: boolean;
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
  /** Only populated when the API actually supplies coordinates (rare) — geocode `origin`/`destination` as a fallback. */
  originCoordinates: LatLng | null;
  destinationCoordinates: LatLng | null;
  service: ServiceInfo;
  deliveredAtLabel?: string;
  deliveredOnLabel?: string;
  routeMapImageUrl?: string;
  timeline: TimelineStep[];
  proofOfDelivery?: ProofOfDeliveryInfo;
}

export type TrackingOptionCode = 'ref' | 'phone';

/** What the tracking form on TrackShipment submits — which field the user typed into. */
export interface ShipmentQuery {
  value: string;
  optionCode: TrackingOptionCode;
}

/* ------------------------------------------------------------------------ */
/* Raw shapes returned by the real MobileApp.API GetShipments endpoint      */
/* (ported 1:1 from zajel_site_new_angular's tracking.types.ts).            */
/* ------------------------------------------------------------------------ */

export interface RawDestinationInformation {
  customerName: string;
  customerPhone: string;
  receiverAddress: string;
  country: string;
  area: string;
  city: string;
  zone: string;
  customerAddress: string;
  customerAddress2?: string;
  /** Sic — the API's own field name is misspelled ("desitnation"). Often an empty string. */
  desitnationLat?: string;
  destinationLng?: string;
}

export interface RawOriginInformation {
  senderName: string;
  originCity: string;
  originCountry: string;
  originAddress: string;
  senderPhone: string;
}

export interface RawPiecesDetails {
  pieceCount: number;
  packageDescription: string;
}

export interface RawShipmentEvent {
  id: number;
  awb: string;
  event_name: string;
  event_time: string;
  event_time_epoch: number;
  event_user: string | null;
  location_lat: string | null;
  location_lon: string | null;
  remarks: string | null;
  event_user_type: string;
}

export interface RawShipmentStage {
  friendlyName: string;
  stageName: string;
  stageKey: string;
  isActive: boolean;
}

export interface RawShipment {
  refNumber: string;
  currentStatus: string;
  shipmentDate: string;
  deliveryDate: string | null;
  serviceType: string;
  orderDescription: string;
  destinationInformation: RawDestinationInformation;
  originInformation: RawOriginInformation;
  piecesDetails: RawPiecesDetails;
  shipmentEvents: RawShipmentEvent[];
  shipmentStages: RawShipmentStage[];
}

export interface RawShipmentApiResponse {
  shipmentCount: number;
  pageNumber: number;
  totalPages: number;
  nextPageAvailable: boolean;
  pageShipmentCount: number;
  shipments: RawShipment[];
}
