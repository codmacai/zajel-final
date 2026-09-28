import { Anchor, ShieldCheck, Zap, Award } from "lucide-react";
import type { ServiceHeroData } from "./types";

export const serviceHeroData: Record<"customs" | "warehouse" | "industry" | "network", ServiceHeroData> = {
  customs: {
    slug: "customs",
    badgeText: "Customs Clearance & Brokerage",
    headingPrimary: "Customs Clearance UAE:",
    headingHighlight: "Every Border, Every Document, Handled",
    leadParagraph:
      "Customs clearance in the UAE is a critical step in every international shipment. A single error in HS code classification, a missing permit, or an outdated document can hold your cargo for days and cost your business far more than the delay itself.",
    detailParagraph:
      "Zajel provides end to end customs clearance and brokerage services across the UAE, managing every step from document preparation to final cargo release. Whether your shipment arrives by air, sea, or land, our team handles the regulatory process so your goods move through borders without unnecessary delays.",
    ctaText: "Get a Clearance Quote",
    ctaHref: "/contact",
    ctaVariant: "arrow",
    backgroundImage: "/warehouse/magnific_create-an-ultrarealistic-_Eb7cIBYuuO.jpg",
    backgroundImageAlt: "Customs Clearance UAE",
    cardBg: "#0B140F",
    sectionBg: "bg-white",
    imageOpacity: 0.65,
    overlayVariant: "standard",
    stats: [
      { type: "icon", icon: Anchor, title: "All UAE", subtitle: "Ports, Airports & Free Zones" },
      { type: "icon", icon: ShieldCheck, title: "12-Digit", subtitle: "HS Code Compliance (2026)" },
      { type: "icon", icon: Zap, title: "Same Day", subtitle: "Air Cargo Clearance" },
      { type: "icon", icon: Award, title: "Licensed", subtitle: "Customs Brokers" },
    ],
  },

  warehouse: {
    slug: "warehouse",
    badgeText: "Warehousing & Distribution",
    headingPrimary: "Warehousing Services in Dubai:",
    headingHighlight: "Secure Storage, Intelligent Fulfillment",
    leadParagraph:
      "Warehousing services in Dubai are a critical link in the supply chain for businesses importing, distributing, and fulfilling orders across the UAE and the wider region. What happens between cargo arrival and final delivery, where goods are stored, how inventory is managed, and how quickly orders can be dispatched, determines whether your logistics operation delivers value or creates bottlenecks.",
    detailParagraph:
      "Zajel operates dedicated warehouse facilities in Dubai, providing secure storage, real-time inventory management, and distribution services that connect directly to our air, sea, and land freight networks.",
    ctaText: "Get a Warehousing Quote",
    ctaHref: "/contact",
    ctaVariant: "arrow",
    backgroundImage: "/warehouse/magnific_create-an-ultrarealistic-_1l4dLbMr4r (1).png",
    backgroundImageAlt: "Dubai Warehousing and Distribution",
    cardBg: "#0B140F",
    sectionBg: "bg-[#F9FAFB]",
    imageOpacity: 0.75,
    overlayVariant: "standard",
    showGlowOrbs: true,
    stats: [
      { type: "numeric", value: "Dubai", label: "Based Facilities", animate: false },
      { type: "numeric", value: 4, label: "ISO Certifications" },
      { type: "numeric", value: "24/7", label: "Inventory Monitoring", animate: false },
      { type: "numeric", value: 45, suffix: "M+", label: "Shipments Delivered" },
    ],
  },

  industry: {
    slug: "industry",
    badgeText: "Industries Served",
    headingPrimary: "Industry Logistics Solutions in the UAE:",
    headingHighlight: "Shaped by Your Sector",
    leadParagraph:
      "Every industry moves different goods under different conditions, and the logistics requirements that come with each are rarely interchangeable. A pharmaceutical shipment that must maintain cold chain integrity from warehouse to clinic has nothing in common with an oversized oil and gas module being transported by break bulk from Jebel Ali to a project site in Iraq. The documentation, the handling, the timelines, and the compliance standards are entirely different.",
    detailParagraph:
      "Zajel provides industry logistics solutions across the UAE that are designed around the specific requirements of each sector we serve. With over 45 million shipments delivered across 195 countries and four ISO certifications governing our operations, Zajel brings both scale and precision to every sector.",
    ctaText: "Find Your Industry",
    ctaHref: "/contact",
    ctaVariant: "arrow",
    backgroundImage: "/industry/magnific_create-an-ultrarealistic-_vQgnjbSa47.jpg",
    backgroundImageAlt: "Industry Logistics Solutions",
    cardBg: "#0B140F",
    sectionBg: "bg-white",
    imageOpacity: 0.65,
    overlayVariant: "standard",
    stats: [
      { type: "numeric", value: 195, suffix: "+", label: "Countries Covered" },
      { type: "numeric", value: 500, suffix: "+", label: "Destinations Worldwide" },
      { type: "numeric", value: 45, suffix: "M+", label: "Shipments Delivered" },
      { type: "numeric", value: 4, label: "ISO Certifications" },
    ],
  },

  network: {
    slug: "network",
    badgeText: "Global Coverage, Local Precision",
    headingPrimary: "Our Logistics Network",
    headingHighlight: "in the UAE",
    headingSize: "large",
    leadParagraph:
      "A logistics network is only as strong as the infrastructure, partnerships, and operational reach behind it. What determines on-time delivery and seamless customs clearance is the power of the network executing it.",
    detailParagraph:
      "Zajel operates from the UAE spanning 195 countries and 500+ destinations. Through local operations and global freight alliances, we provide connected coverage from Dubai last-mile delivery to multimodal transport across continents.",
    ctaText: "Explore Our Network",
    ctaHref: "#explore-network",
    ctaVariant: "arrow",
    backgroundImage: "/network/photorealistic-scene-with-warehouse-logistics-operations_23-2151468805.jpg",
    backgroundImageAlt: "Global warehouse logistics operations network",
    cardBg: "#0D2A22",
    sectionBg: "bg-[#F9FAFB]",
    imageOpacity: 1,
    overlayVariant: "network",
    stats: [
      { type: "numeric", value: 195, label: "Countries Covered" },
      { type: "numeric", value: 500, suffix: "+", label: "Destinations Worldwide" },
      { type: "numeric", value: 60, suffix: "M+", label: "Shipments Delivered" },
      { type: "numeric", value: 3, label: "Global Alliances" },
    ],
  },
};

export type ServiceHeroKey = keyof typeof serviceHeroData;