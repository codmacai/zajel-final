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
  export const MAP_IMAGE_SRC = "/international/world-map.png";
  
  // Hub + destinations, plotted on a 1000×500 viewBox.
  export const HUB = { x: 600, y: 230 }; // Dubai
  
  export const ROUTES: Route[] = [
    { id: "route-ldn", x: 480, y: 150, control: { x: 555, y: 110 }, duration: 6, delay: 0 },
    { id: "route-ny", x: 230, y: 180, control: { x: 420, y: 90 }, duration: 8, delay: 1.4 },
    { id: "route-sgp", x: 760, y: 290, control: { x: 690, y: 190 }, duration: 6.5, delay: 2.6 },
    { id: "route-syd", x: 880, y: 400, control: { x: 760, y: 270 }, duration: 8.5, delay: 3.8 },
  ];