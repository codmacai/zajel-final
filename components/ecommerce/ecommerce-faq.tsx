"use client";

import FaqSection from "@/components/shared/faq-section";
import { Ecommerce_Faqs } from "@/data/ecommerce-faqs";

export default function EcommerceFaqSection() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={Ecommerce_Faqs}
    />
  );
}
