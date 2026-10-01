import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Zajel by phone, email or our contact form. Customer support for courier, freight and logistics services in Dubai, Abu Dhabi and across the UAE.",
  path: '/contact',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
