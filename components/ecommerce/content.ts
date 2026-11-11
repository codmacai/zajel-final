// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { EcommerceHeroContent } from './hero';
import type { CTABannerProps } from '@/components/shared/CTABanner';
import * as BusinessGets from './business-gets/data';
import * as Cod from './cod-section/data';
import * as Dashboard from './dashboard-reporting/data';
import * as Integrations from './platform-integrations/data';
import * as Pricing from './shipping-tiers/data';
import { Ecommerce_Faqs } from '@/data/ecommerce-faqs';
// Fallback until the CMS entry is ready.
export const ECOMMERCE_HERO: EcommerceHeroContent = {
  eyebrow: "E-commerce Logistics",
  title: "E-commerce Logistics Solutions: Delivery Built for Online Sellers",
  description:
    "Cash on Delivery collection, a dedicated account manager, and nationwide delivery: everything an online seller needs from a logistics partner, in one place.",
  image_url: "/ecommerce/ecommerce-hero.webp",
};

export const ECOMMERCE_CTA: CTABannerProps = {
  image: "/zajel-courier-hero.webp",
  imageAlt: "Courier delivering a package doorstep to doorstep in the UAE",
  title: "Ecommerce Logistics.",
  description: "Built for how online sellers in UAE actually operate.",
  buttons: [
                { label: "Get a Quote", href: "/support", variant: "primary" },
                { label: "Talk to our team", href: "/support", variant: "secondary" },
                
              ],
};

export const ECOMMERCE_BENEFITS = {
  eyebrow: "Core Benefits",
  heading: BusinessGets.HEADING,
  cards: BusinessGets.BUSINESS_CARDS,
};
export type ECOMMERCE_BENEFITSContent = typeof ECOMMERCE_BENEFITS;

export const ECOMMERCE_COD = {
  headingBefore: "Cash on Delivery remains a core preference in the UAE — Zajel",
  headingHighlight: "collects and remits funds seamlessly",
  headingAfter: "so your business avoids all cash handling friction.",
  eyebrow: Cod.EYEBROW,
  rows: Cod.ROWS,
};
export type ECOMMERCE_CODContent = typeof ECOMMERCE_COD;

export const ECOMMERCE_DASHBOARD = {
  imageAlt: "Zajel Merchant Dashboard Preview",
  eyebrow: Dashboard.EYEBROW,
  heading: Dashboard.HEADING,
  intro: Dashboard.INTRO,
  image: Dashboard.DASHBOARD_IMAGE,
  features: Dashboard.FEATURES,
};
export type ECOMMERCE_DASHBOARDContent = typeof ECOMMERCE_DASHBOARD;

export const ECOMMERCE_INTEGRATIONS = {
  eyebrow: Integrations.EYEBROW,
  heading: Integrations.HEADING,
  intro: Integrations.INTRO,
  integrations: Integrations.INTEGRATIONS,
  api: Integrations.API_ACCESS,
};
export type ECOMMERCE_INTEGRATIONSContent = typeof ECOMMERCE_INTEGRATIONS;

export const ECOMMERCE_PRICING = {
  recommendedLabel: 'Recommended',
  eyebrow: Pricing.EYEBROW,
  headingLine1: Pricing.HEADING_LINE_1,
  headingLine2: Pricing.HEADING_LINE_2,
  intro: Pricing.INTRO,
  footnote: Pricing.FOOTNOTE,
  tiers: Pricing.TIERS,
};
export type ECOMMERCE_PRICINGContent = typeof ECOMMERCE_PRICING;

export const ECOMMERCE_GETTING_STARTED = {
  eyebrow: "Onboarding",
  description: "From setup to delivery — a straightforward path to shipping with us.",
  footnote: "Dedicated support at every step",
  headingLine1: "Getting Started",
  headingLine2: "Is Simple",
  steps: [
      {
        number: '01',
        title: 'Get Onboarded',
        description: 'Set up with your dedicated account manager.',
      },
      {
        number: '02',
        title: 'Submit Orders',
        description: 'Book and manage orders through the Zajel portal.',
      },
      {
        number: '03',
        title: 'We Deliver',
        description: 'Orders are delivered, COD is collected, and remitted to you.',
      },
    ],
};
export type ECOMMERCE_GETTING_STARTEDContent = typeof ECOMMERCE_GETTING_STARTED;

export const ECOMMERCE_HOW = {
  eyebrow: "On-Demand Delivery",
  description: "From locations to doorstep — a straightforward three-step process.",
  headingLine1: "Book On-Demand",
  headingLine2: "Delivery in Three Steps",
  steps: [
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
    ],
};
export type ECOMMERCE_HOWContent = typeof ECOMMERCE_HOW;

export const ECOMMERCE_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: Ecommerce_Faqs,
};
export type ECOMMERCE_FAQContent = typeof ECOMMERCE_FAQ;
