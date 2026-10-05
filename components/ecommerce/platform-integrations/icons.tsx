import Image from 'next/image';
import type { FC } from 'react';

// ---------------------------------------------------------------------------
// Icons / marks
// ---------------------------------------------------------------------------
export const CheckIcon: FC<{ className?: string }> = ({ className = '' }) => (
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
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Decorative watermark logos. next/image needs explicit intrinsic dimensions;
// the wrapping className still controls the rendered size responsively.
export const ShopifyMark: FC<{ className?: string }> = ({ className = '' }) => (
  <Image
    src="/ecommerce/shopify_glyph_white.svg"
    alt=""
    aria-hidden="true"
    width={160}
    height={160}
    className={className}
  />
);

export const WooMark: FC<{ className?: string }> = ({ className = '' }) => (
  <Image
    src="/ecommerce/Woo_logo_white copy.svg"
    alt=""
    aria-hidden="true"
    width={160}
    height={160}
    className={className}
  />
);
