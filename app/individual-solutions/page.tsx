import type { Metadata } from 'next';
import {
  BookNow,
  IndividualHero,
  ServiceCards,

  WhyShipWithZajel,
} from '@/components/individual-solutions';
import WhatCanYouSend from '@/components/individual-solutions/book-now/what-can-you-send';
import DomesticVsInternational from '@/components/individual-solutions/book-now/domestic-vs-international';
import CTABanner from '@/components/shared/CTABanner';

export const metadata: Metadata = {
  title: 'Individual Solutions | Zajel',
  description:
    "Whatever you're sending, wherever it's going — same day across the UAE, or international to 200+ countries.",
};

export default function IndividualSolutionsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFCFA]">
      <IndividualHero />
      <ServiceCards />
      <WhyShipWithZajel />
      <DomesticVsInternational />
      <WhatCanYouSend/>
      <CTABanner
                            image="/ChatGPT Image Apr 23, 2026 at 11_02_53 AM.png"

                    imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
                    title="Same day or international"
                    description="Book either service on zajel.com or download the app for booking on the go."
                    priority
                    buttons={[
                      { label: "Get the App", href: "/domestic-courier#pickup", variant: "primary" },
                      { label: "Download the Zajel App", href: "/domestic-courier#rate", variant: "secondary" },
                    ]}
                  />
    </main>
  );
}