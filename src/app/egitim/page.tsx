import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Img } from "@/components/Img";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { clock, tutorials } from "@/content/tutorials";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/egitim",
  title: "Eğitim videoları: Kahya nasıl kullanılır?",
  description:
    "Kahya’yı modül modül anlatan 14 eğitim videosu: başlarken, cari, ödeme planları, görevler, e-posta, personel ve izinler, talepler, raporlar, ayarlar ve Kahya AI.",
});

export default function TutorialsPage() {
  const total = tutorials.reduce((s, t) => s + t.seconds, 0);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Kahya eğitim videoları",
          itemListElement: tutorials.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/egitim/${t.slug}`),
            name: t.title,
          })),
        }}
      />
      <PageHero
        crumbs={[{ name: "Eğitim", path: "/egitim" }]}
        title="Kahya’yı adım adım öğrenin"
        lead={`${tutorials.length} bölüm, toplam ${Math.round(total / 60)} dakika. Her bölüm uygulamanın gerçek kaydı; işlemin adımları ekranın solunda numaralı olarak akar.`}
      />
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((t, i) => (
              <li key={t.slug} data-reveal="zoom" style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties}>
                <Link href={`/egitim/${t.slug}`} className="group block">
                  <div className="frame relative aspect-video overflow-hidden">
                    <Img
                      src={`/media/egitim/${t.file}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.05]"
                    />
                    <span className="absolute bottom-3 right-3 rounded-md bg-pine-950/85 px-2 py-1 text-xs font-bold text-white tabular-nums">
                      {clock(t.seconds)}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-bold text-brass-700 tabular-nums">Bölüm {t.no}</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-[-0.02em] group-hover:text-petrol">{t.title}</h2>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {t.lessons.map((l) => l.title).join(", ")}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand title="İzlediniz, şimdi deneyin" />
    </>
  );
}
