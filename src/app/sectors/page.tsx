import type { Metadata } from "next";
import Link from "next/link";

import { CasePanel, CaseRow, type CaseTone } from "@/components/CaseRow";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { SectionJumps } from "@/components/SectionJumps";
import { sectorBySlug } from "@/content/sectors";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/sectors",
  title: "Sektörlere göre ofis yönetim programı: 12 sektörde Kahya",
  description:
    "Toptan ticaret, inşaat, nakliye, mali müşavir, hukuk, emlak ve 6 sektör daha: her sektörde Kahya’nın hangi işi nasıl tuttuğunu görün.",
});

/** The twelve sectors, grouped by the work that fills their day; each group has its own panel colour. */
const groups: {
  id: string;
  title: string;
  lead: string;
  tone: CaseTone;
  screen: { src: string; alt: string; width?: number; height?: number };
  phone?: { src: string; alt: string };
  slugs: string[];
}[] = [
  {
    id: "alacak",
    title: "Alacak, vade ve stok",
    lead: "Satan, üreten ve servis veren işler: kimin vadesi geçti, hangi teklif kabul edildi, stok nerede?",
    tone: "cream",
    screen: { src: "/media/cozumler/stok.webp", alt: "Kahya’da ürünler ve stok miktarları. Örnek veri." },
    phone: { src: "/media/home/s4-teklif-tel.webp", alt: "Telefonda kabul edilen teklif." },
    slugs: ["wholesale-and-distribution", "manufacturing-workshops", "technical-service", "education-and-courses"],
  },
  {
    id: "saha",
    title: "Proje, saha ve personel",
    lead: "Şantiyede, yolda ve sahada çalışan ekipler: iş kimde, kim izinli, proje nerede?",
    tone: "sage",
    screen: { src: "/media/home/s5-puantaj.webp", alt: "Kahya’da devam takibi: personelin çalıştığı günler. Örnek veri." },
    phone: { src: "/media/cozumler/ofis-izinler-tel.webp", alt: "Telefonda izin talepleri." },
    slugs: ["construction-and-subcontracting", "architecture-and-engineering", "logistics-and-transport", "security-and-cleaning"],
  },
  {
    id: "musteri",
    title: "Müşteri, görüşme ve belge",
    lead: "Müşteriyle konuşarak iş yapan bürolar: en son ne konuşuldu, hangi belge nerede, hangi tarih yaklaşıyor?",
    tone: "mist",
    screen: { src: "/screens/contracts.webp", alt: "Kahya’da sözleşmeler listesi: bitiş tarihi ve kalan süre. Örnek veri.", width: 2000, height: 1250 },
    phone: { src: "/media/home/s3-gorusme-tel.webp", alt: "Telefonda müşterinin görüşmeleri." },
    slugs: ["consulting-and-agencies", "law-firms", "accounting-firms", "real-estate"],
  },
];

export default function SectorsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Sektörler", path: "/sectors" }]}
        title="Sizin gibi bir ofiste Kahya"
        lead="Aynı uygulama, farklı işler. Sektörünüzü seçin; bugün nerede takıldığınızı ve Kahya’da nasıl çözüldüğünü görün."
      >
        <SectionJumps label="Sektör grupları" items={groups.map((g) => ({ href: `#${g.id}`, label: g.title }))} />
      </PageHero>
      <section className="bg-paper">
        <div className="wrap py-12 md:py-16">
          {groups.map((g, i) => (
            <CaseRow
              key={g.id}
              id={g.id}
              flip={i % 2 === 1}
              className="lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              panel={
                <CasePanel
                  className="aspect-[16/11]"
                  tone={g.tone}
                  priority={i === 0}
                  screen={{ src: g.screen.src, alt: g.screen.alt, width: g.screen.width ?? 2400, height: g.screen.height ?? 1520 }}
                  phone={g.phone ? { ...g.phone, time: "09:30" } : undefined}
                />
              }
            >
              <h2 className="title">{g.title}</h2>
              <p className="lead mt-3 text-muted">{g.lead}</p>
              <ul className="mt-6 border-t border-line">
                {g.slugs.map((slug) => {
                  const s = sectorBySlug(slug)!;
                  return (
                    <li key={slug} className="border-b border-line">
                      <Link href={`/sectors/${slug}`} className="group grid gap-1 py-4 sm:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] sm:gap-6">
                        <span className="font-semibold group-hover:text-brand">{s.name}</span>
                        <span className="text-[0.95rem] leading-relaxed text-muted">
                          “{s.rows[0].pain}” <span className="link whitespace-nowrap">Nasıl çözülür</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CaseRow>
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
