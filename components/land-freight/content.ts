// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { LandFreightHeroContent } from './hero';
import { EYEBROW, HEADING, SUBHEADING, LAND_FREIGHT_CARDS } from './land-freight-solutions/data';
import type { AlternativeRoute, BodyPart } from '@/components/shared/Whentochoosefrieght';
import { DollarSign, Globe, Layers, ShieldCheck, Thermometer, Wifi, Zap } from 'lucide-react';
import { LandFreight_FAQS } from '@/data/land-freight-faq';
// Fallback default content
export const LAND_HERO: LandFreightHeroContent = {
  badge: "Land Freight, FTL & LTL",
  titleLine1: "Full loads,",
  titleLine2: "borders handled.",
  description:
    "FTL and LTL across the Emirates and into Saudi, Oman and Kuwait, one waybill, one contact, manifests filed before you reach the border.",
  primaryCta: { label: "Book a truck", url: "/support" },
  secondaryCta: { label: "View coverage", url: "/network" },
  image_url: "/land-freight/hero/land-freight-hero.webp",
  imageAlt: "Land Freight Trucking",
};

export const LAND_BANNER = {
  imageSrc: "/Homepage/projects/oil-gas-process-equipment.jpg",
  imageAlt: "Container ship at port",
  heading: 'Cross-border trucking and rail, delivered on schedule',
  description: "From full truckload (FTL) and less-than-truckload (LTL) services to heavy haulage and intermodal rail, our extensive land network connects regional hubs seamlessly, backed by real-time tracking and dedicated dispatch support.",
  projectLabel: 'Oil & Gas Equipment',
  ctaLabel: 'Explore Land Freight',
  ctaHref: '/land-freight',
  eyebrow: "Land Freight",
};
export type LAND_BANNERContent = typeof LAND_BANNER;

export const LAND_SOLUTIONS = {
  eyebrow: EYEBROW,
  heading: HEADING,
  subheading: SUBHEADING,
  cards: LAND_FREIGHT_CARDS,
};
export type LAND_SOLUTIONSContent = typeof LAND_SOLUTIONS;

export const IMAGE_SRC = '/land-freight/when-to-choose-land-freight.webp';

export const BODY: BodyPart[] = [
  { text: 'Land freight fits regional distribution and cross-border shipments where ' },
  { text: 'road access makes sense', emphasis: true },
  {
    text: ' — domestic delivery across the UAE, or cross-border cargo to neighboring markets. It offers a ',
  },
  { text: 'flexible middle ground', emphasis: true },
  { text: ' between the speed of air freight and the bulk cost-efficiency of sea freight.' },
];

export const ALTERNATIVES: AlternativeRoute[] = [
  { href: '/air-freight', label: 'Air Freight' },
  { href: '/sea-freight', label: 'Sea Freight' },
];

export const LAND_WHEN_TO_CHOOSE = {
  title: "When to Choose Land Freight",
  imageAlt: "Land freight truck on the road",
  image: IMAGE_SRC,
  body: BODY,
  alternatives: ALTERNATIVES,
  alternativesTitle: 'Not the right fit?',
  alternativesLead: 'Explore',
};
export type LAND_WHEN_TO_CHOOSEContent = typeof LAND_WHEN_TO_CHOOSE;

export const coverageStops = [
  {
    label: 'Domestic',
    blurb: 'Distribution within the UAE, city to city.',
    iconSrc: '/customs_icon/domestic-icon.png',
  },
  {
    label: 'Import',
    blurb: 'Bringing cargo into the UAE by road from regional origins.',
    iconSrc: '/customs_icon/import-icon.png',
  },
  {
    label: 'Export',
    blurb: 'Sending cargo out of the UAE to regional and cross-border destinations.',
    iconSrc: '/customs_icon/export-icon.png',
  },
  {
    label: 'Cross-Border',
    blurb: 'Coverage across the GCC, Turkey, Jordan, Syria, and Europe.',
    iconSrc: '/customs_icon/cross-border-icon.png',
  },
];

export const LAND_COVERAGE = {
  headingLine1: "Land Freight",
  headingLine2: "Coverage",
  description: "Complete the information and documentation needed for a successful import and export of your products and materials.",
  backgroundAlt: "Land Freight Coverage Background",
  imageAlt: "Land Freight Coverage",
  stops: coverageStops,
};
export type LAND_COVERAGEContent = typeof LAND_COVERAGE;

export interface TruckType {
  id: string;
  title: string;
  description: string;
  features?: string[];
  imageUrl: string;
}

export const TRUCK_TYPES: TruckType[] = [
  {
    id: '40-foot-box-truck',
    title: '40-Foot Box Truck',
    description:
      'Full-size enclosed box trucks built for high-volume, full truckload (FTL) shipments. The standard choice for long-haul and cross-border moves where maximum cargo capacity is the priority.',
    imageUrl: '/land-freight/vehicle/box-truck-40ft.png',
  },
  {
    id: 'flatbed',
    title: 'Flatbed Trailers',
    description:
      'Open platform trailers for oversized cargo, construction materials, machinery, and equipment that cannot fit in enclosed containers. Available with securing equipment including straps, chains, and dunnage for safe transport.',
    imageUrl: '/land-freight/vehicle/flatbed-trailer.png',
  },
  {
    id: 'standard-dry',
    title: 'Standard Dry Trucks',
    description:
      'Enclosed dry freight trucks for general cargo, packaged goods, and palletized shipments. Available in multiple sizes from 3-ton pickup trucks for local deliveries to 40-foot trailers for full truckload (FTL) shipments across the GCC and beyond.',
    imageUrl: '/land-freight/vehicle/standard-dry-truck.png',
  },
  {
    id: 'reefer',
    title: 'Refrigerated Trucks (Reefer)',
    description:
      'Temperature-controlled vehicles for pharmaceutical products, perishable goods, food and beverage, and any cargo requiring a maintained temperature range during transit. Temperature monitoring throughout the journey with documentation provided for compliance and cold chain verification.',
    features: [
      'Temperature range: -25°C to +25°C',
      'Real-time temperature monitoring',
      'Cold chain compliance documentation',
    ],
    imageUrl: '/land-freight/vehicle/refrigerated-truck.png',
  },
  {
    id: 'curtain-side',
    title: 'Curtain-side Trailers',
    description:
      'Side-loading trailers that allow quick loading and unloading from the side without specialized dock equipment. Suitable for oversized pallets, building materials, and shipments that require crane or forklift loading from the side.',
    imageUrl: '/land-freight/vehicle/curtain-side-trailer.png',
  },
  {
    id: 'low-loader',
    title: 'Low Loader Trailers',
    description:
      'Heavy-duty trailers designed for transporting heavy machinery, industrial equipment, and project cargo that exceeds standard height and weight limits. Used for construction equipment, generators, and large industrial components.',
    imageUrl: '/land-freight/vehicle/low-loader-trailer.png',
  },
];

export const LAND_FLEET = {
  eyebrow: "Our Fleet",
  heading: "Available Truck Types",
  description: "Zajel operates a fleet of owned and partner vehicles covering the full range of land freight requirements, from small consignments within the UAE to heavy cargo moving across borders to Europe.",
  capacityTitle: "Fleet Capacity & Scale",
  capacityText: "Zajel's combined fleet of owned and partner vehicles ensures availability for scheduled, on-demand, and project-based land freight requirements across all routes.",
  buttonLabel: "Get a Land Freight Quote",
  contactLabel: "Contact Us for Project Cargo",
  trucks: TRUCK_TYPES,
};
export type LAND_FLEETContent = typeof LAND_FLEET;

export const COMPLIANCE_EYEBROW = 'Compliance & Customs';

export const COMPLIANCE_HEADING = 'Compliance & Customs Expertise';

export const COMPLIANCE_SENTENCES = [
  'Cross-border road freight involves documentation, duty, and border',
  'clearance requirements that vary by route and destination. Zajel manages',
  'customs clearance and compliance on your behalf, so your shipment moves',
  'across borders without unnecessary delays.',
];

export const LAND_COMPLIANCE = {
  eyebrow: COMPLIANCE_EYEBROW,
  heading: COMPLIANCE_HEADING,
  sentences: COMPLIANCE_SENTENCES,
};
export type LAND_COMPLIANCEContent = typeof LAND_COMPLIANCE;

export interface CargoItem {
  id: string;
  label: string;
  description: string;
  image: string;
}

export const CARGO_ITEMS: CargoItem[] = [
  {
    id: 'general',
    label: 'General Cargo',
    description: 'Commercial goods and parcels',
    image: '/land-freight/whatwemove/general-cargo.webp',
  },
  {
    id: 'oversized',
    label: 'Oversized & Project Cargo',
    description: 'Large-format and heavy-lift shipments',
    image: '/land-freight/whatwemove/oversized-project-cargo.webp',
  },
  {
    id: 'oil-gas',
    label: 'Oil & Gas Equipment',
    description: 'Industrial and energy-sector machinery',
    image: '/land-freight/whatwemove/oil-gas-equipment.webp',
  },
  {
    id: 'hazmat',
    label: 'Hazardous Materials',
    description: 'Handled to full compliance standards',
    image: '/land-freight/whatwemove/hazardous-materials.webp',
  },
];

export const LAND_WHAT_WE_MOVE = {
  eyebrow: "Cargo Capability",
  heading: "What We Move",
  description: "Comprehensive handling capabilities tailored to diverse commercial cargo requirements.",
  items: CARGO_ITEMS,
};
export type LAND_WHAT_WE_MOVEContent = typeof LAND_WHAT_WE_MOVE;

export interface Industry {
  title: string;
  description: string;
}

export const industries = [
    {
      title: 'Oil & Gas',
      description: 'Specialized handling for energy sector equipment and materials.',
    },
    {
      title: 'Construction & Heavy Industry',
      description: 'Reliable movement for bulky, high-value project cargo.',
    },
    {
      title: 'Manufacturing',
      description: 'Structured freight movement to keep production lines supplied.',
    },
    {
      title: 'Retail & General Trade',
      description: 'Consistent delivery windows for high-volume merchandise.',
    },
    {
      title: 'Food & Beverage',
      description: 'Time-sensitive handling for perishable and packaged goods.',
    },
    {
      title: 'Electronics',
      description: 'Careful handling for high-value, sensitive components.',
    },
    {
      title: 'Pharmaceuticals',
      description: 'Compliant, closely tracked movement of medical shipments.',
    },
  ];

export const LAND_INDUSTRIES = {
  eyebrow: "Who We Work With",
  heading: "Industries We Serve",
  description: "Zajel's air freight network moves time-critical cargo for industries where speed and reliability are non-negotiable.",
  items: industries,
  ctaLabel: "Don't see your industry?",
  ctaDescription: 'Get in touch — we tailor logistics solutions for every sector.',
  ctaTag: 'CTA',
};
export type LAND_INDUSTRIESContent = typeof LAND_INDUSTRIES;

export interface BorderCrossingRow {
  crossing: string;
  countries: string;
}

export const BORDER_HEADING = 'Border Crossings & Customs Clearance';

export const BORDER_INTRO =
  'Cross-border land freight requires customs clearance at each border point along the route. We manage all documentation and coordination so your cargo moves without unnecessary delays.';

export const BORDER_CROSSING_ROWS: BorderCrossingRow[] = [
  { crossing: 'Al Ghuwaifat', countries: 'UAE to Saudi' },
  { crossing: 'Hatta / Al Ain', countries: 'UAE to Oman' },
  { crossing: 'Al Batha', countries: 'Saudi to UAE' },
  { crossing: 'Sila (Abu Samra)', countries: 'Saudi to Qatar' },
  { crossing: 'King Fahad Causeway', countries: 'Saudi to Bahrain' },
  { crossing: 'Al Haditha / Karameh', countries: 'Saudi to Jordan' },
  { crossing: 'Habur / Cilvegozu', countries: 'Turkey to Europe' },
];

export const LAND_BORDERS = {
  eyebrow: "Cross-Border Logistics",
  columnCrossing: "Border Crossing",
  columnCountries: "Countries",
  handleTitle: "What We Handle at Every Border",
  handleText: "Pre-filed customs manifests, direct coordination with certified brokers, and real-time tracking updates as your shipment clears each border.",
  handlePoint1: "Manifest submission prior to arrival",
  handlePoint2: "Active resolution of inspection holds",
  guidelinesTitle: "Clearance Guidelines & Estimates",
  guidelinesText: "Clearance times are estimates and vary depending on cargo type, time of day, and border traffic volume. Special cargo types like hazardous or oversized freight may require additional inspection time.",
  coordinationHighlight: "Seamless border coordination",
  coordinationText: "ensures your cross-border land shipments experience minimal dwell times and smooth regulatory compliance across all transit corridors.",
  contactLabel: "Contact Us for Route Planning",
  heading: BORDER_HEADING,
  intro: BORDER_INTRO,
  rows: BORDER_CROSSING_ROWS,
};
export type LAND_BORDERSContent = typeof LAND_BORDERS;

export const LAND_QUOTE_STEPS = {
  eyebrow: "Freight Quote",
  description: "A simple, three-step process — from inquiry to a quote tailored precisely to your shipment.",
  footnote: "Est. response within 24 hours",
  headingLine1: "How a Freight",
  headingLine2: "Quote Works",
  steps: [
      {
        number: '01',
        title: 'Submit an Inquiry',
        description: 'Tell us your cargo, route, and truck type preference.',
      },
      {
        number: '02',
        title: 'We Review Your Shipment',
        description: 'Our team assesses cargo type, route, and compliance needs.',
      },
      {
        number: '03',
        title: 'Get Your Quote',
        description: 'Receive a tailored quote for your shipment.',
      },
    ],
};
export type LAND_QUOTE_STEPSContent = typeof LAND_QUOTE_STEPS;

export type TirItem = {
  id: string;
  title: string;
  description: string;
  icon: typeof Zap;
};

export const TIR_BENEFITS: TirItem[] = [
  {
    id: '01',
    title: 'Faster border crossings',
    description:
      'TIR-covered shipments pass through customs with reduced inspections and paperwork at each border, saving hours or even days on multi-country routes.',
    icon: Zap,
  },
  {
    id: '02',
    title: 'Single guarantee system',
    description:
      'The TIR Carnet serves as an internationally recognized customs guarantee, eliminating the need for separate bonds or deposits at each country of transit.',
    icon: ShieldCheck,
  },
  {
    id: '03',
    title: 'Sealed container integrity',
    description:
      'Goods travel in sealed vehicles from origin to destination. The seal is verified at borders without unloading, reducing handling risk and transit time.',
    icon: Layers,
  },
  {
    id: '04',
    title: 'Multi-country coverage',
    description:
      'TIR is recognized in over 77 countries across Europe, the Middle East, Central Asia, and North Africa, making it the standard for overland trade on routes from the UAE through the GCC, Jordan, Turkey, and into Europe.',
    icon: Globe,
  },
  {
    id: '05',
    title: 'Cost efficiency',
    description:
      'By reducing border delays and eliminating the need for multiple transit guarantees, TIR lowers the overall cost of multi-border land freight operations.',
    icon: DollarSign,
  },
];

export const HERO_CHIPS = ['Administered by the IRU', '77+ countries', 'Sealed vehicles'];

export const LAND_TIR = {
  quoteLabel: "Request a Land Freight Quote",
  eyebrow: "Global Customs Transit",
  heading: "TIR: Simplified International Road Transport",
  description: "Zajel utilizes the TIR (Transports Internationaux Routiers) system for international road freight shipments, enabling faster border crossings and simplified customs procedures across multiple countries in a single journey.",
  whatEyebrow: "Core Foundation",
  whatTitle: "What is TIR?",
  whatHighlight: "TIR Carnet",
  advantagesEyebrow: "Advantages",
  advantagesTitle: "How TIR benefits your shipment",
  scopeEyebrow: "Operational Scope",
  scopeTitle: "When Zajel uses TIR",
  scopeText: "TIR is applied on international land freight routes that cross two or more borders, particularly on corridors from the UAE through Saudi Arabia, Jordan, and Turkey into European destinations. Our team determines the optimal customs transit method for each shipment based on the route and cargo type.",
  customsLinkLabel: "Learn more about our customs clearance services",
  whatTextBefore: "The TIR Convention is an international customs transit system administered by the International Road Transport Union (IRU). It allows goods to move across international borders in sealed vehicles or containers with minimal customs intervention at each crossing point. Instead of inspecting and processing cargo at every border, customs authorities accept the",
  whatTextAfter: "as a guarantee, significantly reducing clearance times.",
  benefits: TIR_BENEFITS,
  chips: HERO_CHIPS,
};
export type LAND_TIRContent = typeof LAND_TIR;

export type ColdChainCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
  icon: typeof Thermometer;
};

export const COLD_CHAIN_CARDS: ColdChainCard[] = [
  {
    id: 'range',
    number: '01',
    title: 'Temperature range',
    tag: '-25°C to +25°C',
    description:
      'Our refrigerated fleet supports a range from minus 25 degrees Celsius to plus 25 degrees Celsius, covering frozen, chilled, and ambient-controlled requirements.',
    icon: Thermometer,
  },
  {
    id: 'monitoring',
    number: '02',
    title: 'Real-time monitoring',
    tag: 'Live Data Logs',
    description:
      'Every temperature-controlled shipment is equipped with monitoring devices that record temperature readings throughout the journey.',
    icon: Wifi,
  },
  {
    id: 'compliance',
    number: '03',
    title: 'GDP compliance',
    tag: 'Pharmaceutical Grade',
    description:
      'For pharmaceutical shipments, our cold chain processes align with Good Distribution Practice (GDP) requirements, ensuring that medicines and healthcare products maintain their required temperature conditions from pickup to delivery.',
    icon: ShieldCheck,
  },
];

export const SUITABLE_FOR_ITEMS = [
  'Pharmaceutical products and healthcare supplies',
  'Fresh and frozen food products',
  'Beverages',
  'Chemical products requiring temperature stability',
  'Biological samples and laboratory materials',
];

export const LAND_COLD_CHAIN = {
  eyebrow: "Cold Chain Logistics",
  heading: "Temperature Controlled Land Freight",
  description: "For pharmaceutical, food and beverage, chemical, and other temperature-sensitive cargo, Zajel provides dedicated cold chain land freight services across the UAE and GCC.",
  buttonLabel: "Request a Cold Chain Quote",
  rangeBadge: "Precision Range: -25°C to +25°C",
  integrityTitle: "Uncompromising Thermal Integrity",
  integrityText: "Engineered for maximum reliability across long-haul regional corridors, protecting sensitive goods under strict environmental controls.",
  suitableTitle: "Suitable for",
  suitableLabel: "Cargo Applications:",
  inquiriesEyebrow: "Inquiries",
  inquiriesTitle: "Need expert logistics assistance?",
  inquiriesText: "Connect directly with our logistics team to discuss your temperature-controlled transit requirements across the UAE and GCC.",
  contactLabel: "Contact Our Logistics Team",
  cards: COLD_CHAIN_CARDS,
  suitable: SUITABLE_FOR_ITEMS,
};
export type LAND_COLD_CHAINContent = typeof LAND_COLD_CHAIN;

export const LAND_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: LandFreight_FAQS,
};
export type LAND_FAQContent = typeof LAND_FAQ;
