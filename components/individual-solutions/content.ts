// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { CTABannerProps } from '@/components/shared/CTABanner';
import * as Individual from './data';
export const INDIVIDUAL_CTA: CTABannerProps = {
  image: "/zajel-courier-hero.webp",
  imageAlt: "Courier delivering a package doorstep to doorstep in the UAE",
  title: "Same day or international",
  description: "Book either service on zajel.com or download the app for booking on the go.",
  buttons: [
                      { label: "Get the App", href: "/#download-app", variant: "primary" },
                      { label: "Send a shipment", href: "/send-shipment", variant: "secondary" },
                    ],
};

export const INDIVIDUAL_HERO = {
  hero: Individual.heroData,
  appDownloadUrl: Individual.APP_DOWNLOAD_URL,
};
export type INDIVIDUAL_HEROContent = typeof INDIVIDUAL_HERO;

export const INDIVIDUAL_SERVICES = {
  cards: Individual.serviceCards,
};
export type INDIVIDUAL_SERVICESContent = typeof INDIVIDUAL_SERVICES;

export const INDIVIDUAL_WHY = {
  eyebrow: "Core Advantages",
  heading: "Why Ship With Zajel",
  description: "Engineered for speed, reliability, and global reach—built on decades of trusted logistics excellence across the UAE and worldwide.",
  backedByTitle: "Backed By",
  cards: Individual.whyShipCards,
  backedBy: Individual.backedByPoints,
};
export type INDIVIDUAL_WHYContent = typeof INDIVIDUAL_WHY;

export interface ComparisonRow {
  feature: string;
  domestic: string;
  international: string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Coverage', domestic: 'All 7 UAE emirates', international: '195 countries worldwide' },
  {
    feature: 'Speed',
    domestic: 'Same-day and next-day delivery',
    international: '2 to 3 business days depending on destination',
  },
  {
    feature: 'Best for',
    domestic: 'Documents, parcels, and packages within the UAE',
    international: 'Documents, packages, gifts, and personal items abroad',
  },
  { feature: 'Tracking', domestic: 'Real-time via app and portal', international: 'Real-time via app and portal' },
  { feature: 'Pickup', domestic: 'From your door', international: 'From your door' },
  { feature: 'Customs', domestic: 'Not required', international: 'Handled by Zajel' },
];

export const INDIVIDUAL_COMPARE = {
  eyebrow: "Service Comparison",
  heading: "Which Service Do You Need?",
  description: "Compare our domestic on-demand solutions with global international shipping to find the ideal match for your shipment requirements.",
  columnFeature: "Feature",
  columnDomestic: "Domestic On-Demand",
  columnInternational: "International Shipping",
  domesticButton: "Ship Domestically",
  internationalButton: "Ship Internationally",
  rows: COMPARISON_ROWS,
};
export type INDIVIDUAL_COMPAREContent = typeof INDIVIDUAL_COMPARE;

export interface SizeLimitRow {
  shipmentType: string;
  maxWeight: string;
}

export const SIZE_LIMIT_ROWS: SizeLimitRow[] = [
  { shipmentType: 'Documents', maxWeight: 'Up to 4 kg' },
  { shipmentType: 'Parcels', maxWeight: 'Up to 30 kg' },
  // { shipmentType: 'Large Packages', maxWeight: 'Up to 70 kg' },
  // { shipmentType: 'Heavy or Oversized', maxWeight: 'Above 70 kg' },
];

export const PACKING_TIPS = [
  'Use a sturdy box or padded envelope appropriate for the contents.',
  'Remove or cover old shipping labels.',
  'Seal all openings securely with high-quality packing tape.',
  'Wrap fragile items individually with cushioning material on all sides.',
  'Ensure liquids are sealed in a leak-proof container inside a waterproof bag.',
];

export const PROHIBITED_ITEMS = [
  'Flammable materials and hazardous substances',
  'Explosives and weapons/firearms',
  'Perishable food (unless cold chain arrangements are made)',
  'Live animals and illegal wildlife products',
  'Counterfeit goods and restricted media',
  'Any item prohibited by UAE law or destination country regulations',
];

export const INDIVIDUAL_WHAT_TO_SEND = {
  eyebrow: "Guidelines & Limits",
  heading: "What Can You Send Internationally?",
  description: "Zajel ships documents, parcels, and packages of all sizes. Here is a quick guide to what you can send and how to prepare your shipment.",
  limitsTitle: "Size and Weight Limits",
  columnType: "Shipment Type",
  columnWeight: "Max Weight",
  tipsTitle: "Packing Tips",
  tipsText: "Proper preparation ensures your items arrive safely and on schedule. Follow these guidelines before pickup.",
  prohibitedTitle: "Prohibited Items",
  prohibitedText: "Certain items cannot be shipped domestically or internationally. Regulations comply with strict local and international laws.",
  internationalNote: "For international shipments, restrictions vary by destination country. Our team can advise on specific item eligibility when you book.",
  bookLabel: "Book a Shipment",
  contactLabel: "Contact Us for Special Items",
  limits: SIZE_LIMIT_ROWS,
  tips: PACKING_TIPS,
  prohibited: PROHIBITED_ITEMS,
};
export type INDIVIDUAL_WHAT_TO_SENDContent = typeof INDIVIDUAL_WHAT_TO_SEND;
