"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * BRAND FILM — the Zajel film on the home page.
 *
 * It plays muted and looping while it's on screen and pauses when you scroll
 * away. "Watch with sound" restarts it with sound; the round button pauses it.
 * Phones get a lighter 720p file. Nothing is downloaded until the section is
 * near the screen (preload="none"), so the home page stays fast.
 */

const FILM = {
  desktop: "/Homepage/film/zajel-film-1080.mp4",
  mobile: "/Homepage/film/zajel-film-720.mp4",
  poster: "/Homepage/film/zajel-film-poster.webp",
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BrandFilm() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Play while on screen, pause when scrolled away (unless reduced motion is on,
  // in which case it only plays when asked).
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // A thin progress line, updated every frame while the film plays.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      const bar = barRef.current;
      if (v && bar && v.duration) bar.style.transform = `scaleX(${v.currentTime / v.duration})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      // turning sound on starts the film from the top, so it's heard as made
      v.muted = false;
      v.currentTime = 0;
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      v.muted = true;
    }
    setMuted(v.muted);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-20 lg:py-24"
      style={{ fontFamily: "'Manrope', sans-serif" }}
      aria-label={t("film.videoLabel", "Zajel brand film")}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* The film */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="group relative aspect-video w-full overflow-hidden rounded-[clamp(18px,2vw,32px)] bg-[#0B3A24] shadow-[0_30px_70px_-30px_rgba(6,68,35,0.55)]"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            poster={FILM.poster}
            muted
            loop
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={togglePlay}
            aria-label={t("film.videoLabel", "Zajel brand film")}
          >
            <source src={FILM.mobile} type="video/mp4" media="(max-width: 767px)" />
            <source src={FILM.desktop} type="video/mp4" />
          </video>

          {/* soft shade at the foot so the controls read on any frame */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />

          {/* Big play button while paused */}
          {!playing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={t("film.play", "Play film")}
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0A4D26] shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-1">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            </button>
          )}

          {/* Controls */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3 sm:p-5">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[12px] font-medium text-[#0A4D26] shadow-sm backdrop-blur transition-colors hover:bg-white sm:px-5 sm:py-2.5 sm:text-[13px]"
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M19 5a10 10 0 0 1 0 14" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <path d="m23 9-6 6M17 9l6 6" />
                </svg>
              )}
              {muted ? t("film.soundOn", "Watch with sound") : t("film.soundOff", "Mute")}
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? t("film.pause", "Pause film") : t("film.play", "Play film")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#0A4D26] shadow-sm backdrop-blur transition-colors hover:bg-white sm:h-11 sm:w-11"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="4.5" width="4" height="15" rx="1" />
                  <rect x="14" y="4.5" width="4" height="15" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5">
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
              )}
            </button>
          </div>

          {/* Progress */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-[#36B936]" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
