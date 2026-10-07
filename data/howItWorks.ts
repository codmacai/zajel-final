export type ImageKey = "book" | "handle" | "track" | "receive";

interface StepImageConfig {
  scale: number;
  offsetX: number;
  offsetY: number;
  popHeight: string;
  width: string;
  height: string;
  fit: "contain" | "cover";
}

export interface HowItWorksStep {
  id: number;
  imageKey: ImageKey;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
}

export const BRAND = {
  leaf: "#36B936",
  leafDark: "#2ea22e",
  paper: "#FAFAF8",
};

export const CIRCLE_SIZE = "clamp(90px, 4.5vw, 160px)";

export const STEP_IMAGE_CONFIG: Record<ImageKey, StepImageConfig> = {
  book: { scale: 1.15, offsetX: 0, offsetY: 10, popHeight: "clamp(32px, 2.2vw, 56px)", width: "clamp(90px, 4.5vw, 160px)", height: "clamp(122px, 6.5vw, 216px)", fit: "contain" },
  handle: { scale: 1, offsetX: 0, offsetY: 0, popHeight: "clamp(20px, 1.5vw, 36px)", width: "clamp(90px, 4.5vw, 160px)", height: "clamp(110px, 6vw, 196px)", fit: "cover" },
  track: { scale: 1, offsetX: 0, offsetY: -8, popHeight: "clamp(32px, 2.2vw, 56px)", width: "clamp(90px, 4.5vw, 160px)", height: "clamp(122px, 6.5vw, 216px)", fit: "cover" },
  receive: { scale: 1, offsetX: 0, offsetY: 0, popHeight: "clamp(20px, 1.5vw, 36px)", width: "clamp(90px, 4.5vw, 160px)", height: "clamp(110px, 6vw, 196px)", fit: "cover" },
};

export const howItWorksContent = {
  eyebrow: "How It Works",
  heading: "From pickup to delivery, in four simple steps",
  steps: [
    { id: 1, imageKey: "book" as ImageKey, imageUrl: "/Homepage/whychooseus/track.png", imageAlt: "Book a shipment", title: "Book Your Shipment", description: "Enter your details and get an instant quote online." },
    { id: 2, imageKey: "handle" as ImageKey, imageUrl: "/Homepage/howto/courier-packing-box.png", imageAlt: "We handle it", title: "We Handle It", description: "Our team picks up and prepares your shipment with care." },
    { id: 3, imageKey: "track" as ImageKey, imageUrl: "/Homepage/howto/track-shipment.png", imageAlt: "Track in real time", title: "Track in Real Time", description: "Follow your shipment's journey every step of the way." },
    { id: 4, imageKey: "receive" as ImageKey, imageUrl: "/Homepage/howto/customer-receiving-delivery.png", imageAlt: "Receive your delivery", title: "Receive Your Delivery", description: "Get your shipment delivered safely, right on time." },
  ] satisfies HowItWorksStep[],
};