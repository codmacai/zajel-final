import ChooseDeliveryAndCompliance from "@/components/AirFreight/Delivery/DeiveryCompliance";
import AirFreightFaq from "@/components/AirFreight/faq";
import AirFreightGuide from "@/components/AirFreight/Global/AirFreightGuide";
import AirFreightHero from "@/components/AirFreight/hero";
import HowFreightQuoteWorks from "@/components/AirFreight/HowItWorks";
import IndustriesWeServe from "@/components/AirFreight/industry";
import StoreToDoorBanner from "@/components/AirFreight/ProjectCargo";
import AirFreightSolutions from "@/components/AirFreight/Solutions/AirFreightSolutions";
import ValueAddedServices from "@/components/AirFreight/ValueAdded";
import WeightDimensionGuidelines from "@/components/AirFreight/WeightandDimensions";
import WhatWeMove from "@/components/AirFreight/WhatWeMove";
import WhenToChooseAirFreight from "@/components/AirFreight/WhenToChoose/Choose";
import ContactSection from "@/components/shared/contact";
import { airFreightContent } from "@/data/contact-content";

export default function Home() {
  return (
    <main>
      <AirFreightHero/>
      <AirFreightGuide />
      <AirFreightSolutions/>
      <WhenToChooseAirFreight/>
      <ChooseDeliveryAndCompliance/>
      <WhatWeMove/>
      <StoreToDoorBanner
        imageSrc="/airfreight/magnific_wind-turbine-blade-transp_cpEJciO0eP.jpg"
        imageAlt="Oversized project cargo being loaded"
      />
      <IndustriesWeServe/>
      <HowFreightQuoteWorks/>
      <ValueAddedServices/>
      <WeightDimensionGuidelines/>
      <ContactSection content={airFreightContent} />

      <AirFreightFaq/>
    </main>
  );
}