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
        source: `/Services/:name(.*(?:${keyword}).*)`,
        destination,
        ...permanent,
      })),
      { source: '/Services/:path*', destination: '/', ...permanent },
      { source: '/Services', destination: '/', ...permanent },

      // Old or planned URLs that people may still link to.
      { source: '/find-us', destination: '/network', permanent: true },
      { source: '/app-download', destination: '/#download-app', permanent: false },
      { source: '/blog', destination: '/#news', permanent: false },
    ];
  },
};

module.exports = nextConfig;
