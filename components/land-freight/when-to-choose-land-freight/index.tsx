'use client';

import WhenToChooseFreight, {
  type AlternativeRoute,
  type BodyPart,
} from '@/components/shared/Whentochoosefrieght';

const IMAGE_SRC = '/land-freight/when-to-choose-land-freight.webp';

const BODY: BodyPart[] = [
  { text: 'Land freight fits regional distribution and cross-border shipments where ' },
  { text: 'road access makes sense', emphasis: true },
  {
    text: ' — domestic delivery across the UAE, or cross-border cargo to neighboring markets. It offers a ',
  },
  { text: 'flexible middle ground', emphasis: true },
  { text: ' between the speed of air freight and the bulk cost-efficiency of sea freight.' },
];

const ALTERNATIVES: AlternativeRoute[] = [
  { href: '/air-freight', label: 'Air Freight' },
  { href: '/sea-freight', label: 'Sea Freight' },
];

export default function WhenToChooseLandFreight() {
  return (
    <WhenToChooseFreight
      title="When to Choose Land Freight"
      imageSrc={IMAGE_SRC}
      imageAlt="Land freight truck on the road"
      body={BODY}
      alternatives={ALTERNATIVES}
    />
  );
}