"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Blocks that fade in as they enter (opacity only, 300ms). */
const REVEAL = [
  "main section:not(.hero-tint) :is(h2, h3.title, .eyebrow, .lead)",
  "main section:not(.hero-tint) :is(ul, ol).grid > li",
  "main section:not(.hero-tint) .grid > :is(a, article, figure)",
  "main section:not(.hero-tint) :is(details, blockquote, table)",
  "main section:not(.hero-tint) ul[data-points] > li",
  "main .band-dark .wrap > *",
].join(", ");
/** Cards: lift a hair, a soft light follows the cursor inside. */
const CARDS = "main :is(a.group, li > a[class*='rounded'], article[class*='rounded'])";

/**
 * The site's motion, kept quiet: blocks fade in as they enter and cards carry a cursor light. Nothing loops and
 * nothing follows the scroll. Runs after the first paint on every route; without JS or with reduced motion the page
 * is complete and still.
 */
export function SiteMotion() {
  const path = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const off: (() => void)[] = [];
    // Only once React has hydrated the page (its segment can hydrate after this layout component), so the hooks
    // never touch markup React is still matching.
    const hydrated = () => {
      const last = document.querySelector("main")?.lastElementChild;
      return !last || Object.keys(last).some((k) => k.startsWith("__reactFiber$"));
    };
    let raf = 0;
    const wait = (n: number) =>
      (raf = requestAnimationFrame(() => (hydrated() || n > 180 ? off.push(start()) : wait(n + 1))));
    wait(0);
    return () => (cancelAnimationFrame(raf), off.forEach((f) => f()));
  }, [path]);

  return null;
}

function start(): () => void {
  const root = document.documentElement;
  const main = document.querySelector("main");
  const off: (() => void)[] = [];
  if (!main) return () => {};

  // Reveals: anything already on screen counts as seen, so nothing blinks when the hooks switch on.
  const els = [...main.querySelectorAll<HTMLElement>(REVEAL)];
  const io = new IntersectionObserver(
    (list) =>
      list.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        io.unobserve(el);
        el.setAttribute("data-sm", "in");
        // Shown: drop the hook so the element's own transitions (hover) are its own again.
        setTimeout(() => el.setAttribute("data-sm", "done"), 400);
      }),
    { threshold: 0, rootMargin: "0px 0px -40px 0px" },
  );
  // At the foot of the page everything left is shown (a block the page cannot scroll far enough to meet).
  const atEnd = () => {
    if (innerHeight + scrollY < document.documentElement.scrollHeight - 8) return;
    main
      .querySelectorAll<HTMLElement>('[data-sm=""]')
      .forEach(
        (el) => (
          io.unobserve(el),
          el.setAttribute("data-sm", "in"),
          setTimeout(() => el.setAttribute("data-sm", "done"), 400)
        ),
      );
  };
  addEventListener("scroll", atEnd, { passive: true });
  off.push(() => removeEventListener("scroll", atEnd));
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.setAttribute("data-sm", "done");
    else {
      el.setAttribute("data-sm", "");
      io.observe(el);
    }
  });
  root.classList.add("sm");
  off.push(() => io.disconnect());

  // Cards: the light follows the cursor (fine pointers only).
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    main.querySelectorAll<HTMLElement>(CARDS).forEach((c) => c.setAttribute("data-card", ""));
    const light = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    main.addEventListener("pointermove", light);
    off.push(() => main.removeEventListener("pointermove", light));
  }

  return () => off.forEach((f) => f());
}
