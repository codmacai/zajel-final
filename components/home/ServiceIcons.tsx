import type { JSX } from "react";

export const IndividualIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M3 20h34M20 3c4.2 4.6 6.5 10.8 6.5 17S24.2 33.4 20 38c-4.2-4.6-6.5-10.8-6.5-17S15.8 7.6 20 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

export const BusinessIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M4 16l16-9 16 9-16 9-16-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M9 19.5V29c0 1 6 4 11 4s11-3 11-4v-9.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M35 16v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const SecureIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path
      d="M20 4l14 5v9c0 9.5-6 15.8-14 18-8-2.2-14-8.5-14-18V9l14-5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M14 20l4 4 8-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M7 17L17 7M17 7H9M17 7V15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);