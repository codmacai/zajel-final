'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from './data';
import ProjectCard from './project-card';

const EASE = [0.22, 1, 0.36, 1] as const;

const ProjectLogisticsGrid: FC = () => {
  return (
    <section id="projects" className="w-full py-16 sm:py-20 lg:py-24 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 sm:mb-12 lg:mb-14 max-w-[52ch]"
        >
          <p className="text-[#36B936] text-xs sm:text-sm font-medium tracking-wider uppercase mb-3">Selected work</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0A4D26] leading-[1.15] tracking-tight mb-3">
            Projects we&apos;ve moved
          </h2>
          <p className="text-[#0A4D26]/60 text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed">
            A running record of the loads we&apos;ve planned and carried through, across air, sea, and land.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 sm:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectLogisticsGrid;