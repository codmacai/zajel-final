import { Globe, Motorbike, Truck, Van, type LucideIcon } from 'lucide-react';
import { EMPTY_GEO_ADDRESS, type GeoAddress, type ParcelVehicleType } from '@/types/shipment';

// All copy, options and routes for the send-shipment flow live here.

/* -------------------------------------------------------------------------- */
/*  Feature flags & routes                                                    */
/* -------------------------------------------------------------------------- */

/**
 * International booking flag. Flip this AND SHOW_INTERNATIONAL in
 * components/couriercalculator/calculator.tsx together.
 *
 * NOTE: the backend proxy for international (GetCountries/GetCities/GetDocumentWeights/
 * GetNextPickupDays/GetRateCard/International CreateShipment/GeneratePaymentLink — see
 * Zajel.PrePaid.Api's Endpoints/International + InternationalShipmentService) is wired and
 * working. The wizard UI itself is NOT — sendshipment.tsx's sender/receiver/package/service
 * steps are still domestic-only (address autocomplete, dimensions, ShipmentValidation/validate,
 * CreateShipmentV2 + PaymentModal's confirm-polling). Selecting "International" past the route
 * step will currently still run through that domestic logic/APIs, not the new international
 * ones, until that UI branch is built.
 */
export const SHOW_INTERNATIONAL = true;

export const SEND_ROUTES = {
  login: '/login',
  account: '/account',
  shipmentsTab: '/account?tab=shipments',
  profileTab: '/account?tab=profile',
  prohibitedItems: '/faq', // TODO: link to a dedicated prohibited-items page once it exists
  help: '/support',
  support: '/support',
  receipt: (shipmentId: number) => `/account/shipments/${shipmentId}/receipt`,
} as const;

export const UAE = 'United Arab Emirates';

/**
 * Dimensions aren't collected from the customer — the validate/create contracts still take a
 * dimensions object, so a flat default box is sent (pricing is driven by weight + route).
 */
export const DEFAULT_DIMENSION_CM = 25;

export const LB_TO_KG = 0.45359237;

/* -------------------------------------------------------------------------- */
/*  Copy                                                                      */
/* -------------------------------------------------------------------------- */

export const PAGE_CONTENT = {
  title: 'Send a shipment',
  subtitle: 'Book a pickup in about two minutes. We collect from your door and deliver across the UAE.',
  helpText: 'Need help with your booking?',
  helpCta: 'Contact us',
} as const;

export const AUTH_CONTENT = {
  heading: 'Sign in to book a pickup',
  login: {
    title: 'Sign in with your mobile number',
    description: 'Use saved addresses, see live prices and track every booking from your account.',
  },
  track: {
    title: 'Just tracking a parcel?',
    description: 'No sign-in needed — use your AWB or mobile number.',
  },
  footnote: 'Takes about two minutes',
  pendingTitle: 'Finish setting up your profile',
  pendingBody:
    "We verified your number, but there's no Zajel account registered for it yet. Complete your registration in the Zajel app, or contact support, then come back to book.",
} as const;

export const TRUST_POINTS = ['Doorstep pickup', 'Live tracking', 'Secure payment'] as const;

export type StepId = 'route' | 'sender' | 'receiver' | 'package' | 'service';

export const STEPS: { id: StepId; label: string; title: string; subtitle: string }[] = [
  { id: 'route', label: 'Route', title: 'Where is it going?', subtitle: 'Choose a domestic or international delivery.' },
  { id: 'sender', label: 'Sender', title: 'Pickup details', subtitle: 'Where should our courier collect the shipment?' },
  { id: 'receiver', label: 'Receiver', title: 'Delivery details', subtitle: 'Who should receive the shipment?' },
  { id: 'package', label: 'Package', title: 'Package details', subtitle: 'Tell us what you are sending.' },
  { id: 'service', label: 'Service', title: 'Choose a delivery service', subtitle: 'Available services and pickup slots for this route.' },
];

export const NEXT_LABELS: Record<StepId, string> = {
  route: 'Continue',
  sender: 'Next: Receiver',
  receiver: 'Next: Package',
  package: 'Find services',
  service: 'Review & pay',
};

export const REVIEW_CONTENT = {
  title: 'Review & pay',
  subtitle: 'Double-check everything before we take you to secure payment.',
  pay: 'Proceed to payment',
  preparing: 'Preparing payment…',
  bookedTitle: 'Shipment booked',
  confirmFailedTitle: 'Payment received?',
  confirmFailedBody:
    "We couldn't confirm your payment in time. If you completed it, don't pay again — our team will follow up using the reference below.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Options                                                                   */
/* -------------------------------------------------------------------------- */

export interface ChoiceOption<T extends string> {
  value: T;
  title: string;
  description: string;
  Icon: LucideIcon;
  disabled?: boolean;
  /** Short highlight shown as a pill next to the title (e.g. a capacity like "Up to 5 kg"). */
  badge?: string;
}

export type DestinationType = 'domestic' | 'international';
export type ParcelType = 'document' | 'parcel';
export type WeightUnit = 'kg' | 'lb';

export const DESTINATION_OPTIONS: ChoiceOption<DestinationType>[] = [
  { value: 'domestic', title: 'Domestic', badge: 'Same or next day', description: 'Pickup and delivery within the UAE', Icon: Truck },
  {
    value: 'international',
    title: 'International',
    badge: SHOW_INTERNATIONAL ? '195 countries' : undefined,
    description: SHOW_INTERNATIONAL ? 'Send abroad or receive from abroad' : 'Online booking coming soon',
    Icon: Globe,
    disabled: !SHOW_INTERNATIONAL,
  },
];

/**
 * Domestic vehicles: a bike carries up to 5 kg, a car up to 30 kg. Anything heavier can't be
 * booked online. The booking wizard asks Bike or Car (no weight field) and sends that
 * vehicle's limit as the weight; the rate calculator still takes a weight and picks the
 * vehicle from it (vehicleForWeight). Either way the vehicle is sent as `parcelType` to
 * ShipmentValidation.
 */
export const BIKE_MAX_KG = 5;
export const CAR_MAX_KG = 30;

export type DomesticVehicle = Extract<ParcelVehicleType, 'bike' | 'car'>;

export const VEHICLE_MAX_KG: Record<DomesticVehicle, number> = { bike: BIKE_MAX_KG, car: CAR_MAX_KG };

export const VEHICLE_OPTIONS: ChoiceOption<DomesticVehicle>[] = [
  { value: 'bike', title: 'Bike', badge: `Up to ${BIKE_MAX_KG} kg`, description: 'Documents and small parcels', Icon: Motorbike },
  { value: 'car', title: 'Car', badge: `Up to ${CAR_MAX_KG} kg`, description: 'Bigger parcels and boxes', Icon: Van },
];

/** 'bike' up to 5 kg, 'car' above that up to 30 kg, null when heavier (or no weight yet). */
export function vehicleForWeight(kg: number): ParcelVehicleType | null {
  if (!(kg > 0) || kg > CAR_MAX_KG) return null;
  return kg <= BIKE_MAX_KG ? 'bike' : 'car';
}

export const OVERWEIGHT_MESSAGE = `Online bookings go up to ${CAR_MAX_KG} kg. For heavier shipments, please contact us.`;

/* -------------------------------------------------------------------------- */
/*  Form state                                                                */
/* -------------------------------------------------------------------------- */

export interface PartyForm {
  fullName: string;
  email: string;
  phone: string;
  /** Resolved from Google Places — city/country/lat/lng are never hand-typed. */
  place: GeoAddress;
  building: string;
  apartment: string;
  /** Set when the party was filled from a saved address. */
  savedAddressId: number | null;
}

export interface DetailsForm {
  content: string;
  /** Bike or car — the weight sent is that vehicle's limit (VEHICLE_MAX_KG); not asked separately. */
  vehicle: DomesticVehicle | null;
  /** Always 1 for domestic — not asked any more. */
  pieces: string;
  /** Always 'parcel' for domestic — documents vs parcel isn't asked any more. */
  type: ParcelType;
}

export interface ShipmentForm {
  destination: DestinationType | null;
  shipper: PartyForm;
  receiver: PartyForm;
  details: DetailsForm;
}

const EMPTY_PARTY: PartyForm = {
  fullName: '',
  email: '',
  phone: '',
  place: EMPTY_GEO_ADDRESS,
  building: '',
  apartment: '',
  savedAddressId: null,
};

export const INITIAL_FORM: ShipmentForm = {
  destination: SHOW_INTERNATIONAL ? null : 'domestic',
  shipper: EMPTY_PARTY,
  receiver: EMPTY_PARTY,
  details: { content: '', vehicle: null, pieces: '1', type: 'parcel' },
};
