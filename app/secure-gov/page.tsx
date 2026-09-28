import type { Metadata } from 'next';
import { GovHero, GovInstitutionalProtocol, GovComplianceDetails } from '@/components/services/government';

export const metadata: Metadata = {
  title: "Government & Institutional Logistics",
  description: "Secure, documented and compliant shipping for government entities and public institutions.",
};

export default function GovernmentPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <GovHero />
      <GovInstitutionalProtocol />
      <GovComplianceDetails />
    </main>
  );
}
