'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { EventImage } from './data';

/** Photo grid; clicking a photo opens it full screen (arrow keys / Esc work too). */
export default function EventGallery({ images }: { images: EventImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const count = images.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      // Arrows follow the reading direction, so they also feel right in Arabic (RTL).
      const rtl = document.documentElement.dir === 'rtl';
      if (e.key === 'ArrowRight') step(rtl ? -1 : 1);
      if (e.key === 'ArrowLeft') step(rtl ? 1 : -1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : images[open];

  // Three across only when the photos fill complete rows; otherwise two across, with the
  // first photo full-width when the count is odd, so no photo sits alone on a row.
  const threeUp = count % 3 === 0;
  const firstSpan = count % 2 === 1 ? (threeUp ? 'col-span-2 lg:col-span-1' : 'col-span-2') : '';

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 ${threeUp ? 'lg:grid-cols-3' : ''}`}>
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 ? firstSpan : ''}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${img.alt}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#1b4332]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4332]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 360px, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B140F]/90 p-4 backdrop-blur-sm sm:p-10"
        >
          <div className="relative h-full max-h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
          </div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-[13px] text-white/70">
            {current.alt} · {open + 1} / {count}
          </p>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="h-5 w-5 rtl:rotate-180" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
