// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { DomesticHeroContent } from './hero';
import type { CTABannerProps } from '@/components/shared/CTABanner';
import type { ReactNode } from 'react';
import { Package, Bike } from 'lucide-react';
import { Domestc_FAQS } from '@/data/domestic-faqs';
import type { ProcessStep } from '@/components/shared/Steps';
export const DOMESTIC_HERO: DomesticHeroContent = {
  eyebrow: "Domestic On Demand",
  title: "Same Day Delivery Across the UAE",
  description:
    "Schedule your pickup, by day or by time — arriving within 1 hour, delivered within 2. Same-city or city-to-city, straight to the door.",
  image_url: "/domestic/same-day-delivery-hero.webp",
};

export const DOMESTIC_CTA: CTABannerProps = {
  image: "/zajel-courier-hero.webp",
  imageAlt: "Courier delivering a package doorstep to doorstep in the UAE",
  title: "Schedule your way.",
  description: "Same day or next day, doorstep to doorstep, anywhere in the UAE.",
  buttons: [
          { label: "Book a Pickup", href: "/send-shipment", variant: "primary" },
          { label: "Calculate Shipping Rate", href: "/quotation", variant: "secondary" },
          { label: "Track Your Shipment", href: "/track", variant: "secondary" },
        ],
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
export const CONTENT = {
  eyebrow: 'Seamless Execution',
  heading: 'Choose Your Delivery Speed',
  sameDay: {
    label: 'Same Day Delivery',
    text: 'Schedule your pickup for today, at a time that suits you. Same city or city-to-city.',
    features: [
      'Pickup within 1 hour of your scheduled time',
      'Delivered within 1 hour of pickup',
      'Same-city or city-to-city',
    ],
  },
  nextDay: {
    label: 'Next Day Delivery',
    text: 'Scheduled for the next day, when speed matters less than certainty. Same city or city-to-city.',
    features: [
      'Book today, delivered tomorrow',
      'Choose your preferred pickup day and time',
      'Same-city or city-to-city',
    ],
  },
  doorstep: {
    heading: 'Doorstep Pickup, Doorstep Delivery',
    text: 'No drop-off points. No waiting in line. We collect from your door and deliver straight to theirs — wherever in the UAE that door happens to be.',
  },
};

export const DOMESTIC_SPEED = {
  data: CONTENT,
};
export type DOMESTIC_SPEEDContent = typeof DOMESTIC_SPEED;

export const ROW_1 = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'];

export const ROW_2 = ['Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain'];

export const DOMESTIC_COVERAGE = {
  eyebrow: "Our Coverage",
  heading: "We deliver across the UAE",
  mapAlt: "Map of the UAE showing Zajel's delivery coverage",
  citiesRow1: ROW_1,
  citiesRow2: ROW_2,
};
export type DOMESTIC_COVERAGEContent = typeof DOMESTIC_COVERAGE;

export interface FeatureCard {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export const DOMESTIC_WHY_SVGPROPS = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4',
  'aria-hidden': true,
};

export const PricingIcon = () => (
  <svg {...DOMESTIC_WHY_SVGPROPS}>
    <path d="M20 13.2 13.2 20a1.8 1.8 0 0 1-2.5 0L3.5 12.8V3.5h9.3L20 10.7a1.8 1.8 0 0 1 0 2.5Z" />
    <circle cx="8" cy="8" r="1" />
  </svg>
);

export const TrackingIcon = () => (
  <svg {...DOMESTIC_WHY_SVGPROPS}>
    <path d="M12 21s6.5-5.2 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.8 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const ExperienceIcon = () => (
  <svg {...DOMESTIC_WHY_SVGPROPS}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.8 13.6-1.3 7 4.5-2.6 4.5 2.6-1.3-7" />
  </svg>
);

export const DoorstepIcon = () => (
  <svg {...DOMESTIC_WHY_SVGPROPS}>
    <path d="M3.5 11 12 3.5 20.5 11" />
    <path d="M5.5 9.5V20.5h13V9.5" />
    <path d="M10 20.5v-5.5h4v5.5" />
  </svg>
);

export const EYEBROW = 'Why Zajel';

export const HEADING = 'Why Choose Zajel for On-Demand Delivery';

export const DESCRIPTION =
  'Discover the operational advantages that make us the preferred logistics partner for businesses and individuals across the UAE.';

export const CARDS: FeatureCard[] = [
  {
    id: 'pricing',
    icon: <PricingIcon />,
    title: 'Competitive Pricing',
    description: 'Attractive rates without cutting corners on speed.',
  },
  {
    id: 'tracking',
    icon: <TrackingIcon />,
    title: 'Real-Time Tracking',
    description: 'Know exactly where your delivery stands.',
  },
  {
    id: 'experience',
    icon: <ExperienceIcon />,
    title: '17+ Years of Experience',
    description: 'A track record built on 60M+ shipments.',
  },
  {
    id: 'doorstep',
    icon: <DoorstepIcon />,
    title: 'Doorstep Convenience',
    description: 'Pickup and delivery, no drop-off needed.',
  },
];

export const DOMESTIC_WHY = {
  eyebrow: EYEBROW,
  heading: HEADING,
  description: DESCRIPTION,
  cards: CARDS,
};
export type DOMESTIC_WHYContent = typeof DOMESTIC_WHY;

export const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Choose Your Locations',
    description: 'Set your pickup and drop-off addresses — same city or city-to-city, anywhere across the UAE.',
  },
  {
    number: '02',
    title: 'Choose Your Vehicle & Schedule',
    description: 'Pick a motorbike or a van depending on your package, then choose the day and time that works for you.',
  },
  {
    number: '03',
    title: 'Delivery',
    description: 'Your courier arrives within 1 hour of your scheduled slot, and your package is delivered within 1 hour of pickup.',
  },
];

export const DOMESTIC_STEPS = {
  eyebrow: "On-Demand Delivery",
  description: "From locations to doorstep — a straightforward three-step process.",
  headingLine1: "Book On-Demand",
  headingLine2: "Delivery in Three Steps",
  steps: STEPS,
};
export type DOMESTIC_STEPSContent = typeof DOMESTIC_STEPS;

export const DOMESTIC_VEHICLES_CONTENT = {
  eyebrow: 'Fleet Flexibility',
  heading: 'The Right Vehicle for Every Package',
  description: 'Designed to handle everything from urgent document delivery to large, bulky cargo with absolute reliability and care.',
  motorbike: {
    label: 'Motorbike Delivery',
    image: '/domestic/zajel-delivery-motorbike.png',
    text: 'Built for speed. Ideal for documents, small parcels, and anything that needs to move quickly through city traffic.',
    features: ['Fast through traffic', 'Best for documents & small parcels', 'Same day and next day delivery'],
  },
  van: {
    label: 'Van Delivery',
    image: '/domestic/zajel-delivery-van.png',
    text: 'Built for size. Ideal for bulky items, multiple parcels, and shipments too large for a motorbike.',
    features: ['Handles bulky or heavy packages', 'Room for multiple items', 'Same day and next day delivery'],
  },
};

export const DOMESTIC_VEHICLES = {
  data: DOMESTIC_VEHICLES_CONTENT,
};
export type DOMESTIC_VEHICLESContent = typeof DOMESTIC_VEHICLES;

export interface ShippingTierRow {
  vehicleType: string;
  maxWeight: string;
  maxDimensions: string;
  bestFor: string;
  icon: React.ReactNode;
}

export const SHIPPING_TIERS: ShippingTierRow[] = [
  {
    vehicleType: 'Motorbike',
    maxWeight: 'Up to 10 kg',
    maxDimensions: '45 x 45 x 45 cm',
    bestFor: 'Documents, small parcels, envelopes',
    icon: <Bike className="w-4 h-4 sm:w-5 sm:h-5 text-[#7BE07B]" />,
  },
  {
    vehicleType: 'Van',
    maxWeight: 'Up to 30 kg',
    maxDimensions: '200 x 150 x 130 cm',
    bestFor: 'Large boxes, multiple packages',
    icon: <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#7BE07B]" />,
  },
];

export const DOMESTIC_LIMITS = {
  eyebrow: "Package Specifications & Limits",
  heading: "What You Can Ship",
  description: "Choose the ideal vehicle class for your packages. Review our approximate maximum weights, dimensions, and best-fit use cases below.",
  columnVehicle: "Vehicle",
  columnWeight: "Max Weight",
  columnDimensions: "Dimensions",
  columnBestFor: "Best For",
  noteTitle: "Important Note",
  noteText: "Dimensions are approximate maximums. Items exceeding standard limits can be accommodated with advance booking. Contact our team for oversized or heavy shipments.",
  bookLabel: "Book a Shipment",
  contactLabel: "Contact Our Team",
  tiers: SHIPPING_TIERS,
};
export type DOMESTIC_LIMITSContent = typeof DOMESTIC_LIMITS;

export interface AppStep {
  number: string;
  title: string;
  description: string;
  /** Mobile UI screenshot shown in the top of the card. Leave unset to show a placeholder. */
  image?: string;
  imageAlt: string;
}

// App screenshots live in public/domestic/app/.
export const APP_STEPS: AppStep[] = [
  {
    number: '01',
    title: 'Download the Zajel App',
    description: 'Get Zajel Logistics Services from the App Store, then sign in to start a new booking.',
    image: '/domestic/app/step-1.webp',
    imageAlt: 'Zajel Logistics Services app on the App Store',
  },
  {
    number: '02',
    title: 'Add Pickup & Drop-off',
    description: 'Enter the pickup and delivery locations anywhere across the UAE.',
    image: '/domestic/app/step-2.webp',
    imageAlt: 'Zajel app home screen with From and To fields for the sender and receiver',
  },
  {
    number: '03',
    title: 'Add Shipment Details',
    description: 'Pick a motorbike or van for your parcel size, tell us what you are sending and choose delivery now or next day.',
    image: '/domestic/app/step-3.webp',
    imageAlt: 'Book Shipment screen in the Zajel app with motorbike or van, item details and delivery options',
  },
  {
    number: '04',
    title: 'Pay Your Way',
    description: 'Review your order summary with VAT included, then check out with cash on delivery, Careem Pay or Tabby.',
    image: '/domestic/app/step-4.webp',
    imageAlt: 'Order summary screen in the Zajel app showing the total with VAT and a Checkout button',
  },
];

export const DOMESTIC_APP_STEPS = {
  eyebrow: "Zajel App",
  heading: "How to Book Through the App",
  description: "Book a same-day or next-day delivery from your phone in four quick steps.",
  steps: APP_STEPS,
};
export type DOMESTIC_APP_STEPSContent = typeof DOMESTIC_APP_STEPS;

export const DOMESTIC_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: Domestc_FAQS,
};
export type DOMESTIC_FAQContent = typeof DOMESTIC_FAQ;
