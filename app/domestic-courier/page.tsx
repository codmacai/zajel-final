import { cmsMetadata } from '@/lib/cms/server';
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

export const generateMetadata = cmsMetadata('domestic-courier', '/domestic-courier');

export default function DomesticOnDemandPage() {
  return (
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
      <CTABanner
        image="/zajel-courier-hero.webp"
        imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
        title="Schedule your way."
        description="Same day or next day, doorstep to doorstep, anywhere in the UAE."
        priority
        buttons={[
          { label: "Book a Pickup", href: "/send-shipment", variant: "primary" },
          { label: "Calculate Shipping Rate", href: "/quotation", variant: "secondary" },
          { label: "Track Your Shipment", href: "/track", variant: "secondary" },
        ]}
      />
    </main>
  );
}
