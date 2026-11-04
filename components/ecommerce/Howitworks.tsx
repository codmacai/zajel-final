// components/domestic-on-demand/HowItWorks.tsx
import ProcessStepsSection from '../shared/Steps';
import { ECOMMERCE_HOW, type ECOMMERCE_HOWContent } from './content';
import { serverSection } from '@/lib/cms/server';

const HowItWorks = ({ content }: { content: ECOMMERCE_HOWContent }) => (
  <ProcessStepsSection
    eyebrow={content.eyebrow}
    heading={<>{content.headingLine1}<br />{content.headingLine2}</>}
    description={content.description}
    steps={content.steps}
  />
);

export default serverSection('ecommerce.how-it-works', ECOMMERCE_HOW, HowItWorks);
