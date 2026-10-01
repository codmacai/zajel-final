import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#36B936',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
