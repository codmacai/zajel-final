import { cmsMetadata } from '@/lib/cms/server';
import {
  LandFreightSolutions,
  WhenToChooseLandFreight,
  RoadFreightCoverage,
  WhatWeMove,
  OurFleetSection,
  ColdChainGridSection,
  TirTransportEditorial,
  BorderCrossings,
  GccRouteGuidelines,
  ComplianceCustomsExpertise,
} from '@/components/land-freight';
import LandFreightBanner from '@/components/land-freight/landproject';
import IndustriesWeServe from '@/components/land-freight/industry';
import HowFreightQuoteWorks from '@/components/land-freight/HowItworks';
import LandFreightHero from '@/components/land-freight/hero';
import LandFreightFAQS from '@/components/land-freight/faq';

export const generateMetadata = cmsMetadata('land-freight', '/land-freight');

export default function LandFreightPage() {
  return (
    <main>
      <LandFreightHero/>
      <LandFreightSolutions />
      <WhenToChooseLandFreight />
      <RoadFreightCoverage />
      <OurFleetSection />
      <ComplianceCustomsExpertise />


      <WhatWeMove />
      <LandFreightBanner
    />
      
      <IndustriesWeServe/>
      <BorderCrossings />
      <HowFreightQuoteWorks/>
      <TirTransportEditorial />



      <ColdChainGridSection />

      <LandFreightFAQS />
    </main>
  );
}