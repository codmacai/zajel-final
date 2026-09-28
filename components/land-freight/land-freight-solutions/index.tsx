"use client";

// Icons are passed as component props, so this wrapper must be a client component.
import DynamicSolutions from "@/components/freightsolutions/DynamicSolutions";
import { EYEBROW, HEADING, SUBHEADING, LAND_FREIGHT_CARDS } from "./data";

const LandFreightSolutions = () => (
  <DynamicSolutions
    eyebrow={EYEBROW}
    heading={HEADING}
    subheading={SUBHEADING}
    cards={LAND_FREIGHT_CARDS}
    columns={2}
    bgClassName="bg-[#F9FAFB]"
  />
);

export default LandFreightSolutions;