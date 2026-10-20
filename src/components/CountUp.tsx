"use client";

import { useEffect, useRef, useState } from "react";

/** A number that counts up from zero the first time it scrolls into view. */
export function CountUp({ to, ms = 1400 }: { to: number; ms?: number }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / ms);
          setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, ms]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}
