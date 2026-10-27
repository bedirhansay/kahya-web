import { ArrowRight, Minus, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SectorMock } from "@/components/mock/SectorMock";
import { Points } from "@/components/Points";
import { SectionHead } from "@/components/SectionHead";
import { sectorBySlug, sectors } from "@/content/sectors";
import { solutionBySlug } from "@/content/solutions";
import { faqLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sektorler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = sectorBySlug(slug);
  if (!s) return {};
  return pageMetadata({ path: `/sektorler/${s.slug}`, title: s.seo.title, description: s.seo.description });
}

export default async function SectorPage({ params }: PageProps<"/sektorler/[slug]">) {
  const { slug } = await params;
  const s = sectorBySlug(slug);
  if (!s) notFound();
  const others = sectors.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd data={faqLd(s.faq)} />
      <section className="band-dark overflow-hidden">
        <div className="wrap grid gap-12 pb-16 pt-8 md:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:pb-24">
          <div>
            <Breadcrumbs
              dark
              items={[
                { name: "Sektörler", path: "/sektorler" },
                { name: s.name, path: `/sektorler/${s.slug}` },
              ]}
            />
            <p className="eyebrow mt-10 text-brass">Sektörünüze göre Kahya</p>
            <h1 className="title mt-4 max-w-2xl">{s.seo.h1}</h1>
            <p className="lead mt-5 max-w-xl text-white/75">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.app.register} className="btn btn-brass">
                Hemen başla
                <ArrowRight size={17} aria-hidden />
              </a>
              <Link href="/cozumler" className="btn btn-line-dark">
                Çözümleri inceleyin
              </Link>
            </div>
          </div>
          <div className="min-w-0">
            <SectorMock kind={s.mock} />
          </div>
        </div>
      </section>

      <section aria-labelledby="tanidik" className="bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHead id="tanidik" eyebrow="Tanıdık geldi mi?" title="Bugün nerede takılıyor?" />
          <ul className="divide-y divide-line border-y border-line">
            {s.pains.map((p) => (
              <li key={p} className="flex gap-3 py-4 text-[1.02rem]">
                <X size={18} className="mt-1 shrink-0 text-[#b42318]/70" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="kahya-ile" className="border-t border-line bg-white">
        <div className="wrap py-16 md:py-24">
          <SectionHead id="kahya-ile" eyebrow="Kahya ile" title={`${s.name} Kahya’yı nasıl kullanır?`} />
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {s.uses.map((u) => {
              const sol = solutionBySlug(u.solution)!;
              return (
                <li key={u.solution} className="flex flex-col rounded-[16px] border border-line bg-paper p-6">
                  <p className="eyebrow text-brass-700">
                    {sol.no} · {sol.kicker}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">
                    {sol.name}
                    {sol.subtitle && <span className="ml-2 text-sm font-medium text-muted">{sol.subtitle}</span>}
                  </h3>
                  <Points items={u.points} className="mt-4 flex-1" />
                  <Link href={`/cozumler/${sol.slug}`} className="link mt-5 inline-flex items-center gap-1.5">
                    Çözümü inceleyin <ArrowRight size={15} aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {s.addons && s.addons.length > 0 && (
              <div className="rounded-[16px] border border-line p-6">
                <p className="eyebrow text-brass-700">İşinize yarayacak ek hizmetler</p>
                <p className="mt-3 flex flex-wrap gap-2">
                  {s.addons.map((a) => (
                    <span key={a} className="rounded-md border border-line bg-paper px-2.5 py-1 text-[0.95rem] font-semibold">
                      {a}
                    </span>
                  ))}
                </p>
                <Link href="/cozumler#ek-hizmetler" className="link mt-4 inline-block text-[0.95rem]">
                  Ek hizmetler ne yapar
                </Link>
              </div>
            )}
            <div className="rounded-[16px] border border-dashed border-line p-6">
              <p className="eyebrow text-muted">Bu sektörde Kahya’nın yapmadıkları</p>
              <ul className="mt-3 space-y-1.5">
                {s.notDone.map((t) => (
                  <li key={t} className="flex gap-2.5 text-muted">
                    <Minus size={17} className="mt-0.5 shrink-0" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted">
            İhtiyacınız olmayan çözüm menüde görünmez. Sonradan bir diğerine ihtiyacınız olursa talep edersiniz.
          </p>
        </div>
      </section>

      <section aria-labelledby="sorular" className="border-t border-line bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead id="sorular" eyebrow="Sık sorulanlar" title="Sorular" />
            <p className="mt-8 text-sm font-semibold">Diğer sektörler</p>
            <ul className="mt-2 space-y-1.5">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/sektorler/${o.slug}`} className="link">
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Faq items={s.faq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
