import type { LucideIcon } from "lucide-react";

export interface ServiceHeroIconStat {
  type: "icon";
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export interface ServiceHeroNumericStat {
  type: "numeric";
  value: number | string;
  suffix?: string;
  label: string;
  /** Animate with CountUp. Defaults to true when value is a number, false otherwise. */
  animate?: boolean;
}

export type ServiceHeroStat = ServiceHeroIconStat | ServiceHeroNumericStat;

export interface ServiceHeroData {
  /** Unique key, also used as the React key when a page renders more than one hero */
  slug: string;

  /** Eyebrow badge text shown above the heading */
  badgeText: string;

  /** The heading is always two lines: a plain line and a brand-green highlighted line */
  headingPrimary: string;
  headingHighlight: string;
  /** "standard" matches customs/warehouse/industry sizing, "large" matches the network page */
  headingSize?: "standard" | "large";

  /** Two supporting paragraphs: a stronger lead line and a lighter detail line */
  leadParagraph: string;
  detailParagraph: string;

  ctaText: string;
  ctaHref: string;
  /** "circle" = green pill with a circular arrow badge, "arrow" = pill with an inline arrow icon */
  ctaVariant?: "circle" | "arrow";

  backgroundImage: string;
  backgroundImageAlt: string;

  /** Hex value for the card's base background, e.g. "#0B140F" */
  cardBg: string;
  /** Tailwind class for the section background, e.g. "bg-white" or "bg-[#F9FAFB]" */
  sectionBg: string;
  /** 0–1 opacity applied to the background image (defaults to 1) */
  imageOpacity?: number;
  /** "standard" = dot grain + side/bottom gradients, "network" = denser dot grain + top-to-bottom gradient only */
  overlayVariant?: "standard" | "network";
  /** Adds the two soft blurred glow orbs used on the warehousing page */
  showGlowOrbs?: boolean;

  /** Renders as an icon-based dock if any entry is type "icon", otherwise a numeric CountUp dock */
  stats: ServiceHeroStat[];
}
