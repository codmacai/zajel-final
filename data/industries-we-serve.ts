import type { IndustryItem } from "@/components/shared/marquee-section";

export const INDUSTRIES_WE_SERVE_EYEBROW = "Who We Work With";
export const INDUSTRIES_WE_SERVE_HEADING = "Industries We Serve";
export const INDUSTRIES_WE_SERVE_DESCRIPTION =
  "Zajel works across diverse industries, adapting logistics strategies to meet unique operational, regulatory, and delivery requirements.";

export interface IndustryEntry extends IndustryItem {
  id: string;
}

export const INDUSTRIES: readonly IndustryEntry[] = [
  {
    id: "oil-gas",
    title: "Oil and Gas",
    description:
      "Equipment, modules, tools, and apparatus for upstream, midstream, and downstream operations, often requiring specialized permits and oversized cargo handling.",
  },
  {
    id: "pharma-healthcare",
    title: "Pharmaceuticals and Healthcare",
    description:
      "Temperature-sensitive shipments requiring health authority permits, controlled substance documentation, and strict compliance with UAE Ministry of Health standards.",
  },
  {
    id: "food-beverage",
    title: "Food and Beverage",
    description:
      "Perishable goods requiring expedited clearance, food safety certificates, and coordination with municipality inspection teams.",
  },
  {
    id: "electronics-tech",
    title: "Electronics and Technology",
    description:
      "High-value components subject to value verification and, in some cases, import restrictions or conformity requirements.",
  },
  {
    id: "automotive",
    title: "Automotive",
    description:
      "Vehicle imports and re-exports requiring specific registration documentation, emissions compliance, and coordination with the Roads and Transport Authority.",
  },
  {
    id: "retail-ecommerce",
    title: "Retail and E-commerce",
    description:
      "High-volume commercial shipments where clearance speed directly impacts inventory availability and sales performance.",
  },
] as const;
