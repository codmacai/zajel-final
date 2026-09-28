"use client";

import FaqSection from "@/components/shared/faq-section";
import { Warehouse_FAQS } from "@/data/warehouse-faq";

export default function WarehouseFaqSection() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={Warehouse_FAQS}
    />
  );
}
