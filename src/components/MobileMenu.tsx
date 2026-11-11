"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

import { mainNav, type NavLink } from "./nav";

const extra = [{ href: "/film", label: "Tanıtım filmi" }];

/**
 * The phone menu: a full screen on the hero's ground. Big links step in one after another, groups with sub-pages
 * ease open with their icons, and the call to action stays at the foot.
 */
export function MobileMenu() {
  const pathname = usePathname();
  // Remember the page the menu was opened on: navigating away closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);
  const [group, setGroup] = useState<string | null>(null);

  // Lock page scroll while open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = (it: (typeof mainNav)[number]): NavLink[] =>
    it.mega ? it.mega.columns.flatMap((c) => c.items) : (it.children ?? []);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobil-menu"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        className="relative z-[60] grid size-11 place-items-center rounded-xl border border-line text-ink transition-colors hover:border-ink/25"
      >
        {/* Two bars that turn into a cross. */}
        <span aria-hidden className="relative block h-3 w-5">
          <span
            className={cn(
              "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-500 ease-out-quint",
              open ? "top-[5px] rotate-45" : "top-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-0.5 rounded-full bg-current transition-all duration-500 ease-out-quint",
              open ? "top-[5px] w-5 -rotate-45" : "top-[10px] w-3.5",
            )}
          />
        </span>
      </button>
      {/* On <body>: the header's blur and slide would otherwise hold a fixed layer inside the header. */}
      {open &&
        createPortal(
          <div
            id="mobil-menu"
            className="mm fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain px-5 pt-[88px]"
          >
            <nav aria-label="Mobil menü" className="flex-1">
              <ul>
                {mainNav.map((item, i) => {
                  const subs = items(item);
                  const on = group === item.href;
                  return (
                    <li key={item.href} className="mm-in" style={{ "--i": i } as CSSProperties}>
                      {subs.length ? (
                        <button
                          type="button"
                          aria-expanded={on}
                          onClick={() => setGroup(on ? null : item.href)}
                          className="flex w-full items-center justify-between py-4 text-left font-display text-[1.75rem] font-bold tracking-[-0.02em]"
                        >
                          {item.label}
                          <span
                            className={cn(
                              "grid size-9 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-500 ease-out-quint",
                              on ? "rotate-180 border-brass/50 bg-brass/10 text-brass" : "border-line text-ink/70",
                            )}
                          >
                            <ChevronDown size={18} aria-hidden />
                          </span>
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center justify-between py-4 font-display text-[1.75rem] font-bold tracking-[-0.02em]"
                        >
                          {item.label}
                        </Link>
                      )}
                      {subs.length > 0 && (
                        <div
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-500 ease-out-quint",
                            on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <div className="overflow-hidden" inert={!on}>
                            <ul className="grid gap-1 pb-4">
                              {subs.map((c) => {
                                const Icon = c.icon;
                                return (
                                  <li key={c.href + c.label}>
                                    <Link
                                      href={c.href}
                                      className="flex min-h-12 items-center gap-3 rounded-xl px-2 py-2 transition-colors active:bg-ink/5"
                                    >
                                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-ink/[0.03] text-brass">
                                        {Icon ? <Icon size={17} aria-hidden /> : null}
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block font-semibold">{c.label}</span>
                                        {c.hint && (
                                          <span className="line-clamp-2 block text-[0.9rem] leading-snug text-muted">
                                            {c.hint}
                                          </span>
                                        )}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
                {extra.map((x, j) => (
                  <li key={x.href} className="mm-in" style={{ "--i": mainNav.length + j } as CSSProperties}>
                    <Link
                      href={x.href}
                      className="flex items-center justify-between py-4 font-display text-[1.75rem] font-bold tracking-[-0.02em]"
                    >
                      {x.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              className="mm-in sticky bottom-0 -mx-5 mt-8 grid gap-3 bg-paper px-5 pb-6 pt-3 before:pointer-events-none before:absolute before:inset-x-0 before:-top-10 before:h-10 before:bg-gradient-to-t before:from-paper before:to-transparent"
              style={{ "--i": mainNav.length + extra.length } as CSSProperties}
            >
              <a href={site.app.register} className="btn btn-brass w-full">
                Ücretsiz başlayın
              </a>
              <a href={site.app.login} className="btn btn-line w-full">
                Giriş yap
                <ArrowUpRight size={16} aria-hidden className="opacity-60" />
              </a>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
