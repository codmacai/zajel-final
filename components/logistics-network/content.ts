// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import { REGIONAL_COVERAGE_COLUMNS, REGIONAL_COVERAGE_HEADING, REGIONAL_COVERAGE_INTRO } from '@/data/regional-coverage';
import { FREIGHT_SERVICES, FREIGHT_SERVICES_EYEBROW, FREIGHT_SERVICES_HEADING } from '@/data/freight-services';
import { STRATEGIC_ALLIANCES, STRATEGIC_ALLIANCES_EYEBROW, STRATEGIC_ALLIANCES_HEADING, STRATEGIC_ALLIANCES_INTRO } from '@/data/strategic-alliances';
import { LOGISTICS_INFRASTRUCTURE_CARDS, LOGISTICS_INFRASTRUCTURE_EYEBROW, LOGISTICS_INFRASTRUCTURE_HEADING } from '@/data/logistics-infrastructure';
import { REACH_IN_NUMBERS_EYEBROW, REACH_IN_NUMBERS_HEADING, REACH_IN_NUMBERS_STATS } from '@/data/reach-in-numbers';
import { Network_Faq } from '@/data/Network-faqs';
import type { ContactBandProps } from '@/components/dynamic-contact';
export const NETWORK_HUB = {
  eyebrow: "Global Logistics Hub",
  heading: "A Logistics Network Built from the UAE",
  paragraph1: "Situated at the crossroads of Asia, Europe, and Africa, the UAE is one of the world’s most connected logistics hubs. Dubai serves as a primary gateway for global air cargo and maritime container traffic through Jebel Ali Port and its international airports.",
  paragraph2: "Headquartered at the center of this infrastructure, Zajel leverages the UAE’s established trade facilities and efficient customs systems for air, sea, and land shipments. This geographic advantage delivers shorter transit times to key markets across the GCC, Indian subcontinent, East Africa, and Europe—connecting your cargo onward without unnecessary repositioning or transshipment delays.",
  imageSrc: "/network/jebel-ali-port-dubai-air-cargo.webp",
  imageAlt: "Jebel Ali Port and Dubai Air Cargo Infrastructure",
};
export type NETWORK_HUBContent = typeof NETWORK_HUB;

export const NETWORK_REGIONAL = {
  heading: REGIONAL_COVERAGE_HEADING,
  intro: REGIONAL_COVERAGE_INTRO,
  columns: REGIONAL_COVERAGE_COLUMNS,
};
export type NETWORK_REGIONALContent = typeof NETWORK_REGIONAL;

export const NETWORK_FREIGHT = {
  eyebrow: FREIGHT_SERVICES_EYEBROW,
  heading: FREIGHT_SERVICES_HEADING,
  cards: FREIGHT_SERVICES,
};
export type NETWORK_FREIGHTContent = typeof NETWORK_FREIGHT;

export const NETWORK_ALLIANCES = {
  eyebrow: STRATEGIC_ALLIANCES_EYEBROW,
  heading: STRATEGIC_ALLIANCES_HEADING,
  intro: STRATEGIC_ALLIANCES_INTRO,
  cards: STRATEGIC_ALLIANCES,
};
export type NETWORK_ALLIANCESContent = typeof NETWORK_ALLIANCES;

export const NETWORK_INFRASTRUCTURE = {
  eyebrow: LOGISTICS_INFRASTRUCTURE_EYEBROW,
  heading: LOGISTICS_INFRASTRUCTURE_HEADING,
  cards: LOGISTICS_INFRASTRUCTURE_CARDS,
};
export type NETWORK_INFRASTRUCTUREContent = typeof NETWORK_INFRASTRUCTURE;

export const NETWORK_NUMBERS = {
  eyebrow: REACH_IN_NUMBERS_EYEBROW,
  heading: REACH_IN_NUMBERS_HEADING,
  stats: REACH_IN_NUMBERS_STATS,
};
export type NETWORK_NUMBERSContent = typeof NETWORK_NUMBERS;

export const NETWORK_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: Network_Faq,
};
export type NETWORK_FAQContent = typeof NETWORK_FAQ;

export const NETWORK_CONTACT: ContactBandProps = {
  badgeText: 'Global Logistics Network',
  title: 'Connect With Our Network',
  descriptionLead:
    "Whether you are shipping a single consignment to a new market or establishing regular freight routes across multiple continents, Zajel's network provides the coverage, reliability, and coordination to keep your cargo moving.",
  descriptionDetail: 'Contact our team to discuss your shipping requirements, explore route options, or request a freight quote.',
  contactInfo: {
    email: 'sales@zajel.com',
    phone: '600 53 11 11',
    address: 'Dubai Office, Al Rostamani Building, Al Ittihad Rd, E11, Dubai',
  },
  primaryCta: { label: 'Request a Freight Quote', url: '/support' },
};
