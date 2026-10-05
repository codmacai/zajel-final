export interface ShippingTier {
  id: string;
  tierNumber: string;
  label: string;
  volume: string;
  description: string;
  featuresNote: string | null;
  features: string[];
  buttonLabel: string;
  buttonUrl: string;
  recommended: boolean;
}
