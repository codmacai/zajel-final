export interface EcommerceStat {
    value: string;
    label: string;
  }
  
  export interface EcommerceQuoteCard {
    heading: string;
    liveLabel: string;
    pickupLabel: string;
    pickupValue: string;
    weightLabel: string;
    defaultWeightKg: number;
    deliveryOptions: string[];
    summaryLabel: string;
    summaryValue: string;
    priceLabel: string;
    priceValue: string;
    btnLabel: string;
  }
  
  export const ECOMMERCE_HERO_IMAGE = "/ChatGPT Image Sep 9, 2026, 09_52_13 AM.png";
  
  export const ECOMMERCE_HERO_EYEBROW = "E-commerce Logistics";
  export const ECOMMERCE_HERO_TITLE =
    "E-commerce Logistics Solutions: Delivery Built for Online Sellers";
  export const ECOMMERCE_HERO_DESCRIPTION =
    "Cash on Delivery collection, a dedicated account manager, and nationwide delivery: everything an online seller needs from a logistics partner, in one place.";
  
  export const ECOMMERCE_HERO_STATS: EcommerceStat[] = [
    { value: "98%", label: "COD collection rate" },
    { value: "500+", label: "sellers onboarded" },
    { value: "24/7", label: "account support" },
  ];
  
  export const ECOMMERCE_HERO_QUOTE_CARD: EcommerceQuoteCard = {
    heading: "Get a shipping quote",
    liveLabel: "Ships today",
    pickupLabel: "Pickup city",
    pickupValue: "Dubai",
    weightLabel: "Package weight",
    defaultWeightKg: 2,
    deliveryOptions: ["Standard", "Express"],
    summaryLabel: "Estimated delivery",
    summaryValue: "1–2 business days",
    priceLabel: "From",
    priceValue: "AED 15",
    btnLabel: "Get my quote",
  };