import type { ComponentType, SVGProps } from "react";
import {
  AirportIcon,
  FreeZoneIcon,
  LandBorderIcon,
  SeaPortIcon,
} from "@/components/customs-location-coverage/icons";

export interface LocationGroup {
  id: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  image: string;
  label: string;
  tags: string[];
}

export const LOCATION_COVERAGE_HEADING = "UAE Customs Clearance at Every Port, Airport, and Free Zone";

export const LOCATION_COVERAGE_INTRO = "Zajel manages customs clearance across every major UAE entry point:";

export const LOCATION_GROUPS: readonly LocationGroup[] = [
  {
    id: "sea-ports",
    Icon: SeaPortIcon,
    image: "/uae-customs/magnific_aerial-view-of-jebel-ali-_MBEBRVYDCm.png",
    label: "Sea Ports",
    tags: ["Jebel Ali Port", "Khalifa Port (Abu Dhabi)", "Port Rashid (Dubai)", "Fujairah Port", "Khorfakkan Port"],
  },
  {
    id: "airports",
    Icon: AirportIcon,
    image: "/uae-customs/magnific_exterior-view-of-dubai-in_huxuMyEvqL.jpg",
    label: "Airports",
    tags: ["Dubai International (DXB)", "Al Maktoum International (DWC)", "Abu Dhabi International", "Sharjah International"],
  },
  {
    id: "free-zones",
    Icon: FreeZoneIcon,
    image: "/uae-customs/magnific_aerial-view-of-jebel-ali-_huxuMzjvqL.jpg",
    label: "Free Zones",
    tags: ["JAFZA", "DAFZA", "KIZAD", "DMCC", "DWC Free Zone", "All Emirates Free Zones"],
  },
  {
    id: "land-borders",
    Icon: LandBorderIcon,
    image: "/uae-customs/magnific_aerial-view-of-a-uae-land_gO2OrOUSXO.jpg",
    label: "Land Borders",
    tags: ["UAE", "Saudi Arabia", "Oman", "Bahrain", "Kuwait", "Qatar"],
  },
] as const;

export const FREE_ZONE_NOTE =
  "Free zone shipments carry specific advantages. Goods stored within UAE free zones are exempt from standard customs duty while they remain in zone. When goods move from a free zone to the UAE mainland for sale or distribution, the standard 5% customs duty and 5% VAT apply at the point of transfer. Our team manages these inter-zone and zone-to-mainland movements with full regulatory compliance.";