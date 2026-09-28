import type { LucideIcon } from "lucide-react";
import { Activity, Clock, ShieldCheck } from "lucide-react";

export interface InfrastructureCardData {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const LOGISTICS_INFRASTRUCTURE_EYEBROW = "Infrastructure & Tech";
export const LOGISTICS_INFRASTRUCTURE_HEADING = "Logistics Network Infrastructure and Technology";

export const LOGISTICS_INFRASTRUCTURE_CARDS: InfrastructureCardData[] = [
  {
    number: "01",
    title: "Real-time Tracking",
    description:
      "Every shipment in the Zajel network, whether courier, e-commerce, or freight, is tracked from the point of collection to final delivery. Tracking information is accessible through the Zajel portal and mobile app.",
    icon: Activity,
  },
  {
    number: "02",
    title: "24/7 Operations",
    description:
      "Critical cargo monitoring and operations support runs around the clock. For time-sensitive shipments, project logistics, or cargo moving across multiple time zones, our team maintains continuity regardless of the hour.",
    icon: Clock,
  },
  {
    number: "03",
    title: "ISO Certified Systems",
    description:
      "Zajel's operations are certified under ISO 9001, ISO 14001, ISO 45001, and ISO 27001. These certifications reflect the operational standards embedded in how we manage your cargo, data, and communications across the network.",
    icon: ShieldCheck,
  },
];