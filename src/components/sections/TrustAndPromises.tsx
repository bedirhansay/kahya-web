import { DatabaseBackup, Headset, RotateCcw, ShieldCheck, type LucideIcon } from "lucide-react";

import { SectionHead } from "@/components/SectionHead";
import { homeTrustLine, trust } from "@/content/solutions";

const icons: Record<string, LucideIcon> = {
  "Rol ve yetki": ShieldCheck,
  Silinenler: RotateCcw,
  "Destek erişimi": Headset,
  "Günlük yedek": DatabaseBackup,
};

/** "Verileriniz sizin, kontrol sizde": the trust facts (on /cozumler), each with its sign in a brand tile. */
export function Trust() {
  return (
    <section aria-labelledby="guven">
      <div className="wrap py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead
              id="guven"
              title="Verileriniz sizin, kontrol sizde"
              lead="Kahya’yı ekibinize güvenle açmanız için temel kurallar."
            />
            <p className="mt-6 max-w-md border-l-2 border-brand pl-4 leading-relaxed text-muted">{homeTrustLine}</p>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {trust.map((t) => {
              const Icon = icons[t.term] ?? ShieldCheck;
              return (
                <div key={t.term} className="flex gap-4 border-t border-line py-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[10px] bg-brand-50 text-brand">
                    <Icon size={22} aria-hidden strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[1.02rem] font-semibold">{t.term}</dt>
                    <dd className="mt-1 leading-relaxed text-muted">{t.text}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
