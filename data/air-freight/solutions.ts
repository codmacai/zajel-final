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
      image: "/airfreight/solutions/standard-air-freight.webp",
      title: "Standard Air Freight",
      description: "Scheduled air cargo for shipments moving on regular routes and timelines.",
      buttonLabel: "Request a Quote",
      buttonUrl: "/quotation",
    },
    {
      id: "charter",
      image: "/airfreight/solutions/charter-air-freight.webp",
      title: "Charter Air Freight",
      description:
        "Dedicated or shared aircraft for large, specialized, or time-critical loads that don't fit standard capacity.",
      buttonLabel: "Request a Quote",
      buttonUrl: "/quotation",
    },
    {
      id: "aog",
      image: "/airfreight/solutions/aog-air-freight.webp",
      title: "AOG (Aircraft on Ground)",
      description: "Emergency delivery of critical parts to a grounded aircraft, moved with immediate priority.",
      buttonLabel: "Request a Quote",
      buttonUrl: "/quotation",
    },
  ];