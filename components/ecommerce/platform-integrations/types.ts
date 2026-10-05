export interface IntegrationCard {
  id: 'shopify' | 'woocommerce';
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
