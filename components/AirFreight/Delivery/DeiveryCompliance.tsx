// components/AirFreight/ChooseDeliveryAndCompliance/ChooseDeliveryAndCompliance.tsx
import DynamicDelivery from "@/components/DynamicDelivery/DeliveryDelivery";
import {
  COMPLIANCE_BODY_SENTENCES,
  COMPLIANCE_HEADING,
  DOOR_TO_DOOR_BASE_IMAGE_SRC,
  DOOR_TO_DOOR_CUTOUT_IMAGE_SRC,
  OTHER_ARRANGEMENTS_LINE,
} from "@/data/air-freight/delivery";
import { AIR_DELIVERY, type AIR_DELIVERYContent } from '../content';
import { serverSection } from '@/lib/cms/server';

function ChooseDeliveryAndCompliance({ content }: { content: AIR_DELIVERYContent }) {
  return (
    <DynamicDelivery
      delivery={content.delivery}
      compliance={content.compliance}
    />
  );
}

export default serverSection('air-freight.delivery-compliance', AIR_DELIVERY, ChooseDeliveryAndCompliance);
