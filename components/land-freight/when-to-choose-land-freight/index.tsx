'use client';

import WhenToChooseFreight, {
  type AlternativeRoute,
  type BodyPart,
} from '@/components/shared/Whentochoosefrieght';
import { LAND_WHEN_TO_CHOOSE, type LAND_WHEN_TO_CHOOSEContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

function WhenToChooseLandFreight({ content }: { content: LAND_WHEN_TO_CHOOSEContent }) {
  return (
    <WhenToChooseFreight
      title={content.title}
      imageSrc={content.image}
      imageAlt={content.imageAlt}
      body={content.body}
      alternatives={content.alternatives}
    />
  );
}

export default cmsSection('land-freight.when-to-choose', LAND_WHEN_TO_CHOOSE, WhenToChooseLandFreight);
