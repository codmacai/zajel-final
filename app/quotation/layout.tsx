import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "Courier Rate Calculator",
  description:
    "Get an instant courier quote for domestic and international shipments from the UAE. Enter weight and destination to compare delivery options.",
  path: '/quotation',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
