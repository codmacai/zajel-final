import React from 'react';
import Link from 'next/link';
// Move the <Logo /> component out of Navbar.tsx into components/Logo.tsx
// (export default Logo) and import it in both Navbar and Footer.
import Logo from '@/components/Logo';

/* -------------------------------------------------------------------------- */
/*  Content — names and routes taken from the navbar                          */
/* -------------------------------------------------------------------------- */

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

const COLUMNS: FooterColumn[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'On Demand Express', href: '/domestic-courier' },
      { label: 'International Shipping', href: '/international-courier' },
      { label: 'Ecommerce', href: '/ecommerce' },
      { label: 'Air Freight', href: '/air-freight' },
      { label: 'Land Freight', href: '/land-freight' },
      { label: 'Sea Freight', href: '/sea-freight' },
      { label: 'Customs Clearance', href: '/customs-clearance' },
      { label: 'Warehousing', href: '/warehouse' },
    ],
  },
  {
    title: 'Secure Solutions',
    links: [
      { label: 'Gov & Institutional', href: '/secure-gov' },
      { label: 'Secure ID', href: '/secure-id' },
      { label: 'Secure Docs', href: '/secure-docs' },
      { label: 'Secure Mail', href: '/secure-mail' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Zajel', href: '/about' },
      { label: 'Industries We Serve', href: '/industry' },
      { label: 'Our Network', href: '/network' },
      { label: 'Projects', href: '/projects' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Download the App', href: '/#download-app' },
      { label: 'Shipment Tracking', href: '/track' },
      { label: 'Help Center', href: '/support' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/#news' },
    ],
  },
];

// Not in the navbar, so routes are unchanged from the old footer.
const LEGAL_LINKS: FooterLink[] = [
  { label: 'Claims', href: '/claims' },
  { label: 'Service Alerts', href: '/alerts' },
  { label: 'PDPL', href: '/pdpl' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/policy' },
  { label: 'Accessibility', href: '/ally' },
];

/* -------------------------------------------------------------------------- */
/*  Social icons — solid brand glyphs on a 24×24 grid                         */
/* -------------------------------------------------------------------------- */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
} as const;

// Replace the "#" hrefs with your real profile URLs.
const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg {...iconProps}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg {...iconProps}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg {...iconProps}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg {...iconProps}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*  Shared classes                                                            */
/* -------------------------------------------------------------------------- */

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const linkClass = `text-body-inverse block w-fit rounded py-0.5 transition-colors hover:text-white ${focusRing}`;

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden font-sans text-white"
      style={{
        background: 'linear-gradient(135deg, #4ccb4c 0%, #36b936 50%, #2a952a 100%)',
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-8 pt-12 sm:px-10 lg:px-12 lg:pb-10 lg:pt-16 xl:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(240px,1fr)_3fr] lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              aria-label="Zajel home"
              className={`footer-logo mb-5 w-fit rounded focus-visible:outline-offset-4 [&_svg_*]:fill-white ${focusRing}`}
            >
              <Logo />
            </Link>

            <p className="text-body-inverse mb-6 max-w-[300px] leading-relaxed">
              Fast, reliable courier and logistics services across the UAE and to 195 countries worldwide.
            </p>

            <ul className="flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/25 transition-all duration-200 hover:bg-white hover:text-[#2a952a] hover:ring-white ${focusRing}`}
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/20 pt-10 md:grid-cols-4 lg:border-t-0 lg:pt-0"
          >
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex min-w-0 flex-col">
                {/* Highlighted heading: bold title + short accent bar */}
                <h4 className="text-h4-inverse mb-5 font-semibold">
                  {col.title}
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-white" />
                </h4>

                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/70 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} ZAJEL Courier Services</p>

          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded transition-colors hover:text-white ${focusRing}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}