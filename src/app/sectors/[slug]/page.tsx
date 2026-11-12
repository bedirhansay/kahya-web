import { X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CasePanel, type CaseTone } from "@/components/CaseRow";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SectionJumps } from "@/components/SectionJumps";
import { addons } from "@/content/addons";
import { sectorBySlug, sectors } from "@/content/sectors";
import { faqLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const tones: CaseTone[] = ["sage", "cream", "pine", "mist"];

/** Each sector opens on the real demo-office screen of the work it does most (no drawn mock-ups). */
const shots: Record<string, { src: string; alt: string; label: string; phone?: string; width?: number; height?: number }> = {
  task: { src: "/media/home/s2-gorev.webp", alt: "Kahya’da görev listesi. Örnek veri.", label: "görevler", phone: "/media/home/s2-gorev-tel.webp" },
  meetings: { src: "/media/home/s3-gorusme.webp", alt: "Kahya’da müşteri görüşmeleri. Örnek veri.", label: "görüşmeler", phone: "/media/home/s3-gorusme-tel.webp" },
  plan: { src: "/media/cozumler/finans-planlar.webp", alt: "Kahya’da tahsilat planları: sıradaki taksit, tahsil edilen ve kalan. Örnek veri.", label: "tahsilat planları" },
  cariList: { src: "/media/ozellikler/cari-liste.webp", alt: "Kahya’da cari listesi: her müşterinin bakiyesi. Örnek veri.", label: "cari listesi", height: 906 },
  package: { src: "/screens/package.webp", alt: "Kahya’da mali müşavir paketi: ayın kayıtları tek dosyada. Örnek veri.", label: "mali müşavir paketi", width: 2000, height: 1250 },
  offer: { src: "/media/home/s4-teklif.webp", alt: "Kahya’da müşterinin kabul ettiği teklif. Örnek veri.", label: "teklif", phone: "/media/home/s4-teklif-tel.webp" },
  cari: { src: "/media/home/s1-cari.webp", alt: "Kahya’da cari kart: bakiye, vade ve taksitler. Örnek veri.", label: "cari kart", phone: "/media/home/s1-cari-tel.webp" },
  stock: { src: "/media/cozumler/stok.webp", alt: "Kahya’da ürünler ve stok miktarları. Örnek veri.", label: "stok" },
  approvals: { src: "/media/home/s5-puantaj.webp", alt: "Kahya’da devam takibi: personelin çalıştığı günler. Örnek veri.", label: "devam takibi", phone: "/media/home/s5-puantaj-tel.webp" },
  fleet: { src: "/media/cozumler/filo.webp", alt: "Kahya’da araç ve sefer kârlılığı. Örnek veri.", label: "filo" },
  project: { src: "/screens/project.webp", alt: "Kahya proje detayı: ilerleme, bütçe, ekip ve görevler. Örnek veri.", label: "proje", width: 2000, height: 1250 },
  contracts: { src: "/screens/contracts.webp", alt: "Kahya sözleşmeler listesi: bitiş tarihi ve kalan süre. Örnek veri.", label: "sözleşmeler", width: 2000, height: 1250 },
};

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sectors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = sectorBySlug(slug);
  if (!s) return {};
  return pageMetadata({
    path: `/sectors/${s.slug}`,
    title: s.seo.title,
    description: s.seo.description,
  });
}

export default async function SectorPage({ params }: PageProps<"/sectors/[slug]">) {
  const { slug } = await params;
  const s = sectorBySlug(slug);
  if (!s) notFound();
  const others = sectors.filter((o) => o.slug !== s.slug);
  const faq = [
    ...s.faq,
    {
      q: "Kahya’da bu işler için neler yok?",
      a: `Şunlar Kahya’da yok: ${s.notDone.join("; ")}. Bunlar için kullandığınız programla devam edersiniz; Kahya ofisin iş, cari ve personel tarafını tutar.`,
    },
  ];

  const m = shots[s.mock];
  const tone = tones[sectors.indexOf(s) % tones.length];

  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <section className="hero-tint pb-14 pt-[104px] md:pb-20 md:pt-[120px]">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <Breadcrumbs
              items={[
                { name: "Sektörler", path: "/sectors" },
                { name: s.name, path: `/sectors/${s.slug}` },
              ]}
            />
            <h1 className="display mt-4 max-w-3xl">{s.seo.h1}</h1>
            <p className="lead mt-5 max-w-xl text-muted">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.app.register} className="btn btn-brass">
                Ücretsiz başlayın
              </a>
              <Link href="/solutions" className="btn btn-line">
                Çözümleri inceleyin
              </Link>
            </div>
            <SectionJumps
              items={[
                { href: "#sorun-cozum", label: "Sorun ve çözüm" },
                { href: "#sorular", label: "Sorular" },
              ]}
            />
          </div>
          <CasePanel
            tone={tone}
            priority
            screen={{ src: m.src, alt: m.alt, width: m.width ?? 2400, height: m.height ?? 1520 }}
            phone={m.phone ? { src: m.phone, alt: `Aynı ekran telefonda: ${m.label}.`, time: "10:30" } : undefined}
          />
        </div>
      </section>

      <section aria-labelledby="sorun-cozum" className="bg-surface">
        <div className="wrap py-14 md:py-20">
          <h2 id="sorun-cozum" className="title max-w-3xl">
            Bugün nerede takılıyor, Kahya’da nasıl çözülür?
          </h2>
          <div className="mt-8 hidden grid-cols-2 gap-16 border-b border-line pb-3 text-sm font-semibold text-muted md:grid">
            <span>Bugün</span>
            <span>Kahya ile</span>
          </div>
          <ul>
            {s.rows.map((r) => (
              <li key={r.term} className="grid gap-2 border-b border-line py-5 md:grid-cols-2 md:gap-16">
                <p className="flex gap-3 text-[1.02rem]">
                  <X size={18} className="mt-1 shrink-0 text-danger/70" aria-hidden />
                  {r.pain}
                </p>
                <p className="pl-[30px] leading-relaxed md:pl-0">
                  <Link href={r.href} className="font-bold hover:text-brand">
                    {r.term}
                  </Link>
                  : {r.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 max-w-3xl leading-relaxed">
            {s.addons && s.addons.length > 0 && (
              <p>
                <span className="font-semibold">İşinize yarayacak ek hizmetler: </span>
                {s.addons.map((name, i) => {
                  const a = addons.find((x) => x.name === name);
                  return (
                    <span key={name}>
                      {i > 0 && ", "}
                      {a ? (
                        <Link href={`/solutions/${a.slug}`} className="link">
                          {name}
                        </Link>
                      ) : (
                        name
                      )}
                    </span>
                  );
                })}
                .
              </p>
            )}
            <p className="mt-2 text-sm text-muted">
              İhtiyacınız olmayan çözüm menüde görünmez. Sonradan bir diğerine ihtiyacınız olursa talep edersiniz.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="sorular" className="bg-mist">
        <div className="wrap py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-16">
            <h2 id="sorular" className="title">
              Sorular
            </h2>
            <Faq items={faq} />
          </div>
          <div className="mt-14 md:mt-20">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <h3 className="font-display text-[1.7rem] font-bold leading-tight tracking-[-0.02em]">Diğer sektörler</h3>
              <p className="lead text-muted">Aynı uygulama, farklı işler; sizinkine en yakın olanı açın.</p>
            </div>
            <ul className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-line">
                  <Link href={`/sectors/${o.slug}`} className="group block h-full py-5 pr-6">
                    <span className="block font-semibold group-hover:text-brand">{o.name}</span>
                    <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-muted">{o.lead}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand
        tex
        title={`${s.tab} için Kahya’yı kurun`}
        body="Hesap açın, ilk kaydı bugün girin. Eski kayıtlarınızı Excel’den taşımak isterseniz bize yazın."
      />
    </>
  );
}
