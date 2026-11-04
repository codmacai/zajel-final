"use client";

import FaqSection from "@/components/shared/faq-section";
import { INTERNATIONAL_FAQ, type INTERNATIONAL_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function InternationalFaq({ content }: { content: INTERNATIONAL_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('international-courier.faq', INTERNATIONAL_FAQ, InternationalFaq);
