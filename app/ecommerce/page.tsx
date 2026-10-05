import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
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

export const metadata: Metadata = pageMetadata({
  title: "Ecommerce Fulfillment",
  description:
    "Connect your store to Zajel for order fulfillment, nationwide delivery, COD collection, and merchant reporting.",
  path: '/ecommerce',
});

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
        image="/ChatGPT Image Apr 23, 2026 at 11_02_53 AM.webp"
        imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
              title="Ecommerce Logistics."
              description="Built for how online sellers in UAE actually operate."
              priority
              buttons={[
                { label: "Get a Quote", href: "/quotation", variant: "primary" },
                { label: "Talk to our team", href: "/contact", variant: "secondary" },
                
              ]}
            />
    </main>
  );
}