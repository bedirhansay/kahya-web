"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";

export type DayMoment = {
  key: string;
  time: string;
  title: string;
  text: string;
  solution: { name: string; href: string };
  /** Index into `phones`: the screen this hour happens on, brought to the front when the hour is picked. */
  phone?: number;
};

export type DayPhone = { src: string; alt: string; time: string };

/**
 * One office day as a timeline beside three phones with the app's real 390 screens. Picking an hour that has a screen
 * brings that phone to the middle; nothing moves on its own. On a phone only the middle one shows.
 */
export function DayTabs({ moments, phones }: { moments: DayMoment[]; phones: DayPhone[] }) {
  const [active, setActive] = useState(moments[0].key);
  const [front, setFront] = useState(moments.find((x) => x.phone !== undefined)?.phone ?? 0);
  const m = moments.find((x) => x.key === active)!;
  const others = phones.map((_, i) => i).filter((i) => i !== front);
  const order = [others[0], front, others[1]];

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
              onClick={() => (setActive(x.key), x.phone !== undefined && setFront(x.phone))}
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

      <div id="gun-panel" role="tabpanel" aria-labelledby={`gun-${m.key}`} className="min-w-0">
        <div className="day-phones">
          {order.map((idx, pos) =>
            idx === undefined ? null : (
              <figure key={phones[idx].src} className={cn("day-phone", pos === 1 ? "day-phone-mid" : "day-phone-side")}>
                <div className="home-phone">
                  <div className="home-phone-screen">
                    <Image
                      src={phones[idx].src}
                      alt={phones[idx].alt}
                      width={1170}
                      height={2532}
                      sizes="(min-width: 1024px) 240px, 70vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-center text-sm font-semibold tabular-nums text-muted">{phones[idx].time}</figcaption>
              </figure>
            ),
          )}
        </div>
        <p className="mt-6 text-center">
          <Link href={m.solution.href} className="link inline-flex min-h-11 items-center">
            {m.solution.name} çözümünde gör
          </Link>
        </p>
      </div>
    </div>
  );
}
