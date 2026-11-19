import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import { GovHero, GovInstitutionalProtocol, GovComplianceDetails } from '@/components/services/government';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('secure-gov', '/secure-gov');

export default async function GovernmentPage() {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('secure-gov');
  return (
    <CmsScope page="secure-gov">
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <GovHero />
      <GovInstitutionalProtocol />
      <GovComplianceDetails />
    </main>
    </CmsScope>
  );
}
