"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Blocks that rise into place as they enter; within one parent they step in 60ms apart. */
const REVEAL = [
  "main section:not(.hero-tint) :is(h2, h3.title, .eyebrow, .lead)",
  "main section:not(.hero-tint) :is(ul, ol).grid > li",
  "main section:not(.hero-tint) .grid > :is(a, article, figure)",
  "main section:not(.hero-tint) :is(details, blockquote, table)",
  "main section:not(.hero-tint) ul[data-points] > li",
  "main .band-dark .wrap > *",
].join(", ");
/** App pictures: they tip back into place with the scroll, a little depth while they pass. */
const PICTURES = "main section:not(.hero-tint) :is(.frame, .stage, [role='img'].ui)";
/** Cards: lift a hair, a soft light follows the cursor inside. */
const CARDS = "main :is(a.group, li > a[class*='rounded'], article[class*='rounded'])";

/**
 * The site's motion (the home's office window has its own): reveals, picture depth, card light, and lists whose
 * points take turns being lit while in view. Runs after the first paint on every route; without JS or with reduced
 * motion the page is complete and still.
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
  const outside = (el: Element) => !el.closest("#od");

  // Reveals: anything already on screen counts as seen, so nothing blinks when the hooks switch on.
  const els = [...main.querySelectorAll<HTMLElement>(REVEAL)].filter(outside);
  const io = new IntersectionObserver(
    (list) =>
      list.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        io.unobserve(el);
        el.setAttribute("data-sm", "in");
        // Risen: drop the hook so the element's own transitions (hover) are its own again.
        setTimeout(() => el.setAttribute("data-sm", "done"), 900 + Number(el.style.getPropertyValue("--sm-i")) * 60);
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
          setTimeout(() => el.setAttribute("data-sm", "done"), 900)
        ),
      );
  };
  addEventListener("scroll", atEnd, { passive: true });
  off.push(() => removeEventListener("scroll", atEnd));
  els.forEach((el) => {
    const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => els.includes(c as HTMLElement)) : [];
    el.style.setProperty("--sm-i", String(Math.min(8, Math.max(0, sibs.indexOf(el)))));
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.setAttribute("data-sm", "done");
    else {
      el.setAttribute("data-sm", "");
      io.observe(el);
    }
  });
  root.classList.add("sm");
  off.push(() => io.disconnect());

  // Pictures: progress through the viewport drives a small tilt and lift (one rAF for all visible ones).
  const pics = [...main.querySelectorAll<HTMLElement>(PICTURES)]
    .filter(outside)
    .filter((p) => !p.parentElement?.closest(PICTURES));
  const visible = new Set<HTMLElement>();
  const pio = new IntersectionObserver((list) =>
    list.forEach((en) =>
      en.isIntersecting ? visible.add(en.target as HTMLElement) : visible.delete(en.target as HTMLElement),
    ),
  );
  pics.forEach((p) => {
    p.setAttribute("data-depth", "");
    pio.observe(p);
  });
  let draf = 0;
  const depth = () => {
    cancelAnimationFrame(draf);
    draf = requestAnimationFrame(() => {
      visible.forEach((p) => {
        const r = p.getBoundingClientRect();
        // 0 as the picture's top meets the bottom edge, 1 once it sits in the upper half.
        const v = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * 0.55)));
        p.style.setProperty("--sm-v", v.toFixed(3));
      });
    });
  };
  addEventListener("scroll", depth, { passive: true });
  depth();
  off.push(() => (pio.disconnect(), removeEventListener("scroll", depth)));

  // Cards: the light follows the cursor (fine pointers only).
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    main.querySelectorAll<HTMLElement>(CARDS).forEach((c) => outside(c) && c.setAttribute("data-card", ""));
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

  // Headings fill with light: 0 as the heading enters at the bottom, 1 by the time it reaches the upper third.
  const heads = [...main.querySelectorAll<HTMLElement>("section:not(.hero-tint) h2")].filter(outside);
  heads.forEach((h) => h.setAttribute("data-fill", ""));
  let hraf = 0;
  const fill = () => {
    cancelAnimationFrame(hraf);
    hraf = requestAnimationFrame(() =>
      heads.forEach((h) => {
        const r = h.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const v = Math.max(0, Math.min(1, (innerHeight * 0.92 - r.top) / (innerHeight * 0.5)));
        h.style.setProperty("--fp", v.toFixed(3));
      }),
    );
  };
  addEventListener("scroll", fill, { passive: true });
  fill();
  off.push(() => (removeEventListener("scroll", fill), heads.forEach((h) => h.removeAttribute("data-fill"))));

  // Point lists take turns: one point is lit at a time, a thin bar shows when the next one comes.
  const lists = [...main.querySelectorAll<HTMLElement>("ul[data-points]")]
    .filter(outside)
    .filter((l) => l.children.length >= 3);
  const timers = new Map<HTMLElement, ReturnType<typeof setInterval>>();
  const lio = new IntersectionObserver(
    (list) =>
      list.forEach((en) => {
        const ul = en.target as HTMLElement;
        if (en.isIntersecting && !timers.has(ul)) {
          let k = -1;
          const step = () => {
            k = (k + 1) % ul.children.length;
            [...ul.children].forEach((li, i) => li.toggleAttribute("data-lit", i === k));
          };
          step();
          timers.set(
            ul,
            setInterval(() => !document.hidden && step(), 2600),
          );
        } else if (!en.isIntersecting && timers.has(ul)) {
          clearInterval(timers.get(ul));
          timers.delete(ul);
        }
      }),
    { threshold: 0.4 },
  );
  lists.forEach((l) => {
    l.setAttribute("data-turns", "");
    lio.observe(l);
  });
  off.push(() => (lio.disconnect(), timers.forEach((t) => clearInterval(t))));

  return () => off.forEach((f) => f());
}
