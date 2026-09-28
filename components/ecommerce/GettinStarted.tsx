import ProcessStepsSection from '../shared/Steps';

const GettingStartedSection = () => (
  <ProcessStepsSection
    eyebrow="Onboarding"
    heading={<>Getting Started<br />Is Simple</>}
    description="From setup to delivery — a straightforward path to shipping with us."
    footnote="Dedicated support at every step"
    steps={[
      {
        number: '01',
        title: 'Get Onboarded',
        description: 'Set up with your dedicated account manager.',
      },
      {
        number: '02',
        title: 'Submit Orders',
        description: 'Book and manage orders through the Zajel portal.',
      },
      {
        number: '03',
        title: 'We Deliver',
        description: 'Orders are delivered, COD is collected, and remitted to you.',
      },
    ]}
  />
);

export default GettingStartedSection;