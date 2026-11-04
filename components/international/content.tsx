// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { InternationalHeroContent } from './hero';
import type { CTABannerProps } from '@/components/shared/CTABanner';
import type { ComponentType } from 'react';
import { International_FAQS } from '@/data/International-faqs';
// Fallback until the CMS entry is ready.
export const INTERNATIONAL_HERO: InternationalHeroContent = {
  eyebrow: "International Shipping",
  title: "International Shipping UAE: Doorstep Delivery to 195 Countries",
  description:
    "Documents or packages, delivered in 3–5 days. Customs handled end to end, with tracking and a delivery arrangement that fits your shipment.",
  image_url: "/international/international-air-cargo-hero.webp",
};

export const INTERNATIONAL_CTA: CTABannerProps = {
  image: "/zajel-courier-hero.webp",
  imageAlt: "Zajel courier handing over an international shipment",
  title: "Book International Shipping in Minutes",
  description: "Declare your document's weight and pay instantly, or request a quote for your package, book on zajel.com, or download the app for booking on the go.",
  buttons: [
    { label: "Ship Internationally", href: "/send-shipment", variant: "primary" },
    { label: "Download the Zajel App", href: "/#download-app", variant: "secondary" },
  ],
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
export const INTERNATIONAL_TWO_WAYS_DEFAULTCONTENT = {
  eyebrow: 'Shipping Options',
  twoWays: {
    heading: 'Two Ways to Ship',
    documents: {
      label: 'Documents',
      text: 'Get an instant rate and book in minutes.',
      steps: ['Declare the weight', 'Choose your pickup date', "Pay and you're booked"],
      buttonLabel: 'Ship Documents Now',
      buttonUrl: '/quotation?type=documents',
    },
    packages: {
      label: 'Packages',
      text: 'Get accurate pricing after your package is verified.',
      steps: [
        'Choose your pickup date',
        'We collect and verify the weight',
        'We send you a secure payment link to confirm',
      ],
      buttonLabel: 'Request a Package Quote',
      buttonUrl: '/support',
    },
  },
  journey: {
    heading: 'One Simple Journey, Either Way',
    text: "Whether you're sending a document or a package, the rest of the journey looks the same: add the receiver's details and location, declare the value, and you're set. Track it from pickup to delivery, wherever in the world it's headed.",
  },
};

export const INTERNATIONAL_TWO_WAYS = {
  data: INTERNATIONAL_TWO_WAYS_DEFAULTCONTENT,
};
export type INTERNATIONAL_TWO_WAYSContent = typeof INTERNATIONAL_TWO_WAYS;

// ---------------------------------------------------------------------------
// Minimal Line Icons (strokeWidth reduced to 1.25)
// Icon size scales with the card: smaller on phones, larger on desktop.
// ---------------------------------------------------------------------------
export const INTERNATIONAL_WHY_SVGPROPS = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-6 w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9',
  'aria-hidden': true,
};

export const GlobeIcon = () => (
  <svg {...INTERNATIONAL_WHY_SVGPROPS}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.75 5.5 3.75 9S14.5 20.5 12 21c-2.5-2.5-3.75-5.5-3.75-9S9.5 3.5 12 3Z" />
  </svg>
);

export const ClockIcon = () => (
  <svg {...INTERNATIONAL_WHY_SVGPROPS}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const TrackingIcon = () => (
  <svg {...INTERNATIONAL_WHY_SVGPROPS}>
    <path d="M12 21s7-6.5 7-11.5A7 7 0 1 0 5 9.5C5 14.5 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

export const ExperienceIcon = () => (
  <svg {...INTERNATIONAL_WHY_SVGPROPS}>
    <circle cx="12" cy="8.5" r="5.5" />
    <path d="M8.5 13 7 21l5-2.5L17 21l-1.5-8" />
  </svg>
);

// ---------------------------------------------------------------------------
// Content & Types
// ---------------------------------------------------------------------------
export interface FeatureCard {
  id: string;
  Icon: ComponentType;
  title: string;
  description: string;
}

export const EYEBROW = 'Global Reach';

export const HEADING = 'Why Ship Internationally With Zajel';

export const DESCRIPTION =
  'Expand your global footprint with seamless international shipping backed by reliable transit networks, fast customs clearance, and global coverage.';

export const CARDS: FeatureCard[] = [
  { id: 'countries', Icon: GlobeIcon, title: '195 Countries Reached', description: 'A global network from a single pickup in the UAE.' },
  { id: 'delivery', Icon: ClockIcon, title: '3-5 Day Delivery', description: 'Fast, predictable transit times, worldwide.' },
  { id: 'tracking', Icon: TrackingIcon, title: 'Real-Time Tracking', description: 'Follow your shipment from pickup to delivery.' },
  { id: 'experience', Icon: ExperienceIcon, title: '17+ Years of Experience', description: 'A track record built on 60M+ shipments.' },
];

export const INTERNATIONAL_WHY = {
  eyebrow: EYEBROW,
  heading: HEADING,
  description: DESCRIPTION,
  cards: CARDS,
};
export type INTERNATIONAL_WHYContent = typeof INTERNATIONAL_WHY;

export const INTERNATIONAL_TIMES_EYEBROW = 'Global Transit Routes';

export const INTERNATIONAL_TIMES_HEADING = 'International Shipping Times from the UAE';

export const INTERNATIONAL_TIMES_DESCRIPTION =
  'Zajel connects the UAE to major global destinations with reliable delivery timelines tailored to your schedule and urgency.';

export const INTERNATIONAL_TIMES = {
  badge: "Express Transit",
  days: "3 - 5",
  daysLabel: "Business Days",
  daysNote: "Global Door-to-Door Delivery",
  noteTitle: "Important Transit Note",
  noteText: "Transit times are estimated from the date of shipment confirmation and may vary depending on customs clearance at the destination country. Express delivery includes priority handling and expedited customs processing.",
  trackingTitle: "Real-Time Visibility",
  trackingText: "All international shipments include real-time tracking through the Zajel app and portal from pickup to final delivery.",
  quoteLabel: "Get a Shipping Quote",
  contactLabel: "Contact Us for Transit Advice",
  bannerImageSrc: "/international/air-cargo-loading.webp",
  bannerImageAlt: "Palletised cargo being loaded onto a freighter aircraft for international shipping",
  eyebrow: INTERNATIONAL_TIMES_EYEBROW,
  heading: INTERNATIONAL_TIMES_HEADING,
  description: INTERNATIONAL_TIMES_DESCRIPTION,
};
export type INTERNATIONAL_TIMESContent = typeof INTERNATIONAL_TIMES;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
export const INTERNATIONAL_CUSTOMS_EYEBROW = 'Customs Guide';

export const INTERNATIONAL_CUSTOMS_HEADING = 'Understanding Customs Duties: Who Pays?';

export const INTRO =
  'When shipping internationally, customs duties and import taxes may apply depending on the destination country and the value of the shipment. Zajel ships on Delivered Duty Unpaid (DDU) terms, so you always know how charges are handled before you book.';

export interface DeliveryTerm {
  code: string;
  title: string;
  tagline: string;
  features: string[];
}

export const TERM: DeliveryTerm = {
  code: 'DDU',
  title: 'Delivered Duty Unpaid',
  tagline:
    'The sender pays for shipping to the destination country. Customs duties, taxes, and import charges are paid by the recipient upon delivery or during customs clearance.',
  features: [
    'Business to business shipments where the importer handles their own customs charges',
    'Shipments where the recipient has an established import account or customs broker',
    'Situations where duty rates vary and the recipient prefers to manage clearance directly',
  ],
};

export const INTERNATIONAL_CUSTOMS = {
  bestForLabel: "Best for:",
  noteLabel: "Note:",
  noteText: "Customs duties vary by country, item type, and declared value. Our team can advise on estimated duty rates for your destination when you book. For commercial shipments, Zajel handles all customs documentation on your behalf.",
  quoteLabel: "Get a Shipping Quote",
  contactLabel: "Contact Us for Customs Advice",
  eyebrow: INTERNATIONAL_CUSTOMS_EYEBROW,
  heading: INTERNATIONAL_CUSTOMS_HEADING,
  intro: INTRO,
  term: TERM,
};
export type INTERNATIONAL_CUSTOMSContent = typeof INTERNATIONAL_CUSTOMS;

export const INTERNATIONAL_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: International_FAQS,
};
export type INTERNATIONAL_FAQContent = typeof INTERNATIONAL_FAQ;
