// components/SeaFreight/ChooseDeliveryAndComplianceSea/ChooseDeliveryAndComplianceSea.tsx
import DynamicDelivery from "@/components/DynamicDelivery/DeliveryDelivery";

const BASE_IMAGE_SRC = "/choose/ChatGPT Image Sep 28, 2026, 03_27_16 PM.webp";
const CUTOUT_IMAGE_SRC = "/choose/ChatGPT Image Sep 28, 2026, 03_27_25 PM (2).png";

const OTHER_ARRANGEMENTS_LINE =
  "Also available on request: Door-to-Port, Port-to-Door, and Port-to-Port arrangements — for businesses managing part of the logistics themselves.";

const COMPLIANCE_HEADING = "Compliance & Customs Expertise";

const COMPLIANCE_BODY_SENTENCES = [
  "Moving cargo by sea involves documentation, duty, and port clearance requirements that vary by cargo and destination.",
  "Zajel manages customs clearance and compliance on your behalf, so your shipment moves through port without unnecessary delays.",
];

const ChooseDeliveryAndComplianceSea = () => (
  <DynamicDelivery
    delivery={{
      eyebrow: "Delivery Arrangements",
      heading: "Choose Your Delivery Arrangement",
      description: "Select the ideal transport flow tailored to your supply chain requirements.",
      title: "Door-to-Door",
      body: "Pickup at your origin address, delivered straight to the final destination — no extra coordination required on your end. This is how most Zajel sea freight shipments move, start to finish.",
      ctaLabel: "Request Door-to-Door Quote",
      ctaUrl: "/quotation?arrangement=door-to-door",
      baseImage: BASE_IMAGE_SRC,
      cutoutImage: CUTOUT_IMAGE_SRC,
      baseAlt: "Door-to-Door sea freight background",
      cutoutAlt: "Door-to-Door pop-out graphic",
      note: OTHER_ARRANGEMENTS_LINE,
    }}
    compliance={{
      eyebrow: "Compliance & Customs",
      heading: COMPLIANCE_HEADING,
      sentences: COMPLIANCE_BODY_SENTENCES,
    }}
  />
);

export default ChooseDeliveryAndComplianceSea;