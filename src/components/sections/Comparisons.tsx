import { Check, X } from "lucide-react";

import { SectionHead } from "@/components/SectionHead";
import { vsAccounting, vsScattered } from "@/content/solutions";

/** Excel, WhatsApp and paper against Kahya, one everyday question per row. */
export function VsScattered() {
  return (
    <section aria-labelledby="karsilastir">
      <div className="wrap py-16 md:py-24">
        <SectionHead
          id="karsilastir"
          title="Excel, WhatsApp ve kâğıt yerine"
          lead="Bir ofisin her gün sorduğu sorular. Dağınık araçlarla ve Kahya ile cevabı nerede?"
        />
        <div className="mt-12 overflow-hidden rounded-2xl border border-line">
          <div className="hidden grid-cols-[1fr_1fr_1.2fr] bg-mist text-sm font-semibold md:grid">
            <span className="px-5 py-3">Soru</span>
            <span className="px-5 py-3 text-muted">Excel, WhatsApp, kâğıt</span>
            <span className="px-5 py-3 text-brass">Kahya</span>
          </div>
          <ul className="divide-y divide-line">
            {vsScattered.map(([q, before, after]) => (
              <li key={q} className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_1fr_1.2fr] md:gap-0 md:p-0">
                <span className="font-semibold md:px-5 md:py-4">{q}</span>
                <span className="flex gap-2 text-muted md:px-5 md:py-4">
                  <X size={17} className="mt-0.5 shrink-0 text-danger/80" aria-hidden />
                  <span>
                    <span className="sr-only">Excel, WhatsApp ve kâğıtla: </span>
                    {before}
                  </span>
                </span>
                <span className="flex gap-2 md:bg-brand-50/60 md:px-5 md:py-4">
                  <Check size={17} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                  <span>
                    <span className="sr-only">Kahya ile: </span>
                    {after}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** H13 §4: an honest comparison with accounting programs in general (no product named). */
export function VsAccounting() {
  return (
    <section aria-labelledby="ne-yapmaz">
      <div className="wrap py-16 md:py-24">
        <SectionHead
          id="ne-yapmaz"
          title="Kahya ne yapar, ne yapmaz"
          lead="Kahya fatura kesmez ve bankanıza bağlanmaz. Bunlar için muhasebe programınızı kullanmaya devam edersiniz; Kahya ofisin geri kalanını yönetir."
        />
        <div className="mt-12 overflow-hidden rounded-2xl border border-line">
          <div className="hidden grid-cols-[1fr_1.2fr_1fr] bg-mist text-sm font-semibold md:grid">
            <span className="px-5 py-3">Konu</span>
            <span className="px-5 py-3 text-brass">Kahya</span>
            <span className="px-5 py-3 text-muted">Ön muhasebe programları</span>
          </div>
          <ul className="divide-y divide-line">
            {vsAccounting.map(([topic, kahya, others]) => (
              <li key={topic} className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_1.2fr_1fr] md:gap-0 md:p-0">
                <span className="font-semibold md:px-5 md:py-4">{topic}</span>
                <span className="md:bg-brand-50/60 md:px-5 md:py-4">
                  <span className="font-semibold md:hidden">Kahya: </span>
                  {kahya}
                </span>
                <span className="text-muted md:px-5 md:py-4">
                  <span className="font-semibold md:hidden">Ön muhasebe programları: </span>
                  {others}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-muted">
          &quot;Ürüne göre&quot;: programdan programa değişir. e-Fatura mükellefiyseniz programınız kalır.
        </p>
      </div>
    </section>
  );
}
