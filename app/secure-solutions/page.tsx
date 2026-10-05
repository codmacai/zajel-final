import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import SecureSolutions from '@/components/Secure-solutions/secure-solutions';

export const metadata: Metadata = pageMetadata({
  title: "Secure Solutions",
  description:
    "Dedicated, highly secure courier services relied upon by leading UAE government entities and institutions.",
  path: '/secure-solutions',
});

export default function Page() {
  return <SecureSolutions />;
}