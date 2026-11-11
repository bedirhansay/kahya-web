import { SectionHead } from "@/components/SectionHead";
import { homeTrustLine, promises, trust } from "@/content/solutions";

/** Ruled term/text rows: the facts read like a list of rules, not a row of icon tiles. */
function Points({ items, cols }: { items: { term: string; text: string }[]; cols: string }) {
  return (
    <dl className={`mt-10 grid gap-x-10 ${cols}`}>
      {items.map((t) => (
        <div key={t.term} className="border-t border-line py-5">
          <dt className="font-semibold">{t.term}</dt>
          <dd className="mt-1 leading-relaxed text-muted">{t.text}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "Verileriniz sizin, kontrol sizde": the trust facts (on /cozumler). */
export function Trust() {
  return (
    <section aria-labelledby="guven">
      <div className="wrap py-16 md:py-24">
        <SectionHead
          id="guven"
          title="Verileriniz sizin, kontrol sizde"
          lead="Kahya’yı ekibinize güvenle açmanız için temel kurallar."
        />
        <Points items={trust} cols="sm:grid-cols-2 lg:grid-cols-4" />
        <p className="mt-6 text-muted">{homeTrustLine}</p>
      </div>
    </section>
  );
}

/** "Size söz verdiklerimiz": the four promises (on /fiyatlar, beside the packages they are about). */
export function Promises() {
  return (
    <section aria-labelledby="soz">
      <div className="wrap py-16 md:py-24">
        <SectionHead id="soz" title="Size söz verdiklerimiz" />
        <Points items={promises} cols="sm:grid-cols-2" />
      </div>
    </section>
  );
}
