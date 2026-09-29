import type { JSX } from "react";
import { IndividualIcon, BusinessIcon, SecureIcon } from "@/components/home/ServiceIcons";

export interface SubService {
  label: string;
  slug: string;
}

export interface ServiceCategory {
  id: "individual" | "business" | "secure";
  path: string;
  accent: string;
  accentTint: string;
  title: string;
  description: string;
  ctaLabel: string;
  image: string;
  icon: (props: { className?: string }) => JSX.Element;
  subServices: SubService[];
}

const slugify = (label: string) =>
  label
    .toLowerCase()
    .replace(/[()&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const buildSub = (labels: string[]): SubService[] => labels.map((label) => ({ label, slug: slugify(label) }));

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "individual",
    path: "/individual-solutions",
    accent: "#36B936",
    accentTint: "#FFFFFF",
    title: "Individual Shipping",
    description: "Personal parcels and time-critical drop-offs, handled with care across the city or world.",
    ctaLabel: "View solutions",
    image: "/Homepage/individual.png",
    icon: IndividualIcon,
    subServices: buildSub(["International shipping", "Same-day & next-day delivery"]),
  },
  {
    id: "business",
    path: "/business-solutions",
    accent: "#36B936",
    accentTint: "#FFFFFF",
    title: "Business Logistics",
    description: "Freight, fulfillment, and last-mile networks built to keep growing operations on schedule.",
    ctaLabel: "View solutions",
    image: "/Homepage/7be9399d-bd5b-44e2-97ed-97d5efce871c.png",
    icon: BusinessIcon,
    subServices: buildSub(["Freight forwarding (air, sea, land)", "E-commerce fulfillment", "Last-mile delivery"]),
  },
  {
    id: "secure",
    path: "/secure-solutions",
    accent: "#36B936",
    accentTint: "#FFFFFF",
    title: "Secure & Govt Courier",
    description: "Chain-of-custody handling for legal, government, and identity documents tracked end-to-end.",
    ctaLabel: "View solutions",
    image: "/Homepage/secure.png",
    icon: SecureIcon,
    subServices: buildSub([
      "MOFA document delivery",
      "Dubai Courts courier",
      "Dubai Customs clearance",
      "EID & passport delivery",
    ]),
  },
];