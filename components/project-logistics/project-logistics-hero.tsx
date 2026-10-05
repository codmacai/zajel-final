import type { FC } from "react";
import DynamicHero, { type DynamicHeroContent } from "@/components/FreightHero/dynamic-hero";
import { HERO } from "./data";

// Optional fields: add them to HERO in ./data to control the highlight line and CTA.
const hero = HERO as typeof HERO & {
  titleHighlight?: string;
  ctaText?: string;
  ctaHref?: string;
};

const content: DynamicHeroContent = {
  badge: hero.eyebrow,
  titleLine1: hero.title,
  titleLine2: hero.titleHighlight,
  description: hero.description,
  primaryCta: {
    label: hero.ctaText ?? "Request a Quote",
    url: hero.ctaHref ?? "/quotation",
  },
  image_url: hero.image,
  imageAlt: hero.title,
};

const ProjectLogisticsHero: FC = () => (
  <DynamicHero id="project-logistics-hero" content={content} />
);

export default ProjectLogisticsHero;