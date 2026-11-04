"use client";

import { useInView } from "@/hooks/useInView";
import InventoryTileCard from "@/components/warehouse/inventory-tile-card";
import { WAREHOUSE_INVENTORY, type WAREHOUSE_INVENTORYContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fade = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

const DARK = "#1b4332";

function InventoryManagement({ content }: { content: WAREHOUSE_INVENTORYContent }) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  const [topLeft, topRight, hub, bottomLeft, bottomRight] = content.tiles;

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-10 bg-white font-['Manrope',sans-serif]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 sm:gap-10 lg:gap-14">
          {/* Left — centered heading, description, and closing line */}
          <div className="lg:w-[38%] flex flex-col justify-center text-center">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <h2 className="text-[#36b936] font-medium text-xs sm:text-sm tracking-wider uppercase">
                {content.eyebrow}
              </h2>
            </div>

            <h3
              className={cx(
                "mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight",
                ANIMATE_BASE,
                fade(isVisible)
              )}
              style={{ color: DARK, lineHeight: 1.15 }}
            >
              {content.heading}
            </h3>
            <p
              className={cx(
                "text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed text-[#2d6a4f] font-normal",
                ANIMATE_BASE,
                fade(isVisible)
              )}
              style={{ transitionDelay: "80ms" }}
            >
              {content.intro}
            </p>
            <p
              className={cx(
                "mt-4 sm:mt-5 text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed text-[#1b4332] font-medium",
                ANIMATE_BASE,
                fade(isVisible)
              )}
              style={{ transitionDelay: "160ms" }}
            >
              {content.closing}
            </p>
          </div>

          {/* Right — detached cards: top pair, centered hub, bottom pair */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[500px]">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-3.5">
                <InventoryTileCard tile={topLeft} index={0} isVisible={isVisible} delay={160} />
                <InventoryTileCard tile={topRight} index={1} isVisible={isVisible} delay={260} />
              </div>

              <div className="my-3 sm:my-4 lg:my-4.5 flex justify-center">
                <div className="w-[calc(50%-0.3125rem)] sm:w-[calc(50%-0.375rem)] lg:w-[calc(50%-0.4375rem)]">
                  <InventoryTileCard tile={hub} index={2} isVisible={isVisible} delay={360} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-3.5">
                <InventoryTileCard tile={bottomLeft} index={3} isVisible={isVisible} delay={460} />
                <InventoryTileCard tile={bottomRight} index={4} isVisible={isVisible} delay={560} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default cmsSection('warehouse.inventory', WAREHOUSE_INVENTORY, InventoryManagement);
