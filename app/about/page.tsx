import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import {
  AboutHero,
  OurStory,
  OurJourney,
  MissionVision,
  HowWeWork,
  GlobalAlliances,
  EnvironmentalResponsibility,
  FacilityGallery,
} from '@/components/about';
import CompanyDocuments from '@/components/about/doc';
import CTABanner from '@/components/shared/CTABanner';
import CompactSaaSBanner from '@/components/home/appdownload';

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Zajel Logistic Services — founded in Dubai in 2008, now a full logistics partner across express delivery, e-commerce, fulfillment, and freight forwarding.",
  path: '/about',
});

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <OurJourney />
      <MissionVision />
      <HowWeWork />
      <GlobalAlliances />
      <EnvironmentalResponsibility />
      <FacilityGallery />
      <CompactSaaSBanner/>
      <CompanyDocuments/>
      <CTABanner
              image="/ChatGPT Image Apr 23, 2026 at 11_02_53 AM.webp"
              imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
              title="Zajel — intelligent movement,"
              description="For everyone who needs something moved.."
              priority
              buttons={[
                { label: "Explore Our Solutions", href: "/domestic-courier#pickup", variant: "primary" },
                { label: "Careers at Zajel", href: "/domestic-courier#rate", variant: "secondary" },
                { label: "Get in Touch", href: "/domestic-courier#track", variant: "secondary" },
              ]}
            />
    </main>
  );
}
