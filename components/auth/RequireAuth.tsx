'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { loginHref } from '@/lib/auth/returnUrl';

/**
 * Client-side route guard — redirects to /login (with a returnUrl) when the user isn't signed
 * in. OTP-verified-but-unregistered users (isPendingRegistration) are let through, matching
 * the React app: /account shows them a "finish your profile" state.
 *
 * The session lives in localStorage + an httpOnly refresh cookie on the API's domain, so the
 * Next server can't see it — that's why this guard is client-side rather than in proxy.ts.
 */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { ready, isAuthenticated, isPendingRegistration } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Pending-registration users must be let through: /login treats them as signed in and would
  // bounce them straight back here, so redirecting them would loop. Pages show their own
  // "finish your profile" state for them instead.
  const allowed = isAuthenticated || isPendingRegistration;

  useEffect(() => {
    if (!ready || allowed) return;
    const query = searchParams?.toString();
    router.replace(loginHref(query ? `${pathname}?${query}` : pathname));
  }, [ready, allowed, pathname, searchParams, router]);

  if (!ready || !allowed) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center pt-28" aria-busy="true">
        <Loader2 className="h-6 w-6 animate-spin text-[#36B936]" aria-label="Loading" />
      </div>
    );
  }

  return <>{children}</>;
}
