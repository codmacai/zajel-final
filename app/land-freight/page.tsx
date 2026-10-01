import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
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

export const metadata: Metadata = pageMetadata({
  title: "Land Freight Services",
  description:
    "Full truckload and less-than-truckload road freight across the UAE, GCC, and cross-border routes to Jordan, Turkey, and Europe — with TIR customs transit, cold chain, and dedicated fleet coverage.",
  path: '/land-freight',
});

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
      imageSrc="/Homepage/projects/oil-gas-process-equipment.jpg"
      imageAlt="Container ship at port"
    />
      
      <IndustriesWeServe/>
      <BorderCrossings />
      <HowFreightQuoteWorks/>
      <TirTransportEditorial />



      <ColdChainGridSection />

    </main>
  );
}