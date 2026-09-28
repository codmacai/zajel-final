import type { SVGProps } from 'react';

export function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

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

export function PickupIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5v-7Z" />
      <path d="M3.8 8.3 12 12.7l8.2-4.4" />
      <path d="M12 12.7V20" />
      <path d="M7.7 6.1 16 10.6" />
    </svg>
  );
}

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M11.5 18.5h1" />
    </svg>
  );
}

export function TrackingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s7-6.2 7-11.4A7 7 0 0 0 5 9.6C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.6" r="2.4" />
    </svg>
  );
}

export function CoverageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function ExperienceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
      <path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" />
    </svg>
  );
}

export function CleanBoltIcon({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true" {...props}>
      <path
        d="M54 16L28 52H48L42 84L72 48H52L54 16Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CleanGlobeIcon({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="50" cy="50" rx="14" ry="34" stroke="currentColor" strokeWidth="2.5" />
      <line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20.5 34.5C28 40 38.5 43 50 43C61.5 43 72 40 79.5 34.5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20.5 65.5C28 60 38.5 57 50 57C61.5 57 72 60 79.5 65.5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
