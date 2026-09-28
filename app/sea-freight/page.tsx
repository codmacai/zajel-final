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

export default function SeaFreightPage() {
  return (
    <main>
      <SeaFreightHero/>
        <SeaFreightSolutions/>
      <WhenToChooseSeaFreight />
      <ChooseDeliveryAndComplianceSea />

      <SeaWhatWeMove />
      <SeaFreightBanner
        imageSrc="/sea-freight/magnific_breakbulk-shipment-uae-to_XmkRhJ7Bfo.jpg"
        imageAlt="Container ship at port"
      />

      <OceanCargoVessels />
      <ContainerGuide />
      <IndustriesWeServe/>
      <HowFreightQuoteWorks/>

      <BondedWarehouseStorage/>
      <ContactSection content={seaFreightContent} />

      <SeaFreightFAQS/>
    </main>
  );
}