'use client';

import { useRouter } from 'next/navigation';

/** Where every "Get a quote" / "Contact us" CTA goes while the contact page is hidden. */
export const SUPPORT_HREF = '/support';

/**
 * Many sections expose optional `onGetQuote` / `onRequestQuote` / `onContactSupport` callbacks
 * that no page passes, which left those buttons doing nothing. This returns the given handler,
 * or a default that opens the support center.
 */
export function useSupportAction(handler?: () => void): () => void {
  const router = useRouter();
  return handler ?? (() => router.push(SUPPORT_HREF));
}
