import type { Metadata } from 'next';
import SecureSolutions from '@/components/Secure-solutions/secure-solutions';

export const metadata: Metadata = {
  title: 'Secure Solutions | Zajel',
  description:
    'Dedicated, highly secure courier services relied upon by leading UAE government entities and institutions.',
  openGraph: {
    title: 'Secure Solutions | Zajel',
    description:
      'Dedicated, highly secure courier services relied upon by leading UAE government entities and institutions.',
    images: ['/images/secure-hero.png'],
  },
};

export default function Page() {
  return <SecureSolutions />;
}