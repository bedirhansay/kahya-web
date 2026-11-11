"use client";

import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The rest of the problem rows. The server sends them open, so without JavaScript every row is there; once the page
 * is live, phones (<640px) fold them behind one "Tümünü gör" button. A tap opens them with a 200ms fade and moves
 * focus to the first revealed link, because the button itself goes away.
 */
const noSubscribe = () => () => {};

export function ProblemsMore({ children }: { children: ReactNode }) {
  // true only once the page runs in the browser: the server render (and a visit without JavaScript) keeps every row
  const live = useSyncExternalStore(noSubscribe, () => true, () => false);
  const [opened, setOpened] = useState(false);
  const folded = live && !opened;
  const list = useRef<HTMLUListElement>(null);
  const id = useId();

  return (
    <>
      <ul
        id={id}
        ref={list}
        className={cn("grid md:grid-cols-2 md:gap-x-12", folded && "max-sm:hidden", opened && "reveal-in")}
      >
        {children}
      </ul>
      {folded && (
        <button
          type="button"
          aria-expanded="false"
          aria-controls={id}
          onClick={() => {
            setOpened(true);
            requestAnimationFrame(() => list.current?.querySelector<HTMLElement>("[data-first-more]")?.focus());
          }}
          className="link mt-4 inline-flex min-h-11 cursor-pointer items-center sm:hidden"
        >
          Tümünü gör
        </button>
      )}
    </>
  );
}
