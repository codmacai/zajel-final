// components/LandFreight/LandFreightHero/LandFreightHero.tsx
import type { FC } from "react";
import DynamicHero, {
  type DynamicHeroContent,
} from "@/components/FreightHero/dynamic-hero";

export type LandFreightHeroContent = DynamicHeroContent;

// Fallback default content
const defaultContent: LandFreightHeroContent = {
  badge: "Land Freight, FTL & LTL",
  titleLine1: "Full loads,",
  titleLine2: "borders handled.",
  description:
    "FTL and LTL across the Emirates and into Saudi, Oman and Kuwait, one waybill, one contact, manifests filed before you reach the border.",
  primaryCta: { label: "Book a truck", url: "/contact" },
  secondaryCta: { label: "View coverage", url: "/network" },
  image_url: "/land-freight/hero/ChatGPT Image Sep 9, 2026, 12_08_04 PM.webp",
  imageAlt: "Land Freight Trucking",
};

const icon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

interface Props {
  content?: LandFreightHeroContent;
  isRtl?: boolean;
}

const LandFreightHero: FC<Props> = ({ content = defaultContent, isRtl }) => (
  <DynamicHero id="land-freight-hero" content={content} icon={icon} isRtl={isRtl} />
);

export default LandFreightHero;