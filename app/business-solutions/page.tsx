// Drop this in at app/business-solutions/page.tsx (or wherever this route
// lives). HowBusinessOnboardingWorks wasn't sent over as source (only
// imported by name, like ZajelProcess was on the Individual Solutions
// page), so it's kept as an external, unconverted import here — send its
// code and it'll get the same treatment.

import {
  BusinessHero,
  ServiceCards,
  ValueAddedServices,
  BuiltForBusiness,
  TechnologyVisibility,
  WhyBusinessesChoose,
  ConversionBand,
} from '@/components/business-solutions';
import CTABanner from '@/components/shared/CTABanner';

export const metadata = {
  title: 'Business Solutions | Zajel',
  description:
    "Whether you're fulfilling online orders or moving freight across borders, Zajel supports the operation — not just the shipment.",
};

export default function BusinessSolutionsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFCFA]">
      <BusinessHero />
      <ServiceCards />
      <ValueAddedServices />
      <BuiltForBusiness />
      <TechnologyVisibility />
      <WhyBusinessesChoose />
      <CTABanner
        image="/ChatGPT Image Apr 23, 2026 at 11_02_53 AM.png"
        imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
              title="Ready to Scale"
              description="Get a quote, talk to our logistics team or calculate your shipping rate, however you want to start.We're ready"
              priority
              buttons={[
                { label: "Get a quote", href: "/domestic-courier#pickup", variant: "primary" },
                { label: "Talk to our team", href: "/domestic-courier#rate", variant: "secondary" },
              ]}
            />
    </main>
  );
}