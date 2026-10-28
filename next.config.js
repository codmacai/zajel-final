// Accept the Zajel-2 (Vite) variable names too, so the React app's .env can be copied over
// unchanged: VITE_GOOGLE_MAPS_API_KEY -> NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (browser),
// VITE_YARP_* -> read server-side in lib/tracking/server.ts. VITE_API_BASE_URL is ignored on
// purpose — the API base URL already defaults to the React values (see lib/api/env.ts).
const googleMapsApiKey =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || '';

/** @type {import('next').Config} */

const CANONICAL_ORIGIN = 'https://zajel.com';

// Other hostnames that reach this site. Each one 301s to the same path on
// https://zajel.com so search engines see a single copy of every page.
const ALIAS_HOSTS = ['www.zajel.com', 'zajel.ae', 'www.zajel.ae'];

// Pages from the previous (ASP.NET) site. Matching ignores letter case, and
// any query string (e.g. a tracking number) is passed through. A source must
// never also match its own destination (e.g. /Careers would catch /careers and
// loop) or a folder in public/, so for sections the new site still has, only
// sub-pages are redirected.
const LEGACY_PAGES = [
  ['/Home/Index', '/'],
  ['/Home/:path*', '/'],
  ['/Home', '/'],
  ['/Index', '/'],
  ['/Default.aspx', '/'],
  ['/index.html', '/'],
  ['/AboutUs/:path*', '/about'],
  ['/AboutUs', '/about'],
  ['/About-Us', '/about'],
  ['/ContactUs/:path*', '/contact'],
  ['/ContactUs', '/contact'],
  ['/Contact-Us', '/contact'],
  ['/Tracking/:path*', '/track'],
  ['/Tracking', '/track'],
  ['/Track/Index', '/track'],
  // Not /Career: it would also catch the /career/ image folder.
  ['/Careers/:path+', '/careers'],
  ['/FAQ/:path+', '/faq'],
];

// /Services/<name> → the matching service page, chosen by a keyword in <name>.
// Earlier entries win, so the specific services come before the generic ones.
//
// CAREFUL: /services/prepaid/* is the API proxy (app/services/prepaid) and matching ignores case,
// so every /Services rule below starts with NOT_PREPAID — otherwise e.g.
// /services/prepaid/api/International/GetCountries would 301 to /international-courier and
// login, tickets and booking would all break.
const NOT_PREPAID = '(?!prepaid(?:/|$))';
const LEGACY_SERVICES = [
  ['international|worldwide|global', '/international-courier'],
  ['domestic|local|same-?day|express|on-?demand|courier', '/domestic-courier'],
  ['e-?commerce|cod|online', '/ecommerce'],
  ['custom', '/customs-clearance'],
  ['wareh|storage|fulfil', '/warehouse'],
  ['secure|document|mail', '/secure-solutions'],
  ['project', '/projects'],
  ['air', '/air-freight'],
  ['sea|ocean|marine', '/sea-freight'],
  ['land|road|truck', '/land-freight'],
];

const nextConfig = {
  // Deployed as a Node standalone server (server.js + https-server.js on the Windows hosts).
  output: 'standalone',
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: googleMapsApiKey,
  },

  allowedDevOrigins: ['172.20.10.3:3000', '172.20.10.3'],

  async redirects() {
    const permanent = { statusCode: 301 };
    return [
      // One address only: https://zajel.com
      ...ALIAS_HOSTS.map((host) => ({
        source: '/:path*',
        has: [{ type: 'host', value: host }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        ...permanent,
      })),
      // Plain HTTP behind a proxy that reports it (Vercel already upgrades HTTP itself).
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'zajel.com' },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
        ],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        ...permanent,
      },

      // Old site addresses
      ...LEGACY_PAGES.map(([source, destination]) => ({ source, destination, ...permanent })),
      ...LEGACY_SERVICES.map(([keyword, destination]) => ({
        source: `/Services/:name(${NOT_PREPAID}.*(?:${keyword}).*)`,
        destination,
        ...permanent,
      })),
      { source: `/Services/:rest(${NOT_PREPAID}.*)`, destination: '/', ...permanent },
      { source: '/Services', destination: '/', ...permanent },

      // Old or planned URLs that people may still link to.
      { source: '/find-us', destination: '/network', permanent: true },
      { source: '/app-download', destination: '/#download-app', permanent: false },
      { source: '/blog', destination: '/#news', permanent: false },
      // The React app's old tracking sub-pages were folded into /trackresults.
      { source: '/shipment-timeline', destination: '/trackresults', permanent: false },
      { source: '/proof-of-delivery', destination: '/trackresults', permanent: false },
      // The contact page is hidden for now — everything goes to the support center.
      { source: '/contact', destination: '/support', permanent: false },
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
