// components/SeaFreight/ChooseDeliveryAndComplianceSea/ChooseDeliveryAndComplianceSea.tsx
import DynamicDelivery from "@/components/DynamicDelivery/DeliveryDelivery";
import { SEA_DELIVERY, type SEA_DELIVERYContent } from '../content';
import { serverSection } from '@/lib/cms/server';

const ChooseDeliveryAndComplianceSea = ({ content }: { content: SEA_DELIVERYContent }) => (
  <DynamicDelivery
    delivery={content.delivery}
    compliance={content.compliance}
  />
);

export default serverSection('sea-freight.delivery-compliance', SEA_DELIVERY, ChooseDeliveryAndComplianceSea);
