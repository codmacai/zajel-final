import ProcessStepsSection from '../shared/Steps';
import { SEA_QUOTE_STEPS, type SEA_QUOTE_STEPSContent } from './content';
import { serverSection } from '@/lib/cms/server';

const HowFreightQuoteWorks = ({ content }: { content: SEA_QUOTE_STEPSContent }) => (
  <ProcessStepsSection
    eyebrow={content.eyebrow}
    heading={<>{content.headingLine1}<br />{content.headingLine2}</>}
    description={content.description}
    footnote={content.footnote}
    steps={content.steps}
  />
);

export default serverSection('sea-freight.quote-steps', SEA_QUOTE_STEPS, HowFreightQuoteWorks);
