import MarqueeSection from "../shared/marquee-section";

interface Industry {
  title: string;
  description: string;
}

const industries: Industry[] = [
  {
    title: "Oil & Gas",
    description: "Specialized handling for energy sector equipment and materials.",
  },
  {
    title: "Manufacturing",
    description: "Structured freight movement to keep production lines supplied.",
  },
  {
    title: "Retail & General Trade",
    description: "Consistent delivery windows for high-volume merchandise.",
  },
  {
    title: "Electronics",
    description: "Careful handling for high-value, sensitive components.",
  },
  {
    title: "Pharmaceuticals",
    description: "Compliant, closely tracked movement of medical shipments.",
  },
];

const IndustriesWeServe = () => (
  <section className="w-full overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="w-full max-w-[1600px] mx-auto">
      <MarqueeSection
        eyebrow="Who We Work With"
        heading="Industries We Serve"
        description="Zajel's air freight network moves time-critical cargo for industries where speed and reliability are non-negotiable."
        items={industries}
      />
    </div>
  </section>
);

export default IndustriesWeServe;