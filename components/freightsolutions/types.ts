// components/DynamicSolutions/types.ts
import type { ComponentType } from "react";

export interface SolutionIconProps {
  className?: string;
  strokeWidth?: number;
}

export interface SolutionCard {
  id?: string;
  Icon: ComponentType<SolutionIconProps>;
  image: string;
  title: string;
  description: string;
  buttonLabel?: string;
  buttonUrl?: string;
}

export type SolutionColumns = 2 | 3 | 4;