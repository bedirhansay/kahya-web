import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { breadcrumbLd } from "@/lib/seo";

import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items, dark }: { items: { name: string; path: string }[]; dark?: boolean }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav aria-label="Konum" className={dark ? "text-sm text-white/55" : "text-sm text-muted"}>
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className={dark ? "hover:text-white" : "hover:text-ink"}>
              Ana sayfa
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1">
              <ChevronRight size={14} aria-hidden />
              {i === items.length - 1 ? (
                <span aria-current="page" className={dark ? "text-white/85" : "text-ink"}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={dark ? "hover:text-white" : "hover:text-ink"}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
