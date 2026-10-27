import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

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
import { featureBySlug } from "@/content/features";
import { sectors } from "@/content/sectors";
import { solutionBySlug, solutions, type Solution } from "@/content/solutions";
import { faqLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const visuals: Record<Solution["slug"], { hero: ReactNode; first: [ReactNode, ReactNode]; more: [ReactNode, ReactNode, boolean] }> = {
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
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cozumler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) return {};
  return pageMetadata({ path: `/cozumler/${s.slug}`, title: s.seo.title, description: s.seo.description });
}

export default async function SolutionPage({ params }: PageProps<"/cozumler/[slug]">) {
  const { slug } = await params;
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
            <p className="eyebrow mt-10 text-brand">
              {s.subtitle ? `${s.name}, ${s.subtitle}` : s.name}
            </p>
            <h1 className="title mt-4 max-w-2xl">{s.seo.h1}</h1>
            <p className="lead mt-5 max-w-xl text-muted">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.app.register} className="btn btn-brass">
                Hemen başla
                <ArrowRight size={17} aria-hidden />
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Kahya fiyat talebi: ${s.name}`)}`}
                className="btn btn-line"
              >
                Fiyat talep et
              </a>
            </div>
          </div>
          <div className="min-w-0">{v.hero}</div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap space-y-24 py-20 md:space-y-32 md:py-28">
          <FeatureRow
            id="ne-yapar"
            eyebrow={s.kicker}
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
            eyebrow={s.name}
            title={s.more.title}
            lead={s.more.lead}
            points={s.more.points}
            primary={v.more[0]}
            secondary={v.more[1] ?? undefined}
          />
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="ozellikler" className="bg-white">
          <div className="wrap py-16 md:py-24">
            <SectionHead id="ozellikler" eyebrow="Özellikler" title={`${s.name} içinde neler var?`} />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((f) => (
                <li key={f.slug}>
                  <Link href={`/ozellikler/${f.slug}`} className="group flex h-full flex-col rounded-[14px] border border-line p-5 hover:border-petrol">
                    <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand">
                      <FeatureIcon slug={f.slug} size={18} />
                    </span>
                    <span className="mt-4 font-semibold group-hover:text-petrol">{f.name}</span>
                    <span className="mt-1 text-[0.95rem] text-muted">{f.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="sorular" className="bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead id="sorular" eyebrow="Sık sorulanlar" title={`${s.name} hakkında`} />
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
          </div>
          <Faq items={s.faq} />
        </div>
      </section>

      <section aria-labelledby="diger" className="bg-white">
        <div className="wrap py-16 md:py-20">
          <SectionHead id="diger" eyebrow="Üç çözüm, tek uygulama" title="Diğer çözümler" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/cozumler/${o.slug}`} className="group block rounded-[14px] border border-line p-6 hover:border-petrol">
                  <span className="eyebrow text-brand">
                    {o.kicker}
                  </span>
                  <span className="mt-2 block text-xl font-bold group-hover:text-petrol">
                    {o.name}
                    {o.subtitle && <span className="ml-2 text-sm font-medium text-muted">{o.subtitle}</span>}
                  </span>
                  <span className="mt-1 block text-muted">{o.summary}</span>
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
