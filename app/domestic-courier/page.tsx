import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
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

export const metadata: Metadata = pageMetadata({
  title: "Domestic On-Demand Delivery",
  description:
    "Same-day and next-day doorstep delivery across the UAE. Choose your vehicle, check transit times, and book on-demand delivery with Zajel.",
  path: '/domestic-courier',
});

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
        image="/ChatGPT Image Apr 23, 2026 at 11_02_53 AM.webp"
        imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
        title="Schedule your way."
        description="Same day or next day, doorstep to doorstep, anywhere in the UAE."
        priority
        buttons={[
          { label: "Book a Pickup", href: "/domestic-courier#pickup", variant: "primary" },
          { label: "Calculate Shipping Rate", href: "/domestic-courier#rate", variant: "secondary" },
          { label: "Track Your Shipment", href: "/domestic-courier#track", variant: "secondary" },
        ]}
      />
    </main>
  );
}