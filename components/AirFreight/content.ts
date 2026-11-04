// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { AirFreightHeroContent } from './hero';
// Fallback until the CMS entry is ready.
export const AIR_HERO: AirFreightHeroContent = {
  eyebrow: "Air Freight",
  title: "Air Freight Forwarding: Fast, Secure Cargo by Air",
  description:
    "From standard cargo to specialized project shipments, Zajel moves it by air, with customs handled and the right delivery arrangement for your business.",
  button: "Get my rate",
  ctaLink: "/support",
  image_url: "/international/international-air-cargo-hero.webp",
};

export const AIR_BANNER = {
  imageSrc: "/airfreight/wind-turbine-blade-transport.webp",
  imageAlt: "Oversized project cargo being loaded",
  heading: "Oversized & project cargo, handled by specialists",
  description: "When standard freight solutions won't cut it, our project logistics team steps in, planning, permitting, and moving cargo too large, heavy, or complex for conventional shipping.",
  projectLabel: 'Wind Turbine Blade Transport',
  ctaLabel: 'Explore project',
  ctaHref: '/projects',
  eyebrow: "Project Logistics",
};
export type AIR_BANNERContent = typeof AIR_BANNER;
