import { cmsMetadata, getSection } from '@/lib/cms/server';
import {
  WhyShipInternationally,
  InternationalShippingTimes,
  CustomsDutyGuide,
} from '@/components/international';
import InternationalFaq from '@/components/international/faq';
import TwoWaysToShipAndJourney from '@/components/international/twowaysship';
import InternationalHero from '@/components/international/hero';
import CTABanner from '@/components/shared/CTABanner';
import { INTERNATIONAL_CTA } from '@/components/international/content';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('international-courier', '/international-courier');

export default async function InternationalPage() {
  const cta = await getSection("international-courier.cta", INTERNATIONAL_CTA);
  return (
    <CmsScope page="international-courier">
    <main>
      <InternationalHero/>
      <TwoWaysToShipAndJourney/>
      <WhyShipInternationally />
      <InternationalShippingTimes
      />
      <CustomsDutyGuide />
      <InternationalFaq/>
      {cta && <CTABanner {...cta} />}
    </main>
    </CmsScope>
  );
}
