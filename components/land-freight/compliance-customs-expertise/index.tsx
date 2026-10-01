'use client';

import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const eyebrow = 'Compliance & Customs';
const heading = 'Compliance & Customs Expertise';

const bodySentences = [
  'Cross-border road freight involves documentation, duty, and border',
  'clearance requirements that vary by route and destination. Zajel manages',
  'customs clearance and compliance on your behalf, so your shipment moves',
  'across borders without unnecessary delays.',
];

const ComplianceCustomsExpertise = () => {
  return (
    <section className="w-full py-[clamp(3rem,8vw,7rem)] px-[clamp(1rem,4vw,1.5rem)] bg-white font-sans overflow-hidden">
      <div className="max-w-[860px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-4 sm:mb-5"
        >
          <span style={{ color: '#36B936' }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl text-[#1b4332] font-medium tracking-tight leading-[1.15] mb-6 sm:mb-8 max-w-[720px] mx-auto"
        >
          {heading}
        </motion.h2>

        <p className="max-w-[46rem] mx-auto text-[#2d6a4f] font-light leading-[1.7] text-sm sm:text-base tracking-tight">
          {bodySentences.map((sentence, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 + i * 0.15 }}
              className="inline"
            >
              {sentence}
              {i < bodySentences.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default ComplianceCustomsExpertise;
