"use client";

// Icons are passed as component props, so this wrapper must be a client component.
import DynamicSolutions from "@/components/freightsolutions/DynamicSolutions";
import { EYEBROW, HEADING, SUBHEADING, SEA_FREIGHT_CARDS } from "./data";

const SeaFreightSolutions = () => (
  <DynamicSolutions
    eyebrow={EYEBROW}
    heading={HEADING}
    subheading={SUBHEADING}
    cards={SEA_FREIGHT_CARDS}
    columns={4}
    bgClassName="bg-white"
  />
);

export default SeaFreightSolutions;