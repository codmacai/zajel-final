import type { ComponentType } from 'react';

export interface FreightCard {
  id: string;
  Icon: ComponentType;
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
}
