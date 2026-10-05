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

// which company documents have been uploaded to /public/documents/
const DOCUMENTS_READY = ['company-profile.pdf', 'ims-policy.pdf'].filter((f) =>
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
      {/* a card downloads its PDF once it's in /public/documents/, and asks for a copy by email until then */}
      <CompanyDocuments available={DOCUMENTS_READY} />
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
