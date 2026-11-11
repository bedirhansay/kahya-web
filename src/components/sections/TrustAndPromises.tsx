import { Coins, CreditCard, DatabaseBackup, Download, KeyRound, LifeBuoy, ShieldCheck, Undo2 } from "lucide-react";

import { SectionHead } from "@/components/SectionHead";
import { homeTrustLine, promises, trust } from "@/content/solutions";

const trustIcons = [KeyRound, Undo2, ShieldCheck, DatabaseBackup];
const promiseIcons = [CreditCard, Coins, LifeBuoy, Download];

function Points({ items, icons, cols }: { items: { term: string; text: string }[]; icons: typeof trustIcons; cols: string }) {
  return (
    <dl className={`mt-12 grid gap-x-10 gap-y-9 ${cols}`}>
      {items.map((t, i) => {
        const Icon = icons[i] ?? ShieldCheck;
        return (
          <div key={t.term} className="relative min-h-10 pl-14">
            <dt className="font-semibold">
              <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-xl bg-brand-50 text-brand">
                <Icon size={19} aria-hidden />
              </span>
              {t.term}
            </dt>
            <dd className="mt-1 leading-relaxed text-muted">{t.text}</dd>
          </div>
        );
      })}
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
        <Points items={trust} icons={trustIcons} cols="sm:grid-cols-2 lg:grid-cols-4" />
        <p className="mt-10 flex gap-2 text-muted">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
          {homeTrustLine}
        </p>
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
        <Points items={promises} icons={promiseIcons} cols="sm:grid-cols-2" />
      </div>
    </section>
  );
}
