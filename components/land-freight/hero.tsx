// components/LandFreight/LandFreightHero/LandFreightHero.tsx
import type { FC } from "react";
import DynamicHero, {
  type DynamicHeroContent,
} from "@/components/FreightHero/dynamic-hero";
import { serverSection } from '@/lib/cms/server';
import { LAND_HERO } from './content';

export type LandFreightHeroContent = DynamicHeroContent;

const icon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

interface Props {
  content: LandFreightHeroContent;
  isRtl?: boolean;
}

const LandFreightHero: FC<Props> = ({ content, isRtl }) => (
  <DynamicHero id="land-freight-hero" content={content} icon={icon} isRtl={isRtl} />
);

export default serverSection('land-freight.hero', LAND_HERO, LandFreightHero);
