import type { Metadata } from 'next';
import {
  WhyShipInternationally,
  InternationalShippingTimes,
  CustomsDutyGuide,
} from '@/components/international';
import InternationalFaq from '@/components/international/faq';
import TwoWaysToShipAndJourney from '@/components/international/twowaysship';
import InternationalHero from '@/components/international/hero';

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
      <InternationalShippingTimes />
      <CustomsDutyGuide />
      <InternationalFaq/>
    </main>
  );
}