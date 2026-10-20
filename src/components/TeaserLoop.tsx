"use client";

import { useEffect, useRef } from "react";

/** A silent teaser that plays only while on screen. */
export function TeaserLoop({ slug, label }: { slug: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={`/media/teaser/${slug}.webp`}
      src={`/media/teaser/${slug}.mp4`}
      aria-label={label}
      className="aspect-video w-full rounded-[var(--radius-frame)] bg-pine-950 object-cover"
    />
  );
}
