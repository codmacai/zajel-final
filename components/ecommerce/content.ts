// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { EcommerceHeroContent } from './hero';
import type { CTABannerProps } from '@/components/shared/CTABanner';
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
