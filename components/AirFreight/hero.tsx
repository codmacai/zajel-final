// components/AirFreight/AirFreightHero/AirFreightHero.tsx
import type { FC } from "react";
import DynamicHero from "@/components/FreightHero/dynamic-hero";
import { serverSection } from '@/lib/cms/server';
import { AIR_HERO } from './content';

export interface AirFreightHeroContent {
  eyebrow?: string;
  title: string;
  description: string;
  button: string;
  ctaLink: string;
  image_url: string;
}

const icon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

interface Props {
  content: AirFreightHeroContent;
  isRtl?: boolean;
}

const AirFreightHero: FC<Props> = ({ content, isRtl }) => (
  <DynamicHero
    id="air-freight-hero"
    isRtl={isRtl}
    icon={icon}
    content={{
      badge: content.eyebrow,
      titleLine1: content.title,
      description: content.description,
      primaryCta: { label: content.button, url: content.ctaLink },
      image_url: content.image_url,
      imageAlt: "Cargo being loaded onto an air freight aircraft",
    }}
  />
);

export default serverSection('air-freight.hero', AIR_HERO, AirFreightHero);
