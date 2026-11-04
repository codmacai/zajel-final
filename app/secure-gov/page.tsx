import { cmsMetadata } from '@/lib/cms/server';
import { GovHero, GovInstitutionalProtocol, GovComplianceDetails } from '@/components/services/government';

export const generateMetadata = cmsMetadata('secure-gov', '/secure-gov');

export default function GovernmentPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <GovHero />
      <GovInstitutionalProtocol />
      <GovComplianceDetails />
    </main>
  );
}
