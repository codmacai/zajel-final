import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { SecureMailHero, SecureMailProtocol, SecureMailDetails } from '@/components/services/secure-mail';

export const metadata: Metadata = pageMetadata({
  title: "Secure Mail Service in the UAE",
  description:
    "Confidential correspondence sealed, tracked and delivered by hand to the named recipient anywhere in the UAE.",
  path: '/secure-mail',
});

export default function SecureMailPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureMailHero />
      <SecureMailProtocol />
      <SecureMailDetails />
    </main>
  );
}
