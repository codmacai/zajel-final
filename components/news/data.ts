/**
 * News articles: the newest three show on the home page (Latest news), and each article has
 * its own page at /news/<slug>. Edited in the CMS under News.
 *
 * DEMO CONTENT — replace with real articles (and photos) in the CMS before going live.
 */

/** One part of an article. Every block has every field; only the ones for its type are used. */
export interface NewsBlock {
  type: 'Paragraph' | 'Heading' | 'Quote' | 'Bullet list' | 'Image';
  /** Paragraph, Heading and Quote. */
  text: string;
  /** Bullet list. */
  items: string[];
  /** Image: the photo, and its caption (also its description for screen readers). */
  image: string;
  caption: string;
}

export interface NewsArticle {
  /** URL name: /news/<slug>. Lowercase words joined by dashes; must be unique. */
  slug: string;
  title: string;
  category: string;
  /** ISO date, YYYY-MM-DD. The newest articles show first. */
  date: string;
  author: string;
  /** One or two sentences: the home page card and the Google description. */
  excerpt: string;
  image: string;
  imageAlt: string;
  /** Colour of the dot next to the category. */
  accent: string;
  body: NewsBlock[];
}

export const BLOCK_TYPES: NewsBlock['type'][] = ['Paragraph', 'Heading', 'Quote', 'Bullet list', 'Image'];

const block = (type: NewsBlock['type'], fields: Partial<NewsBlock>): NewsBlock => ({ type, text: '', items: [], image: '', caption: '', ...fields });
const p = (text: string) => block('Paragraph', { text });
const h = (text: string) => block('Heading', { text });
const quote = (text: string) => block('Quote', { text });
const list = (items: string[]) => block('Bullet list', { items });
const photo = (image: string, caption: string) => block('Image', { image, caption });

const ARTICLES: NewsArticle[] = [
  {
    slug: 'air-sea-trade-corridors-500-destinations',
    title: 'Expanding Air & Sea Trade Corridors Across 500+ Destinations',
    category: 'Global Freight',
    date: '2026-05-14',
    author: 'Zajel Newsroom',
    excerpt:
      'Enhancing multimodal freight connectivity between key trade hubs across Asia, Europe, and the Middle East to accelerate transit times for bulk cargo.',
    image: '/freight/sea-freight-container-ship.webp',
    imageAlt: 'Container ship carrying cargo across the open sea',
    accent: '#36B936',
    body: [
      p('Global trade keeps shifting, and shippers need routes that are fast, reliable and flexible. This year Zajel has expanded its air and sea freight network to connect customers in the UAE with more than 500 destinations across Asia, Europe, Africa and the Americas.'),
      h('Why multimodal matters'),
      p('No single mode of transport fits every shipment. Sea freight keeps costs low for large volumes, while air freight moves urgent and high-value cargo in days. By combining both on one booking, customers can balance speed and cost without managing several providers.'),
      quote('Our goal is simple: one partner, one booking, and full visibility from the factory floor to the final delivery.'),
      h('What changes for our customers'),
      list([
        'Faster transit times on key Asia–Gulf and Europe–Gulf lanes',
        'Sea–air options that save days compared with ocean-only routes',
        'Consolidated LCL services for smaller shipments',
        'One point of contact from pickup to delivery',
      ]),
      photo('/warehouse/warehouse-port-airport-aerial.webp', 'Our Dubai operations sit between Jebel Ali Port and the city’s airports.'),
      p('Every shipment is tracked end to end, with customs documents handled by our in-house brokerage team. To plan your next shipment, request a quote or speak to our freight specialists.'),
    ],
  },
  {
    slug: 'gcc-cross-border-clearance-network',
    title: 'Streamlined GCC Cross-Border Clearance Network Launched',
    category: 'Customs & Trade',
    date: '2026-02-28',
    author: 'Zajel Newsroom',
    excerpt:
      'Accelerating border clearance operations through automated documentation workflows and dedicated customs brokerage hubs across regional gateways.',
    image: '/custom-clearance/import-clearance.webp',
    imageAlt: 'Customs brokerage team reviewing shipment documents',
    accent: '#5FD37A',
    body: [
      p('Moving goods across GCC borders should not mean days of waiting. Zajel’s cross-border clearance network brings documents, brokerage and trucking together, so cargo moves through regional gateways with fewer delays.'),
      h('Paperwork prepared before the border'),
      p('Our brokerage team prepares and checks commercial invoices, packing lists, certificates of origin and permits before the truck leaves. Automated document checks flag missing information early, while it is still easy to fix.'),
      list([
        'Documents cleared in advance, before arrival at the border',
        'Dedicated brokerage desks at key regional crossings',
        'Transit and re-export clearance for goods moving through the UAE',
        'Live status updates at every checkpoint',
      ]),
      photo('/custom-clearance/transit-re-export-clearance.webp', 'Transit and re-export cargo prepared for onward clearance.'),
      quote('When the paperwork is right before the truck leaves, the border becomes a checkpoint, not a bottleneck.'),
      p('Whether you import into the UAE, export across the region or move goods in transit, our customs specialists can advise on the right route and documents for your cargo.'),
    ],
  },
  {
    slug: 'next-generation-fulfillment-center-dubai',
    title: 'Next-Generation Fulfillment Center Operational in Dubai',
    category: 'Smart Warehousing',
    date: '2025-11-12',
    author: 'Zajel Newsroom',
    excerpt:
      'Opening high-capacity, climate-controlled fulfillment facilities equipped with automated inventory sorting to power seamless e-commerce distribution.',
    image: '/warehouse/warehouse-hero.webp',
    imageAlt: 'Warehouse team member checking stock levels on a tablet',
    accent: '#7FD79A',
    body: [
      p('Online shoppers expect fast, accurate delivery. Our new fulfillment center in Dubai is designed to meet that expectation, with climate-controlled storage, automated inventory sorting and same-day dispatch for orders placed before the cut-off.'),
      h('Built for online sellers'),
      p('The facility connects directly with leading e-commerce platforms, so orders reach our team the moment they are placed. Each item is picked, packed and labelled by trained staff, then handed straight to Zajel couriers for delivery across the UAE.'),
      list([
        'Climate-controlled zones for sensitive products',
        'Real-time stock levels in your dashboard',
        'Same-day dispatch for orders before the daily cut-off',
        'Returns received, checked and restocked quickly',
      ]),
      photo('/warehouse/solutions/short-long-term-storage.webp', 'Flexible short and long-term storage for growing brands.'),
      quote('Fulfillment is where a brand keeps its promise to the customer. We built this center to keep that promise every day.'),
      p('Brands of every size can start with a few pallets and scale up as they grow. Talk to our team to plan storage, fulfillment and delivery in one place.'),
    ],
  },
];

/** Every article as one CMS section (News → Articles). */
export const NEWS_ARTICLES = { articles: ARTICLES };
export type NewsArticlesContent = typeof NEWS_ARTICLES;

/** The words on every article page (News → Article page text). */
export const NEWS_PAGE = {
  homeLabel: 'Home',
  newsLabel: 'News',
  backLabel: 'Back to news',
  tocLabel: 'On this page',
  authorLabel: 'Written by',
  authorNote: 'News, insights and updates from the Zajel team.',
  publishedLabel: 'Published',
  readingLabel: 'Reading time',
  readTimeLabel: 'min read',
  topicLabel: 'Topic',
  shareLabel: 'Share this article',
  copiedLabel: 'Link copied',
  moreLabel: 'More news',
  ctaTitle: 'Ready to move your cargo?',
  ctaText: 'Talk to our specialists about courier, freight, customs or warehousing for your business.',
  ctaButton: 'Get a quote',
  ctaHref: '/quotation',
  ctaSecondaryButton: 'Contact us',
  ctaSecondaryHref: '/support',
};
export type NewsPageContent = typeof NEWS_PAGE;
