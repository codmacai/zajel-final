import type { LucideIcon } from 'lucide-react';

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: string;
  imageAlt: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
}

export interface FeatureSectionContent {
  title: string;
  /** Optional green tail of the heading */
  highlight?: string;
  description: string;
  features: FeatureItem[];
}

export interface ProtocolCard {
  Icon: LucideIcon;
  title: string;
  content: string;
}

export interface ProtocolSectionContent {
  title: string;
  subtitle: string;
  cards: ProtocolCard[];
}
