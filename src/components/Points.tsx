import type { Point } from "@/content/solutions";
import { cn } from "@/lib/cn";

/** Bold term + explanation, separated by thin lines, as in the deck. */
export function Points({ items, dark, className }: { items: Point[]; dark?: boolean; className?: string }) {
  return (
    <ul className={cn("divide-y border-y", dark ? "divide-white/10 border-white/10" : "divide-line border-line", className)}>
      {items.map((p) => (
        <li key={p.term} className="flex gap-3 py-3">
          <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
          <span className={dark ? "text-white/75" : "text-muted"}>
            <strong className={cn("font-semibold", dark ? "text-white" : "text-ink")}>{/[?:]$/.test(p.term) ? p.term : `${p.term}:`}</strong> {p.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
