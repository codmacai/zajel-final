"use client";

import FaqSection from "@/components/shared/faq-section";
import { ECOMMERCE_FAQ, type ECOMMERCE_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function EcommerceFaqSection({ content }: { content: ECOMMERCE_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('ecommerce.faq', ECOMMERCE_FAQ, EcommerceFaqSection);
