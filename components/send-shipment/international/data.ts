import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { EMPTY_GEO_ADDRESS, type GeoAddress } from '@/types/shipment';
import type { ChoiceOption } from '../data';
import { DocumentIllustration, ParcelIllustration } from './icons';

// International booking — mirrors the Quote Desk dashboard's create-shipment flow
// (DashbaordProject/src/app/customer_support/components/create-shipment):
//   Shipment details → Origin → Destination → Package details → Amount → Review
// and builds the same CreateShipment payload (see buildCreateShipmentPayload in the wizard).
//
// Website-specific differences, on purpose:
//   - The UAE side (sender when OUTBOUND, receiver when INBOUND) uses the saved-address /
//     Google Places flow from the domestic wizard instead of free-text address lines.
//   - Nothing is asked twice: the booker's contact comes from the UAE-side party (+ account
//     email), the document/non-document choice lives on the Package step, and incoterms are
//     always DDU (not asked).
//   - Both DOCUMENT and NON-DOCUMENT shipments are priced and paid online with the same quote
//     flow as the mobile app: GetRateCard (pieces, X-Version 2.0) → quote id → CreateShipment
//     (quoteId) → GeneratePaymentLink → payment popup → ConfirmInternationalShipment. CRM prices
//     non-documents on chargeable weight — per piece the higher of the actual weight and the
//     volumetric weight (L × W × H / divisor) — and stores the quoted pieces and amount, so the
//     shipment, payment link and Shipsy booking all use exactly what was quoted. Documents are
//     one piece priced on the picked weight. No HS code is collected here (not required until
//     customs clearance).

export const UAE_COUNTRY_CODE = 'AE';
export const UAE_COUNTRY_NAME = 'United Arab Emirates';

/** Same values the dashboard sends. */
export const CASH_CUSTOMER_CODE = 'ZACS-CUS-000017';
export const CUSTOMER_MASK = 'CASH';
export const BOOKING_SOURCE = 'Web';
export const DECLARED_CURRENCY = { id: 1, name: 'United Arab Emirates', code: 'AED' } as const;
/** Always DDU for website bookings — not asked. */
export const INCO_TERMS = 'DDU';

/**
 * serviceType sent with the shipment. The dashboard loads these from its GetServiceTypes
 * endpoint (filtered to "internation…") and defaults to INTERNATIONAL OUTBOUND AIR EXPRESS.
 * TODO: confirm the exact names/codes from that list — `code` is not known to the website yet.
 */
export const SERVICE_TYPES: Record<ShipmentDirection, { id: number; name: string; code: string }> = {
  OUTBOUND: { id: 1, name: 'INTERNATIONAL OUTBOUND AIR EXPRESS', code: '' },
  INBOUND: { id: 2, name: 'INTERNATIONAL INBOUND AIR EXPRESS', code: '' },
};

export type ShipmentDirection = 'OUTBOUND' | 'INBOUND';
export type ProductType = 'DOCUMENT' | 'NON-DOCUMENT';

export const DIRECTION_OPTIONS: ChoiceOption<ShipmentDirection>[] = [
  { value: 'OUTBOUND', title: 'Sending abroad', description: 'Outbound · pickup in the UAE, delivered to another country', Icon: PlaneTakeoff },
  { value: 'INBOUND', title: 'Receiving from abroad', description: 'Inbound · pickup in another country, delivered in the UAE', Icon: PlaneLanding },
];

export const PRODUCT_TYPE_OPTIONS: ChoiceOption<ProductType>[] = [
  { value: 'DOCUMENT', title: 'Document', description: 'Letters and papers · instant price, pay online', Icon: DocumentIllustration },
  { value: 'NON-DOCUMENT', title: 'Non-document', description: 'Goods and parcels · instant price, pay online', Icon: ParcelIllustration },
];

/** CRM's default MaxPiecesPerQuote — CRM enforces the real limit and answers with a message. */
export const MAX_NON_DOC_PIECES = 10;

/**
 * Only for the live "≈ volumetric weight" hint while typing. The price, the chargeable weight
 * and the limit (is_above_limit / max_weight) always come from CRM's quote.
 */
export const VOLUMETRIC_DIVISOR_HINT = 5000;

/** Documents are one flat piece — CRM prices them on weight only and ignores dimensions. */
export const DOCUMENT_DIMENSION_CM = 1;

export const STEPS = [
  { id: 'details', label: 'Direction', title: 'Which way is it going?', subtitle: 'Are you sending abroad or receiving from abroad?' },
  { id: 'origin', label: 'Origin', title: 'Origin', subtitle: 'Where should our courier collect the shipment?' },
  { id: 'destination', label: 'Destination', title: 'Destination', subtitle: 'Who should receive the shipment?' },
  { id: 'package', label: 'Package', title: 'Package details', subtitle: 'Tell us about your package.' },
] as const;

export type InternationalStepId = (typeof STEPS)[number]['id'];

/** One party (origin or destination) — same fields as the dashboard's origin/destination forms. */
export interface InternationalPartyForm {
  name: string;
  phone: string;
  company: string;
  countryCode: string;
  countryName: string;
  cityCode: string;
  cityName: string;
  area: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  /** UAE side only — from AddressAutocompleteInput or a saved address (domestic-wizard flow). */
  place: GeoAddress;
  building: string;
  apartment: string;
  savedAddressId: number | null;
}

export const EMPTY_INTERNATIONAL_PARTY: InternationalPartyForm = {
  name: '',
  phone: '',
  company: '',
  countryCode: '',
  countryName: '',
  cityCode: '',
  cityName: '',
  area: '',
  addressLine1: '',
  addressLine2: '',
  postalCode: '',
  place: EMPTY_GEO_ADDRESS,
  building: '',
  apartment: '',
  savedAddressId: null,
};

/** Dashboard step 0 — only the direction is asked; see the header comment. */
export interface InternationalDetailsForm {
  direction: ShipmentDirection | null;
}

/** One non-document piece — sent to GetRateCard as a QuotePieceRequest. */
export interface InternationalPieceForm {
  description: string;
  declaredValue: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  quantity: string;
}

export const EMPTY_INTERNATIONAL_PIECE: InternationalPieceForm = {
  description: '',
  declaredValue: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  quantity: '1',
};

/** Dashboard step 3 — packageForm. */
export interface InternationalPackageForm {
  productType: ProductType | null;
  /** Documents only — picked from the GetDocumentWeights brackets. */
  weight: string;
  /** Non-documents only — priced on chargeable weight per piece. */
  pieces: InternationalPieceForm[];
}

export interface InternationalShipmentForm {
  details: InternationalDetailsForm;
  sender: InternationalPartyForm;
  receiver: InternationalPartyForm;
  pkg: InternationalPackageForm;
}

export const INITIAL_INTERNATIONAL_FORM: InternationalShipmentForm = {
  details: { direction: null },
  sender: EMPTY_INTERNATIONAL_PARTY,
  receiver: EMPTY_INTERNATIONAL_PARTY,
  pkg: {
    productType: null,
    weight: '',
    pieces: [EMPTY_INTERNATIONAL_PIECE],
  },
};

export const INTERNATIONAL_REVIEW_CONTENT = {
  title: 'Review & pay',
  subtitle: 'Double-check everything before we take you to secure payment.',
  pay: 'Proceed to payment',
  preparing: 'Preparing payment…',
  bookedTitle: 'Shipment booked',
  // 'submit'/'submitting'/'requestedTitle' are currently unreachable — both product types
  // require an online quote before Review now, so "Proceed to payment" is always what renders.
  // Left in place as a fallback in case a future product type ships without online pricing.
  submit: 'Submit request',
  submitting: 'Submitting…',
  requestedTitle: 'Request received',
} as const;
