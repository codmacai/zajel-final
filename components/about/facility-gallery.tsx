'use client';

import { useEffect, useState, type FC } from 'react';
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
      image: '/about/gallery/magnific_create-an-ultrarealistic-_gOnfXiwSXO.webp', // 👈 Replace with real Zajel asset
    },
    {
      id: 2,
      title: 'Warehouse Operations',
      caption: 'Warehouse facility, Dubai',
      image: '/about/gallery/magnific_ultrarealistic-cinematic-_Xmk3H4sBfo.webp', // 👈 Replace with real Zajel asset
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

  // Close the lightbox with Escape
  useEffect(() => {
    if (!selectedPhoto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPhoto]);

  return (
    <section
      className="w-full select-none overflow-hidden bg-[#FAFBF8] px-4 py-14 font-['Manrope',sans-serif] sm:px-6 sm:py-20 lg:px-12 lg:py-28"
      aria-labelledby="facilities-heading"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          className="flex flex-col"
        >
          {/* Header */}
          <div className="mx-auto mb-10 flex max-w-[800px] flex-col items-center text-center sm:mb-12 lg:mb-16">
            <motion.span
              variants={fadeUpVariants}
              className="mb-3 block text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936] sm:mb-4"
            >
              {data.eyebrow}
            </motion.span>

            <motion.h2
              id="facilities-heading"
              variants={fadeUpVariants}
              className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-[#064423]"
            >
              {data.heading}
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="max-w-[62ch] text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed text-[#064423]/70"
            >
              {data.description}
            </motion.p>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {data.photos.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                variants={fadeUpVariants}
                onClick={() => setSelectedPhoto(item)}
                aria-label={`View ${item.title}`}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-[#064423]/10 bg-stone-200 text-left shadow-sm transition-all duration-500 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36B936] lg:aspect-[4/5]"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay for label legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Bottom label */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 text-white sm:p-5">
                  <span className="mb-1 text-base font-medium leading-snug tracking-tight">{item.title}</span>
                  <span className="text-[0.8125rem] font-light leading-snug text-white/80">{item.caption}</span>
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
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#042B18]/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[850px] overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/70"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  sizes="(min-width: 850px) 850px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="bg-white p-5 sm:p-6">
                <h3 className="text-lg font-medium tracking-tight text-[#064423] sm:text-xl">{selectedPhoto.title}</h3>
                <p className="mt-1 text-sm font-light leading-relaxed text-[#064423]/70 sm:text-[0.9375rem]">
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