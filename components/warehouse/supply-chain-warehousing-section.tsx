import Image from "next/image";
import { SUPPLY_CHAIN_WAREHOUSING_CONTENT as content } from "@/data/supply-chain-warehousing";

export default function SupplyChainWarehousingSection() {
  const { eyebrow, heading, paragraphs, highlightLine, image } = content;

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20 font-['Manrope',sans-serif]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
        
        {/* 1. Header (Eyebrow + Main Title) */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <h2 className="text-[#36b936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              {eyebrow}
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1b4332] tracking-tight leading-tight">
            {heading}
          </h3>
        </div>

        {/* 2. Image — Appears directly below the main title on mobile, and spans the right column on desktop */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] lg:row-span-2 bg-[#f8faf9] rounded-xl sm:rounded-2xl shadow-sm border border-[#e2ece9] overflow-hidden relative my-2 lg:my-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* 3. Paragraphs & Highlight Line — Appears below the image on mobile */}
        <div className="flex flex-col justify-center space-y-3 sm:space-y-4 text-[#2d6a4f] font-normal text-sm sm:text-base md:text-lg leading-relaxed">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <p className="font-medium text-[#1b4332] pt-1 sm:pt-2">{highlightLine}</p>
        </div>

      </div>
    </section>
  );
}