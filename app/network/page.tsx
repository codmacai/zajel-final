import type { Metadata } from "next";
import ServiceHero from "@/components/sections/ServiceHero/ServiceHero";
import LogisticsNetworkSection from "@/components/logistics-network/logistics-network";
import RegionalCoverageSection from "@/components/logistics-network/regional-coverage-section";
import FreightServicesSection from "@/components/freight-services/freight-services-section";
import StrategicAlliancesSection from "@/components/strategic-alliances/strategic-alliances-section";
import LogisticsInfrastructureSection from "@/components/logistics-infrastructure/logistics-infrastructure-section";
import ReachInNumbersSection from "@/components/reach-in-numbers/reach-in-numbers-section";
import NetworkFaq from "@/components/logistics-infrastructure/faq";

export const metadata: Metadata = {
  title: "Our Logistics Network in the UAE | Zajel",
  description:
    "Zajel's logistics network spans 195 countries and 500+ destinations — connected coverage from Dubai last-mile delivery to global multimodal freight.",
};

export default function NetworkPage() {
  return (
    <main>
      <ServiceHero variant="network" />
      <LogisticsNetworkSection/>
      <RegionalCoverageSection/>
      <FreightServicesSection/>
      <StrategicAlliancesSection/>
      <LogisticsInfrastructureSection/>
      <ReachInNumbersSection/>
      <NetworkFaq/>
      

      {/* Rest of the Network page content goes below. */}
    </main>
  );
}