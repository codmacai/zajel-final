import type { JSX } from "react";
import { IndividualIcon, BusinessIcon, SecureIcon } from "@/components/home/ServiceIcons";
import { solutionsCategories } from "@/data/navigation";

export interface SubService {
  label: string;
  slug: string;
  /** where the link goes: the page that covers this service */
  href: string;
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

/** The services under each solution are the ones the navbar lists for it, so the two always match. */
const fromNav = (id: string): SubService[] =>
  (solutionsCategories.find((c) => c.id === id)?.items ?? []).map((i) => ({ label: i.name, slug: slugify(i.name), href: i.path }));

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "individual",
    path: "/individual-solutions",
    accent: "#36B936",
    accentTint: "#FFFFFF",
    title: "Individual Shipping",
    description: "Personal parcels and time-critical drop-offs, handled with care across the city or world.",
    ctaLabel: "View solutions",
    image: "/Homepage/individual.webp",
    icon: IndividualIcon,
    subServices: fromNav("individual"),
  },
  {
    id: "business",
    path: "/business-solutions",
    accent: "#36B936",
    accentTint: "#FFFFFF",
    title: "Business Logistics",
    description: "Freight, fulfillment, and last-mile networks built to keep growing operations on schedule.",
    ctaLabel: "View solutions",
    image: "/Homepage/business-logistics-port-sea-air.webp",
    icon: BusinessIcon,
    subServices: fromNav("business"),
  },
  {
    id: "secure",
    path: "/secure-solutions",
    accent: "#36B936",
    accentTint: "#FFFFFF",
    title: "Secure & Govt Courier",
    description: "Chain-of-custody handling for legal, government, and identity documents tracked end-to-end.",
    ctaLabel: "View solutions",
    image: "/Homepage/secure.webp",
    icon: SecureIcon,
    subServices: fromNav("secure"),
  },
];