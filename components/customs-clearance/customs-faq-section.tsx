"use client";

import FaqSection from "@/components/shared/faq-section";
import { CUSTOMS_CLEARANCE_FAQS } from "@/data/customs-clearance-faqs";

export default function CustomsFaqSection() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={CUSTOMS_CLEARANCE_FAQS}
    />
  );
}
