import type { ReactNode } from "react";

import { Breadcrumbs } from "./Breadcrumbs";

/** Opening band for inner pages. */
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
  // The top padding clears the floating header (72px) plus the opening's own air.
  return (
    <section className="hero-tint pb-12 pt-[104px] md:pb-16 md:pt-[120px]">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <h1 className="display mt-4 max-w-4xl">
          {title}
        </h1>
        {lead && <p className="lead mt-5 max-w-2xl text-muted">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
