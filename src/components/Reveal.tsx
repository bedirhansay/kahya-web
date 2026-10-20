"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide scroll reveal: anything marked `data-reveal` fades up once it
 * enters the viewport (CSS in globals.css). Re-scans on every navigation.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.shown = "";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
