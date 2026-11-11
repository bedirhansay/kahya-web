"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Ruled question rows, one line each (about 56–64 px closed). One answer opens at a time; it grows from 0fr to 1fr
 * when the reader taps, so the only motion here is the one the reader asked for.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-6 py-3.5 text-left text-[1.02rem] font-semibold leading-snug hover:text-brand"
              >
                {item.q}
                <span
                  aria-hidden
                  className={cn(
                    "shrink-0 font-display text-xl font-normal leading-none text-muted transition-transform duration-200 motion-reduce:transition-none",
                    on && "rotate-45 text-brand",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`${id}-${i}`}
              role="region"
              className={cn(
                "grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
                on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden" inert={!on}>
                <p className="max-w-3xl pb-5 leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
