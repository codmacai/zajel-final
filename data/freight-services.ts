export interface FreightCardData {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const FREIGHT_SERVICES_EYEBROW = "Multimodal Transport";
export const FREIGHT_SERVICES_HEADING = "Air, Sea & Land Freight Solutions";

export const FREIGHT_SERVICES: FreightCardData[] = [
  {
    title: "Air Freight Services",
    description:
      "Fast global air cargo solutions via Dubai international airports. Direct flight routes for time-critical express shipments across GCC and worldwide.",
    imageSrc: "/freight/magnific_photorealistic-premium-ai_Eb7IDkSuuO.jpg",
    imageAlt: "UAE Express Air Freight Plane",
  },
  {
    title: "Sea & Ocean Freight",
    description:
      "Cost-effective FCL and LCL container shipping through Jebel Ali Port. Seamless maritime logistics connecting key trade lanes globally.",
    imageSrc: "/freight/magnific_photorealistic-premium-se_Xmk06pJBfo.jpg",
    imageAlt: "Dubai Ocean Cargo Shipping Container",
  },
  {
    title: "Land & Road Transport",
    description:
      "Cross-border FTL and LTL trucking across Saudi Arabia, Oman, and the GCC. Fast customs clearance and scheduled daily road freight delivery.",
    imageSrc: "/freight/magnific_give-me-land-freight-imag_P3Dgyjc42C.jpg",
    imageAlt: "GCC Cross Border Road Logistics Truck",
  },
];
