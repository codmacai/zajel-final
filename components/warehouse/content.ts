// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import { SUPPLY_CHAIN_WAREHOUSING_CONTENT } from '@/data/supply-chain-warehousing';
import { WAREHOUSING_SOLUTIONS_EYEBROW, WAREHOUSING_SOLUTIONS_HEADING, WAREHOUSING_SOLUTIONS_CARDS } from '@/data/warehousing-solutions';
import { INVENTORY_MANAGEMENT_EYEBROW, INVENTORY_MANAGEMENT_HEADING, INVENTORY_MANAGEMENT_INTRO, INVENTORY_MANAGEMENT_CLOSING, INVENTORY_MANAGEMENT_TILES } from '@/data/inventory-management';
import { STRATEGIC_LOCATIONS_EYEBROW, STRATEGIC_LOCATIONS_HEADING, STRATEGIC_LOCATIONS_INTRO, STRATEGIC_LOCATIONS_CARDS } from '@/data/strategic-locations';
import { Warehouse_FAQS } from '@/data/warehouse-faq';
export const WAREHOUSE_SUPPLY_CHAIN = SUPPLY_CHAIN_WAREHOUSING_CONTENT;
export type WAREHOUSE_SUPPLY_CHAINContent = typeof WAREHOUSE_SUPPLY_CHAIN;

export const WAREHOUSE_SOLUTIONS = {
  eyebrow: WAREHOUSING_SOLUTIONS_EYEBROW,
  heading: WAREHOUSING_SOLUTIONS_HEADING,
  cards: WAREHOUSING_SOLUTIONS_CARDS,
};
export type WAREHOUSE_SOLUTIONSContent = typeof WAREHOUSE_SOLUTIONS;

export const WAREHOUSE_INVENTORY = {
  eyebrow: INVENTORY_MANAGEMENT_EYEBROW,
  heading: INVENTORY_MANAGEMENT_HEADING,
  intro: INVENTORY_MANAGEMENT_INTRO,
  closing: INVENTORY_MANAGEMENT_CLOSING,
  tiles: INVENTORY_MANAGEMENT_TILES,
};
export type WAREHOUSE_INVENTORYContent = typeof WAREHOUSE_INVENTORY;

export const WAREHOUSE_LOCATIONS = {
  eyebrow: STRATEGIC_LOCATIONS_EYEBROW,
  heading: STRATEGIC_LOCATIONS_HEADING,
  intro: STRATEGIC_LOCATIONS_INTRO,
  cards: STRATEGIC_LOCATIONS_CARDS,
};
export type WAREHOUSE_LOCATIONSContent = typeof WAREHOUSE_LOCATIONS;

export const WAREHOUSE_INDUSTRIES_INDUSTRIES = [
  {
    id: 'ecommerce-retail',
    title: 'E-commerce and Retail',
    description:
      'Fulfillment warehousing with pick, pack, and last-mile delivery integration for online sellers and retail businesses distributing across the UAE.',
  },
  {
    id: 'pharma-healthcare',
    title: 'Pharmaceuticals and Healthcare',
    description:
      'Temperature-controlled storage with compliance documentation, suitable for medical supplies, pharmaceutical products, and healthcare equipment.',
  },
  {
    id: 'food-beverage',
    title: 'Food and Beverage',
    description:
      'Cold chain warehousing with continuous temperature monitoring for perishable goods, beverages, and food products requiring food safety compliance.',
  },
  {
    id: 'oil-gas',
    title: 'Oil and Gas',
    description:
      'Secure storage for industrial equipment, spare parts, pipes, and project materials, including open yard capacity for oversized items.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description:
      'Raw materials and finished goods storage with inventory management that supports just-in-time production schedules and supply chain continuity.',
  },
  {
    id: 'technology-electronics',
    title: 'Technology and Electronics',
    description:
      'Secure, climate-appropriate storage for sensitive electronic components, devices, and high-value technology products.',
  },
];

export const WAREHOUSE_INDUSTRIES = {
  eyebrow: "Who We Work With",
  heading: "Industries We Serve",
  description: "Zajel's warehousing adapts to the operational, compliance, and storage requirements of each industry we serve.",
  items: WAREHOUSE_INDUSTRIES_INDUSTRIES,
  ctaLabel: "Don't see your industry?",
  ctaDescription: 'Get in touch — we tailor logistics solutions for every sector.',
  ctaTag: 'CTA',
};
export type WAREHOUSE_INDUSTRIESContent = typeof WAREHOUSE_INDUSTRIES;

export const WAREHOUSE_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: Warehouse_FAQS,
};
export type WAREHOUSE_FAQContent = typeof WAREHOUSE_FAQ;
