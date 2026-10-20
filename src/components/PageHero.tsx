import type { ReactNode } from "react";

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
    <section className="grid-bg bg-pine-950 pb-16 pt-10 text-white md:pb-20 md:pt-14">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <h1 className="title mt-8 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-5 max-w-2xl text-white/72">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
