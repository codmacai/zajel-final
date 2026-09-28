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
      image: "/airfreight/whatwemove/ChatGPT Image Sep 2, 2026, 09_15_42 AM.png",
    },
    {
      id: "oil-gas",
      label: "Oil & Gas Equipment",
      description: "Industrial and energy-sector machinery",
      image: "/airfreight/whatwemove/ChatGPT Image Sep 2, 2026, 09_24_04 AM.png",
    },
    {
      id: "luxury-cars",
      label: "Luxury & Exotic Cars",
      description: "High-value vehicle movement",
      image: "/airfreight/whatwemove/ChatGPT Image Sep 2, 2026, 09_16_20 AM.png",
    },
    {
      id: "engines",
      label: "Vehicle Engines",
      description: "Precision-handled powertrain units",
      image: "/airfreight/whatwemove/ChatGPT Image Sep 2, 2026, 09_19_16 AM.png",
    },
    {
      id: "exhibition",
      label: "Exhibition Goods",
      description: "Event and showcase materials",
      image: "/airfreight/whatwemove/ChatGPT Image Sep 2, 2026, 09_16_59 AM.png",
    },
    {
      id: "pharma",
      label: "Pharmaceuticals & Nutrition",
      description: "Temperature-aware, time-critical goods",
      image: "/airfreight/whatwemove/ChatGPT Image Sep 2, 2026, 09_18_00 AM.png",
    },
    {
      id: "hazmat",
      label: "Hazardous Materials",
      description: "Handled to full compliance standards",
      image: "/airfreight/whatwemove/ChatGPT Image Sep 2, 2026, 09_25_20 AM.png",
    },
  ];
  