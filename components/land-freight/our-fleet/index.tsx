'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface TruckType {
  id: string;
  title: string;
  description: string;
  features?: string[];
  imageUrl: string;
}

const TRUCK_TYPES: TruckType[] = [
  {
    id: '40-foot-box-truck',
    title: '40-Foot Box Truck',
    description:
      'Full-size enclosed box trucks built for high-volume, full truckload (FTL) shipments. The standard choice for long-haul and cross-border moves where maximum cargo capacity is the priority.',
    imageUrl: '/land-freight/vehicle/magnific__background__67106.png',
  },
  {
    id: 'flatbed',
    title: 'Flatbed Trailers',
    description:
      'Open platform trailers for oversized cargo, construction materials, machinery, and equipment that cannot fit in enclosed containers. Available with securing equipment including straps, chains, and dunnage for safe transport.',
    imageUrl: '/land-freight/vehicle/magnific__background__67105.png',
  },
  {
    id: 'standard-dry',
    title: 'Standard Dry Trucks',
    description:
      'Enclosed dry freight trucks for general cargo, packaged goods, and palletized shipments. Available in multiple sizes from 3-ton pickup trucks for local deliveries to 40-foot trailers for full truckload (FTL) shipments across the GCC and beyond.',
    imageUrl: '/land-freight/vehicle/magnific__background__67110.png',
  },
  {
    id: 'reefer',
    title: 'Refrigerated Trucks (Reefer)',
    description:
      'Temperature-controlled vehicles for pharmaceutical products, perishable goods, food and beverage, and any cargo requiring a maintained temperature range during transit. Temperature monitoring throughout the journey with documentation provided for compliance and cold chain verification.',
    features: [
      'Temperature range: -25°C to +25°C',
      'Real-time temperature monitoring',
      'Cold chain compliance documentation',
    ],
    imageUrl: '/land-freight/vehicle/magnific__background__67109.png',
  },
  {
    id: 'curtain-side',
    title: 'Curtain-side Trailers',
    description:
      'Side-loading trailers that allow quick loading and unloading from the side without specialized dock equipment. Suitable for oversized pallets, building materials, and shipments that require crane or forklift loading from the side.',
    imageUrl: '/land-freight/vehicle/magnific__background__67107.png',
  },
  {
    id: 'low-loader',
    title: 'Low Loader Trailers',
    description:
      'Heavy-duty trailers designed for transporting heavy machinery, industrial equipment, and project cargo that exceeds standard height and weight limits. Used for construction equipment, generators, and large industrial components.',
    imageUrl: '/land-freight/vehicle/magnific__background__67108.png',
  },
];

interface TruckTypeCardProps extends TruckType {
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.05 + index * 0.08 },
  }),
};

const TruckTypeCard = ({ title, description, features, imageUrl, index }: TruckTypeCardProps) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#0A4D26]/10 bg-white transition-colors duration-300 [@media(hover:hover)]:hover:border-[#36B936]/50"
    >
      {/* Compact image box */}
      <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-[#F6F8F6]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-contain p-2 sm:p-3"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 text-left sm:p-5">
        <h3 className="mb-1.5 text-sm font-medium tracking-tight text-[#0A4D26] sm:text-[0.95rem]">
          {title}
        </h3>

        <p className="text-xs font-light leading-relaxed text-[#0A4D26]/70">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="mt-auto flex flex-col gap-1.5 border-t border-[#0A4D26]/10 pt-3.5">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="mt-[1px] h-3.5 w-3.5 shrink-0 text-[#36B936]" strokeWidth={2} />
                <span className="text-xs font-medium text-[#0A4D26]/85">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

const OurFleetSection = () => {
  return (
    <section className="w-full bg-white font-sans py-[clamp(3rem,6vw,5.5rem)] px-[clamp(1rem,4vw,3.5rem)] overflow-hidden">
      <div className="mx-auto max-w-[1200px]">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mb-[clamp(2rem,4vw,3.5rem)] max-w-[720px] text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:gap-3">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936]">
              Our Fleet
            </span>
          </div>

          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.2] tracking-tight text-[#0A4D26]">
            Available Truck Types
          </h2>

          <p className="mx-auto mt-3.5 max-w-[660px] text-balance font-light leading-relaxed text-[#0A4D26]/80 text-[13px] sm:text-[13.5px] lg:text-[14px]">
            Zajel operates a fleet of owned and partner vehicles covering the full range of land freight requirements, from small consignments within the UAE to heavy cargo moving across borders to Europe.
          </p>
        </motion.div>

        {/* Fleet Grid: tighter gaps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {TRUCK_TYPES.map((truck, i) => (
            <TruckTypeCard key={truck.id} {...truck} index={i} />
          ))}
        </div>

        {/* Fleet Scale Banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mt-[clamp(2rem,4vw,3.5rem)] flex flex-col items-center justify-between gap-6 rounded-2xl sm:rounded-[1.25rem] bg-[#0A4D26] p-6 sm:p-8 lg:p-12 text-white shadow-xl lg:flex-row lg:gap-8"
        >
          <div className="max-w-[680px] text-center lg:text-left">
            <h3 className="mb-2.5 text-lg sm:text-xl font-medium tracking-tight text-white">
              Fleet Capacity &amp; Scale
            </h3>
            <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed text-white/80">
              Zajel&apos;s combined fleet of owned and partner vehicles ensures availability for scheduled, on-demand, and project-based land freight requirements across all routes.
            </p>
          </div>

          <div className="flex w-full flex-col sm:w-auto sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#36B936] px-6 py-3 text-xs sm:text-sm font-medium text-[#05361A] transition-all duration-200 hover:scale-[1.03] hover:bg-[#2fa32f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36B936]"
            >
              Get a Land Freight Quote
            </Link>

            <Link
              href="/contact?type=project-cargo"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#0A4D26] hover:scale-[1.02]"
            >
              <span>Contact Us for Project Cargo</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default OurFleetSection;