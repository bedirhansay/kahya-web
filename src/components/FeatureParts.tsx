"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";

export type FeaturePart = {
  key: string;
  tab: string;
  title: string;
  body: string;
  points: string[];
  screen: { src: string; alt: string; width: number; height: number };
};

/**
 * A feature told in parts (Cari: liste, ekstre, tahsilat): one tab row, one real screen and its few lines at a time,
 * so the page stays one screen long instead of three. Switching answers the tap with a short crossfade.
 */
export function FeatureParts({ parts, label }: { parts: FeaturePart[]; label: string }) {
  const [on, setOn] = useState(0);
  const id = useId();
  const select = (i: number) => setOn((i + parts.length) % parts.length);
  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="flex gap-6 overflow-x-auto border-b border-line"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") select(on + 1);
          if (e.key === "ArrowLeft") select(on - 1);
        }}
      >
        {parts.map((p, i) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            id={`${id}-t-${i}`}
            aria-selected={on === i}
            aria-controls={`${id}-p-${i}`}
            tabIndex={on === i ? 0 : -1}
            onClick={() => setOn(i)}
            className={cn(
              "-mb-px min-h-12 shrink-0 cursor-pointer border-b-2 text-[1.02rem] font-semibold transition-colors duration-200",
              on === i ? "border-brand text-ink" : "border-transparent text-muted hover:text-ink",
            )}
          >
            {p.tab}
          </button>
        ))}
      </div>
      {parts.map((p, i) => (
        <div
          key={p.key}
          role="tabpanel"
          id={`${id}-p-${i}`}
          aria-labelledby={`${id}-t-${i}`}
          hidden={on !== i}
          className="stage-in grid gap-8 pt-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start lg:gap-12"
        >
          <div>
            <h2 className="font-display text-2xl font-bold tracking-[-0.01em]">{p.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-brand">
              {p.points.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <figure className="overflow-hidden rounded-[var(--radius-frame)] border border-line bg-surface">
            <Image
              src={p.screen.src}
              alt={p.screen.alt}
              width={p.screen.width}
              height={p.screen.height}
              sizes="(min-width: 1024px) 720px, 100vw"
              priority={i === 0}
              className="h-auto w-full"
            />
          </figure>
        </div>
      ))}
    </div>
  );
}
