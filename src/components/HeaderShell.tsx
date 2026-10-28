"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Sticky light header; a hairline and a soft shadow appear once the page scrolls. */
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
      className="sticky top-0 z-50 border-b border-transparent bg-paper/80 text-ink backdrop-blur transition-[border-color,box-shadow] data-[scrolled]:border-line data-[scrolled]:shadow-[0_8px_24px_-18px_rgb(0_0_0/0.5)]"
    >
      {children}
    </header>
  );
}
