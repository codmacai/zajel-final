import { Truck, Plane, FileText, Package, type LucideIcon } from 'lucide-react';

// All copy, options and routes for the send-shipment flow live here.

/* -------------------------------------------------------------------------- */
/*  Routes — change these to match your app                                   */
/* -------------------------------------------------------------------------- */

export const SEND_ROUTES = {
  login: '/login',
  payment: '/payment', // TODO: point at your real payment step
  prohibitedItems: '#', // TODO: link to your prohibited-items page
} as const;

export const UAE = 'United Arab Emirates';

/* -------------------------------------------------------------------------- */
/*  Copy                                                                      */
/* -------------------------------------------------------------------------- */

export const AUTH_CONTENT = {
  title: 'Welcome to Zajel',
  subtitle:
    'Sign in for faster checkout and saved addresses, or continue as a guest to send a shipment immediately.',
  login: {
    title: 'Login to Account',
    description: 'Access saved addresses, view discounted rates, and easily manage your tracking history.',
    cta: 'Sign in',
  },
  guest: {
    title: 'Continue as Guest',
    description: 'No account required. The fastest and simplest way to send a one-off shipment right now.',
    cta: 'Continue',
  },
  footnote: 'Takes about two minutes',
} as const;

export const STEPS = [
  { id: 'destination', label: 'Destination', title: 'Where is it going?', subtitle: 'Choose how far your shipment is travelling.' },
  { id: 'shipper', label: 'Shipper', title: 'Shipper information', subtitle: 'Enter the pickup and sender details.' },
  { id: 'receiver', label: 'Receiver', title: 'Receiver information', subtitle: 'Enter the delivery destination details.' },
  { id: 'parcel', label: 'Parcel', title: 'Shipment details', subtitle: 'Tell us what you are sending.' },
] as const;

export interface ChoiceOption<T extends string> {
  value: T;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export type DestinationType = 'domestic' | 'international';
export type ParcelType = 'document' | 'parcel';
export type WeightUnit = 'kg' | 'lb';

export const DESTINATION_OPTIONS: ChoiceOption<DestinationType>[] = [
  { value: 'domestic', title: 'Domestic', description: 'Deliveries within the United Arab Emirates.', Icon: Truck },
  { value: 'international', title: 'International', description: 'Shipping to over 200 countries worldwide.', Icon: Plane },
];

export const PARCEL_OPTIONS: ChoiceOption<ParcelType>[] = [
  { value: 'document', title: 'Document(s)', description: 'Letters, contracts and papers.', Icon: FileText },
  { value: 'parcel', title: 'Parcel', description: 'Boxes, goods and packages.', Icon: Package },
];

/* -------------------------------------------------------------------------- */
/*  Form state                                                                */
/* -------------------------------------------------------------------------- */

export interface ShipperForm {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  unit: string;
}

export interface ReceiverForm {
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  postal: string;
}

export interface DetailsForm {
  content: string;
  weight: string;
  weightUnit: WeightUnit;
  pieces: string;
  type: ParcelType | null;
}

export interface ShipmentForm {
  destination: DestinationType | null;
  shipper: ShipperForm;
  receiver: ReceiverForm;
  details: DetailsForm;
}

export const INITIAL_FORM: ShipmentForm = {
  destination: null,
  shipper: { fullName: '', email: '', phone: '', country: UAE, address: '', city: '', unit: '' },
  receiver: { name: '', email: '', phone: '', country: '', address: '', city: '', postal: '' },
  details: { content: '', weight: '', weightUnit: 'kg', pieces: '1', type: null },
};