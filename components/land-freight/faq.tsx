"use client";

import FaqSection from "@/components/shared/faq-section";
import { LAND_FAQ, type LAND_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function LandFreightFAQS({ content }: { content: LAND_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('land-freight.faq', LAND_FAQ, LandFreightFAQS);
