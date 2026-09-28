'use client';

import { useState, type FC } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Content & data structure
// ---------------------------------------------------------------------------
const defaultContent = {
  eyebrow: 'Our Infrastructure',
  heading: 'Facilities & Fleet',
  description:
    'Real scale, owned assets, and dedicated teams across the UAE. Built to deliver operational excellence and supply chain security.',
  photos: [
    {
      id: 1,
      title: 'Dubai Headquarters',
      caption: 'Zajel headquarters, Al Rostamani Building, Dubai',
      image: '/about/gallery/magnific_create-an-ultrarealistic-_gOnfXiwSXO.jpg', // 👈 Replace with real Zajel asset
    },
    {
      id: 2,
      title: 'Warehouse Operations',
      caption: 'Warehouse facility, Dubai',
      image: '/about/gallery/magnific_ultrarealistic-cinematic-_Xmk3H4sBfo.jpg', // 👈 Replace with real Zajel asset
    },
    {
      id: 3,
      title: 'Fleet Vehicles',
      caption: 'Zajel delivery fleet',
      image: '/about/gallery/magnific_ultrarealistic-cinematic-_s7Gv0tml8e.jpg', // 👈 Replace with real Zajel asset
    },
    {
      id: 4,
      title: 'Team at Work',
      caption: 'Our operations team',
      image: '/about/gallery/magnific_ultrarealistic-cinematic-_bx9dOx85Y2 (1).jpg', // 👈 Replace with real Zajel asset
    },
  ],
};

type Photo = (typeof defaultContent.photos)[number];

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const FacilityGallery: FC = () => {
  const data = defaultContent;
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <section
      className="w-full bg-[#FAFBF8] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden select-none font-sans"
      aria-labelledby="facilities-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          className="flex flex-col"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10 sm:mb-12 lg:mb-16">
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#36B936]" />
              <span className="text-[#064423]/70 text-xs sm:text-sm font-medium tracking-wider uppercase">
                {data.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              id="facilities-heading"
              variants={fadeUpVariants}
              className="text-2xl sm:text-3xl md:text-4xl text-[#064423] font-medium tracking-tight leading-[1.15] mb-4"
            >
              {data.heading}
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="text-[#064423]/70 text-sm sm:text-base font-light leading-relaxed"
            >
              {data.description}
            </motion.p>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {data.photos.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                variants={fadeUpVariants}
                onClick={() => setSelectedPhoto(item)}
                className="group relative h-[240px] xs:h-[280px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden bg-stone-200 cursor-pointer shadow-sm border border-[#064423]/10 hover:shadow-xl transition-all duration-500 text-left"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Bottom label */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                  <span className="text-[0.9rem] sm:text-[0.95rem] font-medium tracking-wide mb-0.5">{item.title}</span>
                  <span className="text-white/75 text-[0.7rem] sm:text-[0.75rem] font-light leading-relaxed">
                    {item.caption}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[#042B18]/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[850px] w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  sizes="850px"
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 bg-white">
                <h3 className="text-[#064423] text-[1rem] sm:text-[1.1rem] font-medium">{selectedPhoto.title}</h3>
                <p className="text-[#064423]/70 text-[0.8rem] sm:text-[0.85rem] font-light mt-1">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FacilityGallery;
