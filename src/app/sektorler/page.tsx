import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { sectorBySlug } from "@/content/sectors";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/sektorler",
  title: "Sektörler: toptan ticaret, inşaat, nakliye, mali müşavir ve daha fazlası için Kahya",
  description:
    "Kahya’nın toptan ticaret, inşaat, lojistik, güvenlik ve temizlik, mali müşavir, eğitim, hukuk, üretim atölyesi, danışmanlık, mimarlık, emlak ve teknik servis firmalarında nasıl kullanıldığını görün.",
});

/** The twelve sectors, grouped by the work that fills their day; each group has its own panel colour. */
const groups = [
  {
    id: "alacak",
    title: "Alacak, vade ve stok",
    tone: "case-panel-cream",
    slugs: ["toptan-ticaret-ve-dagitim", "uretim-atolyesi", "teknik-servis", "egitim-ve-kurs"],
  },
  {
    id: "saha",
    title: "Proje, saha ve personel",
    tone: "case-panel-sage",
    slugs: ["insaat-ve-taseron", "mimarlik-ve-muhendislik", "lojistik-ve-nakliye", "guvenlik-ve-temizlik"],
  },
  {
    id: "musteri",
    title: "Müşteri, görüşme ve belge",
    tone: "case-panel-mist",
    slugs: ["danismanlik-ve-ajans", "hukuk-burosu", "mali-musavir-burosu", "emlak-ofisi"],
  },
];

export default function SectorsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Sektörler", path: "/sektorler" }]}
        title="Sizin gibi bir ofiste Kahya"
        lead="Aynı uygulama, farklı işler. Sektörünüzü seçin; bugün nerede takıldığınızı ve Kahya’da nasıl çözüldüğünü görün."
      >
        <nav aria-label="Sektör grupları" className="mt-8 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="jump">
              {g.title}
            </a>
          ))}
        </nav>
      </PageHero>
      <section className="bg-paper">
        <div className="wrap grid gap-12 py-12 md:gap-16 md:py-20">
          {groups.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-24">
              <h2 className="title">{g.title}</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {g.slugs.map((slug) => {
                  const s = sectorBySlug(slug)!;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/sektorler/${slug}`}
                        className={cn("group flex h-full flex-col rounded-[14px] p-6", g.tone)}
                      >
                        <h3 className="text-xl font-bold tracking-[-0.02em] group-hover:text-brand">{s.name}</h3>
                        <p className="mt-3 flex-1 leading-relaxed text-muted">“{s.rows[0].pain}”</p>
                        <span className="link mt-5 text-sm">Kahya’da nasıl çözülür</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand
        tex
        title="Sektörünüz listede yok mu?"
        body="İşinizi birkaç cümleyle anlatın, Kahya’yı nasıl kuracağınızı birlikte konuşalım."
      />
    </>
  );
}
