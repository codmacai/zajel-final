import type { Metadata } from "next";
import { pageMetadata } from '@/lib/seo';
import ServiceHero from "@/components/sections/ServiceHero/ServiceHero";
import CustomsClearanceServices from "@/components/customs-clearance/customs-clearance-services";
import CustomsLocationCoverage from "@/components/customs-location-coverage/customs-location-coverage";
import CustomsDocumentationCompliance from "@/components/customs-documentation-compliance/customs-documentation-compliance";
import IndustriesWeServe from "@/components/industries-we-serve/industries-we-serve";
import { CUSTOMS_CLEARANCE_FAQS } from "@/data/customs-clearance-faqs";
import CustomsFaqSection from "@/components/customs-clearance/customs-faq-section";
import HowClearanceWorks from "@/components/customs-clearance/howitworks";

export const metadata: Metadata = pageMetadata({
  title: "Customs Clearance UAE",
  description:
    "End to end customs clearance and brokerage services across the UAE — air, sea, and land, handled by licensed customs brokers.",
  path: '/customs-clearance',
});

export default function CustomsClearancePage() {
  return (
    <main>
      <ServiceHero variant="customs" />
      <CustomsClearanceServices/>
      <CustomsLocationCoverage/>
      <CustomsDocumentationCompliance/>
      <HowClearanceWorks/>
      <IndustriesWeServe/>
      <CustomsFaqSection />

      {/* Rest of the Customs Clearance page content goes below. */}
    </main>
  );
}