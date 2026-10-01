import type { Metadata } from "next";
import { pageMetadata } from '@/lib/seo';
import ServiceHero from "@/components/sections/ServiceHero/ServiceHero";
import IndustryExpertise from "@/components/industry-expertise/industry-expertise";
import IndustryFaq from "@/components/industry-expertise/faq";
import ContactBand from "@/components/dynamic-contact";

export const metadata: Metadata = pageMetadata({
  title: "Industry Logistics Solutions in the UAE",
  description:
    "Industry logistics solutions across the UAE shaped by your sector — from cold chain pharma to oversized oil and gas cargo, backed by 45M+ shipments and 4 ISO certifications.",
  path: '/industry',
});

export default function IndustryPage() {
  return (
    <main>
      <ServiceHero variant="industry" />
      <IndustryExpertise />
      <IndustryFaq />
      <ContactBand
        badgeText="Specialized Logistics Solutions"
        title="Your Industry, Our Expertise"
        descriptionLead="The industries listed here represent the sectors where Zajel has established deep operational experience. But logistics requirements are not limited to a fixed list of verticals. If your industry requires specialized handling, specific compliance standards, or tailored logistics solutions that go beyond standard transport, our team is equipped to design and deliver a solution that fits."
        descriptionDetail="Contact us to discuss the logistics requirements of your industry and how Zajel can support your operations."
        contactInfo={{
          email: "sales@zajel.com",
          phone: "600 53 11 11",
          address: "Dubai Office, Al Rostamani Building, Al Ittihad Rd, E11, Dubai",
        }}
        primaryCta={{ label: "Contact Our Team", url: "/contact" }}
      />
    </main>
  );
}