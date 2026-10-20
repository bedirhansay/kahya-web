"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

// Phones keep the still: the loop is decoration and costs ~3 MB.
const query = "(prefers-reduced-motion: reduce), (max-width: 767px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function canMove() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !window.matchMedia(query).matches && !saveData;
}

/**
 * The campaign's silent 8-second loop. Visitors who ask for reduced motion
 * (or save data) and phones get the still frame instead; so does the server render.
 */
export function HeroLoop() {
  const motion = useSyncExternalStore(subscribe, canMove, () => false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-pine-950">
      <Image
        src="/media/hero/kahya-hero.webp"
        alt="Kahya ekranları: e-posta, görev detayı, cari kartı ve Kahya AI"
        fill
        priority
        fetchPriority="high"
        sizes="(min-width: 1216px) 1152px, 100vw"
        className="object-cover"
      />
      {motion && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/media/hero/kahya-hero.webp"
          className="absolute inset-0 size-full object-cover"
          aria-hidden
        >
          <source src="/media/hero/kahya-hero.webm" type="video/webm" />
          <source src="/media/hero/kahya-hero-960.mp4" type="video/mp4" media="(max-width: 960px)" />
          <source src="/media/hero/kahya-hero.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
