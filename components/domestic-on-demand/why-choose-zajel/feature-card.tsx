'use client';

import type { FC, ReactNode } from 'react';

interface FeatureCardTileProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCardTile: FC<FeatureCardTileProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="group relative flex flex-col justify-between p-7 sm:p-8 min-h-[260px] sm:min-h-[300px] bg-[#F9FAFB] hover:bg-[#36B936] transition-colors duration-300 cursor-pointer">
    <div className="flex flex-col h-full justify-between z-10">
      <div>
        {/* Only Icon defaults to #36B936 green */}
        <div className="mb-4 text-[#36B936] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>

        {/* Title defaults to dark green/black */}
        <h3 className="text-lg sm:text-[1.25rem] font-medium leading-snug tracking-tight mb-3 text-[#0A4D26] group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Description defaults to muted dark green */}
      <p className="text-xs sm:text-sm font-light leading-relaxed text-[#2D6A4F] group-hover:text-white/90 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>
);