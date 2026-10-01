import { Truck, Plane, FileText, Package, type LucideIcon } from 'lucide-react';

// All copy, options and routes for the send-shipment flow live here.

/* -------------------------------------------------------------------------- */
/*  Routes — change these to match your app                                   */
/* -------------------------------------------------------------------------- */

export const SEND_ROUTES = {
  login: '/login',
  payment: '/payment', // TODO: point at your real payment step
  prohibitedItems: '#', // TODO: link to your prohibited-items page
  help: '/contact',
} as const;

export const UAE = 'United Arab Emirates';

/* -------------------------------------------------------------------------- */
/*  Copy                                                                      */
/* -------------------------------------------------------------------------- */

export const PAGE_CONTENT = {
  title: 'Send a shipment',
  subtitle: 'Book a pickup in about two minutes. We collect from your door and deliver across the UAE and worldwide.',
  helpText: 'Need help with your booking?',
  helpCta: 'Contact us',
} as const;

export const AUTH_CONTENT = {
  heading: 'How would you like to continue?',
  guest: {
    title: 'Continue as guest',
    description: 'No account needed. Book a one-off shipment now.',
  },
  login: {
    title: 'Sign in',
    description: 'Use saved addresses, member rates and your tracking history.',
  },
  footnote: 'Takes about two minutes',
} as const;

export const TRUST_POINTS = ['Doorstep pickup', 'Live tracking', 'Secure payment'] as const;

export const STEPS = [
  { id: 'route', label: 'Route', title: 'Where is it going?', subtitle: 'Choose a domestic or international delivery.' },
  { id: 'sender', label: 'Sender', title: 'Pickup details', subtitle: 'Where should our courier collect the shipment?' },
  { id: 'receiver', label: 'Receiver', title: 'Delivery details', subtitle: 'Who should receive the shipment?' },
  { id: 'package', label: 'Package', title: 'Package details', subtitle: 'Tell us what you are sending.' },
] as const;

export const NEXT_LABELS = ['Continue', 'Next: Receiver', 'Next: Package', 'Continue to payment'] as const;

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
  { value: 'domestic', title: 'Domestic', description: 'Within the UAE · same or next day', Icon: Truck },
  { value: 'international', title: 'International', description: 'To 200+ countries worldwide', Icon: Plane },
];

export const PARCEL_OPTIONS: ChoiceOption<ParcelType>[] = [
  { value: 'document', title: 'Documents', description: 'Letters, contracts and papers', Icon: FileText },
  { value: 'parcel', title: 'Parcel', description: 'Boxes, goods and packages', Icon: Package },
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
