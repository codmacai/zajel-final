"use client";

import { useState } from "react";
import Image from "next/image";
import { STEP_IMAGE_CONFIG, type ImageKey } from "@/data/howItWorks";

// Gap between the contained image and the bottom of the circle, as a fraction
// of the circle's diameter. 0 = flush with the bottom.
const BOTTOM_INSET = 0;

/**
 * The frame is exactly as wide as the green circle (var(--circle), set by the
 * parent) and sits flush with its bottom edge. `rounded-b-full` on a frame this
 * shape gives a semicircle at the bottom with the same radius as the circle,
 * so the image follows the circle along the sides and bottom, and simply
 * continues straight up above it (the "pop-out" at the top).
 *
 * `contained` is for flat UI screenshots (e.g. the booking screen): instead of
 * filling and cropping the frame, the whole image is shown, kept inside the
 * circle so none of it is clipped.
 */
export default function StepImage({
  src,
  alt,
  imageKey,
  contained = false,
}: {
  src: string;
  alt: string;
  imageKey: ImageKey;
  contained?: boolean;
}) {
  const cfg = STEP_IMAGE_CONFIG[imageKey];
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-b-full"
      style={{
        width: "var(--circle)",
        height: `calc(var(--circle) + ${cfg.popHeight})`,
      }}
    >
      {failed ? (
        <div className="absolute inset-0 flex items-end justify-center text-center text-[10px] font-medium text-white/70 bg-black/10 pb-3 px-2">
          Add image URL for &quot;{alt}&quot;
        </div>
      ) : contained ? (
        // Sits flush with the bottom of the circle (no gap); the circle's curve
        // trims the bottom corners, the same way the other steps' images are.
        // Raise BOTTOM_INSET (e.g. 0.05) if you want a little space underneath.
        <div
          className="absolute"
          style={{
            left: "15%",
            right: "15%",
            top: 0,
            bottom: `calc(var(--circle) * ${BOTTOM_INSET})`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="160px"
            onError={() => setFailed(true)}
            style={{ objectFit: "contain", objectPosition: "center bottom" }}
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="160px"
          onError={() => setFailed(true)}
          style={{
            objectFit: "cover",
            objectPosition: "center bottom",
            transformOrigin: "center bottom",
            transform: `scale(${cfg.scale}) translate(${cfg.offsetX}%, ${cfg.offsetY}%)`,
          }}
        />
      )}
    </div>
  );
}