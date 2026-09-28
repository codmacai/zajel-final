export interface IntegrationCard {
    id: string;
    label: string;
    description: string;
    features: string[];
    buttonLabel: string;
    buttonUrl: string;
  }
  
  export interface ApiAccessContent {
    label: string;
    text: string;
    primaryCta: string;
    primaryUrl: string;
    secondaryCta: string;
    secondaryUrl: string;
  }
  
  export const PLATFORM_INTEGRATIONS_EYEBROW = "Integrations";
  export const PLATFORM_INTEGRATIONS_HEADING = "Connect Your Store Directly to Zajel";
  export const PLATFORM_INTEGRATIONS_INTRO =
    "Zajel integrates directly with the platforms your business runs on. Connect your store, and orders flow straight into our fulfillment system. No manual uploads. No copy and paste. Your customers place an order, and Zajel picks, packs, and delivers.";
  
  export const PLATFORM_INTEGRATIONS_CARDS: IntegrationCard[] = [
    {
      id: "shopify",
      label: "Shopify",
      description: "Direct integration with Shopify using REST APIs — orders sync automatically, both ways.",
      features: [
        "Automatic order import on checkout",
        "Real-time shipment status sync to Shopify",
        "Bulk label generation from your Shopify dashboard",
        "COD order flagging and reconciliation",
        "Returns initiated from order history",
      ],
      buttonLabel: "Connect Shopify",
      buttonUrl: "/integrations/shopify",
    },
    {
      id: "woocommerce",
      label: "WooCommerce",
      description: "Direct integration with WooCommerce using REST APIs — install the plugin and go live.",
      features: [
        "Automatic order sync on new WooCommerce orders",
        "Delivery status updates pushed to WooCommerce order page",
        "Shipping rate calculation at checkout",
        "COD as a payment method with automated reconciliation",
        "Compatible with WooCommerce multisite setups",
      ],
      buttonLabel: "Connect WooCommerce",
      buttonUrl: "/integrations/woocommerce",
    },
  ];
  
  export const PLATFORM_INTEGRATIONS_API: ApiAccessContent = {
    label: "General API Access",
    text: "For platforms beyond Shopify and WooCommerce, Zajel provides REST API access so your development team can build a custom integration with any order management system, marketplace, or ERP. API documentation and technical onboarding support are included with every business account.",
    primaryCta: "View Integration Documentation",
    primaryUrl: "/docs/integrations",
    secondaryCta: "Talk to Our Integration Team",
    secondaryUrl: "/contact",
  };