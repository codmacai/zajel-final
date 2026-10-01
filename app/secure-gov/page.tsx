import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { GovHero, GovInstitutionalProtocol, GovComplianceDetails } from '@/components/services/government';

export const metadata: Metadata = pageMetadata({
  title: "Government & Institutional Logistics",
  description:
    "Secure, documented and compliant courier and logistics services for UAE government entities and public institutions.",
  path: '/secure-gov',
});

export default function GovernmentPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <GovHero />
      <GovInstitutionalProtocol />
      <GovComplianceDetails />
    </main>
  );
}
