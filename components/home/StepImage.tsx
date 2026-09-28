"use client";

import { useState } from "react";
import Image from "next/image";
import { STEP_IMAGE_CONFIG, type ImageKey } from "@/data/howItWorks";

export default function StepImage({
  src,
  alt,
  imageKey,
}: {
  src: string;
  alt: string;
  imageKey: ImageKey;
}) {
  const cfg = STEP_IMAGE_CONFIG[imageKey];
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-b-full" style={{ width: cfg.width, height: cfg.height }}>
      {failed ? (
        <div className="absolute inset-0 flex items-end justify-center text-center text-[10px] font-medium text-white/70 bg-black/10 pb-3 px-2">
          Add image URL for &quot;{alt}&quot;
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          onError={() => setFailed(true)}
          style={{
            objectFit: cfg.fit,
            transform: `scale(${cfg.scale}) translate(${cfg.offsetX}%, ${cfg.offsetY}%)`,
          }}
        />
      )}
    </div>
  );
}