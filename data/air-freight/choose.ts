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
  
  export const TRANSIT_GUIDE_IMAGE_SRC = "/airfreight/solutions/ChatGPT Image Sep 8, 2026, 01_21_41 AM.webp";
  
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