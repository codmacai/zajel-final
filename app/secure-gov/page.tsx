import { cmsMetadata } from '@/lib/cms/server';
import { GovHero, GovInstitutionalProtocol, GovComplianceDetails } from '@/components/services/government';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('secure-gov', '/secure-gov');

export default function GovernmentPage() {
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
