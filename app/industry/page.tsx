import { cmsMetadata, getSection } from '@/lib/cms/server';
import ServiceHero from "@/components/sections/ServiceHero/ServiceHero";
import IndustryExpertise from "@/components/industry-expertise/industry-expertise";
import IndustryFaq from "@/components/industry-expertise/faq";
import ContactBand from "@/components/dynamic-contact";
import { INDUSTRY_CONTACT } from '@/components/industry-expertise/content';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('industry', '/industry');

export default async function IndustryPage() {
  const contact = await getSection("industry.contact", INDUSTRY_CONTACT);
  return (
    <CmsScope page="industry">
    <main>
      <ServiceHero variant="industry" />
      <IndustryExpertise />
      <IndustryFaq />
      {contact && <ContactBand {...contact} />}
    </main>
    </CmsScope>
  );
}
