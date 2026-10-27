"use client";

import { useEffect, useState, type ReactNode } from "react";

/** The header gains its bottom line once the page scrolls. */
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
      className="sticky top-0 z-50 border-b border-transparent bg-paper text-ink transition-colors duration-200 data-scrolled:border-line"
    >
      {children}
    </header>
  );
}
