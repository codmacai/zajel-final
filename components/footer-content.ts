// Built-in footer content. Editable in the CMS: Site-wide → Footer.

export type FooterLink = { label: string; href: string; external?: boolean };

// Dubai Customs / customer portal used for customs submissions. Paste the portal
// address here; the footer link is hidden while it is empty.
const CUSTOMS_PORTAL_URL = '';
export type FooterColumn = { title: string; links: FooterLink[] };

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
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Download the App', href: '/#download-app' },
      { label: 'Help Center', href: '/support' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/#news' },
      { label: 'Events', href: '/events' },
      ...(CUSTOMS_PORTAL_URL
        ? [{ label: 'Customs Submission', href: CUSTOMS_PORTAL_URL, external: true }]
        : []),
    ],
  },
];

// Not in the navbar, so routes are unchanged from the old footer.
const LEGAL_LINKS: FooterLink[] = [
  { label: 'Claims', href: '/support' },
  // Hidden for now:
  // { label: 'Service Alerts', href: '/help' },
  // { label: 'PDPL', href: '/legal#pdpl' },
  { label: 'Terms & Conditions', href: '/legal#terms' },
  { label: 'Privacy Policy', href: '/legal#privacy' },
  // { label: 'Accessibility', href: '/legal#accessibility' },
];


export const FOOTER = {
  tagline: 'Fast, reliable courier and logistics services across the UAE and to 195 countries worldwide.',
  columns: COLUMNS,
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/zajel_official' },
    { label: 'LinkedIn', href: 'https://ae.linkedin.com/company/zajel-logistics-services' },
    { label: 'X', href: 'https://x.com/zajelcs' },
    { label: 'YouTube', href: 'https://www.youtube.com/@zajel_official' },
  ],
  companyName: 'ZAJEL Courier Services',
  legalLinks: LEGAL_LINKS,
};
