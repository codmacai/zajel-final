"use client";

import type { SVGProps } from "react";
import DynamicSolutions from "@/components/freightsolutions/DynamicSolutions";
import type { SolutionCard } from "@/components/freightsolutions/types";
import { FREIGHT_CARDS } from "@/data/air-freight/solutions";
import type { FreightCard } from "@/data/air-freight/solutions";

const HEADING = "Our Air Freight Solutions";
const SUBHEADING =
  "Reliable, high-speed air cargo charters and scheduled network routing designed to keep your supply chain moving globally without interruption.";

const iconBase: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  xmlns: "http://www.w3.org/2000/svg",
};

type IconProps = { className?: string; strokeWidth?: number };

const PlaneIcon = ({ className, strokeWidth = 1.75 }: IconProps) => (
  <svg {...iconBase} className={className} strokeWidth={strokeWidth}>
    <path d="M17.8 19.2 16 11l3.5-3.5c.7-.7.7-1.8 0-2.5s-1.8-.7-2.5 0L13.5 8.5 5.3 6.7c-.4-.1-.9 0-1.2.3l-.5.5c-.4.4-.3 1 .2 1.3l6 3.6-3 3-2.3-.5c-.3-.1-.6 0-.8.2l-.3.3c-.3.3-.3.8.1 1l3 1.8 1.8 3c.2.4.7.4 1 .1l.3-.3c.2-.2.3-.5.2-.8l-.5-2.3 3-3 3.6 6c.3.5.9.6 1.3.2l.5-.5c.3-.3.4-.8.3-1.2Z" />
  </svg>
);

const CharterIcon = ({ className, strokeWidth = 1.75 }: IconProps) => (
  <svg {...iconBase} className={className} strokeWidth={strokeWidth}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9H21" />
    <path d="M8 2V6" />
    <path d="M16 2V6" />
    <path d="M8 14L10.5 16.5L16 11" />
  </svg>
);

const AogIcon = ({ className, strokeWidth = 1.75 }: IconProps) => (
  <svg {...iconBase} className={className} strokeWidth={strokeWidth}>
    <path d="M12 2 2 21H22L12 2Z" />
    <path d="M12 9V14" />
    <path d="M12 17.5H12.01" />
  </svg>
);

const ICONS_BY_ID: Record<FreightCard["id"], SolutionCard["Icon"]> = {
  standard: PlaneIcon,
  charter: CharterIcon,
  aog: AogIcon,
};

const CARDS: SolutionCard[] = FREIGHT_CARDS.map((card) => ({
  ...card,
  Icon: ICONS_BY_ID[card.id] ?? PlaneIcon,
}));

export default function AirFreightSolutions() {
  return (
    <DynamicSolutions
      heading={HEADING}
      subheading={SUBHEADING}
      cards={CARDS}
      columns={3}
      bgClassName="bg-white"
    />
  );
}