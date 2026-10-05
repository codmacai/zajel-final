export interface ShippingTier {
    id: string;
    index: string;
    label: string;
    volume: string;
    description: string;
    featuresNote: string | null;
    features: string[];
    buttonLabel: string;
    buttonUrl: string;
    recommended: boolean;
  }
  
  export const SHIPPING_TIERS_EYEBROW = "Pricing";
  export const SHIPPING_TIERS_HEADING_LINE_1 = "Built to Match";
  export const SHIPPING_TIERS_HEADING_LINE_2 = "Your Volume";
  export const SHIPPING_TIERS_INTRO =
    "Whether you're shipping your first orders or running fulfillment at scale, there's a tier that fits how your business actually operates.";
  export const SHIPPING_TIERS_FOOTNOTE =
    "No setup fees on any tier — upgrade or downgrade as your volume changes";
  
  export const SHIPPING_TIERS: ShippingTier[] = [
    {
      id: "emerging",
      index: "01",
      label: "Emerging Sellers",
      volume: "Shipping 1 to 50 orders per day",
      description:
        "You are building your brand and every delivery matters. Zajel gives you the same logistics infrastructure that larger brands use, without the overhead. No minimum volumes. No long-term contracts. Start with pay per shipment pricing and scale when you are ready.",
      featuresNote: null,
      features: [
        "Portal access with order tracking",
        "COD collection and weekly reconciliation",
        "Same-day and next-day delivery across all emirates",
        "Shopify or WooCommerce integration",
      ],
      buttonLabel: "Get Started",
      buttonUrl: "/get-started",
      recommended: false,
    },
    {
      id: "growing",
      index: "02",
      label: "Growing Brands",
      volume: "Shipping 50 to 500 orders per day",
      description:
        "Your order volume is climbing and you need logistics that keeps pace without adding complexity. Zajel assigns a dedicated account manager to your business, builds a custom rate card around your shipping patterns, and handles fulfillment so you can focus on selling.",
      featuresNote: "Everything in Emerging Sellers, plus:",
      features: [
        "Dedicated account manager",
        "Custom volume-based rate card",
        "Priority pickup scheduling",
        "Returns processing",
        "Monthly performance reports",
      ],
      buttonLabel: "Talk to Sales",
      buttonUrl: "/contact",
      recommended: true,
    },
    {
      id: "enterprise",
      index: "03",
      label: "Enterprise & Marketplace",
      volume: "Shipping 500+ orders per day",
      description:
        "At this scale, logistics is a strategic function. Zajel provides API-level integration, warehouse-based fulfillment, and a logistics team that operates as an extension of your operations.",
      featuresNote: "Everything in Growing Brands, plus:",
      features: [
        "Full API integration with your OMS or ERP",
        "Warehouse fulfillment (pick, pack, dispatch)",
        "Dedicated operations liaison",
        "Daily COD reconciliation and settlement",
        "Custom SLA agreements",
      ],
      buttonLabel: "Request a Custom Proposal",
      buttonUrl: "/custom-proposal",
      recommended: false,
    },
  ];