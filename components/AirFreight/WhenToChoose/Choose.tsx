'use client';

import WhenToChooseFreight from '@/components/shared/Whentochoosefrieght';
import { AIR_WHEN_TO_CHOOSE, type AIR_WHEN_TO_CHOOSEContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

function WhenToChooseAirFreight({ content }: { content: AIR_WHEN_TO_CHOOSEContent }) {
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

export default cmsSection('air-freight.when-to-choose', AIR_WHEN_TO_CHOOSE, WhenToChooseAirFreight);
