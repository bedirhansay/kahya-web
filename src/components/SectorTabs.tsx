"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import type { Sector } from "@/content/sectors";
import { solutions } from "@/content/solutions";
import { cn } from "@/lib/cn";

import { Points } from "./Points";

/** Sector tabs on the home page. Mocks are rendered on the server and passed in. */
export function SectorTabs({ sectors, mocks }: { sectors: Sector[]; mocks: Record<string, ReactNode> }) {
  const [active, setActive] = useState(sectors[0].slug);
  const s = sectors.find((x) => x.slug === active)!;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Sektörler"
        className="-mx-4 flex gap-1 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:px-0"
      >
        {sectors.map((x) => (
          <button
            key={x.slug}
            type="button"
            role="tab"
            id={`tab-${x.slug}`}
            aria-selected={x.slug === active}
            aria-controls={`panel-${x.slug}`}
            onClick={() => setActive(x.slug)}
            className={cn(
              // Underlined tabs: the picked sector is lit, a brass bar under it.
              "relative shrink-0 px-4 pb-3.5 pt-2 text-[1rem] font-semibold transition-colors duration-300",
              "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-center after:rounded-full after:bg-brass after:transition-transform after:duration-500 after:ease-out-quint",
              x.slug === active ? "text-ink after:scale-x-100" : "text-ink/50 after:scale-x-0 hover:text-ink/85",
            )}
          >
            {x.tab}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${s.slug}`}
        aria-labelledby={`tab-${s.slug}`}
        className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16"
      >
        <div key={s.slug} className="stage-in">
          <h3 className="text-[1.9rem] font-bold tracking-[-0.02em]">{s.name}</h3>
          <p className="mt-3 leading-relaxed text-muted">{s.lead}</p>
          <Points className="mt-5" items={s.uses.flatMap((u) => u.points)} />
          <p className="mt-4 text-sm text-muted">
            Kullandığı çözümler:{" "}
            {s.uses.map((u, i) => (
              <span key={u.solution}>
                {i > 0 && ", "}
                <Link href={`/cozumler/${u.solution}`} className="link">
                  {solutions.find((x) => x.slug === u.solution)?.name}
                </Link>
              </span>
            ))}
          </p>
          <Link href={`/sektorler/${s.slug}`} className="btn btn-line mt-6">
            {s.tab} için Kahya
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div key={`m-${s.slug}`} className="stage stage-in min-w-0 p-2 sm:p-6">
          {mocks[s.slug]}
        </div>
      </div>
    </div>
  );
}
