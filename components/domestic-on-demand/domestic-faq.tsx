"use client";

import FaqSection from "@/components/shared/faq-section";
import { Domestc_FAQS } from "@/data/domestic-faqs";

export default function DomesticFaqSection() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={Domestc_FAQS}
    />
  );
}
