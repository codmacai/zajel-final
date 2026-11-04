import { cmsMetadata } from '@/lib/cms/server';
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

export const generateMetadata = cmsMetadata('ecommerce', '/ecommerce');

export default function EcommercePage() {
  return (
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
      <CTABanner
        image="/zajel-courier-hero.webp"
        imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
              title="Ecommerce Logistics."
              description="Built for how online sellers in UAE actually operate."
              priority
              buttons={[
                { label: "Get a Quote", href: "/support", variant: "primary" },
                { label: "Talk to our team", href: "/support", variant: "secondary" },
                
              ]}
            />
    </main>
  );
}
