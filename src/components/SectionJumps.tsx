export type Jump = { href: string; label: string };

/**
 * The row of section links under an inner page's opening: the same chips on every page, so a visitor learns once
 * where the page's parts are. On phones it scrolls sideways in one line instead of wrapping into three.
 */
export function SectionJumps({ items, label = "Bu sayfada" }: { items: Jump[]; label?: string }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label={label} className="mt-8 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:px-0">
      <ul className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
        {items.map((j) => (
          <li key={j.href}>
            <a href={j.href} className="jump whitespace-nowrap">
              {j.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
