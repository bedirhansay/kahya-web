"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export type DayMoment = {
  key: string;
  time: string;
  title: string;
  text: string;
  solution: { name: string; href: string };
  /** Drawn on the server and passed in. */
  visual: ReactNode;
};

/** One office day as a timeline: pick a moment, its screen opens on the stage. */
export function DayTabs({ moments }: { moments: DayMoment[] }) {
  const [active, setActive] = useState(moments[0].key);
  const m = moments.find((x) => x.key === active)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
      <div role="tablist" aria-label="Bir ofis günü" aria-orientation="vertical" className="relative">
        {/* the day's line, behind the times */}
        <span aria-hidden className="absolute bottom-6 left-[3.1rem] top-6 w-px bg-line max-lg:hidden" />
        {moments.map((x) => {
          const on = x.key === active;
          return (
            <button
              key={x.key}
              type="button"
              role="tab"
              id={`gun-${x.key}`}
              aria-selected={on}
              aria-controls="gun-panel"
              onClick={() => setActive(x.key)}
              className={cn(
                "relative flex w-full items-start gap-4 rounded-xl px-3 py-3.5 text-left transition-colors",
                on ? "bg-mist" : "hover:bg-mist/60",
              )}
            >
              <span className={cn("w-12 shrink-0 pt-0.5 text-right text-[0.9rem] font-semibold tabular-nums", on ? "text-brass" : "text-muted")}>
                {x.time}
              </span>
              <span aria-hidden className={cn("relative z-10 mt-[0.45rem] size-2.5 shrink-0 rounded-full ring-4 ring-paper max-lg:hidden", on ? "bg-brass" : "bg-line")} />
              <span className="min-w-0">
                <span className="block font-semibold leading-snug">{x.title}</span>
                {on && <span className="mt-1 block leading-relaxed text-muted">{x.text}</span>}
              </span>
            </button>
          );
        })}
      </div>

      <div id="gun-panel" role="tabpanel" aria-labelledby={`gun-${m.key}`} className="stage flex min-h-[26rem] min-w-0 flex-col p-4 sm:p-8 lg:min-h-[30rem]">
        <div key={m.key} className="stage-in flex flex-1 items-center justify-center lg:[zoom:1.12]">
          {m.visual}
        </div>
        <p className="mt-5 text-[0.9rem] text-muted">
          <Link href={m.solution.href} className="link">
            {m.solution.name}
          </Link>{" "}
          çözümünde.
        </p>
      </div>
    </div>
  );
}
