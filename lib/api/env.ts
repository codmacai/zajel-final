// Browser-visible config for the real backend calls (auth, account, shipments, maps).
// Defaults mirror the Zajel-2 React app's .env / .env.development, so nothing has to be
// configured to talk to the real APIs. NEXT_PUBLIC_* overrides are inlined at build time.
//
// Server-only secrets (the YARP tracking API key) are NOT here — see lib/tracking/server.ts.

const isDev = process.env.NODE_ENV === 'development';

export const clientEnv = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || '/services/prepaid',
  /** HTTP-referrer-restricted browser key with Maps JS (Places) + Maps Static API enabled. */
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
};
