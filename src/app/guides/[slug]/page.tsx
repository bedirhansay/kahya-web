import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Article, WithContext } from "schema-dts";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Frame } from "@/components/Frame";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionJumps } from "@/components/SectionJumps";
import { featureBySlug } from "@/content/features";
import { guideBySlug, guides } from "@/content/guides";
import { absoluteUrl, faqLd, pageMetadata, SITE_URL } from "@/lib/seo";

/** A heading as an anchor id: "Seçerken bakılacak 7 şey" → "secerken-bakilacak-7-sey", the same every build. */
const anchor = (heading: string) =>
  heading
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (c) => ({ ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" })[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return pageMetadata({ path: `/guides/${g.slug}`, title: g.metaTitle, description: g.metaDescription, type: "article" });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const article: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.metaDescription,
    inLanguage: "tr-TR",
    dateModified: g.updated,
    mainEntityOfPage: absoluteUrl(`/guides/${g.slug}`),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const related = g.related.map(featureBySlug).filter((f) => f !== undefined);

  return (
    <>
      <JsonLd data={[article, faqLd(g.faq)]} />
      <PageHero
        crumbs={[
          { name: "Rehberler", path: "/guides" },
          { name: g.title, path: `/guides/${g.slug}` },
        ]}
        title={g.title}
        lead={g.answer}
      >
        <SectionJumps
          items={[
            ...g.sections.map((s) => ({ href: `#${anchor(s.heading)}`, label: s.heading })),
            { href: "#sorular", label: "Sorular" },
          ]}
        />
      </PageHero>
      <article className="bg-paper">
        <div className="wrap grid gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
          <div className="max-w-[44rem]">
            {g.sections.map((s) => (
              <section key={s.heading} id={anchor(s.heading)} className="mt-12 scroll-mt-28 first:mt-0">
                <h2 className="text-[1.6rem] font-bold leading-tight tracking-[-0.02em]">{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-4 text-[1.06rem] leading-[1.75] text-ink/85">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2.5">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-3 text-[1.06rem] leading-[1.7] text-ink/85">
                        <span aria-hidden className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-brass" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
                {s.screen && <Frame src={s.screen.src} alt={s.screen.alt} sizes="(min-width: 1024px) 704px, 100vw" className="mt-6" />}
              </section>
            ))}
            <p className="mt-12 text-sm text-muted">
              Son güncelleme: {new Date(g.updated).toLocaleDateString("tr-TR", { dateStyle: "long" })}
            </p>
          </div>
          {related.length > 0 && (
            <aside aria-labelledby="ilgili" className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="ilgili" className="font-semibold">
                Kahya&apos;da ilgili özellikler
              </h2>
              <ul className="mt-4 grid gap-2">
                {related.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/features/${f.slug}`}
                      className="block rounded-xl border border-line bg-surface px-4 py-3 hover:border-brand"
                    >
                      <span className="font-semibold">{f.name}</span>
                      <span className="mt-0.5 block text-sm text-muted">{f.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </article>
      <section aria-labelledby="sorular" className="bg-mist">
        <div className="wrap max-w-4xl py-14 md:py-20">
          <h2 id="sorular" className="title scroll-mt-28">
            Sorular
          </h2>
          <div className="mt-8">
            <Faq items={g.faq} />
          </div>
        </div>
      </section>
      <CtaBand
        tex
        title="Bu adımları kendi verinizle deneyin"
        body="Ücretsiz hesap açın ve rehberdeki adımları kendi ofisinizde izleyin. Takıldığınız yeri bize yazın."
      />
    </>
  );
}
