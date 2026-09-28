import { Boxes, ShoppingCart, Snowflake, ShieldAlert, type LucideIcon } from "lucide-react";

export interface SolutionCard {
  id: string;
  Icon: LucideIcon;
  /** Photo representing this service */
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
}

export const WAREHOUSING_SOLUTIONS_EYEBROW = "Storage & Facilities";
export const WAREHOUSING_SOLUTIONS_HEADING = "Our Dubai Warehousing Solutions";

export const WAREHOUSING_SOLUTIONS_CARDS: SolutionCard[] = [
  {
    id: "storage",
    Icon: Boxes,
    image: "/warehouse/solutions/magnific_photorealistic-premium-b2_jUiYpDPLD0.jpg",
    title: "Short Term and\nLong Term Storage",
    description:
      "Flexible storage that adapts to your operational cycle — from cargo awaiting customs clearance to standing inventory held for ongoing regional distribution. Every item is tracked in real time within secure, monitored facilities.",
    buttonLabel: "Request a Quote",
    buttonUrl: "/quote",
  },
  {
    id: "ecommerce",
    Icon: ShoppingCart,
    image: "/warehouse/solutions/magnific_photorealistic-premium-b2_IfkS42ftvE.jpg",
    title: "E-commerce\nFulfillment Warehousing",
    description:
      "Products are received, stored, and organized, then picked, packed, and dispatched through Zajel's own delivery network — letting you scale without investing in your own warehouse or fulfillment infrastructure.",
    buttonLabel: "Request a Quote",
    buttonUrl: "/quote",
  },
  {
    id: "coldchain",
    Icon: Snowflake,
    image: "/warehouse/solutions/magnific_photorealistic-premium-co_0eabL4iTfW.jpg",
    title: "Temperature Controlled\nand Cold Chain Storage",
    description:
      "Built for goods that must stay within a set thermal range. Perishables, medical supplies, and other sensitive products keep their integrity from arrival to dispatch, with temperature logs kept for compliance.",
    buttonLabel: "Request a Quote",
    buttonUrl: "/quote",
  },
  {
    id: "dangerous-goods",
    Icon: ShieldAlert,
    image: "/warehouse/solutions/magnific_photorealistic-premium-in_9ZV8CSSNYZ.jpg",
    title: "Dangerous Goods and\nSpecialized Storage",
    description:
      "Hazardous materials, chemicals, and other regulated goods handled with the infrastructure, permits, and trained personnel needed for full compliance, including open yard space for industrial and project cargo.",
    buttonLabel: "Request a Quote",
    buttonUrl: "/quote",
  },
];
