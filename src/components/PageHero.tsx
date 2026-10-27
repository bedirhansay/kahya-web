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
  return (
    <section className="hero-tint pb-12 pt-8 md:pb-16 md:pt-12">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <h1 className="display mt-8 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-5 max-w-2xl text-muted">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
