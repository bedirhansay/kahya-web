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
      className="group/hdr sticky top-0 z-50 -mb-[72px] h-[72px] text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[away]:-translate-y-[120%] motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
