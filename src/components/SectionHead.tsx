import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function SectionHead({
  id,
  title,
  lead,
  dark,
  center,
  className,
}: {
  id?: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <h2 id={id} className="title">
        {title}
      </h2>
      {lead && <p className={cn("lead mt-4", dark ? "text-white/70" : "text-muted")}>{lead}</p>}
    </div>
  );
}
