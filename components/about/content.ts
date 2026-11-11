// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import type { CTABannerProps } from '@/components/shared/CTABanner';
import { APP_LINKS } from '@/data/app-links';
export const ABOUT_CTA: CTABannerProps = {
  image: "/zajel-courier-hero.webp",
  imageAlt: "Courier delivering a package doorstep to doorstep in the UAE",
  title: "Zajel — intelligent movement,",
  description: "For everyone who needs something moved..",
  buttons: [
                { label: "Explore Our Solutions", href: "/#solutions", variant: "primary" },
                { label: "Careers at Zajel", href: "/careers", variant: "secondary" },
                { label: "Get in Touch", href: "/support", variant: "secondary" },
              ],
};

// ---------------------------------------------------------------------------
// Content — swap `defaultContent` for a CMS/API response later if you
// reconnect data-fetching; the JSX below doesn't care where `data` comes from.
// ---------------------------------------------------------------------------
export const ABOUT_HERO = {
  heading: 'About Zajel Logistic Services, Since 2008',
  intro:
    "We don't just move parcels, goods, and shipments. We move businesses, relationships, and markets forward — with the intelligence, precision, and care of a trusted logistics partner.",
  heroImageUrl: '/about/gallery/port-worker-sunset.webp',
  heroImageAlt: 'Zajel fleet and warehouse operations',
};

// ---------------------------------------------------------------------------
// Content — verbatim copy
// ---------------------------------------------------------------------------
export const ABOUT_STORY = {
  eyebrow: 'Our Story',
  paragraphFounding:
    'We were founded in Dubai in 2008, starting with a specific and demanding mandate: delivering Emirates IDs and passports on behalf of UAE government entities. That work required precision, security, and consistency from day one, standards that still shape how we operate today.',
  paragraphGrowth:
    "Since then, we've grown from a single government logistics service into a full logistics company in the UAE, supporting individuals, businesses, and government entities alike:",
  solutions: [
    {
      title: 'Individual Solutions',
      description: 'Same day and next day delivery, domestic and international',
    },
    {
      title: 'Business Solutions',
      description: 'E-commerce fulfillment and freight forwarding by air, sea, and land',
    },
    {
      title: 'Secure Solutions',
      description:
        'The government logistics work we were built on, still trusted by entities like MOFA, Dubai Courts, and Dubai Customs',
    },
  ],
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
export const ABOUT_MISSION = {
  tagline: 'Who We Are',
  heading: 'Moving Goods, Businesses, & Communities',
  description:
    'We are dedicated to setting the standard for logistics across the region. Combining human expertise with advanced intelligence, we provide seamless movement, reliability, and care for every journey.',
  mission: {
    label: 'Our Mission',
    text: 'To move goods, businesses, and communities with intelligence, reliability, and care, by combining human judgment with advanced systems across the logistics spectrum.',
    image: '/about/mission/warehouse-packing-team.webp',
  },
  vision: {
    label: 'Our Vision',
    text: "To become the region's most trusted and intelligently connected logistics partner, setting the standard for how movement works across the Middle East and beyond.",
    image: '/about/dubai-port-aerial.webp',
  },
  stats: [
    { value: '17', label: 'Years of Success' },
    { value: '60M+', label: 'Shipments Delivered' },
    { value: '195', label: 'Countries Covered' },
    { value: '500k+', label: 'Items Handled Daily' },
  ],
};

// ---------------------------------------------------------------------------
// Content — verbatim from brand guide
// ---------------------------------------------------------------------------
export const ABOUT_HOW_WE_WORK = {
  heading: 'How We Work',
  philosophy:
    'We combine technology, expertise, and human judgment to move shipments with control — not just speed. Every decision, from route planning to customer support, is built on that same principle: intelligent movement, not just movement.',
  certIntro: 'That discipline is independently certified:',
  certifications: [
    { code: 'ISO 9001', name: 'Quality Management' },
    { code: 'ISO 14001', name: 'Environmental Management' },
    { code: 'ISO 45001', name: 'Occupational Health & Safety' },
    { code: 'ISO 27001', name: 'Information Security Management' },
  ],
};

// ---------------------------------------------------------------------------
// Content & data structure
// Put each logo in /public/Homepage/alliances/ and the `logo` paths resolve as-is.
// `title` is no longer shown visually; it is used for accessibility (alt / heading).
// ---------------------------------------------------------------------------
export const ABOUT_ALLIANCES = {
  verifiedLabel: 'Verified Alliance',
  eyebrow: 'Worldwide Recognition',
  heading: 'Our Alliances & Accreditations',
  intro:
    'Connecting Zajel to global networks, trade facilitation benefits, and internationally recognized standards across air, sea, and land logistics.',
  logoStripImage: '/alliances-logo-strip.webp', // update to match your asset
  alliances: [
    {
      title: 'WCA Inter Global',
      logo: '/global-alliance/wca-inter-global-logo.png',
      description:
        'Member of the World Cargo Alliance, connecting Zajel with qualified logistics partners across every major trade market globally for reliable origin and destination handling.',
      badge: 'Global Network',
    },
    {
      title: 'DF Alliance by DP World',
      logo: '/global-alliance/df-alliance-logo.png',
      description:
        "Premium Member of DP World's global network spanning 190+ countries, granting access to vetted logistics partners and deep local expertise worldwide.",
      badge: 'Premium Member',
    },
    {
      title: 'JCtrans (JC Premium)',
      logo: '/global-alliance/jctrans-logo.png',
      description:
        "Leading international freight forwarding network that strengthens Zajel's coverage on key trade lanes, particularly routes connecting the UAE with Asian manufacturing markets.",
      badge: 'Trade Lanes',
    },
    {
      title: 'FIATA',
      logo: '/global-alliance/fiata-logo.png',
      description:
        'The International Federation of Freight Forwarders Associations, reflecting strict adherence to recognized standards in global freight forwarding and trade documentation.',
      badge: 'Industry Standard',
    },
    {
      title: 'IATA',
      logo: '/global-alliance/iata-logo.png',
      description:
        'International Air Transport Association accreditation ensuring air freight services meet global protocols for cargo handling, documentation, and carrier relationships.',
      badge: 'Air Cargo Standard',
    },
    {
      title: 'NAFL UAE',
      logo: '/global-alliance/nafl-logo.png',
      description:
        'National Association of Freight and Logistics membership, connecting Zajel with the domestic freight community and supporting regulatory alignment across UAE operations.',
      badge: 'UAE Community',
    },
    {
      title: 'ICV (In-Country Value)',
      logo: '/global-alliance/icv-logo.png',
      description:
        "Certified contribution to the UAE's national economy through local employment, local procurement, and continuous investment in UAE-based operations.",
      badge: 'UAE Certified',
    },
    {
      title: 'WLP',
      logo: '/global-alliance/wlp-logo.png',
      description:
        'World Logistics Passport member, unlocking global trade facilitation benefits, operational hub advantages, and streamlined logistics routing.',
      badge: 'Trade Facilitation',
    },
    {
      title: 'BSCIC (JAS-ANZ Accredited)',
      logo: '/global-alliance/bscic-jas-anz-logo.png',
      description:
        "Certified under Joint Accreditation System of Australia & New Zealand (JAS-ANZ), validating the integrity and quality of Zajel's management systems.",
      badge: 'Quality Accreditation',
    },
  ],
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
export const ABOUT_ENVIRONMENT = {
  eyebrow: 'Sustainability & Commitment',
  heading: 'Environmental Responsibility',
  badge: 'ISO 14001 Certified',
  paragraph1:
    'Zajel holds ISO 14001 certification for environmental management, which means sustainability is built into how we plan routes, manage facilities, and operate our fleet. This is not a statement of intent. It is an audited standard that governs our operations.',
  paragraph2:
    "In practice, ISO 14001 drives route optimization to reduce fuel consumption and emissions across our delivery and freight operations. It governs waste management at our warehouse facilities and sets targets for energy efficiency across our offices and logistics infrastructure. As the UAE's logistics sector continues to grow, operating within a certified environmental framework ensures that growth does not come at the expense of responsibility.",
  backgroundImage: '/about/facility-aerial-solar-panels.webp', // 👈 Update with your image path
};

// ---------------------------------------------------------------------------
// Content & data structure
// ---------------------------------------------------------------------------
export const ABOUT_GALLERY = {
  eyebrow: 'Our Infrastructure',
  heading: 'Facilities & Fleet',
  description:
    'Real scale, owned assets, and dedicated teams across the UAE. Built to deliver operational excellence and supply chain security.',
  photos: [
    {
      id: 1,
      title: 'Dubai Headquarters',
      caption: 'Zajel headquarters, Al Rostamani Building, Dubai',
      image: '/about/gallery/zajel-headquarters.webp', // 👈 Replace with real Zajel asset
    },
    {
      id: 2,
      title: 'Warehouse Operations',
      caption: 'Warehouse facility, Dubai',
      image: '/about/gallery/warehouse-aisle.webp', // 👈 Replace with real Zajel asset
    },
    {
      id: 3,
      title: 'Fleet Vehicles',
      caption: 'Zajel delivery fleet',
      image: '/about/gallery/zajel-van-fleet.jpg', // 👈 Replace with real Zajel asset
    },
    {
      id: 4,
      title: 'Team at Work',
      caption: 'Our operations team',
      image: '/about/gallery/team-meeting.jpg', // 👈 Replace with real Zajel asset
    },
  ],
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
export const ABOUT_JOURNEY_SECTIONHEADING = 'Our Journey';

export type Stop = {
  year: string;
  eyebrow: string;
  beats: string[];
  caption: string;
  isPresent?: boolean;
};

export const ABOUT_JOURNEY_STOPS: Stop[] = [
  {
    year: '2008',
    eyebrow: 'The beginning.',
    beats: [
      'Zajel is founded in Dubai, starting with Emirates ID and passport delivery for UAE government entities.',
      'Zajel partners with the General Directorate of Residency and Foreigners Affairs (GDRFA), becoming the official courier service for passport and Emirates ID deliveries.',
    ],
    caption: 'Emirates ID and passport delivery, Dubai',
  },
  {
    year: '2009',
    eyebrow: 'A new partnership.',
    beats: [
      "Zajel partners with Dubai Courts, enabling customers to complete document accreditation through Zajel's courier services.",
    ],
    caption: 'Document accreditation with Dubai Courts',
  },
  {
    year: '2012',
    eyebrow: 'Growing footprint.',
    beats: [
      "Zajel opens its first office in Jebel Ali Free Zone (JAFZA), strengthening its presence in Dubai's business and logistics hub.",
    ],
    caption: 'First office opens in JAFZA',
  },
  {
    year: '2018',
    eyebrow: 'Expanding to the capital.',
    beats: ['Zajel expands its UAE footprint with the opening of its first office in Abu Dhabi.'],
    caption: 'First office opens in Abu Dhabi',
  },
  {
    year: '2022',
    eyebrow: 'A national partnership.',
    beats: [
      'Zajel becomes an official courier service for the Ministry of Foreign Affairs (MOFA), supporting customers with pickup and delivery of documents for official attestation and accreditation.',
    ],
    caption: 'Official courier for MOFA',
  },
  {
    year: '2023',
    eyebrow: 'A new chapter.',
    beats: [
      'Nabeel AlKharabsheh joins as General Manager, opening a chapter focused on growth, operational excellence, and transformation.',
      'Zajel begins its shift from a traditional courier business into a full logistics and supply-chain company.',
    ],
    caption: 'New leadership, new direction',
  },
  {
    year: '2024',
    eyebrow: 'Building momentum.',
    beats: [
      'An operational efficiency program strengthens internal delivery capabilities and reduces reliance on third-party resources.',
      'ZajelNOW launches — on-demand, point-to-point and same-day delivery across the UAE.',
      'GDRFA Dubai recognizes Zajel as a Strategic Partner; freight forwarding expands across air, sea, and land.',
    ],
    caption: 'ZajelNOW launches across the UAE',
  },
  {
    year: '2025',
    eyebrow: 'Recognition and reach.',
    beats: [
      'Investment increases in technology, automation, business intelligence, and route optimization.',
      'Zajel is named Freight Forwarder of the Year; Nabeel AlKharabsheh receives Logistics Executive of the Year.',
      'A five-year growth strategy is set — diversification, technology, expansion into Abu Dhabi and Al Ain, e-commerce, fulfillment, and freight.',
      'Zajel further expands its UAE network with the opening of its first office in Al Ain.',
    ],
    caption: 'Freight Forwarder of the Year',
  },
  {
    year: '2026',
    eyebrow: 'Excellence, recognized.',
    beats: ["Zajel receives the Delivery Sector Excellence Award, with recognition involving Dubai's RTA and Dubai Police."],
    caption: 'Delivery Sector Excellence Award',
  },
  {
    year: 'Present',
    eyebrow: 'The journey continues.',
    beats: [
      'Zajel is evolving from a courier company into an integrated, technology-enabled logistics partner — connecting businesses and communities through express delivery, e-commerce, fulfillment, freight forwarding, and cross-border logistics.',
    ],
    caption: 'An integrated logistics partner',
    isPresent: true,
  },
];

export const ABOUT_JOURNEY = {
  heading: ABOUT_JOURNEY_SECTIONHEADING,
  presentLabel: 'Today',
  stops: ABOUT_JOURNEY_STOPS,
};
export type ABOUT_JOURNEYContent = typeof ABOUT_JOURNEY;

// ---------------------------------------------------------------------------
// Content
// Put your PDFs in /public/documents/ and the paths below resolve as-is.
// ---------------------------------------------------------------------------
export const ABOUT_DOCUMENTS = {
  readyLabel: 'PDF · Ready to download',
  requestLabel: 'PDF · Request a copy',
  eyebrow: "Our Documents",
  heading: "Company Documents",
  description:
    "Download our company profile and IMS policy to learn more about our services, standards, and capabilities.",
  documents: [
    {
      title: "Company Profile",
      description: "An overview of our services, network, and capabilities.",
      fileUrl: "/documents/company-profile.pdf",
      theme: "light" as const,
    },
    {
      title: "IMS Policy",
      description:
        "Our Integrated Management System policy, covering quality, environmental, and health & safety standards.",
      fileUrl: "/documents/ims-policy.pdf",
      theme: "dark" as const,
    },
  ],
};

export const ABOUT_APP_DOWNLOAD = {
  headlineLine1: 'Download the',
  headlineLine2: 'ZAJEL App',
  description: 'Track shipments, get instant updates, and manage your deliveries anytime, anywhere.',
  phoneImageSrc: '/phone-mockup.png',
  desktopImageSrc: '/phone-mockup-desktop.png',
  appStoreUrl: APP_LINKS.appStore,
  playStoreUrl: APP_LINKS.playStore,
};
