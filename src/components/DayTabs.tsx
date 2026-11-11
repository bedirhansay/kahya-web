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
  // The stage fades only when the reader picks another hour; nothing moves on load.
  const [picked, setPicked] = useState(false);
  const m = moments.find((x) => x.key === active)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
      <div role="tablist" aria-label="Bir ofis günü" aria-orientation="vertical" className="relative self-start">
        {moments.map((x, i) => {
          const on = x.key === active;
          const past = i < moments.findIndex((y) => y.key === active);
          const last = i === moments.length - 1;
          return (
            <button
              key={x.key}
              type="button"
              role="tab"
              id={`gun-${x.key}`}
              aria-selected={on}
              aria-controls="gun-panel"
              onClick={() => (setActive(x.key), setPicked(true))}
              className={cn(
                "relative flex w-full items-start gap-4 rounded-xl px-3 py-3.5 text-left transition-colors duration-300",
                on ? "text-ink" : "text-ink/55 hover:text-ink/85",
              )}
            >
              <span
                className={cn(
                  "w-12 shrink-0 pt-0.5 text-right text-[0.9rem] font-semibold tabular-nums",
                  on ? "text-brass" : "text-muted",
                )}
              >
                {x.time}
              </span>
              {/* the day's line: from this dot to the next one, brass for the hours already passed */}
              {!last && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[calc(0.75rem+3rem+1rem+0.3125rem-0.5px)] top-[calc(0.875rem+0.45rem+0.3125rem)] h-full w-px max-lg:hidden",
                    past || on ? "bg-brass/45" : "bg-line",
                  )}
                />
              )}
              <span
                aria-hidden
                className={cn(
                  "relative z-10 mt-[0.45rem] size-2.5 shrink-0 rounded-full ring-4 ring-paper max-lg:hidden",
                  on ? "bg-brass" : past ? "bg-brass/60" : "bg-line",
                )}
              />
              <span className="min-w-0">
                <span className={cn("block font-semibold leading-snug", on && "text-[1.08rem]")}>{x.title}</span>
                {/* the lit hour's story eases open under it */}
                <span
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-out-quint",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-1 leading-relaxed text-muted">{x.text}</span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="gun-panel"
        role="tabpanel"
        aria-labelledby={`gun-${m.key}`}
        className="stage flex min-h-[26rem] min-w-0 flex-col p-4 sm:p-8 lg:min-h-[32rem]"
      >
        <div key={m.key} className={cn("flex flex-1 items-center justify-center lg:[zoom:1.12]", picked && "stage-in")}>
          {m.visual}
        </div>
        {/* Where this hour lives in Kahya: a small way in, right under the screen. */}
        <Link
          key={`l-${m.key}`}
          href={m.solution.href}
          className="group/sl mx-auto mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4 text-[0.92rem] text-ink/80 transition-colors hover:border-brass/40 hover:text-ink"
        >
          <span className="rounded-full bg-brass/15 px-2.5 py-1 text-[0.875rem] font-semibold text-brass">
            {m.solution.name}
          </span>
          çözümünde gör
        </Link>
      </div>
    </div>
  );
}
