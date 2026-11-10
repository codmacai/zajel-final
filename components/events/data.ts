/**
 * Events shown on /events and /events/[slug].
 *
 * PLACEHOLDER CONTENT — replace with the real events (and their photos) before going live.
 * Each event lands under "Upcoming" or "Past" automatically, based on its end date.
 */

export type EventType = 'Exhibition' | 'Conference' | 'Webinar' | 'Workshop';

export interface EventImage {
  /** Path under /public, e.g. '/events/expo-2026/stand.jpg'. */
  src: string;
  alt: string;
}

export interface ZajelEvent {
  /** URL name: /events/<slug>. Lowercase words joined by dashes; must be unique. */
  slug: string;
  title: string;
  type: EventType;
  /** ISO dates, YYYY-MM-DD. `endDate` only for multi-day events. */
  startDate: string;
  endDate?: string;
  /** Free text, e.g. '10:00 – 17:00 GST'. */
  time?: string;
  city: string;
  venue: string;
  /** One or two sentences for the events list. */
  summary: string;
  /** Full description on the detail page, one string per paragraph. */
  description: string[];
  /** Short bullet points: what visitors get from attending. */
  highlights?: string[];
  /** Large image at the top of the detail page. */
  cover: EventImage;
  /** Photo gallery on the detail page. */
  gallery?: EventImage[];
  /** Where "Register Interest" goes. Omit to hide the button. */
  href?: string;
}

export const EVENTS: ZajelEvent[] = [
  {
    slug: 'middle-east-logistics-supply-chain-expo-2026',
    title: 'Middle East Logistics & Supply Chain Expo',
    type: 'Exhibition',
    startDate: '2026-11-17',
    endDate: '2026-11-19',
    time: '10:00 – 18:00 GST',
    city: 'Dubai',
    venue: 'Dubai World Trade Centre',
    summary:
      'Visit the Zajel stand to see our air, sea and land freight solutions and meet the team behind them.',
    description: [
      'Zajel returns to the region’s leading logistics exhibition with a stand dedicated to end-to-end supply chain solutions, from same-day courier and e-commerce fulfilment to air, sea and land freight.',
      'Our freight, customs and warehousing specialists will be on the stand throughout the three days to review your shipping requirements, walk you through our UAE network and discuss tailored solutions for your business.',
    ],
    highlights: [
      'Live walkthrough of our tracking and booking platform',
      'One-to-one meetings with freight and customs specialists',
      'Exclusive event rates for new business accounts',
    ],
    cover: { src: '/about/gallery/port-worker-sunset.webp', alt: 'Port operations at sunset' },
    gallery: [
      { src: '/Homepage/exhibition-display-model.png', alt: 'Exhibition stand display model' },
      { src: '/about/gallery/team-meeting.jpg', alt: 'Zajel team meeting with clients' },
      { src: '/about/gallery/zajel-van-fleet.jpg', alt: 'Zajel delivery van fleet' },
      { src: '/about/gallery/warehouse-aisle.webp', alt: 'Warehouse aisle with racked pallets' },
    ],
    href: '/support',
  },
  {
    slug: 'cross-border-ecommerce-fulfilment-gcc-webinar',
    title: 'Cross-Border E-commerce Fulfilment in the GCC',
    type: 'Webinar',
    startDate: '2026-12-03',
    time: '14:00 – 15:00 GST',
    city: 'Online',
    venue: 'Live webinar',
    summary:
      'A practical session on duties, returns and last-mile delivery for online sellers shipping across the region.',
    description: [
      'Selling across the GCC opens up millions of new customers, but duties, documentation and returns can quickly erode margins. This one-hour webinar breaks down what online sellers need to get right.',
      'Our e-commerce logistics team will share practical guidance on landed-cost pricing, cash-on-delivery, returns handling and choosing the right delivery speed for each market, followed by a live Q&A.',
    ],
    highlights: [
      'Duties and landed-cost basics for GCC markets',
      'Cash-on-delivery and returns best practice',
      'Live Q&A with our e-commerce specialists',
    ],
    cover: { src: '/Homepage/hero/hero-app.webp', alt: 'Zajel app on a smartphone' },
    gallery: [
      { src: '/Homepage/hero/hero-doorstep.webp', alt: 'Parcel delivered to a customer’s doorstep' },
      { src: '/international/air-cargo-loading.webp', alt: 'Air cargo being loaded' },
    ],
    href: '/support',
  },
  {
    slug: 'customs-compliance-workshop-importers-2027',
    title: 'Customs Compliance Workshop for Importers',
    type: 'Workshop',
    startDate: '2027-01-21',
    time: '09:30 – 13:00 GST',
    city: 'Abu Dhabi',
    venue: 'Zajel Abu Dhabi Office',
    summary:
      'Our customs brokers walk through documentation, HS codes and clearance timelines for UAE imports.',
    description: [
      'Delays at customs are one of the most common and costly problems for importers. In this half-day workshop, our licensed customs brokers explain how to prepare shipments that clear first time.',
      'Sessions cover commercial documentation, HS code classification, duty calculation and the clearance process at UAE air, sea and land ports, with real examples from shipments we handle every day.',
    ],
    highlights: [
      'Commercial invoice and packing list checklist',
      'HS code classification in practice',
      'Clearance timelines at UAE ports and borders',
    ],
    cover: { src: '/warehouse/customs-clearance-hero.jpg', alt: 'Customs clearance at a cargo terminal' },
    gallery: [
      { src: '/custom-clearance/import-clearance.webp', alt: 'Import clearance documents' },
      { src: '/uae-customs/jebel-ali-port-aerial.webp', alt: 'Aerial view of Jebel Ali Port' },
      { src: '/uae-customs/dubai-airport-cargo.webp', alt: 'Cargo at Dubai airport' },
    ],
    href: '/support',
  },
  {
    slug: 'future-of-last-mile-delivery-forum-2026',
    title: 'Future of Last-Mile Delivery Forum',
    type: 'Conference',
    startDate: '2026-09-24',
    time: '09:00 – 16:00 GST',
    city: 'Dubai',
    venue: 'Jumeirah Emirates Towers',
    summary:
      'Zajel joined industry leaders to discuss same-day delivery, route optimisation and sustainable fleets.',
    description: [
      'Zajel took part in a full-day forum on the future of last-mile delivery in the UAE, joining retailers, technology providers and logistics operators.',
      'Our team shared how same-day and on-demand delivery is scaling across the Emirates, and what route optimisation and fleet electrification mean for delivery costs and customer experience.',
    ],
    cover: { src: '/Homepage/hero/hero-courier.webp', alt: 'Zajel courier making a delivery' },
    gallery: [
      { src: '/about/gallery/zajel-van-fleet.jpg', alt: 'Zajel delivery van fleet' },
      { src: '/Homepage/hero/hero-doorstep.webp', alt: 'Parcel delivered to a customer’s doorstep' },
      { src: '/about/gallery/team-meeting.jpg', alt: 'Panel discussion with industry leaders' },
    ],
  },
  {
    slug: 'secure-document-logistics-roundtable-2026',
    title: 'Secure Document Logistics Roundtable',
    type: 'Conference',
    startDate: '2026-06-11',
    time: '10:00 – 12:30 GST',
    city: 'Dubai',
    venue: 'Zajel Dubai Office',
    summary:
      'A closed session with government and institutional partners on chain-of-custody for sensitive documents.',
    description: [
      'Zajel hosted government and institutional partners for a closed roundtable on secure handling of sensitive documents, IDs and confidential mail.',
      'Discussion focused on chain-of-custody, identity verification at handover and how secure courier services support digital government programmes across the UAE.',
    ],
    cover: { src: '/about/gallery/zajel-headquarters.webp', alt: 'Zajel headquarters building' },
    gallery: [
      { src: '/securesol/secure-legal-documents.webp', alt: 'Sealed legal documents' },
      { src: '/securesol/secure-id-passport-delivery.webp', alt: 'Secure ID and passport delivery' },
    ],
  },
];

export const getEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);

/** Last day of the event (end date, or start date for one-day events). */
export const lastDay = (e: ZajelEvent) => e.endDate || e.startDate;

/**
 * Every event as one CMS section (Events → Events list). Each event gets every field, empty
 * where it has none, so editors can add an end date, highlights, photos or a link to any
 * event (empty means "none" everywhere these are shown).
 */
export const EVENTS_LIST = {
  events: EVENTS.map((e): ZajelEvent => ({ endDate: '', time: '', highlights: [], gallery: [], href: '', ...e })),
};

/** The text of the events page (Events → Page text). */
export const EVENTS_PAGE = {
  eyebrow: 'Events',
  heading: 'Where Logistics Leaders Meet',
  description:
    'Join Zajel at the exhibitions, conferences and workshops shaping logistics across the UAE and the region. Meet our specialists, explore new solutions and see where we have been.',
  contact: {
    badgeText: 'Book a Meeting',
    title: 'Planning to Attend?',
    descriptionLead:
      'Schedule time with our team at any upcoming event to discuss your courier, freight, customs or warehousing requirements.',
    descriptionDetail: "Reach out by email or phone and we'll arrange a meeting at the venue or at one of our offices.",
    primaryCta: { label: 'Contact Our Team', url: '/support' },
  },
};
