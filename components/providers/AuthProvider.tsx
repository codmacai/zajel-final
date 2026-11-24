'use client';

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { apiFetch, refreshAccessToken } from '@/lib/api/client';
import { tokenStore } from '@/lib/auth/tokenStore';

interface AuthContextValue {
  /**
   * False until the session has been read from localStorage on the client and, when there is
   * no stored token, the one-time silent refresh attempt has finished. Guards (RequireAuth,
   * the /login redirect) wait for this so they never act on the server/hydration snapshot.
   */
  ready: boolean;
  isAuthenticated: boolean;
  /** True when a phone was OTP-verified but has no registered account yet (Zajel.ZAPP.API
   * returns 200 + an empty token for this case) — not a real session, but enough to show a
   * "finish your profile" state instead of treating it as signed-out. */
  isPendingRegistration: boolean;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  /** firstName + lastName, falling back to phone, then email — whatever identity we have. */
  displayName: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const subscribeNoop = () => () => {};

export function AuthProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(tokenStore.subscribe, tokenStore.get, tokenStore.getServerSnapshot);
  // false during SSR and hydration, true on the client afterwards — without an effect.
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [refreshSettled, setRefreshSettled] = useState(false);

  const hasValidToken = hydrated && !!tokenStore.getAccessToken();
  // An OTP-verified-but-unregistered phone (accessToken '') has nothing to refresh.
  const pendingRegistration = !!state && !state.accessToken;
  const needsRefresh = hydrated && !hasValidToken && !pendingRegistration;

  // When there's no usable token (none stored, or an expired one), try the httpOnly refresh
  // cookie once — e.g. the user navigated straight to /send-shipment after logging in earlier.
  useEffect(() => {
    if (!needsRefresh || refreshSettled) return;
    let cancelled = false;
    refreshAccessToken()
      .catch(() => false)
      .finally(() => {
        if (!cancelled) setRefreshSettled(true);
      });
    return () => {
      cancelled = true;
    };
  }, [needsRefresh, refreshSettled]);

  const ready = hydrated && (!needsRefresh || refreshSettled);

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      // Reuses tokenStore's own expiry check (getAccessToken returns null once expired).
      isAuthenticated: hasValidToken,
      isPendingRegistration: pendingRegistration,
      email: state?.email ?? null,
      phone: state?.phone ?? null,
      firstName: state?.firstName ?? null,
      lastName: state?.lastName ?? null,
      displayName:
        state?.firstName || state?.lastName
          ? [state?.firstName, state?.lastName].filter(Boolean).join(' ')
          : (state?.phone ?? state?.email ?? null),
      logout: async () => {
        try {
          await apiFetch('/api/auth/logout', { method: 'POST', skipAuthRetry: true });
        } catch {
          // Network failure on logout — still clear the local session below.
        } finally {
          tokenStore.set(null);
        }
      },
    }),
    [state, ready, hasValidToken, pendingRegistration],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within an AuthProvider');
  return ctx;
}
