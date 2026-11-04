"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Sticky header: glass and a hairline once the page scrolls; it steps aside while reading down the page and comes
 * back on the way up (or when focus enters it).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [away, setAway] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const sync = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 480 || y < last - 4) setAway(false);
      else if (y > last + 4) setAway(true);
      last = y;
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      data-away={away || undefined}
      onFocusCapture={() => setAway(false)}
      className="sticky top-0 z-50 border-b border-transparent bg-paper/80 text-ink backdrop-blur-xl transition-[border-color,box-shadow,transform,background-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] data-[away]:-translate-y-full data-[scrolled]:border-line data-[scrolled]:bg-paper/70 data-[scrolled]:shadow-[0_8px_24px_-18px_rgb(0_0_0/0.5)] motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
