// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { LandFreightHeroContent } from './hero';
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
