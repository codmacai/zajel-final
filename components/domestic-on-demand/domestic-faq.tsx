"use client";

import FaqSection from "@/components/shared/faq-section";
import { DOMESTIC_FAQ, type DOMESTIC_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function DomesticFaqSection({ content }: { content: DOMESTIC_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('domestic-courier.faq', DOMESTIC_FAQ, DomesticFaqSection);
