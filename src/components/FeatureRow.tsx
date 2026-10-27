import type { ReactNode } from "react";

import type { Point } from "@/content/solutions";
import { cn } from "@/lib/cn";

import { Points } from "./Points";

/**
 * Text on one side, one or two drawn screens on the other; the second one overlaps
 * the first on wide screens, like the deck's paired frames.
 */
export function FeatureRow({
  id,
  eyebrow,
  title,
  lead,
  points,
  primary,
  secondary,
  phone,
  reverse,
  children,
}: {
  id: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  points?: Point[];
  primary: ReactNode;
  secondary?: ReactNode;
  /** The secondary visual is a phone: it sits at the right edge, vertically centred. */
  phone?: boolean;
  reverse?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:items-center lg:gap-14",
        reverse ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]" : "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
      )}
    >
      <div className={cn(reverse && "lg:order-2")}>
        <p className="eyebrow text-brass-700">{eyebrow}</p>
        <h3 id={id} className="title mt-3">
          {title}
        </h3>
        <p className="lead mt-4 text-muted">{lead}</p>
        {points && <Points items={points} className="mt-6" />}
        {children}
      </div>
      <div className={cn("relative min-w-0", reverse && "lg:order-1", secondary && !phone && "lg:pb-16")}>
        <div className={cn(secondary && (phone ? "lg:w-[66%]" : "lg:w-[86%]"))}>{primary}</div>
        {secondary &&
          (phone ? (
            <div className="mt-6 flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">{secondary}</div>
          ) : (
            <div className="relative -mt-6 ml-auto w-[92%] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[64%]">{secondary}</div>
          ))}
      </div>
    </div>
  );
}
