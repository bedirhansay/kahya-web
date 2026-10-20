import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { pricingFaq } from "@/content/faq";
import { cn } from "@/lib/cn";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";
import { formatTry, plans, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/fiyatlar",
  title: "Fiyatlar: ücretsiz plan ve 399 ₺’den başlayan paketler",
  description:
    "Kahya fiyatları: Ücretsiz plan, Başlangıç 399 ₺/ay (3 kullanıcı), Ekip 699 ₺/ay (10 kullanıcı), Büyüyen 1.499 ₺/ay (25 kullanıcı) ve Kurumsal. Ücretli planlar 30 gün ücretsiz.",
});

type Cell = boolean | string;
const matrix: { label: string; values: [Cell, Cell, Cell, Cell, Cell] }[] = [
  { label: "Kullanıcı", values: ["1", "3", "10", "25", "Sınırsız"] },
  { label: "Dosya alanı", values: ["200 MB", "5 GB", "20 GB", "50 GB", "Sınırsız"] },
  { label: "Cari", values: ["50", "Sınırsız", "Sınırsız", "Sınırsız", "Sınırsız"] },
  { label: "Personel", values: ["3", "Sınırsız", "Sınırsız", "Sınırsız", "Sınırsız"] },
  { label: "Şube", values: ["1", "Sınırsız", "Sınırsız", "Sınırsız", "Sınırsız"] },
  { label: "Görevler, projeler, takvim, toplantılar", values: [true, true, true, true, true] },
  { label: "Duyurular, talepler ve onaylar", values: [true, true, true, true, true] },
  { label: "Ödeme planları", values: [false, true, true, true, true] },
  { label: "İzin ve devam takibi", values: [false, true, true, true, true] },
  { label: "Dokümanlar ve sözleşmeler", values: [false, true, true, true, true] },
  { label: "Demirbaş ve zimmet", values: [false, true, true, true, true] },
  { label: "Gelişmiş raporlar", values: [false, true, true, true, true] },
  { label: "Dışa aktarma (Excel, PDF)", values: [false, true, true, true, true] },
  { label: "Filo modülü", values: [false, "Ek modül", "Ek modül", "Ek modül", true] },
  { label: "Öncelikli destek", values: [false, false, false, false, true] },
];

function Value({ v }: { v: Cell }) {
  if (v === true) return <Check size={18} className="mx-auto text-petrol" aria-label="Var" />;
  if (v === false) return <Minus size={18} className="mx-auto text-muted/60" aria-label="Yok" />;
  return <span className="tabular-nums">{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[softwareLd(), faqLd(pricingFaq)]} />
      <PageHero
        crumbs={[{ name: "Fiyatlar", path: "/fiyatlar" }]}
        title="Ekibiniz kadar ödeyin."
        lead="Ücretli planlarda tüm temel modüller ve sınırsız kayıt var; planları yalnızca kullanıcı sayısı ve dosya alanı ayırır. Her ücretli plan 30 gün ücretsiz denenir."
      />

      <section aria-label="Planlar" className="bg-paper">
        <div className="wrap -mt-8 pb-16 md:pb-24">
          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {plans.map((p) => {
              const featured = p.slug === "pro";
              return (
                <li
                  key={p.slug}
                  id={p.slug}
                  className={cn(
                    "flex scroll-mt-24 flex-col rounded-[var(--radius-frame)] border bg-white p-6",
                    featured ? "border-petrol ring-1 ring-petrol" : "border-line",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-extrabold">{p.name}</h2>
                    {featured && (
                      <span className="rounded-md bg-mist px-2 py-0.5 text-xs font-bold text-petrol">Önerilen</span>
                    )}
                  </div>
                  <p className="mt-2 min-h-[4.2rem] text-[0.93rem] text-muted">{p.summary}</p>
                  <p className="mt-5 text-[2.1rem] font-extrabold tracking-[-0.035em] tabular-nums">
                    {p.monthly === null ? "Teklif" : formatTry(p.monthly)}
                    {p.monthly ? <span className="ml-1 text-base font-semibold text-muted">/ay</span> : null}
                  </p>
                  <p className="mt-1 min-h-5 text-sm text-muted">
                    {p.yearly ? `Yıllık ${formatTry(p.yearly)}` : p.monthly === 0 ? "Süre sınırı yok" : "Sözleşmeye özel"}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-[0.93rem]">
                    <li className="flex gap-2.5 font-semibold">
                      <Check size={17} className="mt-0.5 shrink-0 text-petrol" aria-hidden />
                      {p.users === null ? "Sınırsız kullanıcı" : p.users === 1 ? "1 kullanıcı" : `${p.users} kullanıcı`}
                    </li>
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <Check size={17} className="mt-0.5 shrink-0 text-petrol" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {p.monthly === null ? (
                    <a
                      href={`mailto:${site.email}?subject=Kahya%20Kurumsal%20plan`}
                      className="btn btn-line mt-7 w-full"
                    >
                      Teklif isteyin
                    </a>
                  ) : (
                    <a href={site.app.register} className={cn("btn mt-7 w-full", featured ? "btn-petrol" : "btn-line")}>
                      {p.trialDays ? "Ücretsiz deneyin" : "Ücretsiz başla"}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-sm text-muted">Fiyatlar Türk lirasıdır. Kahya AI ayrı açılan bir eklentidir.</p>
        </div>
      </section>

      <section aria-labelledby="karsilastir" className="border-t border-line bg-paper">
        <div className="wrap py-16 md:py-24">
          <h2 id="karsilastir" className="title">
            Planları karşılaştırın
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-[0.95rem]">
              <caption className="sr-only">Kahya planlarının özellik karşılaştırması</caption>
              <thead>
                <tr className="border-b-2 border-ink text-left">
                  <th scope="col" className="py-3 pr-4 font-extrabold">
                    Özellik
                  </th>
                  {plans.map((p) => (
                    <th key={p.slug} scope="col" className="w-[13%] px-2 py-3 text-center font-extrabold">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th scope="row" className="py-3.5 pr-4 text-left font-semibold">
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-2 py-3.5 text-center">
                        <Value v={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="sorular" className="border-t border-line bg-mist">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <h2 id="sorular" className="title">
            Fiyat soruları
          </h2>
          <Faq items={pricingFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
