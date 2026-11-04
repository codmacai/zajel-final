import { cmsMetadata } from '@/lib/cms/server';
import ServiceHero from "@/components/sections/ServiceHero/ServiceHero";
import LogisticsNetworkSection from "@/components/logistics-network/logistics-network";
import RegionalCoverageSection from "@/components/logistics-network/regional-coverage-section";
import FreightServicesSection from "@/components/freight-services/freight-services-section";
import StrategicAlliancesSection from "@/components/strategic-alliances/strategic-alliances-section";
import LogisticsInfrastructureSection from "@/components/logistics-infrastructure/logistics-infrastructure-section";
import ReachInNumbersSection from "@/components/reach-in-numbers/reach-in-numbers-section";
import NetworkFaq from "@/components/logistics-infrastructure/faq";
import ContactBand from "@/components/dynamic-contact";

export const generateMetadata = cmsMetadata('network', '/network');

export default function NetworkPage() {
  return (
    <main>
      <ServiceHero variant="network" />
      <div id="explore-network" className="scroll-mt-24">
        <LogisticsNetworkSection />
      </div>
      <RegionalCoverageSection/>
      <FreightServicesSection/>
      <StrategicAlliancesSection/>
      <LogisticsInfrastructureSection/>
      <ReachInNumbersSection/>
      <NetworkFaq/>
      <ContactBand />
      

      {/* Rest of the Network page content goes below. */}
    </main>
  );
}