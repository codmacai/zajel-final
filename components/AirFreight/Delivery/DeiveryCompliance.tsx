// components/AirFreight/ChooseDeliveryAndCompliance/ChooseDeliveryAndCompliance.tsx
import DynamicDelivery from "@/components/DynamicDelivery/DeliveryDelivery";
import {
  COMPLIANCE_BODY_SENTENCES,
  COMPLIANCE_HEADING,
  DOOR_TO_DOOR_BASE_IMAGE_SRC,
  DOOR_TO_DOOR_CUTOUT_IMAGE_SRC,
  OTHER_ARRANGEMENTS_LINE,
} from "@/data/air-freight/delivery";

export default function ChooseDeliveryAndCompliance() {
  return (
    <DynamicDelivery
      delivery={{
        eyebrow: "Delivery Arrangements",
        heading: "Choose Your Delivery Arrangement",
        description:
          "Select how your shipment moves from start to finish with flexible options tailored to your workflow.",
        badge: "Our Most Popular Arrangement",
        title: "Door-to-Door",
        body: "Pickup at your origin address, delivered straight to the final destination — no extra coordination required on your end. This is how most Zajel air freight shipments move, start to finish.",
        ctaLabel: "Request Door-to-Door Quote",
        ctaUrl: "/quote?arrangement=door-to-door",
        baseImage: DOOR_TO_DOOR_BASE_IMAGE_SRC,
        cutoutImage: DOOR_TO_DOOR_CUTOUT_IMAGE_SRC,
        baseAlt: "Door-to-Door air freight background",
        cutoutAlt: "Door-to-Door pop-out",
        note: OTHER_ARRANGEMENTS_LINE,
      }}
      compliance={{
        eyebrow: "Compliance & Customs",
        heading: COMPLIANCE_HEADING,
        sentences: COMPLIANCE_BODY_SENTENCES,
      }}
    />
  );
}