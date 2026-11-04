import { cmsMetadata } from '@/lib/cms/server';
import {
  WhyShipInternationally,
  InternationalShippingTimes,
  CustomsDutyGuide,
} from '@/components/international';
import InternationalFaq from '@/components/international/faq';
import TwoWaysToShipAndJourney from '@/components/international/twowaysship';
import InternationalHero from '@/components/international/hero';
import CTABanner from '@/components/shared/CTABanner';

export const generateMetadata = cmsMetadata('international-courier', '/international-courier');

export default function InternationalPage() {
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
      <CTABanner
        image="/zajel-courier-hero.webp"
        imageAlt="Zajel courier handing over an international shipment"
  title="Book International Shipping in Minutes"
  description="Declare your document's weight and pay instantly, or request a quote for your package, book on zajel.com, or download the app for booking on the go."
  buttons={[
    { label: "Ship Internationally", href: "/send-shipment", variant: "primary" },
    { label: "Download the Zajel App", href: "/#download-app", variant: "secondary" },
  ]}
/>
    </main>
  );
}
