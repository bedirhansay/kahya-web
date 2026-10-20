import { Plus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.06rem] font-bold [&::-webkit-details-marker]:hidden">
            <h3>{item.q}</h3>
            <Plus
              size={20}
              className="mt-1 shrink-0 text-petrol transition-transform duration-200 group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
