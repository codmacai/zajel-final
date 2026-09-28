import type { ContactContent } from '../components/shared/contact';

// ---------------------------------------------------------------------------
// Sea freight
// ---------------------------------------------------------------------------

export const seaFreightContent: ContactContent = {
  eyebrow: 'Get in Touch',
  title: "Let's move your cargo.",
  description: 'Submit an inquiry and our team will follow up with a tailored sea freight quote.',
  submitLabel: 'Submit Inquiry',
  fields: [
    { name: 'cargoType', label: 'Cargo Type', placeholder: 'e.g. Electronics' },
    { name: 'delivery', label: 'Preferred Delivery', placeholder: 'e.g. Door-to-door' },
    { name: 'origin', label: 'Origin', placeholder: 'City, Country' },
    { name: 'destination', label: 'Destination', placeholder: 'City, Country' },
    { name: 'fullName', label: 'Full Name', placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
  ],
  success: {
    title: 'Inquiry received',
    message: 'Our team will review your shipment details and follow up with a tailored quote shortly.',
  },
  direct: {
    title: 'Or reach us directly',
    description: "Prefer to talk it through? We're available directly too.",
    details: [
      { label: 'Email', value: 'sales@zajel.com', href: 'mailto:sales@zajel.com', icon: 'email' },
      { label: 'Phone', value: '600 53 11 11', href: 'tel:+97160053111', icon: 'phone' }, // TODO: confirm dialable number
      {
        label: 'Headquarters',
        value: 'Dubai Office: Al Rostamani Building - Al Ittihad Rd - E11 - Dubai',
        icon: 'location',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Air freight
// ---------------------------------------------------------------------------

export const airFreightContent: ContactContent = {
  eyebrow: 'Get in Touch',
  title: "Let's move your cargo.",
  description: 'Submit an inquiry and our team will follow up with a tailored air freight quote.',
  submitLabel: 'Submit Inquiry',
  fields: [
    { name: 'cargoType', label: 'Cargo Type', placeholder: 'e.g. Electronics' },
    { name: 'delivery', label: 'Preferred Delivery', placeholder: 'e.g. Door-to-door' },
    { name: 'origin', label: 'Origin', placeholder: 'City, Country' },
    { name: 'destination', label: 'Destination', placeholder: 'City, Country' },
    { name: 'fullName', label: 'Full Name', placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
  ],
  success: {
    title: 'Inquiry received',
    message: 'Our team will review your shipment details and follow up with a tailored quote shortly.',
  },
  direct: {
    title: 'Or reach us directly',
    description: "Prefer to talk it through? We're available directly too.",
    details: [
      { label: 'Email', value: 'sales@zajel.com', href: 'mailto:sales@zajel.com', icon: 'email' },
      { label: 'Phone', value: '600 53 11 11', href: 'tel:+97160053111', icon: 'phone' }, // TODO: confirm dialable number
      {
        label: 'Headquarters',
        value: 'Dubai Office: Al Rostamani Building - Al Ittihad Rd - E11 - Dubai',
        icon: 'location',
      },
    ],
  },
};