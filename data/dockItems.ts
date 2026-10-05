import { Search, Calculator, Package, Briefcase, MapPin, type LucideIcon } from "lucide-react";

export interface DockItemConfig {
  href: string;
  icon: LucideIcon;
  labelKey: string;
  labelDefault: string;
  sublabelKey: string;
  sublabelDefault: string;
  primary?: boolean;
}

export const dockItems: DockItemConfig[] = [
  {
    href: "/quotation",
    icon: Calculator,
    labelKey: "hero.actions.ratecalculator.label",
    labelDefault: "Rate Calculator",
    sublabelKey: "hero.actions.ratecalculator.sublabel",
    sublabelDefault: "Calculate & send",
  },
  {
    href: "/track",
    icon: Search,
    labelKey: "hero.actions.track.label",
    labelDefault: "Advanced Tracking",
    sublabelKey: "hero.actions.track.sublabel",
    sublabelDefault: "Follow every move",
  },
  {
    href: "/send-shipment",
    icon: Package,
    labelKey: "hero.actions.send.label",
    labelDefault: "Send Shipment",
    sublabelKey: "hero.actions.send.sublabel",
    sublabelDefault: "International or domestic",
    primary: true,
  },
  {
    href: "/business-solutions",
    icon: Briefcase,
    labelKey: "hero.actions.business.label",
    labelDefault: "Business Solutions",
    sublabelKey: "hero.actions.business.sublabel",
    sublabelDefault: "E-commerce & freight",
  },
  {
    href: "/network",
    icon: MapPin,
    labelKey: "hero.actions.findus.label",
    labelDefault: "Find Us",
    sublabelKey: "hero.actions.findus.sublabel",
    sublabelDefault: "Branches near you",
  },
];