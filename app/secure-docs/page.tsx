import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { SecureDocsHero, SecureDocsProtocol, SecureDocsComplianceDetails } from '@/components/services/secure-docs';

export const metadata: Metadata = pageMetadata({
  title: "Secure Document Courier in the UAE",
  description:
    "Legal and official documents moved across the UAE with strict chain-of-custody controls, tamper-evident packaging and confirmed delivery.",
  path: '/secure-docs',
});

export default function SecureDocsPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureDocsHero />
      <SecureDocsProtocol />
      <SecureDocsComplianceDetails />
    </main>
  );
}
