import type { CSSProperties, ReactNode } from "react";

import { Breadcrumbs } from "./Breadcrumbs";

/** Dark opening band for inner pages; continues the header's pine. */
export function PageHero({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: { name: string; path: string }[];
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-pine-950 pb-16 pt-10 text-white md:pb-20 md:pt-14">
      <div aria-hidden className="grid-bg absolute inset-0 [mask-image:linear-gradient(#000,transparent)]" />
      <div aria-hidden className="aurora -right-32 -top-40 size-[26rem] bg-petrol-600/45" />
      <div aria-hidden className="aurora -left-24 top-0 size-[16rem] bg-brass/12" style={{ animationDelay: "-7s" }} />
      <div className="wrap relative">
        <Breadcrumbs items={crumbs} />
        <h1 className="intro title mt-8 max-w-4xl">{title}</h1>
        {lead && (
          <p className="intro lead mt-5 max-w-2xl text-white/72" style={{ "--d": "120ms" } as CSSProperties}>
            {lead}
          </p>
        )}
        {children && (
          <div className="intro" style={{ "--d": "220ms" } as CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
