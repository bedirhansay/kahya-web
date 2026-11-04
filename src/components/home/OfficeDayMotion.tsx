"use client";

import { useEffect } from "react";

const ease = (p: number) => 1 - Math.pow(1 - p, 3);

/**
 * The home's live parts, started after the first paint: the window sits in depth (leans toward the pointer, tips back as the page scrolls), blocks rise in as they enter, and on a
 * wide screen scrolling walks one job through the office. Nothing here is needed to read the page.
 */
export function OfficeDayMotion() {
  useEffect(() => {
    const root = document.getElementById("od");
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = matchMedia("(min-width: 1081px)");
    const off: (() => void)[] = [];
    const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;

    const today = $("od-today");
    if (today) today.textContent = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" }).replace(/ (\S+)$/, ", $1");

    // Count a figure up in place.
    const count = (el: HTMLElement, from: number, to: number, ms: number, fmt: (n: number) => string) => {
      if (reduce) return void (el.textContent = fmt(to));
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / ms);
        el.textContent = fmt(from + (to - from) * ease(p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // Reveals: whatever is already on screen counts as seen, so nothing blinks when the hooks switch on.
    const revealables = [...root.querySelectorAll<HTMLElement>("[data-r], [data-sh], #od-week, #od-facts")];
    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    };
    const countFacts = () => root.querySelectorAll<HTMLElement>("[data-count]").forEach((b) => count(b, 0, Number(b.dataset.count), 900, (n) => String(Math.round(n))));
    if (!reduce) {
      revealables.forEach((el) => inView(el) && el.classList.add("in"));
      root.classList.add("od-m");
      const io = new IntersectionObserver(
        (list) =>
          list.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            io.unobserve(el);
            el.classList.add("in");
            if (el.id === "od-facts") countFacts();
            // Done rising: drop the hook so hover and state styles own the transform again.
            if (el.hasAttribute("data-r")) setTimeout(() => el.removeAttribute("data-r"), 1000 + (Number(el.style.getPropertyValue("--i")) || 0) * 90);
          }),
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
      );
      revealables.filter((el) => !el.classList.contains("in")).forEach((el) => io.observe(el));
      off.push(() => io.disconnect());
    }

    // Depth: the window leans toward the pointer; the records around it move at their own depth; scrolling tips it back.
    const stage = $("od-stage"), tilt = $("od-tilt"), hero = $("od-hero");
    if (!reduce && stage && tilt && hero) {
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = hero.getBoundingClientRect();
          const sp = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height * 0.8)));
          stage.style.setProperty("--sp", sp.toFixed(3));
        });
      };
      addEventListener("scroll", onScroll, { passive: true });
      off.push(() => removeEventListener("scroll", onScroll));
      if (fine) {
        let praf = 0;
        const move = (e: PointerEvent) => {
          cancelAnimationFrame(praf);
          praf = requestAnimationFrame(() => {
            const r = stage.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
            tilt.style.setProperty("--ry", (x * 6).toFixed(2) + "deg");
            tilt.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg");
            stage.style.setProperty("--px", (-x).toFixed(3));
            stage.style.setProperty("--py", (-y).toFixed(3));
          });
        };
        const leave = () => {
          tilt.style.setProperty("--ry", "0deg");
          tilt.style.setProperty("--rx", "0deg");
          stage.style.setProperty("--px", "0");
          stage.style.setProperty("--py", "0");
        };
        hero.addEventListener("pointermove", move);
        hero.addEventListener("pointerleave", leave);
        off.push(() => (hero.removeEventListener("pointermove", move), hero.removeEventListener("pointerleave", leave)));
      }
    }

    // Cards: a soft light follows the cursor inside.
    if (fine) {
      const light = (e: PointerEvent) => {
        const c = (e.target as HTMLElement).closest<HTMLElement>(".od-node, .od-box");
        if (!c) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      };
      root.addEventListener("pointermove", light);
      off.push(() => root.removeEventListener("pointermove", light));
    }

    // One job through the office: wide screens walk it with the scroll (the section is pinned); others on a timer.
    const flow = $("od-flow");
    const nodes = flow ? [...flow.querySelectorAll<HTMLElement>(".od-node")] : [];
    const steps = flow?.querySelector<HTMLElement>(".od-steps");
    const dots = steps ? [...steps.children] : [];
    const show = (step: number) => {
      nodes.forEach((n, i) => n.classList.toggle("on", i <= step));
      dots.forEach((d, i) => d.classList.toggle("on", i <= step));
      steps?.style.setProperty("--fill", String(Math.max(0, step) / (nodes.length - 1)));
    };
    if (flow && nodes.length && !reduce) {
      show(-1);
      let timer: ReturnType<typeof setInterval> | undefined, step = -1, fraf = 0;
      const byScroll = () => {
        cancelAnimationFrame(fraf);
        fraf = requestAnimationFrame(() => {
          const r = flow.getBoundingClientRect();
          const p = Math.max(0, Math.min(0.999, -r.top / Math.max(1, r.height - innerHeight)));
          const s = r.top < innerHeight * 0.5 ? Math.floor(p * nodes.length) : -1;
          if (s !== step) show((step = s));
        });
      };
      const io = new IntersectionObserver(([en]) => {
        if (wide.matches || !en) return;
        if (en.isIntersecting && !timer) {
          step = -1;
          timer = setInterval(() => show((step = (step + 1) % (nodes.length + 1)) === nodes.length ? -1 : step), 1500);
        }
        if (!en.isIntersecting && timer) {
          clearInterval(timer);
          timer = undefined;
        }
      }, { threshold: 0.35 });
      io.observe(flow);
      const onScroll = () => wide.matches && byScroll();
      addEventListener("scroll", onScroll, { passive: true });
      byScroll();
      off.push(() => (io.disconnect(), removeEventListener("scroll", onScroll), timer && clearInterval(timer)));
    }

    return () => off.forEach((f) => f());
  }, []);
  return null;
}
