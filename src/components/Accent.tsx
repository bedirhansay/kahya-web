import type { ReactNode } from "react";

/**
 * A heading with its closing words in Kahya's light (green into the logo's gold), the way the hero carries it.
 * Short titles light their last word, longer ones their last two; anything other than a plain string is left as is.
 */
export function Accent({ children }: { children: ReactNode }) {
  if (typeof children !== "string") return children;
  const words = children.trim().split(/\s+/);
  const n = words.length <= 3 ? 1 : 2;
  if (words.length < 2) return <span className="grad grad-b">{children}</span>;
  return (
    <>
      {words.slice(0, -n).join(" ")} <span className="grad grad-b">{words.slice(-n).join(" ")}</span>
    </>
  );
}
