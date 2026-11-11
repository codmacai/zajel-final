// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import { Box, Package, Truck, Layers, Flame, Wind, PackageOpen, Snowflake, Droplet, Warehouse, CheckCircle2, Clock, Repeat, type LucideIcon } from 'lucide-react';

import { EYEBROW, HEADING, SUBHEADING, SEA_FREIGHT_CARDS } from './sea-freight-solutions/data';
import type { AlternativeRoute, BodyPart } from '@/components/shared/Whentochoosefrieght';
import type { ComponentType } from 'react';
import { SeaFreight_FAQS } from '@/data/sea-freight-faq';
import type { SeaFreightHeroContent } from './hero';
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
    image: '/sea-freight/whatwemove/general-cargo.webp',
  },
  {
    id: 'oversized',
    label: 'Oversized & Project Cargo',
    description: 'Large-format and heavy-lift shipments',
    image: '/sea-freight/whatwemove/oversized-project-cargo.webp',
  },
  {
    id: 'oil-gas',
    label: 'Oil & Gas Equipment',
    description: 'Industrial and energy-sector machinery',
    image: '/sea-freight/whatwemove/oil-gas-equipment.webp',
  },
  {
    id: 'hazmat',
    label: 'Hazardous Materials',
    description: 'Handled to full compliance standards',
    image: '/sea-freight/whatwemove/hazardous-materials.webp',
  },
];

export const SEA_WHAT_WE_MOVE = {
  eyebrow: "Cargo Capability",
  heading: "What We Move",
  description: "Comprehensive handling capabilities tailored to diverse commercial cargo requirements.",
  items: CARGO_ITEMS,
};
export type SEA_WHAT_WE_MOVEContent = typeof SEA_WHAT_WE_MOVE;

export const SEA_SOLUTIONS = {
  eyebrow: EYEBROW,
  heading: HEADING,
  subheading: SUBHEADING,
  cards: SEA_FREIGHT_CARDS,
};
export type SEA_SOLUTIONSContent = typeof SEA_SOLUTIONS;

export const IMAGE_SRC = '/sea-freight/whentochoose/when-to-choose-sea-freight.webp';

export const BODY: BodyPart[] = [
  { text: 'Sea freight fits shipments where ' },
  { text: 'cost efficiency matters more than speed', emphasis: true },
  {
    text: ', such as bulk cargo, heavy or oversized loads, and shipments with flexible timelines. For urgent or time-critical cargo, ',
  },
  { text: 'air freight is typically the faster option', emphasis: true },
  { text: '.' },
];

export const ALTERNATIVES: AlternativeRoute[] = [
  { href: '/air-freight', label: 'Air Freight' },
  { href: '/land-freight', label: 'Land Freight' },
];

export const SEA_WHEN_TO_CHOOSE = {
  title: "When to Choose Sea Freight",
  imageAlt: "Sea freight vessel at port",
  image: IMAGE_SRC,
  body: BODY,
  alternatives: ALTERNATIVES,
  alternativesTitle: 'Not the right fit?',
  alternativesLead: 'Explore',
};
export type SEA_WHEN_TO_CHOOSEContent = typeof SEA_WHEN_TO_CHOOSE;

export const BASE_IMAGE_SRC = "/choose/door-to-door-courier-base.webp";

export const CUTOUT_IMAGE_SRC = "/choose/door-to-door-courier-cutout.png";

export const OTHER_ARRANGEMENTS_LINE =
  "Also available on request: Door-to-Port, Port-to-Door, and Port-to-Port arrangements — for businesses managing part of the logistics themselves.";

export const COMPLIANCE_HEADING = "Compliance & Customs Expertise";

export const COMPLIANCE_BODY_SENTENCES = [
  "Moving cargo by sea involves documentation, duty, and port clearance requirements that vary by cargo and destination.",
  "Zajel manages customs clearance and compliance on your behalf, so your shipment moves through port without unnecessary delays.",
];

export const SEA_DELIVERY = {
  delivery: {
      eyebrow: "Delivery Arrangements",
      heading: "Choose Your Delivery Arrangement",
      description: "Select the ideal transport flow tailored to your supply chain requirements.",
      title: "Door-to-Door",
      body: "Pickup at your origin address, delivered straight to the final destination — no extra coordination required on your end. This is how most Zajel sea freight shipments move, start to finish.",
      ctaLabel: "Request Door-to-Door Quote",
      ctaUrl: "/support",
      baseImage: BASE_IMAGE_SRC,
      cutoutImage: CUTOUT_IMAGE_SRC,
      baseAlt: "Door-to-Door sea freight background",
      cutoutAlt: "Door-to-Door pop-out graphic",
      note: OTHER_ARRANGEMENTS_LINE,
    },
  compliance: {
      eyebrow: "Compliance & Customs",
      heading: COMPLIANCE_HEADING,
      sentences: COMPLIANCE_BODY_SENTENCES,
    },
};
export type SEA_DELIVERYContent = typeof SEA_DELIVERY;

export type VesselType = 'container' | 'general' | 'roro' | 'bulk' | 'gas' | 'livestock';

export type Vessel = {
  type: VesselType;
  name: string;
  purpose: string;
  feature: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  image: string;
};

export const VESSELS: Vessel[] = [
  {
    type: 'container',
    name: 'Container Vessel',
    purpose: 'Transports standard ISO containers (20ft/40ft)',
    feature: 'Fast loading and unloading at container terminals with gantry cranes',
    icon: Box,
    image: '/sea-freight/oceancargo/container-vessel.webp',
  },
  {
    type: 'general',
    name: 'General Cargo Vessel',
    purpose: 'Transports loose, non-containerized, non-bulk cargo — oversized loads, machines, equipment',
    feature: 'Flexible space for different cargo types, using its own cranes to load and unload',
    icon: Package,
    image: '/sea-freight/oceancargo/general-cargo-vessel.webp',
  },
  {
    type: 'roro',
    name: 'RORO Vessel',
    purpose: 'Transports wheeled cargo like cars, trucks and trailers',
    feature: 'Cargo is driven on and off via built-in ramps — no crane needed',
    icon: Truck,
    image: '/sea-freight/oceancargo/roro-vessel.webp',
  },
  {
    type: 'bulk',
    name: 'Bulk Carrier Vessel',
    purpose: 'Carries unpackaged bulk cargo like coal, grain and iron ore',
    feature: 'Large cargo holds, sometimes with onboard cranes for self-loading',
    icon: Layers,
    image: '/sea-freight/oceancargo/bulk-carrier-vessel.webp',
  },
  {
    type: 'gas',
    name: 'Gas Carrier Vessel',
    purpose: 'Transports liquefied gases like LNG and LPG',
    feature: 'Highly specialized tanks with temperature and pressure control systems',
    icon: Flame,
    image: '/sea-freight/oceancargo/gas-carrier-vessel.webp',
  },
  {
    type: 'livestock',
    name: 'Livestock Carrier Vessel',
    purpose: 'Transports live animals, such as cattle and sheep, over sea routes',
    feature: 'Modified decks with ventilation, feeding and waste systems for animal welfare',
    icon: Wind,
    image: '/sea-freight/oceancargo/livestock-carrier-vessel.webp',
  },
];

export const SEA_VESSELS = {
  eyebrow: "Fleet Guide",
  heading: "Ocean cargo vessels",
  description: "Types, purpose and key feature.",
  vessels: VESSELS,
};
export type SEA_VESSELSContent = typeof SEA_VESSELS;

export type ContainerEntry = {
  size: string;
  name: string;
  dims: string;
  door: string;
  capacity: string;
  tare: string;
  maxCargo: string;
  description: string;
  image: string;
};

export type Category = {
  id: 'dry' | 'open-top' | 'flat-rack' | 'reefer' | 'tank';
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  entries: ContainerEntry[];
};

export const CATEGORIES: Category[] = [
  {
    id: 'dry',
    label: 'Dry Container',
    icon: Box,
    entries: [
      {
        size: "20'",
        name: "20' Standard",
        dims: '5.895 × 2.350 × 2.392 m',
        door: '2.340 × 2.292 m',
        capacity: '33 CBM',
        tare: '2,230 kg',
        maxCargo: '28,230 kg',
        description:
          'Standard, weatherproof container for general dry cargo — furniture, clothing, electronics, packaged goods. Fully enclosed with end doors for loading/unloading.',
        image: '/sea-freight/container/standard-container.webp',
      },
      {
        size: "40'",
        name: "40' Standard",
        dims: '12.029 × 2.350 × 2.392 m',
        door: '2.340 × 2.292 m',
        capacity: '67 CBM',
        tare: '3,780 kg',
        maxCargo: '26,700 kg',
        description:
          "Same general-purpose use as the 20' Standard, with double the length for cargo where space matters more than weight.",
        image: '/sea-freight/container/standard-container.webp',
      },
      {
        size: "40' HC",
        name: "40' High Cube",
        dims: '12.024 × 2.350 × 2.697 m',
        door: '2.340 × 2.597 m',
        capacity: '76 CBM',
        tare: '4,020 kg',
        maxCargo: '26,460 kg',
        description: "Same footprint as the 40' Standard but taller, for cargo that needs extra headroom.",
        image: '/sea-freight/container/standard-container.webp',
      },
      {
        size: "45' HC",
        name: "45' High Cube",
        dims: '13.556 × 2.352 × 2.700 m',
        door: '2.340 × 2.597 m',
        capacity: '86 CBM',
        tare: '4,800 kg',
        maxCargo: '27,700 kg',
        description: "Extra length and height beyond the 40' HC — maximum volume for larger shipments.",
        image: '/sea-freight/container/standard-container.webp',
      },
    ],
  },
  {
    id: 'open-top',
    label: 'Open-Top',
    icon: PackageOpen,
    entries: [
      {
        size: "20'",
        name: "20' Open-Top",
        dims: '5.888 × 2.345 × 2.315 m',
        door: '2.286 × 2.184 m',
        capacity: '32 CBM',
        tare: '2,250 kg',
        maxCargo: '30,480 kg',
        description:
          "For over-height or awkward dry cargo that won't fit through standard doors. Removable roof bows and tarpaulin allow top-loading of machinery, pipes, timber, and construction equipment.",
        image: '/sea-freight/container/open-top-container.webp',
      },
      {
        size: "40'",
        name: "40' Open-Top",
        dims: '12.029 × 2.342 × 2.326 m',
        door: '2.341 × 2.274 m',
        capacity: '65 CBM',
        tare: '3,810 kg',
        maxCargo: '26,670 kg',
        description: "Same top-loading design as the 20' Open-Top, with extra length for bulkier oversized cargo.",
        image: '/sea-freight/container/open-top-container.webp',
      },
    ],
  },
  {
    id: 'flat-rack',
    label: 'Flat-Rack',
    icon: Layers,
    entries: [
      {
        size: "20'",
        name: "20' Flat-Rack",
        dims: '5.698 × 2.230 × 2.255 m',
        door: 'N/A',
        capacity: '—',
        tare: '2,500 kg',
        maxCargo: '21,500 kg',
        description:
          'Open-sided flat platform with fixed or collapsible end walls, for heavy or irregularly shaped cargo — machinery, yachts, vehicles, industrial equipment.',
        image: '/sea-freight/container/flat-rack-container.webp',
      },
      {
        size: "40'",
        name: "40' Flat-Rack",
        dims: '11.832 × 2.228 × 1.981 m',
        door: 'N/A',
        capacity: '—',
        tare: '4,200 kg',
        maxCargo: '40,800 kg',
        description:
          'Longer platform version of the Flat-Rack, for larger, heavier shipments that exceed standard container dimensions.',
        image: '/sea-freight/container/flat-rack-container.webp',
      },
    ],
  },
  {
    id: 'reefer',
    label: 'Reefer',
    icon: Snowflake,
    entries: [
      {
        size: "20'",
        name: "20' Reefer",
        dims: '5.724 × 2.286 × 2.014 m',
        door: '2.286 × 2.067 m',
        capacity: '26 CBM',
        tare: '2,550 kg',
        maxCargo: '21,450 kg',
        description:
          'Temperature-controlled container with an integrated refrigeration unit, for perishable and sensitive goods — food, pharmaceuticals, meat, seafood, chemicals.',
        image: '/sea-freight/container/reefer-container.webp',
      },
      {
        size: "40'",
        name: "40' Reefer",
        dims: '11.840 × 2.286 × 2.120 m',
        door: '2.286 × 2.195 m',
        capacity: '60 CBM',
        tare: '3,850 kg',
        maxCargo: '26,630 kg',
        description:
          "Same temperature-controlled function as the 20' Reefer, sized for larger volumes of perishable cargo.",
        image: '/sea-freight/container/reefer-container.webp',
      },
    ],
  },
  {
    id: 'tank',
    label: 'ISO Tank',
    icon: Droplet,
    entries: [
      {
        size: "20'",
        name: "20' ISO Tank",
        dims: '6.058 × 2.438 × 2.438 m',
        door: 'N/A',
        capacity: '24,000–26,000 L',
        tare: '4,190 kg',
        maxCargo: '26,290 kg',
        description:
          'For safe transport of bulk liquids — chemicals, food-grade products, fuel, gases — under regulated pressure. Available in classifications (T11, T14, T50, T75) for hazardous and non-hazardous substances; can include insulation or heating for temperature-sensitive liquids.',
        image: '/sea-freight/container/iso-tank-container.webp',
      },
    ],
  },
];

export const SEA_CONTAINERS = {
  eyebrow: "Container Guide",
  heading: "Containers used in sea freight",
  description: "Types, specification, purpose and feature.",
  categories: CATEGORIES,
};
export type SEA_CONTAINERSContent = typeof SEA_CONTAINERS;

export const industries = [
  {
    title: 'Oil & Gas',
    description: 'Time-critical transport of equipment, materials, and supplies across upstream, midstream, and downstream operations.',
  },
  {
    title: 'Construction & Heavy Industry',
    description: 'Reliable hauling of heavy machinery, building materials, and oversized loads to sites on schedule.',
  },
  {
    title: 'Defense & Government',
    description: 'Secure, compliant logistics for sensitive cargo and mission-critical shipments.',
  },
  {
    title: 'Manufacturing',
    description: 'Dependable inbound and outbound freight that keeps production lines and supply chains moving.',
  },
  {
    title: 'Retail & General Trade',
    description: 'Flexible, scalable distribution that keeps shelves stocked and orders moving on time.',
  },
];

export const SEA_INDUSTRIES = {
  eyebrow: "Who We Work With",
  heading: "Industries We Serve",
  description: "Zajel works across diverse industries, adapting logistics strategies to meet unique operational, regulatory, and delivery requirements.",
  items: industries,
  ctaLabel: "Don't see your industry?",
  ctaDescription: 'Get in touch — we tailor logistics solutions for every sector.',
  ctaTag: 'CTA',
};
export type SEA_INDUSTRIESContent = typeof SEA_INDUSTRIES;

export const SEA_QUOTE_STEPS = {
  eyebrow: "Freight Quote",
  description: "A simple, three-step process — from inquiry to a quote tailored precisely to your shipment.",
  footnote: "Est. response within 24 hours",
  headingLine1: "How a Freight",
  headingLine2: "Quote Works",
  steps: [
      {
        number: '01',
        title: 'Submit an Inquiry',
        description: 'Tell us your cargo, route, and preferred delivery arrangement.',
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
export type SEA_QUOTE_STEPSContent = typeof SEA_QUOTE_STEPS;

export type StorageRowItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const ITEMS: StorageRowItem[] = [
  {
    icon: Warehouse,
    title: 'What Is Bonded Storage',
    description:
      'Customs-approved storage for imported goods, held under supervision before duties and taxes are paid.',
  },
  {
    icon: CheckCircle2,
    title: "What's Included",
    description:
      'Secure storage, inventory reporting, inspection access, and coordination on clearance documentation.',
  },
  {
    icon: Clock,
    title: 'After the Free Period',
    description: 'Per-CBM, per-day rates apply after the first 14 days, based on cargo type and volume.',
  },
  {
    icon: Repeat,
    title: 'Re-Export Option',
    description: 'Move bonded goods on to another country without paying UAE import duties.',
  },
];

export const SEA_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: SeaFreight_FAQS,
};
export type SEA_FAQContent = typeof SEA_FAQ;

export const SEA_BONDED = {
  eyebrow: 'Storage Solutions',
  heading: 'Bonded Warehouse Storage',
  description:
    'Every sea freight shipment through Zajel includes 14 days of complimentary bonded storage at our warehouse facility — time to arrange customs clearance, coordinate onward distribution, or consolidate incoming shipments before final delivery.',
  items: ITEMS,
  learnMoreLabel: 'Learn More About Our Warehousing',
  contactLabel: 'Contact Us for Storage Rates',
  contactHref: '/support',
};
export type SEA_BONDEDContent = typeof SEA_BONDED;

// Fallback until the CMS entry is ready.
export const SEA_HERO: SeaFreightHeroContent = {
  badge: "Sea Freight, FCL & LCL",
  titleLine1: "Port to port,",
  titleLine2: "priced plainly.",
  description:
    "Flexible sea freight solutions connecting global ports with dependable transit, smooth customs clearance, and end-to-end logistics tailored to your business needs.",
  primaryCta: { label: "Book space", url: "/support" },
  // secondaryCta: { label: "Ask for the schedule", url: "/support" },
  image_url: "/sea-freight/sea-freight-hero.webp",
  imageAlt: "Container ship loaded with cargo containers at sea",
};

export const SEA_BANNER = {
  imageSrc: "/sea-freight/breakbulk-shipment.webp",
  imageAlt: "Container ship at port",
  heading: 'Full container loads, moved with precision',
  description: "From FCL and LCL shipments to breakbulk and roll-on roll-off cargo, our sea freight network connects major ports worldwide, backed by reliable schedules and end-to-end documentation support.",
  projectLabel: 'Jebel Ali to Rotterdam Route',
  ctaLabel: 'Explore project',
  ctaHref: '/sea-freight',
  eyebrow: "Sea Freight",
};
export type SEA_BANNERContent = typeof SEA_BANNER;
