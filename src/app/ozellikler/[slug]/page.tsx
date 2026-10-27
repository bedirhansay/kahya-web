import { Check, PlayCircle } from "lucide-react";
import type { Metadata } from "next";
import { Img } from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Frame } from "@/components/Frame";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TeaserLoop } from "@/components/TeaserLoop";
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
    image: { url: `/ozellikler/${f.slug}/opengraph-image`, width: 1200, height: 630, alt: f.title },
  });
}

export default async function FeaturePage({ params }: PageProps<"/ozellikler/[slug]">) {
  const { slug } = await params;
  const f = featureBySlug(slug);
  if (!f) notFound();

  const lessons = f.tutorials.map(tutorialBySlug).filter((t) => t !== undefined);
  const main = lessons[0];
  const others = features.filter((o) => o.slug !== f.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={faqLd(f.faq)} />
      <PageHero
        crumbs={[
          { name: "Özellikler", path: "/ozellikler" },
          { name: f.name, path: `/ozellikler/${f.slug}` },
        ]}
        title={f.title}
        lead={f.lead}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.app.register} className="btn btn-petrol">
            Hemen başla
          </a>
          {main && (
            <Link href={`/egitim/${main.slug}`} className="btn btn-line">
              <PlayCircle size={18} aria-hidden />
              Nasıl kullanılır, {clock(main.seconds)}
            </Link>
          )}
        </div>
      </PageHero>

      <section className="bg-paper pb-16 pt-10 md:pb-24">
        <div className="wrap">
          <Frame src={f.screen.src} alt={f.screen.alt} phone={f.screen.phone} priority sizes="(min-width: 1216px) 1152px, 100vw" />
        </div>
      </section>

      <section aria-labelledby="neler" className="bg-paper">
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <h2 id="neler" className="title lg:sticky lg:top-24">
              {f.name}: neler var?
            </h2>
          </div>
          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {f.points.map((p) => (
              <div key={p.title} className="border-t border-line pt-5">
                <dt className="flex items-start gap-2.5 font-semibold">
                  <Check size={19} className="mt-0.5 shrink-0 text-petrol" aria-hidden />
                  {p.title}
                </dt>
                <dd className="mt-2 leading-relaxed text-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {f.teaser && (
        <section aria-label={`${f.name} kısa tanıtım`} className="bg-paper">
          <div className="wrap pb-16 md:pb-24">
            <div>
              <TeaserLoop slug={f.teaser} label={`${f.name} kısa tanıtım videosu`} />
            </div>
          </div>
        </section>
      )}

      {main && (
        <section aria-labelledby="adimlar" className="border-t border-line bg-mist">
          <div className="wrap py-16 md:py-24">
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
            <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {main.lessons.slice(0, 3).map((lesson) => (
                <div key={lesson.title}>
                  <h3 className="text-lg font-semibold">{lesson.title}</h3>
                  <ol className="mt-4 space-y-2.5">
                    {lesson.steps.map((step, i) => (
                      <li key={step} className="flex gap-3 text-[0.96rem] leading-snug">
                        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white text-xs font-bold text-petrol tabular-nums ring-1 ring-line">
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

      <section aria-labelledby="sorular" className="border-t border-line bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <h2 id="sorular" className="title">
            Sorular
          </h2>
          <div>
            <Faq items={f.faq} />
          </div>
        </div>
      </section>

      <section aria-labelledby="diger" className="border-t border-line bg-paper">
        <div className="wrap py-16 md:py-20">
          <h2 id="diger" className="text-2xl font-semibold">
            Kahya’da bunlar da var
          </h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/ozellikler/${o.slug}`} className="group block">
                  <div className="frame aspect-[16/10] overflow-hidden">
                    <Img
                      src={o.screen.src}
                      alt=""
                      width={2000}
                      height={1250}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-quint)]"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold group-hover:text-petrol">{o.name}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted">{o.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
