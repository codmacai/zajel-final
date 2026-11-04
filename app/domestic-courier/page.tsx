import { cmsMetadata, getSection } from '@/lib/cms/server';
import {
  DeliverySpeedAndDoorstep,
  WhyChooseZajel,
  ChooseVehicle,
  WhatYouCanShip,
  BookThroughApp,
  Coverage,
} from '@/components/domestic-on-demand';
import HowItWorks from '@/components/domestic-on-demand/HowItWorks';
import DomesticFaqSection from '@/components/domestic-on-demand/domestic-faq';
import CTABanner from '@/components/shared/CTABanner';
import DomesticHero from '@/components/domestic-on-demand/hero';
import { DOMESTIC_CTA } from '@/components/domestic-on-demand/content';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('domestic-courier', '/domestic-courier');

export default async function DomesticOnDemandPage() {
  const cta = await getSection("domestic-courier.cta", DOMESTIC_CTA);
  return (
    <CmsScope page="domestic-courier">
    <main>
      <DomesticHero/>
      <DeliverySpeedAndDoorstep />
      <Coverage />

      <WhyChooseZajel />
      <HowItWorks/>
      <ChooseVehicle />
      <WhatYouCanShip />
      <BookThroughApp />
      <DomesticFaqSection/>
      {cta && <CTABanner {...cta} priority />}
    </main>
    </CmsScope>
  );
}
