"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Sticky dark header; `data-scrolled` is kept for styling hooks. */
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
      className="sticky top-0 z-50 border-b border-white/8 bg-pine-950 text-white"
    >
      {children}
    </header>
  );
}
