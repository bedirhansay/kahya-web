import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { MegaMenu, NavLink } from "./nav";

/** Full-width dropdown under the header: grouped links with icons and a dark side panel. */
export function MegaPanel({ menu }: { menu: MegaMenu }) {
  const cards = menu.columns.length === 1;
  return (
    <div
      className={cn(
        "invisible absolute inset-x-0 top-full -translate-y-1 border-t border-white/8 bg-paper text-ink opacity-0 shadow-[0_24px_48px_-16px_rgb(6_27_25/0.35)]",
        "transition duration-200 ease-out-quint group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <div className="wrap grid grid-cols-[1fr_17rem] gap-8 py-7">
        <div className={cn("grid gap-6", cards ? "grid-cols-1" : "grid-cols-3")}>
          {menu.columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-3 text-brass-700">{col.title}</p>
              <ul className={cn(cards ? "grid grid-cols-3 gap-3" : "grid gap-1")}>
                {col.items.map((item) => (
                  <li key={item.href}>{cards ? <Card item={item} /> : <Row item={item} />}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="band-dark flex flex-col rounded-xl p-5 text-white">
          <p className="eyebrow text-brass">{menu.aside.eyebrow}</p>
          <p className="mt-2 text-[1.05rem] font-bold leading-snug">{menu.aside.title}</p>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-white/65">{menu.aside.text}</p>
          <ul className="mt-auto grid gap-0.5 pt-4 text-[0.88rem]">
            {menu.aside.links.map((l, i) => {
              const last = i === menu.aside.links.length - 1 && menu.aside.links.length > 2;
              return (
                <li key={l.href + l.label} className={cn(last && "mt-2 border-t border-white/10 pt-2")}>
                  <Link
                    href={l.href}
                    className={cn(
                      "group/a flex items-center justify-between rounded-md py-1.5 hover:text-brass",
                      last || menu.aside.links.length <= 2 ? "font-semibold text-white" : "text-white/80",
                    )}
                  >
                    {l.label}
                    <ArrowRight size={14} aria-hidden className="opacity-50 transition group-hover/a:translate-x-0.5 group-hover/a:opacity-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Row({ item }: { item: NavLink }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} className="group/r flex items-start gap-3 rounded-lg p-2 -mx-2 transition hover:bg-white hover:shadow-sm">
      {Icon && (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand transition group-hover/r:border-brand group-hover/r:bg-brand group-hover/r:text-white">
          <Icon size={17} aria-hidden />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[0.92rem] font-semibold leading-tight">{item.label}</span>
        {item.hint && <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">{item.hint}</span>}
      </span>
    </Link>
  );
}

function Card({ item }: { item: NavLink }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className="group/c flex h-full flex-col rounded-xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
    >
      <span className="flex items-center justify-between">
        {Icon && (
          <span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-brand transition group-hover/c:bg-brand group-hover/c:text-white">
            <Icon size={19} aria-hidden />
          </span>
        )}
        {item.no && <span className="font-mono text-[0.75rem] font-medium text-muted">{item.no}</span>}
      </span>
      <span className="mt-4 block font-bold leading-tight">{item.label}</span>
      {item.hint && <span className="mt-1.5 block text-[0.83rem] leading-snug text-muted">{item.hint}</span>}
      {item.bullets && (
        <span className="mt-3 grid gap-1.5 border-t border-line pt-3 text-[0.82rem] font-medium">
          {item.bullets.map((b) => (
            <span key={b} className="flex items-center gap-2">
              <Check size={13} aria-hidden className="shrink-0 text-sage" />
              {b}
            </span>
          ))}
        </span>
      )}
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[0.82rem] font-semibold text-brand">
        İncele
        <ArrowRight size={13} aria-hidden className="transition group-hover/c:translate-x-0.5" />
      </span>
    </Link>
  );
}
