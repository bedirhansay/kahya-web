"use client";

import { Img } from "@/components/Img";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export type DayStep = {
  time: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  screen: string;
  alt: string;
};

/**
 * One office day, scrolled through: the steps scroll on the left while the
 * matching screen stays pinned on the right. Phones get each screen inline.
 */
export function DayTimeline({ steps }: { steps: DayStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
      <ol className="relative border-l border-line pl-8 lg:pb-[20vh]">
        {/* The line fills as the day goes on. */}
        <span
          aria-hidden
          className="absolute -left-px top-0 w-0.5 origin-top bg-gradient-to-b from-sage to-brass transition-[height] duration-700 ease-[var(--ease-out-quint)]"
          style={{ height: `${((active + 1) / steps.length) * 100}%` }}
        />
        {steps.map((step, i) => (
          <li
            key={step.time}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="relative pb-14 lg:min-h-[50vh] lg:pb-0 lg:pt-[6vh]"
          >
            <span
              aria-hidden
              className={cn(
                "absolute -left-[2.35rem] top-1 size-3 rounded-full border-2 border-paper transition-[background-color,scale,box-shadow] duration-300 lg:top-[calc(6vh+0.35rem)]",
                active === i ? "scale-150 bg-brass shadow-[0_0_0_6px_rgb(227_178_97/0.2)]" : i < active ? "bg-sage" : "bg-line",
              )}
            />
            <p
              className={cn(
                "text-[0.95rem] font-bold tabular-nums transition-colors duration-300",
                active === i ? "text-brass-700" : "text-muted",
              )}
            >
              <time>{step.time}</time>
            </p>
            <h3
              className={cn(
                "mt-2 text-2xl font-extrabold tracking-[-0.025em] transition-colors duration-300",
                active === i ? "text-ink" : "text-ink/55 max-lg:text-ink",
              )}
            >{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
            <Link href={step.href} className="link mt-4 inline-block text-[0.95rem]">
              {step.linkLabel}
            </Link>
            <div data-reveal="zoom" className="frame mt-6 lg:hidden">
              <Img src={step.screen} alt={step.alt} width={2000} height={1250} sizes="100vw" className="h-auto w-full" />
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-min(22vw,17rem))]">
          <div data-reveal="zoom" className="frame relative aspect-[16/10]">
            {steps.map((step, i) => (
              <Img
                key={step.screen + i}
                src={step.screen}
                alt={active === i ? step.alt : ""}
                aria-hidden={active !== i}
                fill
                sizes="(min-width: 1216px) 720px, 60vw"
                className={cn(
                  "object-cover object-top transition-[opacity,scale,translate] duration-700 ease-[var(--ease-out-quint)]",
                  active === i ? "opacity-100" : i < active ? "-translate-y-3 scale-[0.98] opacity-0" : "translate-y-3 scale-[0.98] opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
