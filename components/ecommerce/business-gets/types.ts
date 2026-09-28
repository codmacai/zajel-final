import type { ComponentType, SVGProps } from 'react';

export interface BusinessCard {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}