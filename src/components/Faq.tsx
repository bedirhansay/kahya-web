"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";

/** Questions that ease open: the answer's row grows from 0fr to 1fr, so the height animates without measuring. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="grid gap-1.5">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "group relative rounded-2xl transition-colors duration-500",
              on ? "bg-white/[0.04]" : "hover:bg-white/[0.02]",
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left text-[1.06rem] font-semibold transition-colors hover:text-brass-300 px-5"
              >
                {item.q}
                <span
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-500 ease-out-quint",
                    on ? "rotate-45 border-brass/60 bg-brass/10" : "border-line",
                  )}
                >
                  <Plus size={16} className="text-brass" aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-${i}`}
              role="region"
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out-quint motion-reduce:transition-none",
                on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden" inert={!on}>
                <p className="max-w-3xl pb-6 leading-relaxed text-muted px-5">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
