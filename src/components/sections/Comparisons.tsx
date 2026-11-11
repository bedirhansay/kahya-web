import { SectionHead } from "@/components/SectionHead";
import { vsScattered } from "@/content/solutions";

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
                  <span>
                    <span className="font-semibold text-ink md:sr-only">Bugün: </span>
                    {before}
                  </span>
                </span>
                <span className="flex gap-2 md:bg-brand-50/60 md:px-5 md:py-4">
                  <span>
                    <span className="font-semibold text-ink md:sr-only">Kahya ile: </span>
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
