"use client";

import FaqSection from "@/components/shared/faq-section";
import { International_FAQS } from "@/data/International-faqs";

export default function InternationalFaq() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={International_FAQS}
    />
  );
}
