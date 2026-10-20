import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { breadcrumbLd } from "@/lib/seo";

import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav aria-label="Konum" className="text-sm text-white/60">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-white">
              Ana sayfa
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1">
              <ChevronRight size={14} aria-hidden />
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-white/85">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-white">
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
