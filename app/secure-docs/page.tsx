import type { Metadata } from 'next';
import { SecureDocsHero, SecureDocsProtocol, SecureDocsComplianceDetails } from '@/components/services/secure-docs';

export const metadata: Metadata = {
  title: "Secure Document Courier",
  description: "Legal and official documents moved with strict custody controls and confirmed delivery.",
};

export default function SecureDocsPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureDocsHero />
      <SecureDocsProtocol />
      <SecureDocsComplianceDetails />
    </main>
  );
}
