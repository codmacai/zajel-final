import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import WhenToChooseSeaFreight from "@/components/sea-freight/when-to-choose-sea-freight";
import SeaWhatWeMove from "@/components/sea-freight/sea-what-we-move";
import OceanCargoVessels from "@/components/sea-freight/ocean-cargo-vessels";
import ContainerGuide from "@/components/sea-freight/container-guide";
import ChooseDeliveryAndComplianceSea from "@/components/sea-freight/choose-delivery-and-compliance-sea";
import { SeaFreightSolutions } from "@/components/sea-freight";
import BondedWarehouseStorage from "@/components/sea-freight/bonded-warehouse-storage";
import SeaFreightRoutes from "@/components/sea-freight/sea-freight-routes";
import MarineCargoInsurance from "@/components/sea-freight/marine-cargo-insurance";
import SeaFreightBanner from "@/components/sea-freight/seaproject";
import IndustriesWeServe from "@/components/sea-freight/industry";
import HowFreightQuoteWorks from "@/components/sea-freight/Howitworks";
import SeaFreightFAQS from "@/components/sea-freight/faq";
import SeaFreightHero from "@/components/sea-freight/hero";
import ContactSection from "@/components/shared/contact";
import { seaFreightContent } from "@/data/contact-content";
import { SeaFreight_FAQS } from "@/data/sea-freight-faq";
import FaqJsonLd from "@/lib/faq-json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Sea Freight Shipping in the UAE",
  description:
    "FCL and LCL sea freight from UAE ports to destinations worldwide, with clear pricing, container guidance, bonded storage, marine insurance and customs clearance.",
  path: '/sea-freight',
});

export default function SeaFreightPage() {
  return (
    <main>
      <SeaFreightHero/>
        <SeaFreightSolutions/>
      <WhenToChooseSeaFreight />
      <ChooseDeliveryAndComplianceSea />

      <SeaWhatWeMove />
      <SeaFreightBanner
        imageSrc="/sea-freight/breakbulk-shipment.webp"
        imageAlt="Container ship at port"
      />

      <OceanCargoVessels />
      <ContainerGuide />
      <IndustriesWeServe/>
      <HowFreightQuoteWorks/>

      <BondedWarehouseStorage/>
      <ContactSection content={seaFreightContent} />

      <SeaFreightFAQS/>
      <FaqJsonLd items={SeaFreight_FAQS} />
    </main>
  );
}