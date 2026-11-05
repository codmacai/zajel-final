import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { cmsMetadata, getSection } from '@/lib/cms/server';
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
import { ABOUT_APP_DOWNLOAD, ABOUT_CTA } from '@/components/about/content';
import CmsScope from '@/components/cms/CmsScope';

// which company documents have been uploaded to /public/documents/
const DOCUMENTS_READY = ['company-profile.pdf', 'ims-policy.pdf'].filter((f) =>
  existsSync(join(process.cwd(), 'public', 'documents', f))
);

export const generateMetadata = cmsMetadata('about', '/about');

export default async function AboutPage() {
  const appDownload = await getSection("about.app-download", ABOUT_APP_DOWNLOAD);
  const cta = await getSection("about.cta", ABOUT_CTA);
  return (
    <CmsScope page="about">
    <main>
      <AboutHero />
      <OurStory />
      <OurJourney />
      <MissionVision />
      <HowWeWork />
      <GlobalAlliances />
      <EnvironmentalResponsibility />
      <FacilityGallery />
      {appDownload && <CompactSaaSBanner {...appDownload} />}
      {/* a card downloads its PDF once it's in /public/documents/, and asks for a copy by email until then */}
      <CompanyDocuments available={DOCUMENTS_READY} />
      {cta && <CTABanner {...cta} priority />}
    </main>
    </CmsScope>
  );
}
