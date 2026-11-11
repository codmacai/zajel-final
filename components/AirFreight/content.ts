// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { AirFreightHeroContent } from './hero';
import { FREIGHT_CARDS } from '@/data/air-freight/solutions';
import { CROSS_SELL_ROUTES, TRANSIT_GUIDE_BODY, TRANSIT_GUIDE_IMAGE_SRC } from '@/data/air-freight/choose';
import { COMPLIANCE_BODY_SENTENCES, COMPLIANCE_HEADING, DOOR_TO_DOOR_BASE_IMAGE_SRC, DOOR_TO_DOOR_CUTOUT_IMAGE_SRC, OTHER_ARRANGEMENTS_LINE } from '@/data/air-freight/delivery';
import { CARGO_ITEMS } from '@/data/air-freight/Whatwemove';
import { VALUE_ADDED_SERVICES } from '@/data/air-freight/valueadded';
import { WEIGHT_DIMENSION_NOTES } from '@/data/air-freight/weightanddimensions';
import { Air_Freight_Faq } from '@/data/air-freight-faqs';
// Fallback until the CMS entry is ready.
export const AIR_HERO: AirFreightHeroContent = {
  eyebrow: "Air Freight",
  title: "Air Freight Forwarding: Fast, Secure Cargo by Air",
  description:
    "From standard cargo to specialized project shipments, Zajel moves it by air, with customs handled and the right delivery arrangement for your business.",
  button: "Get my rate",
  ctaLink: "/support",
  image_url: "/international/international-air-cargo-hero.webp",
};

export const AIR_BANNER = {
  imageSrc: "/airfreight/wind-turbine-blade-transport.webp",
  imageAlt: "Oversized project cargo being loaded",
  heading: "Oversized & project cargo, handled by specialists",
  description: "When standard freight solutions won't cut it, our project logistics team steps in, planning, permitting, and moving cargo too large, heavy, or complex for conventional shipping.",
  projectLabel: 'Wind Turbine Blade Transport',
  ctaLabel: 'Explore project',
  ctaHref: '/projects',
  eyebrow: "Project Logistics",
};
export type AIR_BANNERContent = typeof AIR_BANNER;

export const AIR_NETWORK = {
  eyebrow: "Global Network",
  heading: "Speed, when the calendar won't wait.",
  description: "Our air network gets the cargo there in days, not weeks. We route time-critical parts, perishables, and high-value shipments through the fastest available lane, door to door.",
};
export type AIR_NETWORKContent = typeof AIR_NETWORK;

export const HEADING = "Our Air Freight Solutions";

export const SUBHEADING =
  "Reliable, high-speed air cargo charters and scheduled network routing designed to keep your supply chain moving globally without interruption.";

export const AIR_SOLUTIONS = {
  heading: HEADING,
  subheading: SUBHEADING,
  cards: FREIGHT_CARDS,
};
export type AIR_SOLUTIONSContent = typeof AIR_SOLUTIONS;

export const AIR_WHEN_TO_CHOOSE = {
  title: "When to Choose Air Freight",
  imageAlt: "Air freight in transit",
  image: TRANSIT_GUIDE_IMAGE_SRC,
  body: TRANSIT_GUIDE_BODY,
  alternatives: CROSS_SELL_ROUTES,
  alternativesTitle: 'Not the right fit?',
  alternativesLead: 'Explore',
};
export type AIR_WHEN_TO_CHOOSEContent = typeof AIR_WHEN_TO_CHOOSE;

export const AIR_DELIVERY = {
  delivery: {
        eyebrow: "Delivery Arrangements",
        heading: "Choose Your Delivery Arrangement",
        description:
          "Select how your shipment moves from start to finish with flexible options tailored to your workflow.",
        badge: "Our Most Popular Arrangement",
        title: "Door-to-Door",
        body: "Pickup at your origin address, delivered straight to the final destination — no extra coordination required on your end. This is how most Zajel air freight shipments move, start to finish.",
        ctaLabel: "Request Door-to-Door Quote",
        ctaUrl: "/support",
        baseImage: DOOR_TO_DOOR_BASE_IMAGE_SRC,
        cutoutImage: DOOR_TO_DOOR_CUTOUT_IMAGE_SRC,
        baseAlt: "Door-to-Door air freight background",
        cutoutAlt: "Door-to-Door pop-out",
        note: OTHER_ARRANGEMENTS_LINE,
      },
  compliance: {
        eyebrow: "Compliance & Customs",
        heading: COMPLIANCE_HEADING,
        sentences: COMPLIANCE_BODY_SENTENCES,
      },
};
export type AIR_DELIVERYContent = typeof AIR_DELIVERY;

export const AIR_WHAT_WE_MOVE = {
  eyebrow: "Cargo Capability",
  heading: "What We Move",
  description: "Specialized air freight capabilities designed for diverse cargo requirements across industries.",
  items: CARGO_ITEMS,
};
export type AIR_WHAT_WE_MOVEContent = typeof AIR_WHAT_WE_MOVE;

export interface Industry {
  title: string;
  description: string;
}

export const industries: Industry[] = [
  {
    title: "Oil & Gas",
    description: "Specialized handling for energy sector equipment and materials.",
  },
  {
    title: "Manufacturing",
    description: "Structured freight movement to keep production lines supplied.",
  },
  {
    title: "Retail & General Trade",
    description: "Consistent delivery windows for high-volume merchandise.",
  },
  {
    title: "Electronics",
    description: "Careful handling for high-value, sensitive components.",
  },
  {
    title: "Pharmaceuticals",
    description: "Compliant, closely tracked movement of medical shipments.",
  },
];

export const AIR_INDUSTRIES = {
  eyebrow: "Who We Work With",
  heading: "Industries We Serve",
  description: "Zajel's air freight network moves time-critical cargo for industries where speed and reliability are non-negotiable.",
  items: industries,
  ctaLabel: "Don't see your industry?",
  ctaDescription: 'Get in touch — we tailor logistics solutions for every sector.',
  ctaTag: 'CTA',
};
export type AIR_INDUSTRIESContent = typeof AIR_INDUSTRIES;

export const AIR_QUOTE_STEPS = {
  eyebrow: "Freight Quote",
  description: "A simple, three-step process — from inquiry to a quote tailored precisely to your shipment.",
  headingLine1: "How a Freight",
  headingLine2: "Quote Works",
  steps: [
      { number: '01', title: 'Submit an Inquiry', description: 'Tell us your cargo, route, and preferred delivery arrangement.' },
      { number: '02', title: 'We Review Your Shipment', description: 'Our team assesses cargo type, route, and compliance needs.' },
      { number: '03', title: 'Get Your Quote', description: 'Receive a tailored quote for your shipment.' },
    ],
};
export type AIR_QUOTE_STEPSContent = typeof AIR_QUOTE_STEPS;

export const AIR_VALUE_ADDED = {
  eyebrow: "Value Added Services",
  heading: "Air Freight Value Added Services",
  description: "Beyond standard air cargo transport, Zajel provides a full range of supporting services to ensure your shipment is prepared, protected, and compliant from origin to destination.",
  buttonLabel: "Request a Quote",
  contactLabel: "Contact Us for Special Cargo Requirements",
  items: VALUE_ADDED_SERVICES,
};
export type AIR_VALUE_ADDEDContent = typeof AIR_VALUE_ADDED;

export const AIR_WEIGHTS = {
  eyebrow: "Cargo Parameters",
  heading: "Air Freight Weight & Dimension Guidelines",
  description: "Understanding air freight weight and size limits helps you plan shipments and choose the right service configuration through Zajel.",
  buttonLabel: "Get an Air Freight Quote",
  contactLabel: "Contact Us for Heavy or Oversized Cargo",
  notes: WEIGHT_DIMENSION_NOTES,
};
export type AIR_WEIGHTSContent = typeof AIR_WEIGHTS;

export const AIR_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: Air_Freight_Faq,
};
export type AIR_FAQContent = typeof AIR_FAQ;
