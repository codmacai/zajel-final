import { cmsMetadata } from '@/lib/cms/server';
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

export const generateMetadata = cmsMetadata('air-freight', '/air-freight');

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
      />
      <IndustriesWeServe/>
      <HowFreightQuoteWorks/>
      <ValueAddedServices/>
      <WeightDimensionGuidelines/>
      {/* <ContactSection content={airFreightContent} /> */}

      <AirFreightFaq/>
    </main>
  );
}