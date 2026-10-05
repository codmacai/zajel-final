import { Activity, BellRing, History, Barcode, Plug, type LucideIcon } from "lucide-react";

export interface InventoryTile {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const INVENTORY_MANAGEMENT_EYEBROW = "Inventory & Technology";
export const INVENTORY_MANAGEMENT_HEADING = "Inventory Management and Technology";

export const INVENTORY_MANAGEMENT_INTRO =
  "Zajel's warehouse management system provides real-time inventory visibility across all stored goods. Every item is tracked from the point of receipt through storage and dispatch, giving you a complete view of your stock levels, movement history, and order fulfillment status.";

export const INVENTORY_MANAGEMENT_CLOSING =
  "This level of visibility means you always know exactly what you have on hand, where it is within the facility, and when it is scheduled to move.";

// Order: top-left, top-right, hub (center), bottom-left, bottom-right
export const INVENTORY_MANAGEMENT_TILES: InventoryTile[] = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Live visibility into stock levels as goods move through the facility.",
  },
  {
    icon: BellRing,
    title: "Low-Stock Alerts",
    description: "Automated notifications triggered at reorder thresholds you set.",
  },
  {
    icon: Plug,
    title: "Integration Ready",
    description: "Connects to your existing ERP or order management platform.",
  },
  {
    icon: History,
    title: "Movement History",
    description: "A complete audit trail is kept for every SKU in the facility.",
  },
  {
    icon: Barcode,
    title: "Batch Tracking",
    description: "Lot and serial-level traceability wherever it's required.",
  },
];
