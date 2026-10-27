import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/*
 * Drawn-in-code pictures of Kahya screens. They show only what the app does today,
 * with the demo company's made-up records (Atlas Danışmanlık and its customers).
 */

/** A window-like card with a caption bar, like the deck's screen frames. */
export function MockWindow({
  title,
  caption,
  label,
  className,
  children,
}: {
  title: string;
  caption?: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="img" aria-label={label} className={cn("frame @container text-[13px] text-ink", className)}>
      <div aria-hidden className="flex items-center gap-2 border-b border-line bg-white px-4 py-2.5">
        <span className="grid size-5 place-items-center rounded-md bg-petrol text-[10px] font-bold text-brass">K</span>
        <span className="truncate font-semibold">{title}</span>
      </div>
      <div aria-hidden className="bg-[#fbfaf7] p-3 sm:p-4">
        {children}
      </div>
      {caption && (
        <p aria-hidden className="border-t border-line bg-white px-4 py-2 text-[11px] text-muted">
          {caption}
        </p>
      )}
    </div>
  );
}

/** A phone outline around a small screen. */
export function MockPhone({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("w-[15.5rem] rounded-[2.2rem] border-[6px] border-ink bg-[#fbfaf7] p-3 text-[12px] text-ink shadow-2xl", className)}
    >
      <div aria-hidden className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-ink/15" />
      <div aria-hidden>{children}</div>
    </div>
  );
}

export function Panel({ title, action, className, children }: { title?: string; action?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-[10px] border border-line bg-white", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-line px-3 py-2">
          <span className="font-semibold">{title}</span>
          {action && <span className="text-[11px] font-medium text-brand">{action}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

const tones = {
  brand: "bg-brand-50 text-brand",
  warn: "bg-[#fdf3e1] text-brass-700",
  danger: "bg-[#fdecea] text-[#b42318]",
  muted: "bg-mist text-muted",
} as const;

export function Badge({ tone = "muted", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={cn("inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold", tones[tone])}>{children}</span>;
}

export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand">{initials}</span>;
}

export function Btn({ primary, children }: { primary?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold",
        primary ? "bg-petrol text-white" : "border border-line bg-white text-ink",
      )}
    >
      {children}
    </span>
  );
}
