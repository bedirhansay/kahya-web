import Link from "next/link";

import { cn } from "@/lib/cn";

import type { MegaMenu, NavLink } from "./nav";

/** Full-width dropdown under the header: grouped links with icons and a dark side panel. */
export function MegaPanel({ menu }: { menu: MegaMenu }) {
  const cards = menu.columns.length === 1;
  return (
    <div
      className={cn(
        "invisible absolute inset-x-0 top-full mt-2 -translate-y-1 overflow-hidden rounded-[18px] border border-line bg-surface/95 text-ink opacity-0 shadow-[0_30px_60px_-24px_rgb(12_31_28/0.3)] backdrop-blur-xl",
        "transition duration-200 ease-out-quint group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <div className="grid grid-cols-[1fr_17rem] gap-8 p-6">
        <div className={cn("grid gap-6", cards ? "grid-cols-1" : "grid-cols-3")}>
          {menu.columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-3 text-muted">{col.title}</p>
              <ul className={cn(cards ? "grid grid-cols-3 gap-3" : "grid gap-1")}>
                {col.items.map((item) => (
                  <li key={item.href}>{cards ? <Card item={item} /> : <Row item={item} />}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="band-dark flex flex-col rounded-xl p-5">
          <p className="eyebrow text-brass-300">{menu.aside.eyebrow}</p>
          <p className="mt-2 text-[1.05rem] font-bold leading-snug">{menu.aside.title}</p>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{menu.aside.text}</p>
          <ul className="mt-auto grid gap-0.5 pt-4 text-[0.88rem]">
            {menu.aside.links.map((l, i) => {
              const last = i === menu.aside.links.length - 1 && menu.aside.links.length > 2;
              return (
                <li key={l.href + l.label} className={cn(last && "mt-2 border-t border-line pt-2")}>
                  <Link
                    href={l.href}
                    className={cn(
                      "group/a flex items-center justify-between rounded-md py-1.5 hover:text-brass",
                      last || menu.aside.links.length <= 2 ? "font-semibold text-ink" : "text-ink/80",
                    )}
                  >
                    {l.label}
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
    <Link href={item.href} className="group/r flex items-start gap-3 rounded-lg p-2 -mx-2 transition hover:bg-mist">
      {Icon && (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-brand transition group-hover/r:border-brand group-hover/r:bg-brand group-hover/r:text-paper">
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
      className="group/c flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors duration-200 hover:border-brand"
    >
      <span className="flex items-center justify-between">
        {Icon && (
          <Icon size={20} aria-hidden className="text-brand" />
        )}
      </span>
      <span className="mt-4 block font-bold leading-tight">{item.label}</span>
      {item.hint && <span className="mt-1.5 block text-[0.83rem] leading-snug text-muted">{item.hint}</span>}
      {item.bullets && (
        <span className="mt-3 grid gap-1.5 border-t border-line pt-3 text-[0.82rem] font-medium">
          {item.bullets.map((b) => (
            <span key={b} className="flex items-center gap-2">
              {b}
            </span>
          ))}
        </span>
      )}
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[0.82rem] font-semibold text-brand">
        İncele
      </span>
    </Link>
  );
}
