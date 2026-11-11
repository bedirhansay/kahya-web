"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Cards: a soft light follows the cursor inside. The same selector lives in globals.css (".card-light"); the DOM
 * is never marked from here, because an attribute written during streaming hydration is reported as a mismatch.
 */
const CARDS = "main :is(a.group, li > a[class*='rounded'], article[class*='rounded'])";

/**
 * The site's only motion besides the home slides: cards carry a light that follows the cursor. It answers the
 * pointer; nothing fades in on scroll, nothing loops. Fine pointers only; with reduced motion nothing runs.
 */
export function SiteMotion() {
  const path = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;
    const light = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest<HTMLElement>(CARDS);
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    main.addEventListener("pointermove", light);
    return () => main.removeEventListener("pointermove", light);
  }, [path]);

  return null;
}
