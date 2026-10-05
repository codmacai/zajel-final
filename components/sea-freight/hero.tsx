// components/SeaFreight/SeaFreightHero/SeaFreightHero.tsx
import type { FC } from "react";
import DynamicHero, {
  type DynamicHeroContent,
} from "@/components/FreightHero/dynamic-hero";

export type SeaFreightHeroContent = DynamicHeroContent;

// Fallback until the CMS entry is ready.
const defaultContent: SeaFreightHeroContent = {
  badge: "Sea Freight, FCL & LCL",
  titleLine1: "Port to port,",
  titleLine2: "priced plainly.",
  description:
    "Weekly sailings through Jebel Ali and Khalifa Port with in-house clearance, bonded storage and the inland leg included on arrival.",
  primaryCta: { label: "Book space", url: "/contact" },
  secondaryCta: { label: "Ask for the schedule", url: "/contact" },
  image_url: "/sea-freight/ChatGPT Image Apr 24, 2026 at 01_16_23 PM.webp",
  imageAlt: "Container ship loaded with cargo containers at sea",
};

const icon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.2V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 13a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 10.5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

interface Props {
  content?: SeaFreightHeroContent;
  isRtl?: boolean;
}

const SeaFreightHero: FC<Props> = ({ content = defaultContent, isRtl }) => (
  <DynamicHero
    id="sea-freight-hero"
    content={content}
    icon={icon}
    isRtl={isRtl}
    singleLineTitle
  />
);

export default SeaFreightHero;