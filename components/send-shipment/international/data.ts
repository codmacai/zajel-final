import { Box, FileText, Luggage, Package, PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { EMPTY_GEO_ADDRESS, type GeoAddress } from '@/types/shipment';
import type { ChoiceOption } from '../data';

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
//   - Only DOCUMENT shipments are priced and paid online (GetRateCard → CreateShipment →
//     payment popup, same as domestic). NON-DOCUMENT shipments are created with no amount and
//     no payment — the sales team follows up with a price — so no HS code is collected here.

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
  { value: 'DOCUMENT', title: 'Document', description: 'Letters and papers · instant price, pay online', Icon: FileText },
  { value: 'NON-DOCUMENT', title: 'Non-document', description: 'Goods and parcels · our sales team will send you a price', Icon: Package },
];

/**
 * Non-document shipments pick a box size instead of typing weight and dimensions. The box's
 * weight limit and standard dimensions are what's sent to CreateShipment; the sales team
 * confirms the real details with the customer before pricing.
 */
export type BoxSize = 'small' | 'medium' | 'large';

export const BOX_SPECS: Record<BoxSize, { label: string; maxKg: number; lengthCm: number; widthCm: number; heightCm: number }> = {
  small: { label: 'Small box', maxKg: 5, lengthCm: 30, widthCm: 20, heightCm: 15 },
  medium: { label: 'Medium box', maxKg: 10, lengthCm: 40, widthCm: 30, heightCm: 25 },
  large: { label: 'Large box / luggage', maxKg: 30, lengthCm: 70, widthCm: 50, heightCm: 40 },
};

export const BOX_OPTIONS: ChoiceOption<BoxSize>[] = [
  { value: 'small', title: BOX_SPECS.small.label, badge: `Up to ${BOX_SPECS.small.maxKg} kg`, description: 'Small items and accessories', Icon: Package },
  { value: 'medium', title: BOX_SPECS.medium.label, badge: `Up to ${BOX_SPECS.medium.maxKg} kg`, description: 'Clothes, shoes and gifts', Icon: Box },
  { value: 'large', title: BOX_SPECS.large.label, badge: `Up to ${BOX_SPECS.large.maxKg} kg`, description: 'Bulky items or a suitcase', Icon: Luggage },
];

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

/** Dashboard step 3 — packageForm. */
export interface InternationalPackageForm {
  productType: ProductType | null;
  /** Non-document only — replaces the weight and dimension fields (see BOX_SPECS). */
  box: BoxSize | null;
  numberOfPieces: string;
  weight: string;
  declaredValue: string;
  length: string;
  width: string;
  height: string;
  packageDescription: string;
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
    box: null,
    numberOfPieces: '1',
    weight: '',
    declaredValue: '',
    length: '1',
    width: '1',
    height: '1',
    packageDescription: '',
  },
};

export const INTERNATIONAL_REVIEW_CONTENT = {
  title: 'Review & pay',
  subtitle: 'Double-check everything before we take you to secure payment.',
  pay: 'Proceed to payment',
  preparing: 'Preparing payment…',
  bookedTitle: 'Shipment booked',
  submit: 'Submit request',
  submitting: 'Submitting…',
  requestedTitle: 'Request received',
} as const;
