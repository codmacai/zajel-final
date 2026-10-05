import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "Customer Support",
  description:
    "Track a shipment, raise a support ticket or find answers about deliveries, pickups and returns with Zajel customer support.",
  path: '/support',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
