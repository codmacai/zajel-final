'use client';

import WhenToChooseFreight, {
  type AlternativeRoute,
  type BodyPart,
} from '@/components/shared/Whentochoosefrieght';

const IMAGE_SRC = '/sea-freight/whentochoose/when-to-choose-sea-freight.webp';

const BODY: BodyPart[] = [
  { text: 'Sea freight fits shipments where ' },
  { text: 'cost efficiency matters more than speed', emphasis: true },
  {
    text: ', such as bulk cargo, heavy or oversized loads, and shipments with flexible timelines. For urgent or time-critical cargo, ',
  },
  { text: 'air freight is typically the faster option', emphasis: true },
  { text: '.' },
];

const ALTERNATIVES: AlternativeRoute[] = [
  { href: '/air-freight', label: 'Air Freight' },
  { href: '/land-freight', label: 'Land Freight' },
];

export default function WhenToChooseSeaFreight() {
  return (
    <WhenToChooseFreight
      title="When to Choose Sea Freight"
      imageSrc={IMAGE_SRC}
      imageAlt="Sea freight vessel at port"
      body={BODY}
      alternatives={ALTERNATIVES}
    />
  );
}