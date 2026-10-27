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
      <div role="tablist" aria-label="Sektörler" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
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
              "shrink-0 rounded-lg border px-4 py-2 text-[0.95rem] font-semibold transition-colors",
              x.slug === active ? "border-petrol bg-petrol text-white" : "border-line bg-white text-ink hover:border-petrol",
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
        className="mt-6 grid gap-8 rounded-[16px] border border-line bg-white p-5 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center"
      >
        <div>
          <h3 className="text-2xl font-bold tracking-[-0.02em]">{s.name}</h3>
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
        <div className="min-w-0">{mocks[s.slug]}</div>
      </div>
    </div>
  );
}
