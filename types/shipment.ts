// Shipment types for Zajel.PrePaid.Api (validate / create / confirm / my shipments).
// Ported from the Zajel-2 React app, which mirrored zajel_site_new_angular's shipment.types.ts.

/**
 * A geocoded place picked via Google Places Autocomplete. `lat`/`lng` and `city`/`country`
 * are derived from the place's address components — the user never types them by hand, so
 * they can't drift from what the map actually resolved (which is what the validate/create
 * APIs key their pricing + serviceability off of).
 */
export interface GeoAddress {
  formattedAddress: string;
  city: string;
  country: string;
  area: string;
  latitude: number;
  longitude: number;
}

export const EMPTY_GEO_ADDRESS: GeoAddress = { formattedAddress: '', city: '', country: '', area: '', latitude: 0, longitude: 0 };

export interface ShipperDetails {
  fullName: string;
  email: string;
  phone: string;
  /** Populated by AddressAutocompleteInput — the free-text field is Places-backed, not hand-typed. */
  place: GeoAddress;
  building: string;
  apartment?: string;
}

export interface ReceiverDetails {
  fullName: string;
  email?: string;
  phone: string;
  place: GeoAddress;
  building: string;
  apartment?: string;
}

export const EMPTY_SHIPPER_DETAILS: ShipperDetails = { fullName: '', email: '', phone: '', place: EMPTY_GEO_ADDRESS, building: '', apartment: '' };
export const EMPTY_RECEIVER_DETAILS: ReceiverDetails = { fullName: '', email: '', phone: '', place: EMPTY_GEO_ADDRESS, building: '', apartment: '' };

export type WeightUnit = 'kg' | 'lb';
export type ParcelKind = 'document' | 'parcel' | '';
/** Matches the real API's `ParcelType` enum (ported from zajel_site_new_angular). */
export type ParcelVehicleType = 'bike' | 'car' | 'truck';

export interface ParcelDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg: number;
}

export interface ParcelDetails {
  content: string;
  weightValue: number;
  weightUnit: WeightUnit;
  numberOfPieces: number;
  parcelType: ParcelKind;
  dimensions: ParcelDimensions;
  vehicleType: ParcelVehicleType;
  declaredValue?: number;
  codAmount?: number;
}

export interface CreateShipmentPayload {
  shipmentScope: 'domestic' | 'international' | '';
  shipper: ShipperDetails;
  receiver: ReceiverDetails;
  parcel: ParcelDetails;
  /** The ServiceOption.serviceTypeId the user picked on the service-selection step. */
  serviceTypeId: string;
  /** The SAME ServiceOption's vatAmount, as quoted by /api/shipments/validate — CreateShipmentV2
   * rejects a mismatched/hardcoded vat_amount, so this must be the real quoted value. */
  vatAmount: number;
  /** The SAME ServiceOption's pre-VAT price — forwarded as cod_amount to CreateShipmentV2 (a
   * confirmed upstream naming quirk, not a true cash-on-delivery value here). Never invented. */
  amount: number;
  /** The exact slot the user picked from the selected ServiceOption's workingDays — never
   * invented client-side. */
  pickupDate?: string;
  pickupTime?: string;
  deliveryTime?: string;
}

export interface CreateShipmentResult {
  shipmentId: number;
  tempAwb: string;
  shipmentStatus: string;
  paymentStatus: string;
  amount: number;
  vat: number;
  currency: string;
}

// ─────────────────────────────────────────────
// Address validation + service selection
// (backs POST /api/shipments/validate, which the backend must proxy to
// ShipmentValidation/validate — see hooks/useValidateShipment.ts)
// ─────────────────────────────────────────────

// The backend proxies ShipmentValidation/validate as a PURE PASSTHROUGH (see
// ShipmentService.ValidateShipmentAsync) — these types mirror Zajel.ZAPP.API's own
// ShipmentValidationResponse/ServiceOption/WorkingDayWithTime/TimeSlot classes field-for-field
// (confirmed against that project's source, not guessed). If the real API's shape changes,
// update these types directly — there's no backend DTO layer in between to also update.

/** One pickup/delivery time slot on a given working date, as actually offered by the API. */
export interface TimeSlot {
  pickupTime?: string;
  deliveryTime?: string;
}

/** One working day's pickup window + the time slots available within it. */
export interface WorkingDay {
  workingDate?: string;
  pickupBeforeTime?: string;
  pickupTimeMin?: string;
  pickupTimeMax?: string;
  deliveryBeforeTime?: string;
  timeBetweenList: TimeSlot[];
}

/** One deliverable service option the validate call says this From/To pair supports. */
export interface ServiceOption {
  serviceId: number;
  serviceCode: string; // e.g. "NEXT_DAY" | "SAME_DAY" — used as CreateShipment's serviceTypeId
  serviceType?: string;
  name: string;
  description?: string;
  details?: string;
  price: number;
  /** Must be passed through verbatim as CreateShipmentPayload.vatAmount when this option is
   * selected — never hardcode or recompute this. */
  vatAmount: number;
  vatPercentage?: string;
  grossAmount: number;
  isAvailable: boolean;
  cutoffTime?: string;
  pickupCutoffTime?: string;
  pickupBeforeTime?: string;
  deliveryBeforeTime?: string;
  maxDeliveryTime?: number;
  /** Real pickup/delivery time slots for this service — these are time-based services, so the
   * user must pick one of these (when present) before booking. */
  workingDaysListWithTime: WorkingDay[];
}

export interface ValidateShipmentRequest {
  phoneNo: string;
  parcelType: ParcelVehicleType;
  from: { city: string; latitude: number; longitude: number };
  to: { city: string; latitude: number; longitude: number };
  dimensions: ParcelDimensions[];
}

export interface ValidateShipmentResult {
  isValid: boolean;
  validationMessage?: string;
  availableServices: ServiceOption[];
}

// ─────────────────────────────────────────────
// CreateShipmentV2 + payment + confirm
// (backs POST /api/shipments (v2) and POST /api/shipments/confirm)
// ─────────────────────────────────────────────

export interface CreateShipmentV2Result {
  /** Used as the `referenceNumber` query param for ConfirmShipment once payment succeeds. */
  referenceNumber: string;
  /** Hosted payment page URL returned by CreateShipmentV2 — opened in the secure payment modal. */
  paymentUrl: string;
  amount: number;
  vatAmount: number;
  currency: string;
}

export type PaymentOutcome = 'success' | 'failure' | 'cancelled' | 'payment-failed';

export interface ConfirmShipmentResult {
  shipmentId: number;
  awb: string;
  shipmentStatus: string;
}

/** One row of the signed-in user's "My Shipments" list (GET /api/shipments). */
export interface ShipmentSummary {
  shipmentId: number;
  tempAwb: string;
  referenceNumber: string | null;
  shipmentStatus: string;
  shipmentStatusLabel: string;
  isTerminalStatus: boolean;
  paymentStatus: string;
  originCity: string;
  destinationCity: string;
  destinationName: string;
  amount: number;
  vat: number;
  currency: string;
  createdAt: string;
}

export interface ShipmentReceiptParty {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

// ─────────────────────────────────────────────
// International shipment booking
// (backs GET /api/international/countries|cities|document-weights|next-pickup-days,
// POST /api/international/rate-card|shipments|shipments/payment-link — all pure passthrough,
// see InternationalShipmentService in Zajel.PrePaid.Api)
// ─────────────────────────────────────────────

/** A country/city as returned by GetCountries/GetCities and as embedded in CreateShipment's
 * origin/destination — confirmed shape from the real CreateShipment curl sample
 * ({"code":"AE","name":"United Arab Emirates"} / {"code":"DUBAI","name":"Dubai"}). The
 * GetCountries/GetCities LIST response's own wrapper shape hasn't been confirmed yet — treat
 * as unknown/best-effort until hit for real. */
export interface InternationalLookupItem {
  code: string;
  name: string;
  /** Unique option value. GetCities' cityCode is the serving station, shared by many cities
   * (e.g. LHE for Lahore, Okara, Multan…), so code alone can't identify a city. */
  key?: string;
  /** Countries only — GetCountries' is_postal_code_required (false for GCC). */
  postalCodeRequired?: boolean;
}

export const lookupKey = (code: string, name: string) => `${code}::${name}`;

/** GetDocumentWeights/GetNextPickupDays response shapes are NOT yet confirmed against a real
 * call — these are best-effort guesses (a flat list of weight brackets in kg / ISO date
 * strings) based on how GetRateCard's `weight` and the domestic wizard's `workingDaysList`
 * are used elsewhere. Adjust once the real responses are seen. */
export type DocumentWeightOption = number;
export type PickupDayOption = string;

export interface RateCardRequest {
  fromCountry: string;
  toCountry: string;
  docType: 'DOC' | 'NON-DOC';
  weight: number;
}

/** GetRateCard's response shape isn't confirmed either — kept as an open record so the UI can
 * read whatever fields are actually present (e.g. amount/totalAmount) without this type
 * lying about a shape it hasn't verified. */
export type RateCardResult = Record<string, unknown>;

/** International/CreateShipment's response shape isn't confirmed — same open-record
 * treatment. GeneratePaymentLink is called with this result's `id`. */
export type InternationalCreateShipmentResult = Record<string, unknown>;

/** International/GeneratePaymentLink's response shape isn't confirmed — expected to contain a
 * hosted payment URL akin to CreateShipmentV2Result.paymentUrl. */
export type InternationalPaymentLinkResult = Record<string, unknown>;

/** Printable receipt for one paid shipment (GET /api/shipments/{shipmentId}/receipt). */
export interface ShipmentReceipt {
  shipmentId: number;
  awb: string;
  referenceNumber: string | null;
  shipmentStatusLabel: string;
  paymentStatus: string;
  createdAt: string;
  origin: ShipmentReceiptParty;
  destination: ShipmentReceiptParty;
  serviceTypeName: string | null;
  description: string | null;
  numOfPieces: number;
  weightInKg: number | null;
  amount: number;
  vat: number;
  currency: string;
  total: number;
}
