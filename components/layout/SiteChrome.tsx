'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Pages that render standalone, without the site navbar/footer — e.g. the printable shipment
// receipt, so "Print / Save as PDF" produces a clean document (Zajel-2 rendered that route
// outside its PublicLayout for the same reason).
const STANDALONE_PATHS = [/^\/account\/shipments\/[^/]+\/receipt\/?$/];

export function isStandalonePath(pathname: string | null): boolean {
  return !!pathname && STANDALONE_PATHS.some((re) => re.test(pathname));
}

/** Renders the site chrome (navbar / footer) except on standalone pages. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return isStandalonePath(pathname) ? null : <>{children}</>;
}
