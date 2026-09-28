'use client';

import { cx } from './utils';
import type { CodRow } from './types';

interface RowProps extends CodRow {
  isOpen: boolean;
  onToggle: () => void;
}

const Row = ({ number, title, description, isOpen, onToggle }: RowProps) => {
  return (
    <div
      onClick={onToggle}
      className={cx(
        'group border-b border-[#0A4D26]/10 py-8 cursor-pointer transition-colors duration-300 px-6 -mx-6 rounded-2xl',
        isOpen ? 'bg-[#FAFBF8]/50' : 'hover:bg-[#FAFBF8]/30'
      )}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 min-w-0">
          <span className="font-mono text-xs sm:text-sm font-medium text-[#36B936] tracking-wider shrink-0 w-6">
            {number}
          </span>
          <h3
            className={cx(
              'text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-300',
              isOpen ? 'text-[#0A4D26]' : 'text-[#0A4D26]/80 group-hover:text-[#0A4D26]'
            )}
          >
            {title}
          </h3>
        </div>

        {/* Consistent Plus/Minus Indicator */}
        <div className="shrink-0 w-8 h-8 rounded-full border border-[#0A4D26]/15 flex items-center justify-center text-[#0A4D26] group-hover:border-[#0A4D26]/30 transition-colors duration-300">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={cx('transition-transform duration-500', isOpen && 'rotate-45 text-[#36B936]')}
          >
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Consistent Expandable Description */}
      <div
        className={cx(
          'grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden',
          isOpen ? 'grid-rows-[1fr] opacity-100 pt-6 pl-12' : 'grid-rows-[0fr] opacity-0 pt-0 pl-12'
        )}
      >
        <div className="overflow-hidden">
          <p className="text-[#2D6A4F] font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Row;