"use client";

import { useEffect, useState, type ReactNode } from "react";

/** The header tightens and gains its edge once the page scrolls. */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 8);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-50 border-b border-transparent bg-pine-950 text-white transition-[background-color,border-color,box-shadow] duration-300 data-scrolled:border-white/8 data-scrolled:bg-pine-950/92 data-scrolled:shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] data-scrolled:backdrop-blur-xl"
    >
      {children}
      <span aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brass" />
    </header>
  );
}
