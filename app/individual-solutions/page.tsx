import { cmsMetadata } from '@/lib/cms/server';
import {
  BookNow,
  IndividualHero,
  ServiceCards,

  WhyShipWithZajel,
} from '@/components/individual-solutions';
import WhatCanYouSend from '@/components/individual-solutions/book-now/what-can-you-send';
import DomesticVsInternational from '@/components/individual-solutions/book-now/domestic-vs-international';
import CTABanner from '@/components/shared/CTABanner';

export const generateMetadata = cmsMetadata('individual-solutions', '/individual-solutions');

export default function IndividualSolutionsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFCFA]">
      <IndividualHero />
      <ServiceCards />
      <WhyShipWithZajel />
      <DomesticVsInternational />
      <WhatCanYouSend/>
      <CTABanner
                            image="/zajel-courier-hero.webp"

                    imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
                    title="Same day or international"
                    description="Book either service on zajel.com or download the app for booking on the go."
                    priority
                    buttons={[
                      { label: "Get the App", href: "/#download-app", variant: "primary" },
                      { label: "Send a shipment", href: "/send-shipment", variant: "secondary" },
                    ]}
                  />
    </main>
  );
}
