'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Content & data structure
// Put each logo in /public/Homepage/alliances/ and the `logo` paths resolve as-is.
// `title` is no longer shown visually; it is used for accessibility (alt / heading).
// ---------------------------------------------------------------------------
const defaultContent = {
  eyebrow: 'Worldwide Recognition',
  heading: 'Our Alliances & Accreditations',
  intro:
    'Connecting Zajel to global networks, trade facilitation benefits, and internationally recognized standards across air, sea, and land logistics.',
  logoStripImage: '/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR.webp', // update to match your asset
  alliances: [
    {
      title: 'WCA Inter Global',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR copy 2.png',
      description:
        'Member of the World Cargo Alliance, connecting Zajel with qualified logistics partners across every major trade market globally for reliable origin and destination handling.',
      badge: 'Global Network',
    },
    {
      title: 'DF Alliance by DP World',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR.png',
      description:
        "Premium Member of DP World's global network spanning 190+ countries, granting access to vetted logistics partners and deep local expertise worldwide.",
      badge: 'Premium Member',
    },
    {
      title: 'JCtrans (JC Premium)',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR copy 3.png',
      description:
        "Leading international freight forwarding network that strengthens Zajel's coverage on key trade lanes, particularly routes connecting the UAE with Asian manufacturing markets.",
      badge: 'Trade Lanes',
    },
    {
      title: 'FIATA',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR copy 5.png',
      description:
        'The International Federation of Freight Forwarders Associations, reflecting strict adherence to recognized standards in global freight forwarding and trade documentation.',
      badge: 'Industry Standard',
    },
    {
      title: 'IATA',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR copy 6.png',
      description:
        'International Air Transport Association accreditation ensuring air freight services meet global protocols for cargo handling, documentation, and carrier relationships.',
      badge: 'Air Cargo Standard',
    },
    {
      title: 'NAFL UAE',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR copy 4.png',
      description:
        'National Association of Freight and Logistics membership, connecting Zajel with the domestic freight community and supporting regulatory alignment across UAE operations.',
      badge: 'UAE Community',
    },
    {
      title: 'ICV (In-Country Value)',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR copy 7.png',
      description:
        "Certified contribution to the UAE's national economy through local employment, local procurement, and continuous investment in UAE-based operations.",
      badge: 'UAE Certified',
    },
    {
      title: 'WLP',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR.png',
      description:
        'World Logistics Passport member, unlocking global trade facilitation benefits, operational hub advantages, and streamlined logistics routing.',
      badge: 'Trade Facilitation',
    },
    {
      title: 'BSCIC (JAS-ANZ Accredited)',
      logo: '/global-alliance/magnific_photo-the-iata-logo-with-_TdQ6OvAVNR (1).png',
      description:
        "Certified under Joint Accreditation System of Australia & New Zealand (JAS-ANZ), validating the integrity and quality of Zajel's management systems.",
      badge: 'Quality Accreditation',
    },
  ],
};

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const GlobalAlliances: FC = () => {
  const data = defaultContent;

  return (
    <section
      className="w-full select-none overflow-hidden bg-[#FAFBF8] py-14 font-['Manrope',sans-serif] sm:py-20 lg:py-28"
      aria-labelledby="global-alliances-heading"
    >
      {/* Header */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          className="mx-auto mb-10 flex max-w-[800px] flex-col items-center text-center sm:mb-12 lg:mb-16"
        >
          <motion.span
            variants={fadeUpVariants}
            className="mb-3 block text-xs sm:text-sm font-medium uppercase tracking-wider text-[#064423]/70 sm:mb-4"
          >
            {data.eyebrow}
          </motion.span>

          <motion.h2
            id="global-alliances-heading"
            variants={fadeUpVariants}
            className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-[#064423]"
          >
            {data.heading}
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="max-w-[62ch] text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed text-[#064423]/70"
          >
            {data.intro}
          </motion.p>
        </motion.div>
      </div>

      {/* Static logo strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 flex max-w-[1280px] items-center justify-center px-4 sm:mb-16 sm:px-6 lg:mb-20 lg:px-12"
      >
        <div className="relative h-14 w-full max-w-[900px] sm:h-16 lg:h-20">
          <Image
            src={data.logoStripImage}
            alt="Professional alliances logo strip"
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      </motion.div>

      {/* Membership cards grid */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {data.alliances.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUpVariants}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#064423]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#36B936]/40 hover:shadow-md sm:p-7"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
                  {/* Logo replaces the text title. Hidden heading keeps it accessible. */}
                  <h3 className="sr-only">{item.title}</h3>
                  <div className="relative h-9 w-32 sm:h-10 sm:w-36 lg:h-12 lg:w-40">
                    <Image
                      src={item.logo}
                      alt={`${item.title} logo`}
                      fill
                      sizes="(min-width: 1024px) 160px, 144px"
                      className="object-contain object-left"
                    />
                  </div>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-[#064423]/5 px-2.5 py-1 text-[11px] font-medium leading-none text-[#064423]/65">
                    {item.badge}
                  </span>
                </div>

                <p className="text-[0.875rem] font-light leading-relaxed text-[#064423]/70 sm:text-[0.9375rem]">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#064423]/[0.08] pt-4 text-[#36B936] sm:mt-6">
                <span className="text-[11px] font-medium uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1">
                  Verified Alliance
                </span>
                <span aria-hidden="true" className="text-sm leading-none">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalAlliances;