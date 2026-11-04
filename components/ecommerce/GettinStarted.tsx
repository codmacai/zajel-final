import ProcessStepsSection from '../shared/Steps';
import { ECOMMERCE_GETTING_STARTED, type ECOMMERCE_GETTING_STARTEDContent } from './content';
import { serverSection } from '@/lib/cms/server';

const GettingStartedSection = ({ content }: { content: ECOMMERCE_GETTING_STARTEDContent }) => (
  <ProcessStepsSection
    eyebrow={content.eyebrow}
    heading={<>{content.headingLine1}<br />{content.headingLine2}</>}
    description={content.description}
    footnote={content.footnote}
    steps={content.steps}
  />
);

export default serverSection('ecommerce.getting-started', ECOMMERCE_GETTING_STARTED, GettingStartedSection);
