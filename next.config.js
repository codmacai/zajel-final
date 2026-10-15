// Accept the Zajel-2 (Vite) variable names too, so the React app's .env can be copied over
// unchanged: VITE_GOOGLE_MAPS_API_KEY -> NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (browser),
// VITE_YARP_* -> read server-side in lib/tracking/server.ts. VITE_API_BASE_URL is ignored on
// purpose — the API base URL already defaults to the React values (see lib/api/env.ts).
const googleMapsApiKey =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || '';

/** @type {import('next').Config} */
const nextConfig = {
    output: 'standalone',
    env: {
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: googleMapsApiKey,
    },

    allowedDevOrigins: ['172.20.10.3:3000', '172.20.10.3'],

    // Old or planned URLs that people may still link to.
    async redirects() {
      return [
        { source: '/find-us', destination: '/network', permanent: true },
        { source: '/app-download', destination: '/#download-app', permanent: false },
        { source: '/blog', destination: '/#news', permanent: false },
        // The React app's old tracking sub-pages were folded into /trackresults.
        { source: '/shipment-timeline', destination: '/trackresults', permanent: false },
        { source: '/proof-of-delivery', destination: '/trackresults', permanent: false },
        // The contact page is hidden for now — everything goes to the support center.
        { source: '/contact', destination: '/support', permanent: false },

        // Old ZAJEL_WebSite_V1 service pages, still indexed by Google and quoted by AI tools.
        // 301 (not 308/302) passes their ranking to the new pages. Next.js matches these paths
        // case-insensitively, so /Services/domestic and /services/domestic are both covered.
        // CAREFUL: /services/prepaid/* is the API proxy (app/services/prepaid) — the catch-all
        // below must never match it, or login, tickets and booking all break.
        { source: '/services/domestic', destination: '/domestic-courier', statusCode: 301 },
        { source: '/services/international', destination: '/international-courier', statusCode: 301 },
        { source: '/services/moresrv', destination: '/', statusCode: 301 },
        { source: '/services', destination: '/', statusCode: 301 },
        { source: '/services/:rest((?!prepaid(?:/|$)).*)', destination: '/', statusCode: 301 },
      ];
    },

    // Standalone legacy HTML pages carried over from Zajel-2/public (were IIS rewrites in its
    // web.config). They live in /public and are served at their old extensionless URLs.
    async rewrites() {
      return [
        { source: '/support/cancellationpolicy', destination: '/support/cancellationpolicy.html' },
        { source: '/support/privacypolicy', destination: '/support/privacypolicy.html' },
        // Noqodi redirects here after payment — the URL is fixed on their side, so it must match
        // the old MVC route exactly. IIS matched it case-insensitively; Next doesn't, so the
        // common casings are listed explicitly.
        {
          source: '/:seg(PaymentStatus|paymentstatus|paymentStatus|Paymentstatus|PAYMENTSTATUS)/:page(Verify|verify|VERIFY)',
          destination: '/PaymentStatus/Verify.html',
        },
        { source: '/platformredirect', destination: '/platformredirect.html' },
        { source: '/qr', destination: '/qr.html' },
      ];
    },

    // /services/prepaid/* (the old Vite dev proxy) is handled by
    // app/services/prepaid/[...path]/route.ts — it needs to accept the local .NET dev
    // certificate on https://localhost:7115, which a plain rewrite can't do.
  };

  module.exports = nextConfig;
