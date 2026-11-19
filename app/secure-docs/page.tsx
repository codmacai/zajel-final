import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import { SecureDocsHero, SecureDocsProtocol, SecureDocsComplianceDetails } from '@/components/services/secure-docs';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('secure-docs', '/secure-docs');

export default async function SecureDocsPage() {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('secure-docs');
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
