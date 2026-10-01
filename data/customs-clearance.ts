import type { ComponentType, SVGProps } from "react";
import { ExportIcon, ImportIcon, TransitIcon } from "@/components/customs-clearance/icons";

export interface ClearanceCard {
  id: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
  span?: "full";
}

export const CUSTOMS_CLEARANCE_HEADING = "Customs Clearance Services in the UAE";

export const CUSTOMS_CLEARANCE_INTRO =
  "Zajel's customs brokerage team manages the full spectrum of import, export, and transit clearance across all UAE entry points. Every shipment is assigned to a licensed broker who prepares compliant documentation, coordinates with local authorities, and resolves potential issues before they become delays.";

export const CUSTOMS_CLEARANCE_CARDS: readonly ClearanceCard[] = [
  {
    id: "import",
    Icon: ImportIcon,
    image: "/custom-clearance/magnific_photorealistic-profession_Lw3W8jMswO.webp",
    title: "Import Clearance",
    description:
      "End-to-end import declarations through Dubai Trade Portal and Mirsal 2, accurate HS code classification and duty assessment, inspection coordination, and permits for regulated goods before arrival.",
    buttonLabel: "Request a Quote",
    buttonUrl: "/quote",
  },
  {
    id: "export",
    Icon: ExportIcon,
    image: "/custom-clearance/magnific_photorealistic-profession_WDhHSVGcXe.jpg",
    title: "Export Clearance",
    description:
      "Export declarations, destination compliance checks, and Certificates of Origin, plus the added declarations and transit documentation needed for re-exports from UAE free zones.",
    buttonLabel: "Request a Quote",
    buttonUrl: "/quote",
  },
  {
    id: "transit",
    Icon: TransitIcon,
    image: "/custom-clearance/magnific_photorealistic-premium-lo_fHsynKHCDY.webp",
    title: "Transit & Re-export Processing",
    description:
      "Temporary import permits, transit declarations, and bonded warehouse movements for cargo passing through the UAE or brought in for exhibition, repair, or processing.",
    buttonLabel: "Request a Quote",
    buttonUrl: "/quote",
  },
] as const;
