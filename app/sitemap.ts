import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] };

// Every public page. Add new routes here when you create them.
const ROUTES: Entry[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },

  // Services
  { path: '/domestic-courier', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/international-courier', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/air-freight', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/sea-freight', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/land-freight', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/customs-clearance', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/warehouse', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ecommerce', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/business-solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/individual-solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/industry', priority: 0.8, changeFrequency: 'monthly' },

  // Secure solutions
  { path: '/secure-solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/secure-gov', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/secure-id', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/secure-docs', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/secure-mail', priority: 0.7, changeFrequency: 'monthly' },

  // Tools
  { path: '/send-shipment', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/track', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/quotation', priority: 0.7, changeFrequency: 'monthly' },

  // Company & support
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/network', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/careers', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/support', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
