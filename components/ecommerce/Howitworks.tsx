// components/domestic-on-demand/HowItWorks.tsx
import ProcessStepsSection from '../shared/Steps';

const HowItWorks = () => (
  <ProcessStepsSection
    eyebrow="On-Demand Delivery"
    heading={<>Book On-Demand<br />Delivery in Three Steps</>}
    description="From locations to doorstep — a straightforward three-step process."
    steps={[
      {
        number: '01',
        title: 'Choose Your Locations',
        description: 'Set your pickup and drop-off addresses — same city or city-to-city, anywhere across the UAE.',
      },
      {
        number: '02',
        title: 'Choose Your Vehicle & Schedule',
        description: 'Pick a motorbike or a van depending on your package, then choose the day and time that works for you.',
      },
      {
        number: '03',
        title: 'Delivery',
        description: 'Your courier arrives within 1 hour of your scheduled slot, and your package is delivered within 2 hours of pickup.',
      },
    ]}
  />
);

export default HowItWorks;