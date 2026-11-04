// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { CTABannerProps } from '@/components/shared/CTABanner';
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
