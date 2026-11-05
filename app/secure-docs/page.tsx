import { cmsMetadata } from '@/lib/cms/server';
import { SecureDocsHero, SecureDocsProtocol, SecureDocsComplianceDetails } from '@/components/services/secure-docs';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('secure-docs', '/secure-docs');

export default function SecureDocsPage() {
  return (
    <CmsScope page="secure-docs">
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureDocsHero />
      <SecureDocsProtocol />
      <SecureDocsComplianceDetails />
    </main>
    </CmsScope>
  );
}
