import type { BusinessCard } from './types';

interface BusinessGetsCardProps extends BusinessCard {
  /** Passed by the section; not needed for styling anymore */
  index?: number;
}

const BusinessGetsCard = ({ Icon, title, description }: BusinessGetsCardProps) => (
  <div
    className="
      group relative flex h-full min-h-[190px] cursor-pointer flex-col
      bg-[#F9FAFB] p-4 transition-colors duration-300
      hover:bg-[#36B936] active:bg-[#36B936]
      min-[400px]:min-h-[210px] min-[400px]:p-5
      sm:min-h-[250px] sm:p-7
      lg:min-h-[300px] lg:p-8
      odd:last:col-span-2 lg:odd:last:col-span-1
    "
  >
    <div className="flex h-full flex-col justify-between gap-4">
      <div>
        {/* Icon: brand green by default, white on hover. Uses currentColor from icons.tsx. */}
        <div
          className="
            mb-3 text-[#36B936] transition-colors duration-300
            group-hover:text-white group-active:text-white sm:mb-4
            [&_svg]:h-6 [&_svg]:w-6 sm:[&_svg]:h-8 sm:[&_svg]:w-8 lg:[&_svg]:h-9 lg:[&_svg]:w-9
          "
        >
          <Icon />
        </div>

        <h3 className="text-[0.95rem] font-medium leading-snug tracking-tight text-[#0A4D26] transition-colors duration-300 group-hover:text-white group-active:text-white min-[400px]:text-base sm:text-lg lg:text-[1.25rem]">
          {title}
        </h3>
      </div>

      <p className="text-[0.7rem] font-light leading-relaxed text-[#2D6A4F] transition-colors duration-300 group-hover:text-white/90 group-active:text-white/90 min-[400px]:text-xs sm:text-sm">
        {description}
      </p>
    </div>
  </div>
);

export default BusinessGetsCard;