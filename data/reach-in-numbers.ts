export interface StatItem {
    numericValue: number;
    prefix?: string;
    suffix?: string;
    label: string;
    detail: string;
  }
  
  export const REACH_IN_NUMBERS_EYEBROW = "Proven Track Record";
  export const REACH_IN_NUMBERS_HEADING = "Our Reach in Numbers";
  
  export const REACH_IN_NUMBERS_STATS: StatItem[] = [
    { numericValue: 17, suffix: "+", label: "Years", detail: "of logistics operations since 2008" },
    { numericValue: 45, suffix: "M+", label: "Shipments", detail: "delivered across our network" },
    { numericValue: 195, suffix: "+", label: "Countries", detail: "covered worldwide" },
    { numericValue: 500, suffix: "+", label: "Destinations", detail: "served by air, sea, and land" },
    { numericValue: 4, label: "ISO Certifications", detail: "across all operations" },
    { numericValue: 3, label: "Global Alliances", detail: "providing coverage in 190+ countries" },
  ];