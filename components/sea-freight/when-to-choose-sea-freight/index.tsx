'use client';

import WhenToChooseFreight, {
  type AlternativeRoute,
  type BodyPart,
} from '@/components/shared/Whentochoosefrieght';
import { SEA_WHEN_TO_CHOOSE, type SEA_WHEN_TO_CHOOSEContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

function WhenToChooseSeaFreight({ content }: { content: SEA_WHEN_TO_CHOOSEContent }) {
  return (
    <WhenToChooseFreight
      title={content.title}
      imageSrc={content.image}
      imageAlt={content.imageAlt}
      body={content.body}
      alternatives={content.alternatives}
      alternativesTitle={content.alternativesTitle}
      alternativesLead={content.alternativesLead}
    />
  );
}

export default cmsSection('sea-freight.when-to-choose', SEA_WHEN_TO_CHOOSE, WhenToChooseSeaFreight);
