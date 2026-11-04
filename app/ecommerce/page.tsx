import { cmsMetadata, getSection } from '@/lib/cms/server';
import {
  BusinessGetsSection,
  PlatformIntegrations,
  DashboardReporting,
  ShippingTiers,
  CodSection,
} from '@/components/ecommerce';
import GettingStartedSection from '@/components/ecommerce/GettinStarted';
import HowItWorks from '@/components/ecommerce/Howitworks';
import EcommerceFaqSection from '@/components/ecommerce/ecommerce-faq';
import CTABanner from '@/components/shared/CTABanner';
import EcommerceHero from '@/components/ecommerce/hero';
import { ECOMMERCE_CTA } from '@/components/ecommerce/content';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('ecommerce', '/ecommerce');

export default async function EcommercePage() {
  const cta = await getSection("ecommerce.cta", ECOMMERCE_CTA);
  return (
    <CmsScope page="ecommerce">
    <main>
      <EcommerceHero/>
      <BusinessGetsSection />
      <CodSection />

      <GettingStartedSection/>

      <PlatformIntegrations />
      <DashboardReporting />
      <ShippingTiers />
      <HowItWorks/>
      <EcommerceFaqSection/>
      {cta && <CTABanner {...cta} priority />}
    </main>
    </CmsScope>
  );
}
