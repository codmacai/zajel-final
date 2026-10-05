export type CoverageTone = "dark" | "light" | "lime";

export interface CoverageColumn {
  id: string;
  value: string;
  suffix: string;
  label: string;
  tag: string;
  tone: CoverageTone;
  /** Paragraphs separated by \n\n */
  text: string;
}

export const REGIONAL_COVERAGE_HEADING = "Where Our UAE Logistics Network Operates";

export const REGIONAL_COVERAGE_INTRO =
  "Zajel's network connects the UAE seamlessly across domestic, regional GCC, and global trade corridors with full-spectrum customs and freight capabilities.";

export const REGIONAL_COVERAGE_COLUMNS: CoverageColumn[] = [
  {
    id: "uae-coverage",
    value: "07",
    suffix: "Emirates",
    label: "UAE Coverage",
    tag: "domestic network",
    tone: "dark",
    text: "Zajel maintains operational presence across the UAE with offices and logistics operations in Dubai, Abu Dhabi, Sharjah, and Ajman. This domestic network supports same-day and next-day courier delivery across every emirate, as well as freight pickup, warehousing, and distribution services throughout the country.\n\nFor businesses that operate across multiple emirates, Zajel provides a single logistics partner that covers the full domestic footprint without requiring separate providers for different regions.",
  },
  {
    id: "gcc-middle-east",
    value: "09",
    suffix: "Countries",
    label: "GCC and Middle East",
    tag: "road freight corridors",
    tone: "light",
    text: "Beyond the UAE, Zajel's land freight network provides direct road connectivity to all GCC countries: Saudi Arabia, Oman, Bahrain, Kuwait, and Qatar. Cross-border trucking operates on daily schedules with pre-filed manifests and border clearance managed by our team.\n\nOur Middle East coverage extends to Iraq, Jordan, Syria, and Turkey through established road freight corridors. For businesses that import from or export to these markets, Zajel provides door-to-door coordination including customs clearance at each border crossing.",
  },
  {
    id: "global-reach",
    value: "195",
    suffix: "Nations",
    label: "Asia, Europe, Africa, & Americas",
    tag: "worldwide logistics",
    tone: "lime",
    text: "Zajel's global reach extends to 195 countries across every continent through a combination of our direct freight forwarding operations and our partnerships within international logistics networks.",
  },
];
