'use client';

import WhenToChooseFreight from '@/components/shared/Whentochoosefrieght';
import {
  CROSS_SELL_ROUTES,
  TRANSIT_GUIDE_BODY,
  TRANSIT_GUIDE_IMAGE_SRC,
} from '@/data/air-freight/choose';

export default function WhenToChooseAirFreight() {
  return (
    <WhenToChooseFreight
      title="When to Choose Air Freight"
      imageSrc={TRANSIT_GUIDE_IMAGE_SRC}
      imageAlt="Air freight in transit"
      body={TRANSIT_GUIDE_BODY}
      alternatives={CROSS_SELL_ROUTES}
    />
  );
}