// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { CTABannerProps } from '@/components/shared/CTABanner';
export const ABOUT_CTA: CTABannerProps = {
  image: "/zajel-courier-hero.webp",
  imageAlt: "Courier delivering a package doorstep to doorstep in the UAE",
  title: "Zajel — intelligent movement,",
  description: "For everyone who needs something moved..",
  buttons: [
                { label: "Explore Our Solutions", href: "/#solutions", variant: "primary" },
                { label: "Careers at Zajel", href: "/careers", variant: "secondary" },
                { label: "Get in Touch", href: "/support", variant: "secondary" },
              ],
};
