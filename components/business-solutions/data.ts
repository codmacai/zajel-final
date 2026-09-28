// Hardcoded content — swap for a CMS fetch once the entry is ready, the
// same way the Individual Solutions bundle is set up to.

export const heroData = {
  eyebrow: 'For E-commerce & Freight',
  title: 'Business Solutions — Logistics That Scales With You',
  description:
    "Whether you're fulfilling online orders or moving freight across borders, Zajel supports the operation — not just the shipment.",
  buttonLabel: 'Get a Quote',
  buttonUrl: '/quote',
  heroImage: '/magnific_create-an-ultrarealistic-_1l4dLbMr4r.png',
};

export interface ServiceCard {
  id: 'ecommerce' | 'air-freight' | 'sea-freight' | 'land-freight';
  title: string;
  description: string;
  features: string[];
  buttonLabel: string;
  buttonUrl: string;
}

export const serviceCards: ServiceCard[] = [
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Fulfillment built for online sellers, at any volume.',
    features: ['Last-mile delivery for online orders', 'Real-time tracking for every order', 'Built to scale with your order volume'],
    buttonLabel: 'Explore E-commerce Solutions',
    buttonUrl: '/ecommerce',
  },
  {
    id: 'air-freight',
    title: 'Air Freight',
    description: 'Fast, secure cargo by air — standard, charter, and AOG.',
    features: ['Standard & charter air freight', 'AOG (Aircraft on Ground) shipping', 'Door-to-door delivery'],
    buttonLabel: 'Explore Air Freight',
    buttonUrl: '/air-freight',
  },
  {
    id: 'sea-freight',
    title: 'Sea Freight',
    description: 'Cost-effective ocean cargo — FCL, LCL, RoRo, and more.',
    features: ['FCL & LCL container shipping', 'RoRo, breakbulk, bulk & DG cargo', 'Import, export & cross-trade'],
    buttonLabel: 'Explore Sea Freight',
    buttonUrl: '/sea-freight',
  },
  {
    id: 'land-freight',
    title: 'Land Freight',
    description: 'Reliable road cargo, across the UAE and beyond.',
    features: ['FTL & LTL trucking', 'Domestic and cross-border: GCC, Turkey, Jordan, Syria & Europe', 'Full truck fleet, from pickups to heavy transport'],
    buttonLabel: 'Explore Land Freight',
    buttonUrl: '/land-freight',
  },
];

export interface Differentiator {
  title: string;
  text: string;
}

export interface BuiltForBlock {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  points: Differentiator[];
}

export const builtForBlocks: BuiltForBlock[] = [
  {
    id: 'ecommerce',
    eyebrow: 'E-commerce',
    heading: 'E-commerce Logistics Built Around Your Store',
    intro: 'Zajel provides e-commerce logistics support for online sellers across the UAE, from order pickup to last-mile delivery.',
    points: [
      { title: 'Platform-Flexible Shipping', text: 'Works with however you sell — no rigid e-commerce integration requirements to get started.' },
      { title: 'Dedicated Business Support', text: 'Direct access to a business logistics contact, not a general support queue.' },
      { title: 'Nationwide Delivery Coverage', text: 'Fulfillment across every emirate, so your delivery area never limits your customer base.' },
    ],
  },
  {
    id: 'freight',
    eyebrow: 'Freight Forwarding, Any Mode',
    heading: 'One Provider for Air, Sea & Land',
    intro: 'Whichever mode fits your shipment, Zajel manages it end to end — no need to work with separate providers per mode.',
    points: [
      { title: 'Air, Sea & Land Under One Provider', text: 'Book air freight, sea freight, and land freight through a single logistics partner.' },
      { title: 'Customs Clearance Included', text: 'Customs clearance is managed as part of every freight service.' },
      { title: 'Door-to-Door Freight Coordination', text: 'Freight is coordinated from pickup to final delivery, not just point-to-point.' },
    ],
  },
];

export interface ValueService {
  id: 'customs' | 'warehousing' | 'packing' | 'insurance';
  title: string;
  description: string;
  href?: string;
}

export const valueAddedServices: ValueService[] = [
  {
    id: 'customs',
    title: 'Customs Clearance',
    description:
      'In-house customs brokerage for imports, exports, and transit cargo. Documentation preparation, HS code classification, and duty management handled by our licensed clearance team. Available across all UAE ports and free zones.',
    href: '/customs-clearance',
  },
  {
    id: 'warehousing',
    title: 'Warehousing and Storage',
    description:
      'Short term and long term storage in Dubai with real-time inventory tracking. Temperature controlled options available for pharma, food, and healthcare products. Integrated with our freight and delivery network for seamless dispatch.',
    href: '/warehousing',
  },
  {
    id: 'packing',
    title: 'Packing and Crating',
    description:
      'Professional export packing, wooden crating, and palletization for sensitive, fragile, or oversized cargo. All packing meets ISPM 15 standards for international shipment.',
  },
  {
    id: 'insurance',
    title: 'Cargo Insurance',
    description:
      'Comprehensive marine, air, and land cargo insurance to protect your shipments against loss or damage. Coverage available for single consignments or annual policies based on your shipping volume.',
  },
];

export interface ChoiceItem {
  id: 'trust' | 'single-provider' | 'presence' | 'scale';
  title: string;
  description: string;
}

export const choiceItems: ChoiceItem[] = [
  {
    id: 'trust',
    title: 'Government Grade Trust',
    description:
      "Zajel was founded delivering Emirates IDs and passports for UAE government entities including the Ministry of Foreign Affairs, Dubai Courts, and Dubai Customs. The operational standards we built for the nation's most sensitive documents are the same standards we bring to every business shipment.",
  },
  {
    id: 'single-provider',
    title: 'Single Provider, Every Mode',
    description:
      'Air freight, sea freight, land freight, customs clearance, warehousing, and last mile delivery through one account, one contact, and one invoice. No coordination between multiple vendors. No gaps between handoffs.',
  },
  {
    id: 'presence',
    title: 'UAE Born, Nationally Present',
    description:
      'Headquartered in Dubai with offices and operations in Abu Dhabi, Sharjah, and Ajman. Zajel is not a franchise or a reseller. We own and operate our logistics network across every emirate.',
  },
  {
    id: 'scale',
    title: 'Built to Scale With You',
    description:
      'From 10 shipments a month to 10,000, business accounts receive the same service quality, the same dedicated account manager, and pricing that adjusts as your volume grows. No minimum commitments required to get started.',
  },
];

export const whyChooseHeader = {
  eyebrow: 'Why Choose Zajel',
  heading: 'Why Businesses Choose Zajel',
  description: 'Built on government-grade trust, comprehensive end-to-end logistics, and nationwide infrastructure across the UAE.',
  ctaLabel: 'Ready to ship with us?',
  ctaDescription: 'Get in touch — let us elevate your supply chain operations.',
};

export interface FeatureItem {
  id: 'tracking' | 'cod' | 'notifications' | 'reports' | 'integration';
  title: string;
  description: string;
}

export const technologyFeatures: FeatureItem[] = [
  {
    id: 'tracking',
    title: 'Real-Time Shipment Tracking',
    description: 'Monitor every shipment across air, sea, land, and last mile delivery from a single dashboard.',
  },
  {
    id: 'cod',
    title: 'COD Collection and Reconciliation',
    description: 'Track Cash on Delivery payments as they are collected, with reconciliation reports on demand.',
  },
  {
    id: 'notifications',
    title: 'Automated Notifications',
    description: 'Updates at every milestone: pickup confirmed, in transit, out for delivery, delivered.',
  },
  {
    id: 'reports',
    title: 'Performance Reports and Analytics',
    description: 'Delivery success rates, transit times, volume trends, and cost breakdowns, exportable anytime.',
  },
  {
    id: 'integration',
    title: 'Integration Ready',
    description: 'Connect the portal to your order management system, ERP, or e-commerce platform.',
  },
];

export const technologyContent = {
  eyebrow: 'Business Portal',
  heading: 'Your Business Logistics Dashboard',
  description:
    'Every Zajel business account includes access to the Zajel portal, a centralized platform where you manage shipments, track deliveries, reconcile payments, and pull performance data. No spreadsheets. No chasing updates. Everything in one place.',
  ctaLabel: 'Get Quote',
  image: '/ecommerce/2f82b3b662a489c425c2b2889d60b9dc (1).png',
  imageAlt: 'Zajel business logistics dashboard',
};

export interface CtaButton {
  id: 'quote' | 'team' | 'calculator';
  label: string;
  url: string;
  variant: 'primary' | 'secondary';
}

export const ctaButtons: CtaButton[] = [
  { id: 'quote', label: 'Get a Quote', url: '/quote', variant: 'primary' },
  { id: 'team', label: 'Talk to Our Team', url: '/contact', variant: 'secondary' },
  { id: 'calculator', label: 'Calculate Shipping Rate', url: '/rate-calculator', variant: 'secondary' },
];

export const conversionBandContent = {
  eyebrow: 'Ready to Scale?',
  heading: "Get a quote, talk to our logistics team, or calculate your shipping rate — however you want to start, we're ready.",
  footnote: 'Business Solutions from Zajel — logistics that grows with you.',
};
