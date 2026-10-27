"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/cn";

type Key = "ofis" | "crm" | "finans";

const cards: { key: Key; no: string; kicker: string; name: string; sub?: string; items: string[]; addon?: string }[] = [
  { key: "ofis", no: "01", kicker: "Ekip ve işleyiş", name: "Ofis Yönetimi", items: ["Ekip", "Görev", "İzin", "Onay"] },
  { key: "crm", no: "02", kicker: "Müşteri ve görüşme", name: "CRM", sub: "Müşteri İlişkileri", items: ["Görüşme", "Takip günü"], addon: "Teklif" },
  { key: "finans", no: "03", kicker: "Ön muhasebe", name: "Finans & Cari", items: ["Cari", "Tahsilat", "Taksit", "Alacak raporu"] },
];

// The app's menu, grouped by the solution that brings each entry.
const menu: { label: string; of?: Key }[] = [
  { label: "Ana Sayfa" },
  { label: "Görevler ve projeler", of: "ofis" },
  { label: "Takvim", of: "ofis" },
  { label: "Personel ve izinler", of: "ofis" },
  { label: "Talepler", of: "ofis" },
  { label: "Dokümanlar", of: "ofis" },
  { label: "Müşteriler", of: "crm" },
  { label: "Görüşmeler", of: "crm" },
  { label: "Cariler", of: "finans" },
  { label: "Tahsilat ve ödemeler", of: "finans" },
  { label: "Ödeme planları", of: "finans" },
  { label: "Raporlar" },
];

/** Pick solutions and watch the menu narrow: "İhtiyacınız olanı seçin, gerisi gizli kalsın." */
export function SolutionPicker() {
  const [on, setOn] = useState<Record<Key, boolean>>({ ofis: true, crm: false, finans: true });
  const toggle = (k: Key) =>
    setOn((prev) => {
      const next = { ...prev, [k]: !prev[k] };
      return Object.values(next).some(Boolean) ? next : prev;
    });

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
      <ul className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <li key={c.key}>
            <button
              type="button"
              aria-pressed={on[c.key]}
              onClick={() => toggle(c.key)}
              className={cn(
                "card-dark flex h-full w-full flex-col p-5 text-left transition-[opacity,border-color] duration-200",
                on[c.key] ? "border-brass/80 opacity-100" : "opacity-55 hover:opacity-80",
              )}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="eyebrow text-brass">
                  {c.no} · {c.kicker}
                </span>
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full border",
                    on[c.key] ? "border-brass bg-brass text-pine-950" : "border-white/30",
                  )}
                >
                  {on[c.key] && <Check size={14} strokeWidth={3} />}
                </span>
              </span>
              <span className="mt-4 text-2xl font-bold tracking-[-0.02em]">{c.name}</span>
              {c.sub && <span className="text-sm text-white/65">{c.sub}</span>}
              <span className="mt-4 block border-t border-white/12 pt-4">
                {c.items.map((i) => (
                  <span key={i} className="flex items-center gap-2 py-0.5 text-white/85">
                    <span className="size-1 rounded-full bg-sage" />
                    {i}
                  </span>
                ))}
                {c.addon && (
                  <span className="flex items-center gap-2 py-0.5 text-white/85">
                    <span className="size-1 rounded-full bg-sage" />
                    {c.addon} <span className="tag tag-dark">Ek hizmet</span>
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <figure aria-label="Seçime göre sadeleşen menü" className="rounded-[14px] border border-white/12 bg-pine-900/70 p-4">
        <figcaption className="eyebrow text-white/50">Menünüz</figcaption>
        <ul className="mt-3 space-y-0.5 text-[0.95rem]" aria-live="polite">
          {menu
            .filter((m) => !m.of || on[m.of])
            .map((m) => (
              <li key={m.label} className="rounded-md px-2.5 py-1.5 text-white/85 first:bg-white/8 first:text-white">
                {m.label}
              </li>
            ))}
        </ul>
        <p className="mt-3 border-t border-white/10 pt-3 text-[0.8rem] text-white/50">
          Kartlara dokunun. Seçmediğiniz çözüm menüde görünmez.
        </p>
      </figure>
    </div>
  );
}
