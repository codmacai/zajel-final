import { cmsMetadata, getSection } from '@/lib/cms/server';
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
import { BUSINESS_CTA } from '@/components/business-solutions/content';

export const generateMetadata = cmsMetadata('business-solutions', '/business-solutions');

export default async function BusinessSolutionsPage() {
  const cta = await getSection("business-solutions.cta", BUSINESS_CTA);
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFCFA]">
      <BusinessHero />
      <ServiceCards />
      <ValueAddedServices />
      <BuiltForBusiness />
      <TechnologyVisibility />
      <WhyBusinessesChoose />
      {cta && <CTABanner {...cta} priority />}
    </main>
  );
}
