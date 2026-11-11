import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { AddonPage } from "@/components/AddonPage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
        <section aria-labelledby="ozellikler" className="bg-mist">
          <div className="wrap py-14 md:py-20">
            <SectionHead id="ozellikler" title={`${s.name} içinde neler var?`} />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/ozellikler/${f.slug}`}
                    className="group flex h-full flex-col rounded-[14px] border border-line p-5 hover:border-brand"
                  >
                    <span className="flex items-center gap-2.5 font-semibold group-hover:text-brand">
                      <FeatureIcon slug={f.slug} size={18} className="shrink-0 text-brand" />
                      {f.name}
                    </span>
                    <span className="mt-1 text-[0.95rem] text-muted">{f.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="sorular" className="bg-paper">
        <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead id="sorular" title={`${s.name} hakkında`} />
            {usedBy.length > 0 && (
              <div className="mt-8">
                <p className="text-sm font-semibold">Bu çözümü kullanan sektörler</p>
                <ul className="mt-2 space-y-1.5">
                  {usedBy.map((x) => (
                    <li key={x.slug}>
                      <Link href={`/sektorler/${x.slug}`} className="link">
                        {x.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-8 text-sm font-semibold">Diğer çözümler</p>
            <ul className="mt-2 space-y-1.5">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/cozumler/${o.slug}`} className="link">
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Faq items={s.faq} />
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
