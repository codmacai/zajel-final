// Built-in content for the home page sections. The CMS (/admin → Home) edits these;
// whatever isn't edited there shows exactly as written here.

import { dockItems } from '@/data/dockItems';
import { SERVICE_CATEGORIES } from '@/data/services';
import { APP_LINKS } from '@/data/app-links';

export const HOME_HERO = {
  titleLine1: 'Intelligent Movement,',
  titleLine2: 'Nationwide and Beyond',
  subtitle:
    'From a single shipment to a full supply chain, Zajel moves what matters, across the UAE and to 195 countries beyond it',
  trackLabel: 'AWB',
  trackPlaceholder: 'Enter your AWB number to track',
  trackPlaceholderMobile: 'Enter AWB number to track',
  trackButton: 'Track',
  image: '/Homepage/hero-zajel-boxes.webp',
  imageAlt: 'Green Zajel parcels on a warehouse floor',
  /** The quick-action dock under the banner (desktop). Icons stay as designed. */
  actions: dockItems.map((d) => ({ label: d.labelDefault, sublabel: d.sublabelDefault, href: d.href })),
};
export type HomeHeroContent = typeof HOME_HERO;

export const HOME_SERVICES = {
  eyebrow: 'Our Services',
  heading: 'Logistics services in the UAE, built around you',
  subheading:
    "Whether you're sending a single parcel or running a fleet of shipments, there's a track built for how you work.",
  categories: SERVICE_CATEGORIES,
};
export type HomeServicesContent = typeof HOME_SERVICES;

export const HOME_FILM = {
  videoDesktop: '/Homepage/film/zajel-film-1080.mp4',
  videoMobile: '/Homepage/film/zajel-film-720.mp4',
  poster: '/Homepage/film/zajel-film-poster.webp',
  videoLabel: 'Zajel brand film',
  playLabel: 'Play film',
  pauseLabel: 'Pause film',
  soundOnLabel: 'Watch with sound',
  soundOffLabel: 'Mute',
};
export type HomeFilmContent = typeof HOME_FILM;

export const HOME_ZAJEL_NOW = {
  titleLine1: 'zajel',
  titleLine2: 'now',
  text: 'instant city-wide pickups and deliveries,',
  highlight: 'on demand',
  backgroundImage: '/zajel-now-dubai-skyline-road.webp',
  backgroundImageAlt: 'Zajel Now on-demand delivery in the city',
  courierImage: '/zajel-now-motorbike-courier.webp',
};
export type HomeZajelNowContent = typeof HOME_ZAJEL_NOW;

export type Article = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  accent: string;
  image: string;
};

export const HOME_NEWS = {
  eyebrow: 'Newsroom',
  heading: 'Latest news',
  description: 'Global logistics, freight forwarding, and supply chain briefings.',
  readMore: 'Read more',
  articles: [
  {
    date: "14 May 2026",
    category: "Global Freight",
    title: "Expanding Air & Sea Trade Corridors Across 500+ Destinations",
    excerpt:
      "Enhancing multimodal freight connectivity between key trade hubs across Asia, Europe, and the Middle East to accelerate transit times for bulk cargo.",
    href: "#",
    accent: "#36B936",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    date: "28 Feb 2026",
    category: "Customs & Trade",
    title: "Streamlined GCC Cross-Border Clearance Network Launched",
    excerpt:
      "Accelerating border clearance operations through automated documentation workflows and dedicated customs brokerage hubs across regional gateways.",
    href: "#",
    accent: "#5FD37A",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
  },
  {
    date: "12 Nov 2025",
    category: "Smart Warehousing",
    title: "Next-Generation Fulfillment Center Operational in Dubai",
    excerpt:
      "Opening high-capacity, climate-controlled fulfillment facilities equipped with automated inventory sorting to power seamless e-commerce distribution.",
    href: "#",
    accent: "#7FD79A",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
  },
] as Article[],
};
export type HomeNewsContent = typeof HOME_NEWS;

export const HOME_APP_DOWNLOAD = {
  headlineLine1: 'Download the',
  headlineLine2: 'ZAJEL App',
  description: 'Track shipments, get instant updates, and manage your deliveries anytime, anywhere.',
  phoneImageSrc: '/domestic/app/step-2.webp',
  desktopImageSrc: '/domestic/app/step-2.webp',
  appStoreUrl: APP_LINKS.appStore,
  playStoreUrl: APP_LINKS.playStore,
};

export const HOME_CERTIFICATIONS = {
  eyebrow: 'Accreditations & Alliances',
  heading: 'Certified for global trust',
  linkLabel: 'View all in About Us',
  linkHref: '/about#certifications',
  logos: [
    { id: '1', name: 'ISO 9001:2015', logo: '/Homepage/alliances/jctrans-logo.png' },
    { id: '2', name: 'ISO 14001:2015', logo: '/Homepage/alliances/nafl-logo.png' },
    { id: '3', name: 'ISO 45001:2018', logo: '/Homepage/alliances/fiata-logo.png' },
    { id: '4', name: 'FIATA Alliance', logo: '/Homepage/alliances/iata-logo.png' },
    { id: '5', name: 'IATA Cargo Agent', logo: '/Homepage/alliances/icv-logo.png' },
    { id: '6', name: 'TAPA Certified', logo: '/Homepage/alliances/wlp-logo.png' },
  ],
};
export type HomeCertificationsContent = typeof HOME_CERTIFICATIONS;

export const HOME_PROJECTS = {
  eyebrow: 'Selected Work',
  heading: "Projects we've moved",
  description: "A running record of the loads we've planned and carried through, across air, sea, and land.",
  caseStudyLabel: 'Case Study',
  viewDetailsLabel: 'View details',
  buttonLabel: 'Explore all projects',
};
export type HomeProjectsContent = typeof HOME_PROJECTS;
