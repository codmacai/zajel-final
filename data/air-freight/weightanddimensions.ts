import {
    PackageCheck,
    Boxes,
    Thermometer,
    ShieldCheck,
    Scale,
    Ruler,
    TriangleAlert,
    Layers,
    type LucideIcon,
  } from "lucide-react";
  
  export interface Route {
    id: string;
    x: number;
    y: number;
    control: { x: number; y: number };
    duration: number;
    delay: number;
  }
  
  export const LIGHT_GREEN = "#36b936";
  
  export const SMOOTH_TRANSITION = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  } as const;
  
  // Point this at your map asset in /public.
  export const MAP_IMAGE_SRC = "/world-map.png";
  
  // Hub + destinations, plotted on a 1000×500 viewBox.
  export const HUB = { x: 600, y: 230 }; // Dubai
  
  export const ROUTES: Route[] = [
    { id: "route-ldn", x: 480, y: 150, control: { x: 555, y: 110 }, duration: 6, delay: 0 },
    { id: "route-ny", x: 230, y: 180, control: { x: 420, y: 90 }, duration: 8, delay: 1.4 },
    { id: "route-sgp", x: 760, y: 290, control: { x: 690, y: 190 }, duration: 6.5, delay: 2.6 },
    { id: "route-syd", x: 880, y: 400, control: { x: 760, y: 270 }, duration: 8.5, delay: 3.8 },
  ];
  
  // ---------------------------------------------------------------------------
  // Air Freight Solutions — the three service-type cards
  // ---------------------------------------------------------------------------
  
  export type FreightServiceId = "standard" | "charter" | "aog";
  
  export interface FreightCard {
    id: FreightServiceId;
    image: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
  }
  
  export const FREIGHT_CARDS: FreightCard[] = [
    {
      id: "standard",
      image: "/images/air-freight/standard.png",
      title: "Standard Air Freight",
      description: "Scheduled air cargo for shipments moving on regular routes and timelines.",
      buttonLabel: "Request a Quote",
      buttonUrl: "/quote",
    },
    {
      id: "charter",
      image: "/images/air-freight/charter.png",
      title: "Charter Air Freight",
      description:
        "Dedicated aircraft for large, specialized, or time-critical loads that don't fit standard capacity.",
      buttonLabel: "Request a Quote",
      buttonUrl: "/quote",
    },
    {
      id: "aog",
      image: "/images/air-freight/aog.png",
      title: "AOG (Aircraft on Ground)",
      description: "Emergency delivery of critical parts to a grounded aircraft, moved with immediate priority.",
      buttonLabel: "Request a Quote",
      buttonUrl: "/quote",
    },
  ];
  
  // ---------------------------------------------------------------------------
  // "When to Choose Air Freight" — transit guide banner + cross-sell
  // ---------------------------------------------------------------------------
  
  export const TRANSIT_GUIDE_IMAGE_SRC = "/images/air-freight/transit-guide.png";
  
  export interface BodyPart {
    text: string;
    emphasis: boolean;
  }
  
  export const TRANSIT_GUIDE_BODY: BodyPart[] = [
    { text: "Air freight fits shipments where ", emphasis: false },
    { text: "speed matters more than cost", emphasis: true },
    {
      text: ", such as tight deadlines, high-value goods, or cargo that can’t wait for sea or land transit. For large-volume or less time-sensitive shipments, ",
      emphasis: false,
    },
    { text: "sea or land freight is typically more cost-effective", emphasis: true },
    { text: ".", emphasis: false },
  ];
  
  export interface RouteLinkData {
    href: string;
    label: string;
    sublabel: string;
  }
  
  export const CROSS_SELL_ROUTES: RouteLinkData[] = [
    { href: "/sea-freight", label: "Sea Freight", sublabel: "Best for high volume" },
    { href: "/land-freight", label: "Land Freight", sublabel: "Best for regional" },
  ];
  
  // ---------------------------------------------------------------------------
  // "Choose Your Delivery Arrangement" + "Compliance & Customs"
  // ---------------------------------------------------------------------------
  
  export const DOOR_TO_DOOR_BASE_IMAGE_SRC = "/images/air-freight/door-to-door-base.png";
  export const DOOR_TO_DOOR_CUTOUT_IMAGE_SRC = "/images/air-freight/door-to-door-cutout.png";
  
  export const OTHER_ARRANGEMENTS_LINE =
    "Also available on request: Door-to-Airport, Airport-to-Door, and Airport-to-Airport arrangements — for businesses managing part of the logistics themselves.";
  
  export const COMPLIANCE_HEADING = "Compliance & Customs Expertise";
  
  export const COMPLIANCE_BODY_SENTENCES = [
    "Crossing borders by air comes with documentation, duty, and regulatory requirements that vary by cargo and destination.",
    "Zajel manages customs clearance and compliance on your behalf, so your shipment moves without unnecessary delays.",
  ];
  
  // ---------------------------------------------------------------------------
  // "What We Move" — cargo capability grid
  // ---------------------------------------------------------------------------
  
  export interface CargoItem {
    id: string;
    label: string;
    description: string;
    image: string;
  }
  
  // Swap each `image` for its own final cargo photo once ready.
  export const CARGO_ITEMS: CargoItem[] = [
    {
      id: "general",
      label: "General Cargo",
      description: "Commercial goods and parcels",
      image: "/images/air-freight/what-we-move/general-cargo.png",
    },
    {
      id: "oil-gas",
      label: "Oil & Gas Equipment",
      description: "Industrial and energy-sector machinery",
      image: "/images/air-freight/what-we-move/oil-gas-equipment.png",
    },
    {
      id: "luxury-cars",
      label: "Luxury & Exotic Cars",
      description: "High-value vehicle movement",
      image: "/images/air-freight/what-we-move/luxury-cars.png",
    },
    {
      id: "engines",
      label: "Vehicle Engines",
      description: "Precision-handled powertrain units",
      image: "/images/air-freight/what-we-move/vehicle-engines.png",
    },
    {
      id: "exhibition",
      label: "Exhibition Goods",
      description: "Event and showcase materials",
      image: "/images/air-freight/what-we-move/exhibition-goods.png",
    },
    {
      id: "pharma",
      label: "Pharmaceuticals & Nutrition",
      description: "Temperature-aware, time-critical goods",
      image: "/images/air-freight/what-we-move/pharma-nutrition.png",
    },
    {
      id: "hazmat",
      label: "Hazardous Materials",
      description: "Handled to full compliance standards",
      image: "/images/air-freight/what-we-move/hazardous-materials.png",
    },
  ];
  
  // ---------------------------------------------------------------------------
  // "Value Added Services"
  // ---------------------------------------------------------------------------
  
  export interface ServiceItem {
    icon: LucideIcon;
    title: string;
    description: string;
  }
  
  export const VALUE_ADDED_SERVICES: ServiceItem[] = [
    {
      icon: PackageCheck,
      title: "Professional Packing and Crating",
      description:
        "Custom wooden crating and industrial packing for fragile, high-value, or irregularly shaped cargo. Our packing team assesses each shipment and builds packaging to withstand air transport handling, including shock-absorbent materials, moisture barriers, and securing straps where required.",
    },
    {
      icon: Boxes,
      title: "Cargo Consolidation",
      description:
        "Combine multiple smaller shipments into a single consolidated load to reduce per-unit air freight costs. Ideal for businesses shipping regular smaller consignments to the same destination, with individual tracking maintained for each component shipment.",
    },
    {
      icon: Thermometer,
      title: "Temperature Controlled Handling",
      description:
        "For pharmaceutical products, perishable goods, and sensitive materials that require controlled environments during transit. Temperature monitoring throughout the air freight journey, with documentation provided for compliance and audit purposes.",
    },
    {
      icon: ShieldCheck,
      title: "Cargo Insurance",
      description:
        "Protect your air freight shipment against loss, damage, or delay during transit. Coverage is available for all cargo types and can be added at the time of booking, with guidance from our team on appropriate coverage levels based on cargo value and route.",
    },
  ];
  
  // ---------------------------------------------------------------------------
  // "Weight & Dimension Guidelines"
  // ---------------------------------------------------------------------------
  
  export interface WeightDimensionRow {
    label: string;
    standard: string;
    charter: string;
  }
  
  export const WEIGHT_DIMENSION_ROWS: WeightDimensionRow[] = [
    {
      label: "Maximum Weight per Piece",
      standard: "Up to 5,000 kg",
      charter: "Above 5,000 kg (contact us)",
    },
    {
      label: "Maximum Dimensions",
      standard: "300 x 200 x 160 cm",
      charter: "Custom (based on aircraft)",
    },
    {
      label: "Chargeable Weight",
      standard: "Greater of actual weight or volumetric weight",
      charter: "Calculated per charter terms",
    },
    {
      label: "Volumetric Formula",
      standard: "L x W x H (cm) / 6000",
      charter: "Not applicable",
    },
  ];
  
  export interface WeightDimensionNote {
    icon: LucideIcon;
    title: string;
    description: string;
  }
  
  export const WEIGHT_DIMENSION_NOTES: WeightDimensionNote[] = [
    {
      icon: Scale,
      title: "Chargeable Weight",
      description:
        "Airlines charge based on whichever is greater, the actual gross weight or the volumetric weight. Lightweight but bulky shipments are charged at their volumetric weight.",
    },
    {
      icon: Ruler,
      title: "Oversize Cargo",
      description:
        "Items exceeding standard dimensions can be shipped via wide-body aircraft or charter flights. Our team coordinates aircraft selection and loading plans for oversized cargo.",
    },
    {
      icon: TriangleAlert,
      title: "Dangerous Goods",
      description:
        "Certain hazardous materials can be transported by air with proper classification, packaging, and documentation in accordance with IATA Dangerous Goods Regulations.",
    },
    {
      icon: Layers,
      title: "Stackable vs Non-Stackable",
      description:
        "Non-stackable cargo may incur additional charges as it limits how other freight can be loaded around it. Proper packaging and palletization helps optimize space and cost.",
    },
  ];