import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Ecommerce Fulfillment | Zajel',
  description:
    'Connect your store to Zajel for order fulfillment, nationwide delivery, COD collection, and merchant reporting.',
};

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
        image="/ChatGPT Image Apr 23, 2026 at 11_02_53 AM.png"
        imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
              title="Ecommerce Logistics."
              description="Built for how online sellers in UAE actually operate."
              priority
              buttons={[
                { label: "Get a Quote", href: "/domestic-courier#pickup", variant: "primary" },
                { label: "Talk to our team", href: "/domestic-courier#rate", variant: "secondary" },
                
              ]}
            />
    </main>
  );
}