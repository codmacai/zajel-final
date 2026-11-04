// components/freight-quote/HowItWorks.tsx
import ProcessStepsSection from '../shared/Steps';
import { AIR_QUOTE_STEPS, type AIR_QUOTE_STEPSContent } from './content';
import { serverSection } from '@/lib/cms/server';

const HowFreightQuoteWorks = ({ content }: { content: AIR_QUOTE_STEPSContent }) => (
  <ProcessStepsSection
    eyebrow={content.eyebrow}
    heading={<>How a Freight<br />Quote Works</>}
    description={content.description}
    steps={content.steps}
  />
);

export default serverSection('air-freight.quote-steps', AIR_QUOTE_STEPS, HowFreightQuoteWorks);
