"use client";

import FaqSection from "@/components/shared/faq-section";
import { AIR_FAQ, type AIR_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function AirFreightFaq({ content }: { content: AIR_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('air-freight.faq', AIR_FAQ, AirFreightFaq);
