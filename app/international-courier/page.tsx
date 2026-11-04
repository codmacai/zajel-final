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

export const generateMetadata = cmsMetadata('international-courier', '/international-courier');

export default async function InternationalPage() {
  const cta = await getSection("international-courier.cta", INTERNATIONAL_CTA);
  return (
    <main>
      <InternationalHero/>
      <TwoWaysToShipAndJourney/>
      <WhyShipInternationally />
      <InternationalShippingTimes
        bannerImageSrc="/international/air-cargo-loading.webp"
        bannerImageAlt="Palletised cargo being loaded onto a freighter aircraft for international shipping"
      />
      <CustomsDutyGuide />
      <InternationalFaq/>
      {cta && <CTABanner {...cta} />}
    </main>
  );
}
