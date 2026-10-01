// Hardcoded content — swap for a CMS fetch once the entry is ready.

export const APP_DOWNLOAD_URL = 'https://zajel.app.link/download'; // TODO: replace with your real smart link

export const heroData = {
  eyebrow: 'Domestic & International',
  title: 'Individual Solutions — Personal Delivery, Handled Right',
  description:
    "Whatever you're sending, wherever it's going — same day across the UAE, or international to 200+ countries.",
  primaryButtonLabel: 'Get a Quote',
  primaryButtonUrl: '/quote',
  secondaryButtonLabel: 'Download App',
  heroImage: '/individual/magnific_create-a-premium-photorea_jUiWB0SLD0.webp',
};

export interface ServiceCard {
  id: 'domestic' | 'international';
  title: string;
  description: string;
  features: string[];
  buttonLabel: string;
  buttonUrl: string;
}

export const serviceCards: ServiceCard[] = [
  {
    id: 'domestic',
    title: 'Domestic On Demand',
    description: 'Same day delivery, picked up and delivered within hours.',
    features: ['Pickup within 2 hours', 'Same-day & next-day delivery', 'Live tracking, every step'],
    buttonLabel: 'Explore Domestic On Demand',
    buttonUrl: '/domestic-courier',
  },
  {
    id: 'international',
    title: 'International Shipping',
    description: 'Global reach with local expertise — sent right.',
    features: ['Delivery to 200+ countries', 'Door-to-door tracking', 'Customs handled for you'],
    buttonLabel: 'Explore International Shipping',
    buttonUrl: '/international-courier',
  },
];

export const whyShipCards = {
  domestic: { label: 'Domestic On Demand', text: 'Pickup and delivery within 2 hours, same city.' },
  international: { label: 'International Shipping', text: 'Delivered in 3-4 days to 200+ countries.' },
};

export interface BackedByPoint {
  text: string;
}

export const backedByPoints: BackedByPoint[] = [
  { text: 'Real-time tracking on every shipment, domestic or international' },
  { text: 'Nationwide coverage across every emirate' },
  { text: '15+ years of experience and 45M+ shipments delivered' },
];
