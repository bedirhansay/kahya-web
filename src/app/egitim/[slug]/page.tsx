import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { VideoPlayer } from "@/components/VideoPlayer";
import { features } from "@/content/features";
import { anchor, clock, tutorialBySlug, tutorialDescription, tutorials } from "@/content/tutorials";
import { pageMetadata, videoLd } from "@/lib/seo";

export function generateStaticParams() {
  return tutorials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/egitim/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = tutorialBySlug(slug);
  if (!t) return {};
  return pageMetadata({
    path: `/egitim/${t.slug}`,
    title: `${t.title}, eğitim videosu`,
    description: tutorialDescription(t),
    type: "video.other",
    image: { url: `/egitim/${t.slug}/opengraph-image`, width: 1200, height: 630, alt: t.title },
  });
}

export default async function TutorialPage({ params }: PageProps<"/egitim/[slug]">) {
  const { slug } = await params;
  const t = tutorialBySlug(slug);
  if (!t) notFound();
  const index = tutorials.indexOf(t);
  const prev = tutorials[index - 1];
  const next = tutorials[index + 1];
  const related = features.filter((f) => f.tutorials.includes(t.slug));

  return (
    <>
      <JsonLd
        data={videoLd({
          name: `Kahya eğitimi: ${t.title}`,
          description: tutorialDescription(t),
          seconds: t.seconds,
          contentUrl: `/media/egitim/${t.file}.mp4`,
          thumbnailUrl: `/media/egitim/${t.file}.webp`,
          pagePath: `/egitim/${t.slug}`,
          transcript: t.lessons.map((l) => `${l.title}: ${l.steps.join(". ")}.`).join("\n"),
        })}
      />
      <PageHero
        crumbs={[
          { name: "Eğitim", path: "/egitim" },
          { name: t.title, path: `/egitim/${t.slug}` },
        ]}
        title={t.title}
        lead={`Bölüm ${t.no} · ${clock(t.seconds)} · ${t.lessons.length} işlem`}
      />
      <section className="bg-pine-950 pb-16 md:pb-20">
        <div className="wrap">
          <VideoPlayer
            src={`/media/egitim/${t.file}.mp4`}
            poster={`/media/egitim/${t.file}.webp`}
            title={t.title}
            duration={clock(t.seconds)}
            priority
          />
        </div>
      </section>
      <section aria-labelledby="adimlar" className="bg-paper">
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
          <div>
            <h2 id="adimlar" className="title">
              Bu bölümde
            </h2>
            <ul className="mt-6 space-y-2 text-[0.96rem]">
              {t.lessons.map((l) => (
                <li key={l.title}>
                  <a href={`#${anchor(l.title)}`} className="link">
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
            {related.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-bold text-muted">İlgili özellikler</h3>
                <ul className="mt-3 space-y-2">
                  {related.map((f) => (
                    <li key={f.slug}>
                      <Link href={`/ozellikler/${f.slug}`} className="link">
                        {f.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-12">
            {t.lessons.map((l) => (
              <article key={l.title} id={anchor(l.title)} className="scroll-mt-24 border-t border-line pt-6">
                <h3 className="text-xl font-extrabold tracking-[-0.02em]">{l.title}</h3>
                <ol className="mt-5 space-y-3">
                  {l.steps.map((step, i) => (
                    <li key={step} className="flex gap-3.5 leading-snug">
                      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-mist text-sm font-bold text-petrol tabular-nums">
                        {i + 1}
                      </span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>
      <nav aria-label="Bölümler" className="border-t border-line bg-paper">
        <div className="wrap grid gap-4 py-10 sm:grid-cols-2">
          {prev ? (
            <Link href={`/egitim/${prev.slug}`} className="group rounded-[var(--radius-frame)] border border-line p-5 hover:border-sage">
              <span className="text-sm text-muted">Önceki bölüm</span>
              <span className="mt-1 block font-extrabold group-hover:text-petrol">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/egitim/${next.slug}`}
              className="group rounded-[var(--radius-frame)] border border-line p-5 text-right hover:border-sage"
            >
              <span className="text-sm text-muted">Sonraki bölüm</span>
              <span className="mt-1 block font-extrabold group-hover:text-petrol">{next.title}</span>
            </Link>
          )}
        </div>
      </nav>
      <CtaBand title="Kendi ofisinizde deneyin." />
    </>
  );
}
