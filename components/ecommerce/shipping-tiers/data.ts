import type { ShippingTier } from './types';

export const EYEBROW = 'Pricing';
export const HEADING_LINE_1 = 'Built to Match';
export const HEADING_LINE_2 = 'Your Volume';
export const INTRO =
  "Whether you're shipping your first orders or running fulfillment at scale, there's a tier that fits how your business actually operates.";
export const FOOTNOTE =
  'No setup fees on any tier. Start on the app and move to a business account as your volume grows.';

export const TIERS: ShippingTier[] = [
  {
    id: 'emerging',
    tierNumber: '01',
    label: 'Emerging Sellers',
    volume: 'Shipping 1 to 50 orders per day',
    description:
      'You are building your brand and every delivery matters. Download the Zajel app and book on-demand pickups whenever you need them, with no minimum volumes, no contracts and no account setup. Pay per shipment and scale when you are ready.',
    featuresNote: null,
    features: [
      'On-demand pickups booked from the app',
      'Pay per shipment, no contracts',
      'Live tracking for you and your customer',
      'Same-day and next-day delivery across all emirates',
      'COD collection',
    ],
    buttonLabel: 'Download the App',
    buttonUrl: '/download-app',
    recommended: false,
  },
  {
    id: 'growing',
    tierNumber: '02',
    label: 'Growing Brands',
    volume: 'Shipping 50 to 500 orders per day',
    description:
      'Your order volume is climbing and you need logistics that keeps pace without adding complexity. Zajel assigns a dedicated account manager to your business, builds a custom rate card around your shipping patterns, and handles fulfillment so you can focus on selling.',
    featuresNote: 'What you get:',
    features: [
      'Business portal with order tracking',
      'Shopify or WooCommerce integration',
      'Dedicated account manager',
      'Custom volume-based rate card',
      'Priority pickup scheduling',
      'COD collection and weekly reconciliation',
      'Returns processing',
      'Monthly performance reports',
    ],
    buttonLabel: 'Talk to Sales',
    buttonUrl: '/contact-sales',
    recommended: true,
  },
  {
    id: 'enterprise',
    tierNumber: '03',
    label: 'Enterprise & Marketplace',
    volume: 'Shipping 500+ orders per day',
    description:
      'At this scale, logistics is a strategic function. Zajel provides API-level integration, warehouse-based fulfillment, and a logistics team that operates as an extension of your operations.',
    featuresNote: 'Everything in Growing Brands, plus:',
    features: [
      'Full API integration with your OMS or ERP',
      'Warehouse fulfillment (pick, pack, dispatch)',
      'Dedicated operations liaison',
      'Daily COD reconciliation and settlement',
      'Custom SLA agreements',
    ],
    buttonLabel: 'Talk to Sales',
    buttonUrl: '/contact-sales',
    recommended: false,
  },
];