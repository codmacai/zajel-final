// components/SeaFreight/SeaFreightHero/SeaFreightHero.tsx
import type { FC } from "react";
import DynamicHero, {
  type DynamicHeroContent,
} from "@/components/FreightHero/dynamic-hero";
import { serverSection } from '@/lib/cms/server';
import { SEA_HERO } from './content';

export type SeaFreightHeroContent = DynamicHeroContent;

const icon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.2V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 13a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 10.5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

interface Props {
  content: SeaFreightHeroContent;
  isRtl?: boolean;
}

const SeaFreightHero: FC<Props> = ({ content, isRtl }) => (
  <DynamicHero
    id="sea-freight-hero"
    content={content}
    icon={icon}
    isRtl={isRtl}
    singleLineTitle
  />
);

export default serverSection('sea-freight.hero', SEA_HERO, SeaFreightHero);
