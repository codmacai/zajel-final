'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../project-logistics/data';

const EASE = [0.22, 1, 0.36, 1] as const;

const FeaturedProjects: FC = () => {
  // Take the first 3 projects to display 3 in a row on desktop
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#F9FAFB] font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Center-Aligned Section Header with Responsive Font Sizes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center max-w-[640px] mx-auto mb-12 sm:mb-16"
        >
          <span className="text-[#36B936] text-xs sm:text-sm font-medium tracking-widest uppercase block mb-2 sm:mb-3">
            Selected Work
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0A4D26] leading-[1.15] tracking-tight mb-3">
            Projects we&apos;ve moved
          </h2>
          <p className="text-[#0A4D26]/70 text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed">
            A running record of the loads we&apos;ve planned and carried through, across air, sea, and land.
          </p>
        </motion.div>

        {/* 3-Column Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {featured.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
              className="h-full"
            >
              <Link
                href="/projects"
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] transition-all duration-500 hover:border-[#36B936] hover:shadow-[0_16px_36px_rgba(6,68,35,0.08)] hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EEF2EF]">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A4D26]/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Location/Place Pill */}
                  <span className="absolute left-4 bottom-4 font-medium text-[10px] sm:text-[11px] tracking-wider uppercase px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-md text-[#0A4D26] rounded-full shadow-sm">
                    {project.place}
                  </span>
                </div>

                {/* Content Container */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-[#0A4D26] leading-snug tracking-tight mb-2 group-hover:text-[#36B936] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[#0A4D26]/70 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                      {project.caption}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-[#9CA3AF]">
                      Case Study
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A4D26] group-hover:text-[#36B936] transition-colors">
                      View details
                      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Center Minimal Lined CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="flex justify-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#0A4D26] relative pb-1"
          >
            <span>Explore all projects</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-50" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedProjects;