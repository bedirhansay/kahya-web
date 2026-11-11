import { AtSign, Globe, Import } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CasePanel, CaseRow, type CaseTone } from "@/components/CaseRow";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { AddonList } from "@/components/AddonList";
import { PageHero } from "@/components/PageHero";
import { SectionJumps } from "@/components/SectionJumps";
import { Trust } from "@/components/sections/TrustAndPromises";
import { services, solutions } from "@/content/solutions";
import { pageMetadata, softwareLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/cozumler",
  title: "Çözümler: ofis yönetimi, CRM, finans ve cari",
  description:
    "Kahya üç çözümden oluşur: Ofis yönetimi, CRM (müşteri ilişkileri) ile Finans ve cari. E-posta, Stok, Teklif, Kahya AI ve Filo ihtiyacınız olduğunda eklenir. Kahya’nın ne yaptığı ve ne yapmadığı.",
});

const quote = (what: string) =>
  `/iletisim?konu=fiyat&cozum=${encodeURIComponent(what)}`;

/** The three services in src/content/solutions.ts, in order: setup and import, company e-mail, web site. */
const serviceIcons = [Import, AtSign, Globe];
const serviceTones: CaseTone[] = ["sage", "cream", "mist"];

/** Each solution's own screens from the demo office (the same shots as the home page's slides). */
const media: Record<
  string,
  { tone: CaseTone; shot: string; phone: string; alt: string; time: string }
> = {
  "ofis-yonetimi": {
    tone: "pine",
    shot: "s2-gorev",
    phone: "s2-gorev",
    alt: "görev listesi",
    time: "11:30",
  },
  crm: {
    tone: "sage",
    shot: "s3-gorusme",
    phone: "s3-gorusme",
    alt: "müşteri görüşmeleri",
    time: "14:00",
  },
  "finans-cari": {
    tone: "cream",
    shot: "s1-cari",
    phone: "s1-cari",
    alt: "cari kart",
    time: "17:45",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={softwareLd()} />
      <PageHero
        crumbs={[{ name: "Çözümler", path: "/cozumler" }]}
        title="İhtiyacınız olanı seçin, gerisi gizli kalsın"
        lead="Kahya üç çözümden oluşur. Birini, ikisini ya da üçünü birden kullanabilirsiniz; kullanmadığınız menüden kalkar."
      >
        <SectionJumps
          items={[
            ...solutions.map((s) => ({ href: `#${s.slug}`, label: s.name })),
            { href: "#ek-hizmetler", label: "Ek hizmetler" },
            { href: "#hizmetler", label: "Hizmetler" },
            { href: "#guven", label: "Verileriniz" },
          ]}
        />
      </PageHero>

      <section aria-label="Çözümler" className="bg-surface">
        <div className="wrap py-12 md:py-16">
          {solutions.map((s, i) => {
            const m = media[s.slug];
            return (
              <CaseRow
                key={s.slug}
                id={s.slug}
                flip={i % 2 === 1}
                panel={
                  <CasePanel
                    className="aspect-[16/9]"
                    tone={m.tone}
                    no={s.no}
                    priority={i === 0}
                    screen={{
                      src: `/media/home/${m.shot}.webp`,
                      alt: `Kahya ${s.name}: ${m.alt}. Örnek veri.`,
                      width: 2400,
                      height: 1520,
                    }}
                    phone={{
                      src: `/media/home/${m.phone}-tel.webp`,
                      alt: `Aynı ekran telefonda: ${m.alt}.`,
                      time: m.time,
                    }}
                  />
                }
              >
                <h2 className="title">
                  <Link
                    href={`/cozumler/${s.slug}`}
                    className="hover:text-brand"
                  >
                    {s.name}
                  </Link>
                </h2>
                {s.subtitle && (
                  <p className="mt-1 font-medium text-muted">{s.subtitle}</p>
                )}
                <p className="lead mt-4 text-muted">{s.summary}</p>
                <ul className="mt-6 grid gap-2.5">
                  {s.points.slice(0, 2).map((p) => (
                    <li key={p.term} className="border-t border-line pt-2.5">
                      <strong className="font-semibold">{p.term}:</strong>{" "}
                      <span className="text-muted">{p.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={`/cozumler/${s.slug}`} className="btn btn-petrol">
                    {s.name} çözümünü inceleyin
                  </Link>
                  <a
                    href={quote(s.name)}
                    className="link inline-flex min-h-11 items-center"
                  >
                    Fiyat talep edin
                  </a>
                </div>
              </CaseRow>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="ek-hizmetler" className="bg-mist">
        <div className="wrap py-12 md:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <h2 id="ek-hizmetler" className="title scroll-mt-28">
              Ek hizmetler
            </h2>
            <p className="lead text-muted">
              Hangi çözümü kullanırsanız kullanın, bunları da açtırabilirsiniz.
              Fiyatı{" "}
              <Link href="/fiyatlar#ek-hizmetler" className="link">
                Paketler ve fiyatlar
              </Link>{" "}
              sayfasında.
            </p>
          </div>
          <AddonList className="mt-8" />
        </div>
      </section>

      <section aria-labelledby="hizmetler" className="bg-surface">
        <div className="wrap py-12 md:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <h2 id="hizmetler" className="title scroll-mt-28">
              Hizmetler
            </h2>
            <p className="lead text-muted">
              İsterseniz bu işleri de biz yaparız. Fiyatı işe göre veririz.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((e, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              const tone = serviceTones[i % serviceTones.length];
              return (
                <li
                  key={e.name}
                  className={`case-panel case-panel-${tone} flex min-h-[17rem] flex-col p-6 sm:p-7`}
                >
                  <span className="grid size-14 place-items-center rounded-[12px] bg-surface/85 text-brand">
                    <Icon size={26} aria-hidden strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-auto pt-10 text-[1.25rem] font-bold tracking-[-0.01em]">
                    {e.name}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-ink/80">{e.body}</p>
                  <a
                    href={quote(e.name)}
                    className="link mt-3 inline-flex min-h-11 items-center"
                  >
                    {e.name} için yazın
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
            <p className="text-muted">
              Önce ne gerektiğini konuşalım; fiyatı işe göre söyleriz.
            </p>
            <Link
              href="/rehber/cari-takibi-excel-mi-program-mi"
              className="link inline-flex min-h-11 items-center"
            >
              Excel mi, program mı? Karşılaştırmayı okuyun
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-paper">
        <Trust />
      </div>
      <CtaBand
        tex
        title="Size uyan çözümü birlikte seçelim"
        body="Ofisinizin işini iki cümleyle yazın, size uyan çözümü ve ek hizmetleri söyleyelim. Hemen denemek isterseniz ücretsiz başlayın."
      />
    </>
  );
}
