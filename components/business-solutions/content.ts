// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { CTABannerProps } from '@/components/shared/CTABanner';
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
