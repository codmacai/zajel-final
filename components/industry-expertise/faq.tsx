"use client";

import FaqSection from "@/components/shared/faq-section";
import { INDUSTRY_FAQ, type INDUSTRY_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function IndustryFaq({ content }: { content: INDUSTRY_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('industry.faq', INDUSTRY_FAQ, IndustryFaq);
