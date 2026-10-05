import type { CSSProperties, ReactNode } from "react";
import type { IndustryIconKey } from "@/data/industry-expertise";

/**
 * Minimal line icons for each industry. Drawn on a 64x64 grid with a 1.75 stroke,
 * round caps/joins and one soft-filled accent shape per icon.
 * Colour comes from CSS `color` (currentColor), so it adapts to white / green blocks.
 */
const PATHS: Record<IndustryIconKey, ReactNode> = {
  "oil-gas": (
    <>
        <path d="M32 8 L20 54 M32 8 L44 54" />
        <path d="M24.5 38 H39.5 M28 23 H36" />
        <path d="M28 23 L39.5 38 M36 23 L24.5 38" />
        <path d="M12 54 H52" />
        <circle cx="32" cy="8" r="2" fill="currentColor" fillOpacity={0.14} />
    </>
  ),
  "ecommerce": (
    <>
        <path d="M14 22 H50 L47.5 54 H16.5 Z" fill="currentColor" fillOpacity={0.14} />
        <path d="M24 22 V18 a8 8 0 0 1 16 0 V22" />
        <path d="M25 32 a7 7 0 0 0 14 0" />
    </>
  ),
  "pharma": (
    <>
        <g transform="rotate(-45 32 32)">
          <path d="M32 22 H23 a9 9 0 0 0 0 18 H32 Z" fill="currentColor" fillOpacity={0.14} stroke="none" />
          <rect x="14" y="23" width="36" height="18" rx="9" />
          <path d="M32 23 V41" />
        </g>
    </>
  ),
  "manufacturing": (
    <>
        <path d="M10 52 V30 L24 38 V30 L38 38 V14 H50 V52" fill="currentColor" fillOpacity={0.14} />
        <path d="M6 52 H58" />
    </>
  ),
  "food-beverage": (
    <>
        <path d="M20 10 V24 a6 6 0 0 0 12 0 V10" />
        <path d="M26 10 V54" />
        <path d="M46 54 V10 C39 15 37 23 37 32 H46" />
    </>
  ),
  "technology": (
    <>
        <rect x="18" y="18" width="28" height="28" rx="4" />
        <rect x="26" y="26" width="12" height="12" rx="1.5" fill="currentColor" fillOpacity={0.14} />
        <path d="M26 10 V18 M32 10 V18 M38 10 V18 M26 46 V54 M32 46 V54 M38 46 V54 M10 26 H18 M10 32 H18 M10 38 H18 M46 26 H54 M46 32 H54 M46 38 H54" />
    </>
  ),
  "government": (
    <>
        <path d="M8 26 L32 10 L56 26 Z" fill="currentColor" fillOpacity={0.14} />
        <path d="M17 32 V46 M27 32 V46 M37 32 V46 M47 32 V46" />
        <path d="M10 46 H54 M6 54 H58" />
    </>
  ),
};

interface IndustryIconProps {
  name: IndustryIconKey;
  className?: string;
  style?: CSSProperties;
}

export default function IndustryIcon({ name, className, style }: IndustryIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}