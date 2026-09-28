import type { FC } from 'react';

export const CheckIcon: FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${className}`}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
