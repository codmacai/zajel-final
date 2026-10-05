import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
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

const HAS_DOCUMENTS = ['company-profile.pdf', 'ims-policy.pdf'].every((f) =>
  existsSync(join(process.cwd(), 'public', 'documents', f))
);

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
      {/* shown once the PDFs are uploaded to /public/documents/ (so it never links to a 404) */}
      {HAS_DOCUMENTS && <CompanyDocuments />}
      <CTABanner
              image="/ChatGPT Image Apr 23, 2026 at 11_02_53 AM.webp"
              imageAlt="Courier delivering a package doorstep to doorstep in the UAE"
              title="Zajel — intelligent movement,"
              description="For everyone who needs something moved.."
              priority
              buttons={[
                { label: "Explore Our Solutions", href: "/#solutions", variant: "primary" },
                { label: "Careers at Zajel", href: "/careers", variant: "secondary" },
                { label: "Get in Touch", href: "/contact", variant: "secondary" },
              ]}
            />
    </main>
  );
}
