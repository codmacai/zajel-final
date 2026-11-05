import type { FC } from "react";
import DynamicHero, { type DynamicHeroContent } from "@/components/FreightHero/dynamic-hero";
import { HERO } from "./data";
import { serverSection } from "@/lib/cms/server";

// Optional fields: add them to HERO in ./data to control the highlight line and CTA.
const hero = HERO as typeof HERO & {
  titleHighlight?: string;
  ctaText?: string;
  ctaHref?: string;
};

export const PROJECTS_HERO: DynamicHeroContent = {
  badge: hero.eyebrow,
  titleLine1: hero.title,
  titleLine2: hero.titleHighlight,
  description: hero.description,
  primaryCta: {
    label: hero.ctaText ?? "Request a Quote",
    url: hero.ctaHref ?? "/support",
  },
  image_url: hero.image,
  imageAlt: hero.title,
};

const ProjectLogisticsHero: FC<{ content: DynamicHeroContent }> = ({ content }) => (
  <DynamicHero id="project-logistics-hero" content={content} />
);

export default serverSection('projects.hero', PROJECTS_HERO, ProjectLogisticsHero);