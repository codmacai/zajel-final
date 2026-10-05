import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "Help",
  description:
    "Get help with your Zajel shipment.",
  path: '/help',
  noIndex: true,
});
export default function HelpPage() {
  return (
    <main>
      <h1>Help</h1>
    </main>
  );
}
