import ProcessStepsSection from '../shared/Steps';
import { LAND_QUOTE_STEPS, type LAND_QUOTE_STEPSContent } from './content';
import { serverSection } from '@/lib/cms/server';

const HowFreightQuoteWorks = ({ content }: { content: LAND_QUOTE_STEPSContent }) => (
  <ProcessStepsSection
    eyebrow={content.eyebrow}
    heading={<>{content.headingLine1}<br />{content.headingLine2}</>}
    description={content.description}
    footnote={content.footnote}
    steps={content.steps}
  />
);

export default serverSection('land-freight.quote-steps', LAND_QUOTE_STEPS, HowFreightQuoteWorks);
