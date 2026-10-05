import MarqueeSection from '../shared/marquee-section';

const industries = [
  {
    title: 'Oil & Gas',
    description: 'Time-critical transport of equipment, materials, and supplies across upstream, midstream, and downstream operations.',
  },
  {
    title: 'Construction & Heavy Industry',
    description: 'Reliable hauling of heavy machinery, building materials, and oversized loads to sites on schedule.',
  },
  {
    title: 'Defense & Government',
    description: 'Secure, compliant logistics for sensitive cargo and mission-critical shipments.',
  },
  {
    title: 'Manufacturing',
    description: 'Dependable inbound and outbound freight that keeps production lines and supply chains moving.',
  },
  {
    title: 'Retail & General Trade',
    description: 'Flexible, scalable distribution that keeps shelves stocked and orders moving on time.',
  },
];

const IndustriesWeServe = () => (
  <MarqueeSection
    eyebrow="Who We Work With"
    heading="Industries We Serve"
    description="Zajel works across diverse industries, adapting logistics strategies to meet unique operational, regulatory, and delivery requirements."
    items={industries}
  />
);

export default IndustriesWeServe;