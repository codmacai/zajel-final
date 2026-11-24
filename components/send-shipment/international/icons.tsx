// Custom product-type icons for the international wizard — JSX needs a .tsx file, so these
// live separately from data.ts (a plain .ts module) and are imported into PRODUCT_TYPE_OPTIONS.

/** Flat, brand-coloured document icon — used instead of lucide's plain FileText. */
export function DocumentIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M9 3h11l6 6v18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        fill="#2BA735"
        fillOpacity="0.16"
        stroke="#064423"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M20 3v5a1 1 0 0 0 1 1h5" fill="#2BA735" fillOpacity="0.4" stroke="#064423" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11.5 16.5h10M11.5 20.5h10M11.5 24.5h6" stroke="#36B936" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Flat, isometric parcel icon in brand green tones — used instead of lucide's plain Package. */
export function ParcelIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M21.0489 14.0197L8.97588 11.6097L10.5849 10.5547L26.5469 13.6197L21.9979 19.5897L21.0489 14.0197Z" fill="#354C07" />
      <path opacity="0.5" d="M2.55294 10.3239L2.12194 8.78394L9.71894 5.08594L10.5859 10.5509L8.97694 11.6059L2.55294 10.3239Z" fill="#2BA735" />
      <path
        opacity="0.7"
        d="M22 26.9148L4.205 21.7498L3.855 14.9688L22 19.5888V26.9148ZM9.87 20.6047L4.635 19.2708L6.139 19.6537L9.696 20.5597L9.87 20.6047Z"
        fill="#2BA735"
      />
      <path d="M8.976 11.6097L21.05 14.0197L22 19.5897L3.854 14.9697L1.188 10.0547L2.553 10.3267L8.976 11.6097Z" fill="#2BA735" />
      <path d="M26.5469 17.375V19.915L21.9979 26.914V19.588L26.5469 17.375Z" fill="#2BA735" />
      <path
        opacity="0.5"
        d="M26.5475 13.6156L30.8125 11.5156L28.3805 16.4816L26.5475 17.3736L21.9985 19.5866L26.5475 13.6156Z"
        fill="#2BA735"
      />
      <path opacity="0.5" d="M12.6204 5.82031L28.6484 8.32031L26.5494 13.6183L10.5874 10.5523L12.6204 5.82031Z" fill="#2BA735" />
    </svg>
  );
}
