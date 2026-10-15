import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    // All crawlers, AI ones included (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), are
    // allowed. No `host` line: Google ignores it and it only ever echoed the build's site URL.
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
