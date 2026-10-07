import { Anchor, Plane, Truck, Landmark, type LucideIcon } from "lucide-react";

export interface LocationCard {
  id: string;
  icon: LucideIcon;
  image: string;
  title: string;
  body: string;
  tag: string;
}

export const STRATEGIC_LOCATIONS_EYEBROW = "Global Hubs";
export const STRATEGIC_LOCATIONS_HEADING = "Strategic Locations";
export const STRATEGIC_LOCATIONS_INTRO =
  "Positioned at the UAE's key trade gateways for fast, reliable movement of goods:";

export const STRATEGIC_LOCATIONS_CARDS: LocationCard[] = [
  {
    id: "jebel-ali",
    icon: Anchor,
    image: "/warehouse/location/jebel-ali-port-proximity.webp",
    title: "Proximity to Jebel Ali Port",
    body: "The largest container port in the Middle East. Cargo can move to our facilities quickly, minimizing dwell time between port clearance and storage.",
    tag: "Minimal dwell time",
  },
  {
    id: "airports",
    icon: Plane,
    image: "/warehouse/location/airport-access.webp",
    title: "Airport Access",
    body: "Close connectivity to DXB and DWC means air freight reaches our facilities the same day it clears customs, supporting time-sensitive replenishment.",
    tag: "Same-day replenishment",
  },
  {
    id: "gcc",
    icon: Truck,
    image: "/warehouse/location/gcc-distribution-reach.webp",
    title: "GCC Distribution Reach",
    body: "From our UAE base, goods can be dispatched by road across Saudi Arabia, Oman, Bahrain, Kuwait, and Qatar — a regional hub, not just domestic storage.",
    tag: "5-country road reach",
  },
  {
    id: "freezone",
    icon: Landmark,
    image: "/warehouse/location/free-zone-warehouse.webp",
    title: "Free Zone Advantages",
    body: "Goods stored in UAE free zones benefit from customs duty exemption while in zone, reducing duty costs for re-export and regional distribution.",
    tag: "Duty exemption in-zone",
  },
];
