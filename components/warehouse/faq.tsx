"use client";

import FaqSection from "@/components/shared/faq-section";
import { WAREHOUSE_FAQ, type WAREHOUSE_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function WarehouseFaqSection({ content }: { content: WAREHOUSE_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('warehouse.faq', WAREHOUSE_FAQ, WarehouseFaqSection);
