import type { SVGProps } from 'react';

export function CheckIcon({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 mt-[3px] ${className}`}
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function EcommerceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}

export function AirFreightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2 11 13" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

export function SeaFreightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="12" cy="5" r="2.6" />
      <path strokeLinecap="round" d="M12 7.6V21" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </svg>
  );
}

export function LandFreightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 4h13v11H1z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 9h4l3.5 3.5V15H14z" />
      <circle cx="5.5" cy="17.5" r="2" />
      <circle cx="17.5" cy="17.5" r="2" />
    </svg>
  );
}

export function QuoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5v-7Z" />
      <path d="M3.8 8.3 12 12.7l8.2-4.4" />
      <path d="M12 12.7V20" />
      <path d="M7.7 6.1 16 10.6" />
    </svg>
  );
}

export function TeamIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M2.8 20c0-3.6 2.8-6.2 6.2-6.2s6.2 2.6 6.2 6.2" />
      <circle cx="17" cy="8.5" r="2.3" />
      <path d="M15.6 13.9c2.6.4 4.6 2.6 4.6 6.1" />
    </svg>
  );
}

export function CalculatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4.5" y="2.5" width="15" height="19" rx="2.2" />
      <line x1="7.5" y1="6.5" x2="16.5" y2="6.5" />
      <line x1="7.5" y1="11" x2="7.5" y2="11" />
      <line x1="12" y1="11" x2="12" y2="11" />
      <line x1="16.5" y1="11" x2="16.5" y2="11" />
      <line x1="7.5" y1="15" x2="7.5" y2="15" />
      <line x1="12" y1="15" x2="12" y2="15" />
      <line x1="16.5" y1="15" x2="16.5" y2="15" />
      <line x1="7.5" y1="19" x2="7.5" y2="19" />
      <line x1="12" y1="19" x2="16.5" y2="19" />
    </svg>
  );
}

// Decorative service-card marks — large, layered silhouettes used inside
// the dark/gradient service cards. Built from stacked shapes at varying
// fill/stroke opacity so each reads as a single dimensional icon while
// staying one hue (currentColor), so it tints correctly on either card
// background. viewBox kept small (0 0 100 100) since these only ever
// render as inline SVG at fixed pixel sizes — no image request, no
// layout shift, zero network cost.

export function CleanBoxIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path d="M50 15 L86 35 L50 55 L14 35 Z" fill="currentColor" fillOpacity="0.95" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M14 35 L50 55 L50 95 L14 75 Z" fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M86 35 L50 55 L50 95 L86 75 Z" fill="currentColor" fillOpacity="0.72" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <line x1="50" y1="15" x2="50" y2="95" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.9" />
      <path d="M28 43 L37 47.5 M63 47.5 L72 43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
      <rect x="60" y="60" width="18" height="12" rx="1.5" fill="currentColor" fillOpacity="0.9" />
      <line x1="63" y1="64" x2="75" y2="64" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="63" y1="67.5" x2="72" y2="67.5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
}

export function CleanPlaneIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M87.5 66.667V58.333L54.167 37.5V14.583C54.167 11.125 51.375 8.333 47.917 8.333C44.458 8.333 41.667 11.125 41.667 14.583V37.5L8.333 58.333V66.667L41.667 56.25V79.167L31.25 85.417V91.667L47.917 87.5L64.583 91.667V85.417L54.167 79.167V56.25L87.5 66.667Z"
        fill="currentColor"
        fillOpacity="0.92"
      />
    </svg>
  );
}

export function CleanShipIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path d="M6 72 L94 72 L83 90 L17 90 Z" fill="currentColor" fillOpacity="0.95" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path
        d="M2 93 Q10 89 18 93 T34 93 T50 93 T66 93 T82 93 T98 93"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <rect x="13" y="50" width="13" height="22" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="0.75" />
      <rect x="28" y="50" width="13" height="22" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.75" />
      <rect x="43" y="50" width="13" height="22" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="0.75" />
      <rect x="58" y="50" width="13" height="22" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.75" />
      <rect x="20" y="28" width="13" height="22" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="0.75" />
      <rect x="35" y="28" width="13" height="22" fill="currentColor" fillOpacity="0.65" stroke="currentColor" strokeWidth="0.75" />
      <rect x="50" y="28" width="13" height="22" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="0.75" />
      <rect x="76" y="16" width="15" height="34" rx="1.5" fill="currentColor" fillOpacity="0.95" />
      <rect x="79.5" y="22" width="3.5" height="4" fill="currentColor" fillOpacity="0.25" />
      <rect x="85" y="22" width="3.5" height="4" fill="currentColor" fillOpacity="0.25" />
      <line x1="88" y1="16" x2="88" y2="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round" />
    </svg>
  );
}

export function CleanTruckIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="26" width="54" height="36" rx="3" fill="currentColor" fillOpacity="0.9" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="30" x2="20" y2="58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="34" y1="30" x2="34" y2="58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="48" y1="30" x2="48" y2="58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      <path
        d="M60 62 L60 40 L67 40 L67 33 C67 31 69 29 72 29 L79 29 C83 29 87 33 89 39 L92 48 L92 62 Z"
        fill="currentColor"
        fillOpacity="0.95"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M70 33 L78 31 L86 40 L70 40 Z" fill="currentColor" fillOpacity="0.3" />
      <circle cx="89" cy="55" r="2.2" fill="currentColor" fillOpacity="0.85" />
      <line x1="94" y1="46" x2="94" y2="34" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
      {[22, 46, 80].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 11} 65 A11 8 0 0 1 ${cx + 11} 65`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" strokeLinecap="round" />
          <circle cx={cx} cy="70" r="8.5" fill="currentColor" fillOpacity="0.95" />
          <circle cx={cx} cy="70" r="3.4" fill="currentColor" fillOpacity="0.3" />
        </g>
      ))}
    </svg>
  );
}
