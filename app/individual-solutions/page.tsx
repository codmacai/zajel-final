import { cmsMetadata, getSection } from '@/lib/cms/server';
import {
  BookNow,
  IndividualHero,
  ServiceCards,

  WhyShipWithZajel,
} from '@/components/individual-solutions';
import WhatCanYouSend from '@/components/individual-solutions/book-now/what-can-you-send';
import DomesticVsInternational from '@/components/individual-solutions/book-now/domestic-vs-international';
import CTABanner from '@/components/shared/CTABanner';
import { INDIVIDUAL_CTA } from '@/components/individual-solutions/content';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('individual-solutions', '/individual-solutions');

export default async function IndividualSolutionsPage() {
  const cta = await getSection("individual-solutions.cta", INDIVIDUAL_CTA);
  return (
    <CmsScope page="individual-solutions">
    <main className="min-h-screen overflow-hidden bg-[#FAFCFA]">
      <IndividualHero />
      <ServiceCards />
      <WhyShipWithZajel />
      <DomesticVsInternational />
      <WhatCanYouSend/>
      {cta && <CTABanner {...cta} priority />}
    </main>
    </CmsScope>
  );
}
