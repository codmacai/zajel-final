// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { InternationalHeroContent } from './hero';
import type { CTABannerProps } from '@/components/shared/CTABanner';
// Fallback until the CMS entry is ready.
export const INTERNATIONAL_HERO: InternationalHeroContent = {
  eyebrow: "International Shipping",
  title: "International Shipping UAE: Doorstep Delivery to 195 Countries",
  description:
    "Documents or packages, delivered in 3–5 days. Customs handled end to end, with tracking and a delivery arrangement that fits your shipment.",
  image_url: "/international/international-air-cargo-hero.webp",
};

export const INTERNATIONAL_CTA: CTABannerProps = {
  image: "/zajel-courier-hero.webp",
  imageAlt: "Zajel courier handing over an international shipment",
  title: "Book International Shipping in Minutes",
  description: "Declare your document's weight and pay instantly, or request a quote for your package, book on zajel.com, or download the app for booking on the go.",
  buttons: [
    { label: "Ship Internationally", href: "/send-shipment", variant: "primary" },
    { label: "Download the Zajel App", href: "/#download-app", variant: "secondary" },
  ],
};
