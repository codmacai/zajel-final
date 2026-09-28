"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface FaqTheme {
  accent: string;
  headingColor: string;
  questionColor: string;
  answerColor: string;
  background: string;
  borderColor: string;
}

export interface FaqSectionProps {
  eyebrow?: string;
  heading?: string;
  items?: FaqQuestion[];
  theme?: Partial<FaqTheme>;
  defaultOpenIndex?: number | null;
  allowMultipleOpen?: boolean;
  className?: string;
}

const DEFAULT_THEME: FaqTheme = {
  accent: '#36B936',
  headingColor: '#1b4332',
  questionColor: '#064423',
  answerColor: '#064423',
  background: '#FFFFFF',
  borderColor: '#f3f4f6',
};

const DEFAULT_ITEMS: FaqQuestion[] = [
  {
    question: 'Frequently asked question one?',
    answer: 'Answer goes here.',
  },
];

const SMOOTH_TRANSITION = { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] as [number, number, number, number] };

function DownChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

interface FaqRowProps {
  q: FaqQuestion;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
  theme: FaqTheme;
}

function FaqRow({ q, isOpen, isLast, onToggle, theme }: FaqRowProps) {
  return (
    <div
      className="flex flex-col"
      style={{ borderBottom: !isLast ? `1px solid ${theme.borderColor}` : "none" }}
    >
      <button 
        onClick={onToggle} 
        className="w-full flex items-center justify-between px-4 sm:px-7 lg:px-9 py-4 sm:py-5 text-left group"
      >
        <span
          className="text-[14px] sm:text-[15px] lg:text-[16.5px] font-medium tracking-tight transition-all duration-300 sm:group-hover:translate-x-1"
          style={{
            color: isOpen ? theme.accent : theme.questionColor,
            opacity: isOpen ? 1 : 0.9,
          }}
        >
          {q.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? -180 : 0 }}
          transition={SMOOTH_TRANSITION}
          className="ml-3 sm:ml-4 shrink-0 transition-colors"
          style={{ color: isOpen ? theme.accent : `${theme.questionColor}66` }}
        >
          <DownChevron />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SMOOTH_TRANSITION}
            className="overflow-hidden"
          >
            <div
              className="px-4 sm:px-7 lg:px-9 pb-5 sm:pb-6 pt-1 text-[13px] sm:text-[14px] lg:text-[14.5px] leading-relaxed pr-8 sm:pr-14 whitespace-pre-line font-normal"
              style={{ color: `${theme.answerColor}99` }}
            >
              {q.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection({
  eyebrow = "FAQ",
  heading = "Frequently Asked Questions",
  items = DEFAULT_ITEMS,
  theme,
  defaultOpenIndex = 0,
  allowMultipleOpen = false,
  className = "",
}: FaqSectionProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLDivElement>();
  const mergedTheme: FaqTheme = { ...DEFAULT_THEME, ...theme };

  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    new Set(defaultOpenIndex !== null && defaultOpenIndex !== undefined ? [defaultOpenIndex] : [])
  );

  const toggle = (i: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(allowMultipleOpen ? prev : []);
      if (prev.has(i)) {
        if (allowMultipleOpen) next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full flex flex-col justify-center overflow-hidden font-['Manrope',sans-serif] ${className}`}
      style={{
        backgroundColor: mergedTheme.background,
        paddingTop: "clamp(48px, 8vh, 128px)",
        paddingBottom: "clamp(48px, 8vh, 128px)",
      }}
    >
      <div className="w-full mx-auto px-4 sm:px-6" style={{ maxWidth: "clamp(320px, 90vw, 1040px)" }}>
        <div
          className="text-center"
          style={{
            marginBottom: "clamp(32px, 5vh, 64px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {eyebrow && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[2px]" style={{ backgroundColor: mergedTheme.accent }} />
              <span style={{ color: mergedTheme.accent }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
                {eyebrow}
              </span>
            </div>
          )}

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.15] max-w-[720px] mx-auto px-2"
            style={{ color: mergedTheme.headingColor }}
          >
            {heading}
          </h2>
        </div>

        <div
          className="w-full flex flex-col shadow-sm rounded-[16px] overflow-hidden"
          style={{
            backgroundColor: mergedTheme.background,
            border: `1px solid ${mergedTheme.borderColor}`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "150ms",
          }}
        >
          {items.map((q, i) => (
            <FaqRow
              key={q.question}
              q={q}
              isOpen={openIndexes.has(i)}
              isLast={i === items.length - 1}
              onToggle={() => toggle(i)}
              theme={mergedTheme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}