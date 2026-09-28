import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Container,
  FileCheck2,
  Route,
  Weight,
  Radar,
  Warehouse,
  Truck,
  Banknote,
  Navigation,
  Headset,
  Layers,
  RotateCcw,
  Thermometer,
  ClipboardCheck,
  Timer,
  ShieldCheck,
  Globe2,
  CalendarClock,
  Factory,
  Snowflake,
  PackageCheck,
  Lock,
  BadgeCheck,
  Landmark,
  Scale,
} from "lucide-react";

export type Tone = "white" | "green";

/** Key of the built-in SVG icon (see components/industry-expertise/industry-icons.tsx) */
export type IndustryIconKey =
  | "oil-gas"
  | "ecommerce"
  | "pharma"
  | "manufacturing"
  | "food-beverage"
  | "technology"
  | "government";

export interface Capability {
  text: string;
  icon: LucideIcon;
}

export interface ProofStat {
  value: string;
  label: string;
}

export interface Industry {
  index: string;
  slug: string;
  /** Which built-in SVG icon to show as the large title icon */
  icon: IndustryIconKey;
  subheader: string;
  paragraphs: string[];
  capabilities: Capability[];
  proof?: ProofStat[];
  tone: Tone;
}

const oilGasCapabilities: Capability[] = [
  { text: "Project logistics planning and execution for upstream, midstream, and downstream operations", icon: ClipboardList },
  { text: "Break bulk, flat rack, open top, and standard container shipping for equipment of all sizes", icon: Container },
  { text: "Customs clearance for industrial and energy-sector imports, including specialized permits", icon: FileCheck2 },
  { text: "Cross-border coordination for cargo moving between the UAE, Iraq, Saudi Arabia, and other regional energy markets", icon: Route },
  { text: "Oversized and heavy-lift cargo handling through our project logistics team", icon: Weight },
  { text: "24/7 cargo monitoring for time-critical and high-value equipment shipments", icon: Radar },
];

const ecommerceCapabilities: Capability[] = [
  { text: "E-commerce fulfillment warehousing with pick, pack, and dispatch", icon: Warehouse },
  { text: "Last-mile delivery across every emirate with same-day and next-day options", icon: Truck },
  { text: "Cash on Delivery collection and remittance as a built-in part of the delivery process", icon: Banknote },
  { text: "Real-time order tracking through the Zajel portal", icon: Navigation },
  { text: "Dedicated account management for business customers, providing a direct logistics contact rather than a general support queue", icon: Headset },
  { text: "Platform-flexible shipping that works with however you sell, without rigid integration requirements", icon: Layers },
  { text: "Returns processing and reverse logistics within our warehouse facilities", icon: RotateCcw },
];

const pharmaCapabilities: Capability[] = [
  { text: "Temperature-controlled transport and storage for goods requiring specific thermal ranges", icon: Thermometer },
  { text: "Cold chain monitoring with documented temperature logs for compliance and audit purposes", icon: ClipboardCheck },
  { text: "Customs clearance coordinated with UAE Ministry of Health requirements and relevant health authority permits", icon: FileCheck2 },
  { text: "Time-critical delivery for medical supplies, diagnostic equipment, and pharmaceutical products", icon: Timer },
  { text: "Secure handling with chain of custody documentation from origin to delivery", icon: ShieldCheck },
  { text: "Compliance with international pharmaceutical shipping standards for cross-border movements", icon: Globe2 },
];

const manufacturingCapabilities: Capability[] = [
  { text: "Scheduled freight forwarding by air, sea, and land to maintain consistent supply chain flow", icon: CalendarClock },
  { text: "Warehousing and inventory management for raw materials and finished goods", icon: Warehouse },
  { text: "Customs clearance for industrial inputs, machinery, and components", icon: FileCheck2 },
  { text: "Cross-border road freight connecting UAE manufacturing facilities to GCC markets on daily schedules", icon: Truck },
  { text: "Oversized cargo handling for heavy machinery and industrial equipment", icon: Factory },
  { text: "Multimodal coordination that combines sea, land, and air transport within a single supply chain", icon: Layers },
];

const foodBeverageCapabilities: Capability[] = [
  { text: "Cold chain logistics with reefer containers for sea freight and temperature-controlled trucks for road transport", icon: Snowflake },
  { text: "Cold chain warehousing with continuous temperature monitoring", icon: Thermometer },
  { text: "Expedited customs clearance coordinated with municipality food safety inspection teams", icon: FileCheck2 },
  { text: "Documentation and compliance management for food import and export regulations", icon: ClipboardList },
  { text: "Fast clearance processing to minimize time between arrival and cold storage, reducing spoilage risk", icon: Timer },
  { text: "Distribution across the UAE and GCC from temperature-controlled warehouse facilities", icon: Truck },
];

const technologyCapabilities: Capability[] = [
  { text: "Secure, cushioned transport for sensitive electronic components and devices", icon: PackageCheck },
  { text: "Climate-appropriate warehousing that protects against temperature and humidity extremes", icon: Thermometer },
  { text: "Value-declared shipping with appropriate cargo protection for high-value consignments", icon: ShieldCheck },
  { text: "Customs clearance including conformity assessment and value verification for electronics imports", icon: FileCheck2 },
  { text: "Real-time tracking and chain of custody documentation from pickup to delivery", icon: Radar },
  { text: "Dedicated handling protocols that separate electronics from incompatible cargo types during transit and storage", icon: Layers },
];

const governmentCapabilities: Capability[] = [
  { text: "Secure document and package logistics for government entities", icon: Lock },
  { text: "Certified operations under ISO 9001, ISO 14001, ISO 45001, and ISO 27001", icon: BadgeCheck },
  { text: "Trusted partnerships with entities including the Ministry of Foreign Affairs (MOFA), Dubai Courts, and Dubai Customs", icon: Landmark },
  { text: "High-security handling with full chain of custody documentation and audit-ready records", icon: ShieldCheck },
  { text: "Nationwide delivery coverage across all emirates", icon: Globe2 },
  { text: "Compliance with government procurement and service level standards", icon: Scale },
];

export const INDUSTRY_EXPERTISE_EYEBROW = "Our Industry Expertise";

export const INDUSTRIES: Industry[] = [
  {
    index: "01",
    slug: "oil-gas",
    icon: "oil-gas",
    subheader: "Oil and Gas Logistics in the UAE",
    paragraphs: [
      "The energy sector operates on tight project timelines where equipment delays can halt operations and escalate costs across entire project schedules. Zajel has direct experience moving oil and gas cargo, including our landmark freight forwarding project transporting approximately 500 tons of equipment from Jebel Ali Port to Umm Qasr Port in Iraq, comprising modules, tools, pipes, and specialized apparatus, with individual items weighing over 80 tons and exceeding 22 meters in length.",
    ],
    capabilities: oilGasCapabilities,
    proof: [
      { value: "500 t", label: "moved, Jebel Ali to Umm Qasr" },
      { value: "80 t", label: "heaviest single item" },
      { value: "22 m", label: "longest single item" },
    ],
    tone: "white",
  },
  {
    index: "02",
    slug: "ecommerce",
    icon: "ecommerce",
    subheader: "E-commerce and Retail Logistics Solutions",
    paragraphs: [
      "Online sellers and retail businesses in the UAE need logistics that scales with demand without adding operational complexity. The UAE's e-commerce sector continues to grow rapidly, and businesses that cannot fulfill orders quickly, track deliveries in real time, and manage Cash on Delivery efficiently lose customers to competitors who can.",
    ],
    capabilities: ecommerceCapabilities,
    tone: "green",
  },
  {
    index: "03",
    slug: "pharma",
    icon: "pharma",
    subheader: "Pharmaceutical and Healthcare Logistics",
    paragraphs: [
      "Medical and pharmaceutical shipments carry regulatory requirements and handling standards that go beyond standard logistics. Temperature excursions, documentation gaps, or delays in delivery can compromise product integrity, patient safety, and regulatory compliance.",
    ],
    capabilities: pharmaCapabilities,
    tone: "white",
  },
  {
    index: "04",
    slug: "manufacturing",
    icon: "manufacturing",
    subheader: "Manufacturing and Industrial",
    paragraphs: [
      "Manufacturing operations depend on a steady, predictable flow of raw materials inbound and finished goods outbound. A disruption in either direction, whether from a customs delay, a missed container sailing, or a warehousing bottleneck, can idle production lines and create cascading delays across the supply chain.",
    ],
    capabilities: manufacturingCapabilities,
    tone: "green",
  },
  {
    index: "05",
    slug: "food-beverage",
    icon: "food-beverage",
    subheader: "Food and Beverage",
    paragraphs: [
      "Food and beverage logistics demands strict temperature control, rapid movement, and compliance with food safety regulations at every stage. Spoilage, contamination, or regulatory non-compliance can result in entire shipments being rejected or destroyed, along with the associated financial and reputational cost.",
    ],
    capabilities: foodBeverageCapabilities,
    tone: "white",
  },
  {
    index: "06",
    slug: "technology",
    icon: "technology",
    subheader: "Technology and Electronics",
    paragraphs: [
      "Electronic components, consumer devices, and technology equipment require careful handling, secure transport, and precise documentation. High-value goods attract additional scrutiny at customs, and sensitive components can be damaged by improper storage conditions or rough handling.",
    ],
    capabilities: technologyCapabilities,
    tone: "green",
  },
  {
    index: "07",
    slug: "government",
    icon: "government",
    subheader: "Government and Public Sector",
    paragraphs: [
      "Zajel was founded in 2008 with a government logistics mandate: delivering Emirates IDs and passports on behalf of UAE government entities. That work required precision, security, and consistency from the very first day, and those standards continue to shape how we operate across all of our services.",
      "This is the sector where Zajel began, and it remains a core part of our operations. The standards we developed for government logistics, precision, accountability, and security, are the same standards we bring to every industry we serve.",
    ],
    capabilities: governmentCapabilities,
    proof: [
      { value: "2008", label: "founding government mandate" },
      { value: "4", label: "ISO certifications held" },
    ],
    tone: "white",
  },
];