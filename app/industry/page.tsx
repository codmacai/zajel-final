import type { Metadata } from "next";
import ServiceHero from "@/components/sections/ServiceHero/ServiceHero";
import IndustryExpertise from "@/components/industry-expertise/industry-expertise";
import IndustryFaq from "@/components/industry-expertise/faq";

export const metadata: Metadata = {
  title: "Industry Logistics Solutions in the UAE | Zajel",
  description:
    "Industry logistics solutions across the UAE shaped by your sector — from cold chain pharma to oversized oil and gas cargo, backed by 45M+ shipments and 4 ISO certifications.",
};

export default function IndustryPage() {
  return (
    <main>
      <ServiceHero variant="industry" />
      <IndustryExpertise/>
      <IndustryFaq/>

      {/* Rest of the Industry page content goes below. */}
    </main>
  );
}