import type { Metadata } from 'next';
import { SecureMailHero, SecureMailProtocol, SecureMailDetails } from '@/components/services/secure-mail';

export const metadata: Metadata = {
  title: "Secure Mail Service",
  description: "Confidential correspondence sealed, tracked and delivered to the named recipient.",
};

export default function SecureMailPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureMailHero />
      <SecureMailProtocol />
      <SecureMailDetails />
    </main>
  );
}
