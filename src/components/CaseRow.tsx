import Image from "next/image";
import type { ReactNode } from "react";

import { PhoneFrame } from "@/components/PhoneFrame";
import { cn } from "@/lib/cn";

export type CaseTone = "pine" | "sage" | "cream" | "mist";
export type CaseScreen = { src: string; alt: string; width: number; height: number };

/** The coloured panel of a case row: a real desktop screen running off its edge, with the phone screen in front when there is one. */
export function CasePanel({
  tone,
  screen,
  phone,
  no,
  priority,
  className,
}: {
  className?: string;
  tone: CaseTone;
  screen: CaseScreen;
  phone?: { src: string; alt: string; time: string };
  no?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("case-panel", `case-panel-${tone}`, className)}>
      {no && (
        <span aria-hidden className="case-no">
          {no}
        </span>
      )}
      <div className="case-shot">
        <Image
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          sizes="(min-width: 1024px) 640px, 100vw"
          priority={priority}
          className="block h-auto w-full"
        />
      </div>
      {phone && (
        <PhoneFrame time={phone.time}>
          <Image src={phone.src} alt={phone.alt} width={1170} height={2532} sizes="180px" className="block h-auto w-full" />
        </PhoneFrame>
      )}
    </div>
  );
}

/**
 * One case row (softmoor's layout, Kahya's colours): the panel on one side, the words on the other; `flip` puts the
 * panel on the right so a list of rows zigzags. Rows are ruled apart, not boxed.
 */
export function CaseRow({
  id,
  flip,
  panel,
  children,
  className,
}: {
  id?: string;
  flip?: boolean;
  panel: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      id={id}
      className={cn(
        "grid scroll-mt-28 items-center gap-8 border-t border-line py-10 first:border-t-0 first:pt-0 md:py-14 lg:grid-cols-2 lg:gap-16",
        className,
      )}
    >
      <div className={cn("min-w-0", flip && "lg:order-2")}>{panel}</div>
      <div className="min-w-0">{children}</div>
    </article>
  );
}
