/* eslint-disable @next/next/no-img-element -- a 1 KB static SVG; next/image adds nothing here */

/** Kahya's own K mark, used wherever the site points at Kahya AI (instead of a generic sparkle). */
export function KahyaGlyph({ size = 20, tone = "light", className }: { size?: number; tone?: "light" | "dark"; className?: string }) {
  return (
    <img
      src={tone === "light" ? "/brand/kahya-mark-light.svg" : "/brand/kahya-mark.svg"}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={className}
    />
  );
}
