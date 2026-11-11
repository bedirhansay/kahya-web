import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { AddonPage } from "@/components/AddonPage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { CaseTone } from "@/components/CaseRow";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { FeatureIcon } from "@/components/FeatureIcon";
import { FeatureRow } from "@/components/FeatureRow";
import { JsonLd } from "@/components/JsonLd";
import {
  ApprovalTimesMock,
  CariMock,
  LeavePhoneMock,
  MailToTaskMock,
  MeetingsMock,
  MoneyHomeMock,
  PaymentPlanMock,
  RecentMeetingsMock,
  TaskSummaryMock,
} from "@/components/mock/screens";
import { SectionHead } from "@/components/SectionHead";
import { SectionJumps } from "@/components/SectionJumps";
import { addonBySlug, addons } from "@/content/addons";
import { featureBySlug } from "@/content/features";
import { sectors } from "@/content/sectors";
import { solutionBySlug, solutions, type Solution } from "@/content/solutions";
import { faqLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const visuals: Record<
  Solution["slug"],
  {
    hero: ReactNode;
    first: [ReactNode, ReactNode];
    more: [ReactNode, ReactNode, boolean];
  }
> = {
  "ofis-yonetimi": {
    hero: <TaskSummaryMock />,
    first: [<TaskSummaryMock key="a" />, <ApprovalTimesMock key="b" />],
    more: [<MailToTaskMock key="c" />, <LeavePhoneMock key="d" />, true],
  },
  crm: {
    hero: <MeetingsMock />,
    first: [<MeetingsMock key="a" />, <RecentMeetingsMock key="b" />],
    more: [<RecentMeetingsMock key="c" />, null, false],
  },
  "finans-cari": {
    hero: <CariMock />,
    first: [<MoneyHomeMock key="a" />, <CariMock key="b" />],
    more: [<PaymentPlanMock key="c" />, null, false],
  },
};

/** Feature tiles rotate the panel tones; the other two solutions keep their own tones from /cozumler. */
const featureTones: CaseTone[] = ["sage", "cream", "mist"];
const otherTones: Record<Solution["slug"], CaseTone> = { "ofis-yonetimi": "sage", crm: "cream", "finans-cari": "mist" };

export function generateStaticParams() {
  return [...solutions, ...addons].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cozumler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = addonBySlug(slug);
  if (a) return pageMetadata({ path: `/cozumler/${a.slug}`, title: a.seo.title, description: a.seo.description });
  const s = solutionBySlug(slug);
  if (!s) return {};
  return pageMetadata({
    path: `/cozumler/${s.slug}`,
    title: s.seo.title,
    description: s.seo.description,
  });
}

export default async function SolutionPage({ params }: PageProps<"/cozumler/[slug]">) {
  const { slug } = await params;
  const a = addonBySlug(slug);
  if (a) return <AddonPage a={a} />;
  const s = solutionBySlug(slug);
  if (!s) notFound();
  const v = visuals[s.slug];
  const related = s.features.map(featureBySlug).filter((f) => f !== undefined);
  const usedBy = sectors.filter((x) => x.uses.some((u) => u.solution === s.slug));
  const others = solutions.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd data={faqLd(s.faq)} />
      <section className="hero-tint overflow-hidden">
        <div className="wrap grid gap-12 pb-16 pt-8 md:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:pb-24">
          <div>
            <Breadcrumbs
              items={[
                { name: "Çözümler", path: "/cozumler" },
                { name: s.name, path: `/cozumler/${s.slug}` },
              ]}
            />
            <h1 className="display mt-4 max-w-3xl">
              {s.seo.h1}
            </h1>
            <p className="lead mt-5 max-w-xl text-muted">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.app.register} className="btn btn-brass">
                Ücretsiz başlayın
              </a>
              <a href={`/iletisim?konu=fiyat&cozum=${encodeURIComponent(s.name)}`} className="btn btn-line">
                Fiyat talep et
              </a>
            </div>
            <SectionJumps
              items={[
                { href: "#ne-yapar", label: "Ne yapar" },
                { href: "#daha-fazla", label: "Daha fazlası" },
                ...(related.length > 0 ? [{ href: "#ozellikler", label: "Neler var" }] : []),
                { href: "#sorular", label: "Sorular" },
                ...(usedBy.length > 0 ? [{ href: "#sektorler", label: "Sektörler" }] : []),
              ]}
            />
          </div>
          <div className="min-w-0">{v.hero}</div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="wrap space-y-16 py-14 md:space-y-20 md:py-20">
          <FeatureRow
            id="ne-yapar"
            title={s.title}
            lead={s.lead}
            points={s.points}
            primary={v.first[0]}
            secondary={v.first[1]}
          />
          <FeatureRow
            id="daha-fazla"
            reverse
            phone={v.more[2]}
            title={s.more.title}
            lead={s.more.lead}
            points={s.more.points}
            primary={v.more[0]}
            secondary={v.more[1] ?? undefined}
          />
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="ozellikler" className="bg-surface">
          <div className="wrap border-t border-line py-14 md:py-20">
            <SectionHead id="ozellikler" title={`${s.name} içinde neler var?`} lead="Her biri ayrı bir sayfa; dokunun, ayrıntısını okuyun." />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((f, i) => (
                <li key={f.slug}>
                  <Link
                    href={`/ozellikler/${f.slug}`}
                    className={`case-panel case-panel-${featureTones[i % featureTones.length]} group flex min-h-[14rem] flex-col p-6 transition-[filter] duration-200 hover:brightness-[0.97]`}
                  >
                    <span className="grid size-12 place-items-center rounded-[10px] bg-surface/85 text-brand">
                      <FeatureIcon slug={f.slug} size={22} className="shrink-0" />
                    </span>
                    <span className="mt-auto pt-8 text-[1.15rem] font-bold tracking-[-0.01em] group-hover:text-brand">{f.name}</span>
                    <span className="mt-1 leading-relaxed text-ink/80">{f.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="sorular" className="bg-paper">
        <div className="wrap py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
            <div>
              <SectionHead id="sorular" title={`${s.name} hakkında`} />
              <div className="mt-8">
                <Faq items={s.faq} />
              </div>
            </div>
            <div>
              <h3 className="text-[1.02rem] font-semibold">Diğer çözümler</h3>
              <ul className="mt-4 grid gap-4">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/cozumler/${o.slug}`}
                      className={`case-panel case-panel-${otherTones[o.slug]} group block p-6 transition-[filter] duration-200 hover:brightness-[0.97]`}
                    >
                      <span className="font-display text-[0.95rem] font-bold text-ink/50">{o.no}</span>
                      <span className="mt-2 block text-[1.2rem] font-bold tracking-[-0.01em] group-hover:text-brand">{o.name}</span>
                      <span className="mt-1 block leading-relaxed text-ink/80">{o.summary}</span>
                      <span className="link mt-3 inline-flex min-h-11 items-center">{o.name} çözümünü inceleyin</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {usedBy.length > 0 && (
            <div id="sektorler" className="mt-14 scroll-mt-28 md:mt-20">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
                <h3 className="font-display text-[1.7rem] font-bold leading-tight tracking-[-0.02em]">Bu çözümü kullanan sektörler</h3>
                <p className="lead text-muted">Her sektörün sayfasında bugün nerede takıldığı ve Kahya’da nasıl çözüldüğü yazar.</p>
              </div>
              <ul className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
                {usedBy.map((x) => (
                  <li key={x.slug} className="border-b border-line">
                    <Link href={`/sektorler/${x.slug}`} className="group block min-h-full py-5 pr-6">
                      <span className="block font-semibold group-hover:text-brand">{x.name}</span>
                      <span className="mt-1 block text-[0.95rem] leading-relaxed text-muted">{x.lead}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        tex
        title={`${s.name} ile başlayın`}
        body="Hesabınızı açın; ilk 30 gün Kurumsal paket açık. Kurulumu birlikte yapmak isterseniz bize yazın."
      />
    </>
  );
}
