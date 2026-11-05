// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { CTABannerProps } from '@/components/shared/CTABanner';
import * as Business from './data';
export const BUSINESS_CTA: CTABannerProps = {
  image: "/zajel-courier-hero.webp",
  imageAlt: "Courier delivering a package doorstep to doorstep in the UAE",
  title: "Ready to Scale",
  description: "Get a quote, talk to our logistics team or calculate your shipping rate, however you want to start.We're ready",
  buttons: [
                { label: "Get a quote", href: "/support", variant: "primary" },
                { label: "Talk to our team", href: "/support", variant: "secondary" },
              ],
};

export const BUSINESS_HERO = {
  hero: Business.heroData,
};
export type BUSINESS_HEROContent = typeof BUSINESS_HERO;

export const BUSINESS_SERVICES = {
  heading: "Built to Move Every Kind of Business",
  cards: Business.serviceCards,
};
export type BUSINESS_SERVICESContent = typeof BUSINESS_SERVICES;

export const BUSINESS_VALUE_ADDED = {
  heading: "More Ways We Support Your Business",
  learnMoreLabel: "Learn More",
  quoteLabel: "Request a Quote",
  contactLabel: "Contact Us for Special Cargo Requirements",
  services: Business.valueAddedServices,
};
export type BUSINESS_VALUE_ADDEDContent = typeof BUSINESS_VALUE_ADDED;

export const BUSINESS_BUILT_FOR = {
  eyebrow: "Enterprise Solutions",
  heading: "Built for the Way You Do Business",
  blocks: Business.builtForBlocks,
};
export type BUSINESS_BUILT_FORContent = typeof BUSINESS_BUILT_FOR;

export const BUSINESS_TECHNOLOGY = {
  text: Business.technologyContent,
  features: Business.technologyFeatures,
};
export type BUSINESS_TECHNOLOGYContent = typeof BUSINESS_TECHNOLOGY;

export const BUSINESS_WHY = {
  header: Business.whyChooseHeader,
  items: Business.choiceItems,
};
export type BUSINESS_WHYContent = typeof BUSINESS_WHY;
