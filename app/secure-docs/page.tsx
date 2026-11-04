import { cmsMetadata } from '@/lib/cms/server';
import { SecureDocsHero, SecureDocsProtocol, SecureDocsComplianceDetails } from '@/components/services/secure-docs';

export const generateMetadata = cmsMetadata('secure-docs', '/secure-docs');

export default function SecureDocsPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureDocsHero />
      <SecureDocsProtocol />
      <SecureDocsComplianceDetails />
    </main>
  );
}
