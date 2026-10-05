import type { ComponentType } from 'react';

export interface LandFreightCard {
  id: string;
  Icon: ComponentType;
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
}
