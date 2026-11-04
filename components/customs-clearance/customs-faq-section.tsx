"use client";

import FaqSection from "@/components/shared/faq-section";
import { CUSTOMS_FAQ, type CUSTOMS_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function CustomsFaqSection({ content }: { content: CUSTOMS_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('customs-clearance.faq', CUSTOMS_FAQ, CustomsFaqSection);
