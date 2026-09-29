import type { Metadata } from 'next';
import {
  WhyShipInternationally,
  InternationalShippingTimes,
  CustomsDutyGuide,
} from '@/components/international';
import InternationalFaq from '@/components/international/faq';
import TwoWaysToShipAndJourney from '@/components/international/twowaysship';
import InternationalHero from '@/components/international/hero';
import CTABanner from '@/components/shared/CTABanner';

export const metadata: Metadata = {
  title: 'International Shipping | Zajel',
  description:
    'Ship internationally from the UAE to 200+ countries with reliable express and standard delivery, real-time tracking, and full customs clearance support.',
};

export default function InternationalPage() {
  return (
    <main>
      <InternationalHero/>
      <TwoWaysToShipAndJourney/>
      <WhyShipInternationally />
      <InternationalShippingTimes
  bannerImageSrc="/international/reference-startimage.png
"
  bannerImageAlt="Zajel courier delivering an international shipment"
/>
      <CustomsDutyGuide />
      <InternationalFaq/>
      <CTABanner
        image="/ChatGPT Image Apr 23, 2026 at 11_02_53 AM.png"
        imageAlt="Zajel courier handing over an international shipment"
  title="Book International Shipping in Minutes"
  description="Declare your document's weight and pay instantly, or request a quote for your package, book on zajel.com, or download the app for booking on the go."
  buttons={[
    { label: "Ship Internationally", href: "/international-courier#book", variant: "primary" },
    { label: "Download the Zajel App", href: "/app", variant: "secondary" },
  ]}
/>
    </main>
  );
}