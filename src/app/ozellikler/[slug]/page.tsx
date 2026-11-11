import { PlayCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { FeatureParts } from "@/components/FeatureParts";
import { FeatureIcon } from "@/components/FeatureIcon";
import { Frame } from "@/components/Frame";
import { JsonLd } from "@/components/JsonLd";
import { SectionJumps } from "@/components/SectionJumps";
import { featureBySlug, features } from "@/content/features";
import { clock, tutorialBySlug } from "@/content/tutorials";
import { faqLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ozellikler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = featureBySlug(slug);
  if (!f) return {};
  return pageMetadata({
    path: `/ozellikler/${f.slug}`,
    title: f.metaTitle,
    description: f.metaDescription,
    image: {
      url: `/ozellikler/${f.slug}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: f.title,
    },
  });
}

export default async function FeaturePage({ params }: PageProps<"/ozellikler/[slug]">) {
  const { slug } = await params;
  const f = featureBySlug(slug);
  if (!f) notFound();

  const lessons = f.tutorials.map(tutorialBySlug).filter((t) => t !== undefined);
  const main = lessons[0];
  const others = features.filter((o) => o.slug !== f.slug);

  return (
    <>
      <JsonLd data={faqLd(f.faq)} />
      <section className="hero-tint pb-12 pt-[104px] md:pb-16 md:pt-[120px]">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Özellikler", path: "/ozellikler" },
              { name: f.name, path: `/ozellikler/${f.slug}` },
            ]}
          />
          <h1 className="display mt-4 max-w-4xl">{f.title}</h1>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14">
            <div>
              <p className="lead text-muted">{f.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={site.app.register} className="btn btn-petrol">
                  Ücretsiz başlayın
                </a>
                {main && (
                  <Link href={`/egitim/${main.slug}`} className="btn btn-line">
                    <PlayCircle size={18} aria-hidden />
                    Nasıl kullanılır, {clock(main.seconds)}
                  </Link>
                )}
              </div>
              <SectionJumps
                items={[
                  f.parts ? { href: "#bolumler", label: "Bölümler" } : { href: "#neler", label: "Neler var" },
                  { href: "#adimlar", label: "Adım adım" },
                  { href: "#sorular", label: "Sorular" },
                ]}
              />
            </div>
            <Frame
              src={f.screen.src}
              alt={f.screen.alt}
              phone={f.screen.phone}
              priority
              sizes="(min-width: 1024px) 680px, 100vw"
            />
          </div>
        </div>
      </section>

      {f.parts ? (
        <section id="bolumler" aria-label={`${f.name}: bölümler`} className="bg-mist">
          <div className="wrap py-14 md:py-20">
            <FeatureParts parts={f.parts} label={f.name} />
          </div>
        </section>
      ) : (
        <section aria-labelledby="neler" className="bg-mist">
          <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <h2 id="neler" className="title">
              {f.name}: neler var?
            </h2>
            <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {f.points.map((p) => (
                <div key={p.title} className="border-t border-line pt-4">
                  <dt className="font-semibold">{p.title}</dt>
                  <dd className="mt-1.5 leading-relaxed text-muted">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {main && (
        <section aria-labelledby="adimlar" className="bg-surface">
          <div className="wrap py-14 md:py-20">
            <h2 id="adimlar" className="title max-w-2xl">
              Adım adım
            </h2>
            <p className="lead mt-4 max-w-2xl text-muted">
              Uygulamadaki gerçek adımlar. Tamamını{" "}
              <Link href={`/egitim/${main.slug}`} className="link">
                {main.title}
              </Link>{" "}
              eğitim videosunda izleyin.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {main.lessons.slice(0, 3).map((lesson) => (
                <div key={lesson.title}>
                  <h3 className="text-lg font-semibold">{lesson.title}</h3>
                  <ol className="mt-4 space-y-2.5">
                    {lesson.steps.map((step, i) => (
                      <li key={step} className="flex gap-3 text-[0.96rem] leading-snug">
                        <span className="grid size-7 shrink-0 place-items-center rounded-md bg-mist text-sm font-bold text-brand tabular-nums">
                          {i + 1}
                        </span>
                        <span className="pt-0.5 text-ink/85">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="sorular" className="bg-paper">
        <div className="wrap py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-16">
            <h2 id="sorular" className="title">
              Sorular
            </h2>
            <Faq items={f.faq} />
          </div>
          <div className="mt-14 md:mt-20">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <h3 className="font-display text-[1.7rem] font-bold leading-tight tracking-[-0.02em]">Diğer özellikler</h3>
              <p className="lead text-muted">Her biri diğerine bağlı; kullanmadığınızı kapatın, menüden kalksın.</p>
            </div>
            <ul className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-line">
                  <Link href={`/ozellikler/${o.slug}`} className="group flex h-full gap-4 py-5 pr-6">
                    <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-brand-50 text-brand">
                      <FeatureIcon slug={o.slug} size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold group-hover:text-brand">{o.name}</span>
                      <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-muted">{o.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand
        tex
        title={`${f.name}: kendi verinizle deneyin`}
        body="Hesabınızı açın ve bu sayfadakileri kendi kayıtlarınızla görün. Sorunuz varsa yazın."
      />
    </>
  );
}
