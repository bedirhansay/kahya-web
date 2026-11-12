import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddonPage } from "@/components/AddonPage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CasePanel, type CaseScreen, type CaseTone } from "@/components/CaseRow";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { FeatureIcon } from "@/components/FeatureIcon";
import { FeatureRow } from "@/components/FeatureRow";
import { JsonLd } from "@/components/JsonLd";
import { SectionHead } from "@/components/SectionHead";
import { SectionJumps } from "@/components/SectionJumps";
import { addonBySlug, addons } from "@/content/addons";
import { featureBySlug } from "@/content/features";
import { sectors } from "@/content/sectors";
import { solutionBySlug, solutions, type Solution } from "@/content/solutions";
import { faqLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Phone = { src: string; alt: string; time: string };
const shot = (src: string, alt: string, width = 2400, height = 1520): CaseScreen => ({ src, alt, width, height });

/**
 * Real screens from the demo office (sample names, small amounts): the hero carries a desktop screen with a phone,
 * the two rows below one desktop screen each.
 */
const visuals: Record<
  Solution["slug"],
  { tone: CaseTone; hero: CaseScreen; phone: Phone; first: CaseScreen; more: CaseScreen }
> = {
  "office-management": {
    tone: "pine",
    hero: shot("/media/home/s2-gorev.webp", "Görevler: sorumlusu ve bitiş tarihiyle iş listesi"),
    phone: { src: "/media/cozumler/ofis-izinler-tel.webp", alt: "Telefonda İzinler: bekleyen izin talepleri", time: "09:30" },
    first: shot("/screens/talepler.webp", "Talepler sayfası, Onayımı bekleyenler sekmesi", 1440, 898),
    more: shot("/media/home/s5-puantaj.webp", "Devam takibi: personelin giriş, çıkış ve çalışma süresi"),
  },
  crm: {
    tone: "sage",
    hero: shot("/screens/cari.webp", "Müşteri kartı: iletişim bilgileri, kişiler ve hareketler", 2000, 1250),
    phone: { src: "/media/home/s3-gorusme-tel.webp", alt: "Telefonda müşterinin görüşmeleri", time: "14:00" },
    first: shot("/media/home/s3-gorusme.webp", "Müşteri kartında Görüşmeler: kişi, not ve takip günü"),
    more: shot("/media/home/s4-teklif.webp", "Müşterinin kabul ettiği teklif"),
  },
  "finance": {
    tone: "cream",
    hero: shot("/media/ozellikler/cari-ekstre.webp", "Paylaşılan cari ekstre: bakiye ve hareketler"),
    phone: { src: "/screens/phone-home.webp", alt: "Telefonda Ana Sayfa: para kartları ve vadesi geçenler", time: "17:45" },
    first: shot("/media/ozellikler/cari-liste.webp", "Cari listesi: her müşterinin bakiyesi", 2400, 906),
    more: shot("/media/cozumler/finans-planlar.webp", "Tahsilat planları: sıradaki taksit, tahsil edilen ve kalan"),
  },
};


export function generateStaticParams() {
  return [...solutions, ...addons].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = addonBySlug(slug);
  if (a) return pageMetadata({ path: `/solutions/${a.slug}`, title: a.seo.title, description: a.seo.description });
  const s = solutionBySlug(slug);
  if (!s) return {};
  return pageMetadata({
    path: `/solutions/${s.slug}`,
    title: s.seo.title,
    description: s.seo.description,
  });
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
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
        <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-12 pb-16 pt-8 md:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:pb-24">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { name: "Çözümler", path: "/solutions" },
                { name: s.name, path: `/solutions/${s.slug}` },
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
              <a href={`/contact?konu=fiyat&cozum=${encodeURIComponent(s.name)}`} className="btn btn-line">
                Fiyat talep et
              </a>
            </div>
            <SectionJumps
              items={[
                { href: "#ne-yapar", label: "Ne yapar" },
                { href: "#daha-fazla", label: s.moreJump },
                { href: "#sorular", label: `${s.name} hakkında` },
                ...(usedBy.length > 0 ? [{ href: "#sektorler", label: "Sektörler" }] : []),
              ]}
            />
          </div>
          <div className="min-w-0">
            <CasePanel tone={v.tone} priority screen={v.hero} phone={v.phone} className="aspect-[16/11]" />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="wrap space-y-16 py-14 md:space-y-20 md:py-20">
          <FeatureRow
            id="ne-yapar"
            title={s.title}
            lead={s.firstLead}
            points={s.points}
            primary={<CasePanel tone="mist" screen={v.first} />}
          />
          <FeatureRow
            id="daha-fazla"
            reverse
            title={s.more.title}
            lead={s.more.lead}
            points={s.more.points}
            primary={<CasePanel tone={v.tone === "sage" ? "cream" : "sage"} screen={v.more} />}
          />
        </div>
      </section>

      <section aria-labelledby="sorular" className="bg-paper">
        <div className="wrap py-14 md:py-20">
          <SectionHead id="sorular" title={`${s.name} hakkında`} lead="İçinde ne var, en çok ne soruluyor, yanında ne kullanılır." />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-16">
            <div>
              {related.length > 0 && (
                <div id="ozellikler">
                  <h3 className="text-[1.02rem] font-semibold">İçinde neler var</h3>
                  <ul className="mt-3 border-t border-line">
                    {related.map((f) => (
                      <li key={f.slug} className="border-b border-line">
                        <Link href={`/features/${f.slug}`} className="group flex gap-4 py-4">
                          <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-brand-50 text-brand">
                            <FeatureIcon slug={f.slug} size={20} />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold group-hover:text-brand">{f.name}</span>
                            <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-muted">{f.summary}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <h3 className="mt-10 text-[1.02rem] font-semibold">Yanında kullanılan çözümler</h3>
              <ul className="mt-3 border-t border-line">
                {others.map((o) => (
                  <li key={o.slug} className="border-b border-line">
                    <Link href={`/solutions/${o.slug}`} className="group block py-4">
                      <span className="block font-semibold group-hover:text-brand">{o.name}</span>
                      <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-muted">{o.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[1.02rem] font-semibold">Sık sorulanlar</h3>
              <div className="mt-3">
                <Faq items={s.faq} />
              </div>
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
                    <Link href={`/sectors/${x.slug}`} className="group block min-h-full py-5 pr-6">
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
        body="Bugün açtığınız hesapla bu sayfadakileri kendi ekibinizle kurun. Kurulumu birlikte yapmak isterseniz bize yazın."
      />
    </>
  );
}
