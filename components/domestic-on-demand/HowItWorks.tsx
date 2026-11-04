// components/domestic-on-demand/HowItWorks.tsx
//
// Server Component — it renders ProcessStepsSection (which is the one
// marked 'use client', since that's what uses hooks/scroll animation).
// This file itself needs no hooks, so no 'use client' directive here.

import ProcessStepsSection, { type ProcessStep } from '../shared/Steps';
import { DOMESTIC_STEPS, type DOMESTIC_STEPSContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

const HowItWorks = ({ content }: { content: DOMESTIC_STEPSContent }) => (
  <ProcessStepsSection
    eyebrow={content.eyebrow}
    heading={<>{content.headingLine1}<br />{content.headingLine2}</>}
    description={content.description}
    steps={content.steps}
  />
);

export default cmsSection('domestic-courier.how-it-works', DOMESTIC_STEPS, HowItWorks);
