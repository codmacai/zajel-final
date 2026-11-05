// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

export const HERO_IMAGE = '/images/secure-hero.png';

export const SECURE_PAGE_HERODATA = {
  eyebrow: 'Government & High-Security',
  title: 'Secure Solutions',
  description:
    'When trust is non-negotiable. We provide dedicated, highly secure courier services relied upon by leading UAE government entities and institutions.',
  buttonLabel: 'Contact Secure Team',
  buttonUrl: '/support',
};

export const SECURE_PAGE_SVGBASE = {
  fill: 'none',
  stroke: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
} as const;

export const GovIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" {...SECURE_PAGE_SVGBASE}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5 12 4l9 5.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 9.5V19M9 9.5V19M12 9.5V19M15 9.5V19M19 9.5V19" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19h18M2.5 21.5h19" />
  </svg>
);

export const IdIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" {...SECURE_PAGE_SVGBASE}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

export const DocsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" {...SECURE_PAGE_SVGBASE}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" {...SECURE_PAGE_SVGBASE}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const ContactIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...SECURE_PAGE_SVGBASE}>
    <path d="M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5v-7Z" />
    <path d="M3.8 8.3 12 12.7l8.2-4.4" />
    <path d="M12 12.7V20" />
  </svg>
);

export const NetworkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...SECURE_PAGE_SVGBASE}>
    <circle cx="12" cy="5" r="2.4" />
    <circle cx="5" cy="19" r="2.4" />
    <circle cx="19" cy="19" r="2.4" />
    <path d="M12 7.4V13m0 0-5.4 4M12 13l5.4 4" />
  </svg>
);

export interface ServiceCard {
  id: 'gov' | 'id' | 'docs' | 'mail';
  Icon: React.ComponentType;
  title: string;
  description: string;
  features: string[];
  buttonLabel: string;
  buttonUrl: string;
}

export const SECURE_PAGE_SERVICECARDS: ServiceCard[] = [
  {
    id: 'gov',
    Icon: GovIcon,
    title: 'Gov & Institutional',
    description: 'Compliant document handling for official and institutional paperwork.',
    features: ['Government & ministry document transport', 'Full audit trail on every handoff', 'Compliant with institutional protocols'],
    buttonLabel: 'Read More',
    buttonUrl: '/secure-gov',
  },
  {
    id: 'id',
    Icon: IdIcon,
    title: 'Secure ID',
    description: 'Your most sensitive personal identification, handled with specialized protocols.',
    features: ['Passport & Emirates ID handling', 'Tamper-evident secure packaging', 'Verified recipient signature'],
    buttonLabel: 'Read More',
    buttonUrl: '/secure-id',
  },
  {
    id: 'docs',
    Icon: DocsIcon,
    title: 'Secure Docs',
    description: 'Courts, MOFA and Customs — critical legal filings handled with discretion.',
    features: ['Courts, MOFA & Customs filings', 'Documented chain-of-custody', 'Discreet, time-sensitive routing'],
    buttonLabel: 'Read More',
    buttonUrl: '/secure-docs',
  },
  {
    id: 'mail',
    Icon: MailIcon,
    title: 'Secure Mail',
    description: 'Confidential corporate mail routing, fully protected end to end.',
    features: ['Confidential inter-office routing', 'GPS-monitored secure vehicles', 'Vetted courier personnel only'],
    buttonLabel: 'Read More',
    buttonUrl: '/secure-mail',
  },
];

export const SECURE_PAGE_STANDARDS = {
  eyebrow: 'Our Commitment',
  heading: 'Uncompromising Standards',
  intro:
    "We don't just deliver; we protect. Our Secure Solutions are built on a foundation of rigorous auditing, specialized personnel, and advanced technology.",
  points: [
    {
      title: 'Vetted Personnel Only',
      text: 'Every courier assigned to our secure network undergoes extensive background checks and specialized compliance training.',
    },
    {
      title: 'Strict Chain of Custody',
      text: 'Documented physical handoffs and digital signature verifications ensure you know exactly who handled your item at every step.',
    },
    {
      title: 'GPS Monitored Transit',
      text: 'Dedicated secure vehicles are actively tracked via GPS from the moment of collection to the final proof of delivery.',
    },
  ],
};

export const SECURE_PAGE_CTABUTTONS = [
  { label: 'Contact Secure Team', url: '/support', Icon: ContactIcon, variant: 'primary' as const },
  { label: 'Explore Secure Networks', url: '#secure-networks', Icon: NetworkIcon, variant: 'secondary' as const },
];

export const SECURE_PAGE = {
  cardsEyebrow: "Specialized Classified Networks",
  ctaTitle: "Need Highly Secure Logistics?",
  ctaText: "Speak directly with our Secure Solutions compliance team about your government or institutional shipment.",
  footerNote: "Secure Solutions from Zajel — trusted logistics for government and institutional partners.",
  heroImage: HERO_IMAGE,
  hero: SECURE_PAGE_HERODATA,
  cards: SECURE_PAGE_SERVICECARDS,
  standards: SECURE_PAGE_STANDARDS,
  buttons: SECURE_PAGE_CTABUTTONS,
};
export type SECURE_PAGEContent = typeof SECURE_PAGE;
