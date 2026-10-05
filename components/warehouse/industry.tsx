import MarqueeSection from '../shared/marquee-section';

const industries = [
  {
    id: 'ecommerce-retail',
    title: 'E-commerce and Retail',
    description:
      'Fulfillment warehousing with pick, pack, and last-mile delivery integration for online sellers and retail businesses distributing across the UAE.',
  },
  {
    id: 'pharma-healthcare',
    title: 'Pharmaceuticals and Healthcare',
    description:
      'Temperature-controlled storage with compliance documentation, suitable for medical supplies, pharmaceutical products, and healthcare equipment.',
  },
  {
    id: 'food-beverage',
    title: 'Food and Beverage',
    description:
      'Cold chain warehousing with continuous temperature monitoring for perishable goods, beverages, and food products requiring food safety compliance.',
  },
  {
    id: 'oil-gas',
    title: 'Oil and Gas',
    description:
      'Secure storage for industrial equipment, spare parts, pipes, and project materials, including open yard capacity for oversized items.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description:
      'Raw materials and finished goods storage with inventory management that supports just-in-time production schedules and supply chain continuity.',
  },
  {
    id: 'technology-electronics',
    title: 'Technology and Electronics',
    description:
      'Secure, climate-appropriate storage for sensitive electronic components, devices, and high-value technology products.',
  },
];

const IndustriesWeServe = () => (
  <section className="w-full overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-[1600px] mx-auto">
      <MarqueeSection
        eyebrow="Who We Work With"
        heading="Industries We Serve"
        description="Zajel's warehousing adapts to the operational, compliance, and storage requirements of each industry we serve."
        items={industries}
      />
    </div>
  </section>
);

export default IndustriesWeServe;