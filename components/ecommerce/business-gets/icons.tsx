// ---------------------------------------------------------------------------
// Minimal line icons (strokeWidth 1.25) — pure, server-renderable, zero JS cost.
// They use currentColor, so the card controls the color (green → white on hover).
// Size is set by the card wrapper, so width/height here are just a fallback.
// ---------------------------------------------------------------------------

const svgProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const PortalIcon = () => (
  <svg {...svgProps}>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 9H21" />
    <path d="M7 13H12" />
    <path d="M8 21H16" />
  </svg>
);

export const ManagerIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="8" r="3.25" />
    <path d="M5 20C5 16.4101 8.13401 13.5 12 13.5C15.866 13.5 19 16.4101 19 20" />
  </svg>
);

export const DeliveryIcon = () => (
  <svg {...svgProps}>
    <rect x="2" y="7" width="12" height="9" rx="1.25" />
    <path d="M14 10H17.5L21 13.5V16H14V10Z" />
    <circle cx="7" cy="18" r="1.75" />
    <circle cx="17.5" cy="18" r="1.75" />
  </svg>
);