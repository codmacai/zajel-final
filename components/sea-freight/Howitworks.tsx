import ProcessStepsSection from '../shared/Steps';

const HowFreightQuoteWorks = () => (
  <ProcessStepsSection
    eyebrow="Freight Quote"
    heading={<>How a Freight<br />Quote Works</>}
    description="A simple, three-step process — from inquiry to a quote tailored precisely to your shipment."
    footnote="Est. response within 24 hours"
    steps={[
      {
        number: '01',
        title: 'Submit an Inquiry',
        description: 'Tell us your cargo, route, and preferred delivery arrangement.',
      },
      {
        number: '02',
        title: 'We Review Your Shipment',
        description: 'Our team assesses cargo type, route, and compliance needs.',
      },
      {
        number: '03',
        title: 'Get Your Quote',
        description: 'Receive a tailored quote for your shipment.',
      },
    ]}
  />
);

export default HowFreightQuoteWorks;