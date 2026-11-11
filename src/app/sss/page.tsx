import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionJumps } from "@/components/SectionJumps";
import { generalFaq, pricingFaq } from "@/content/faq";
import { featureBySlug } from "@/content/features";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/sss",
  title: "Sık sorulan sorular",
  description:
    "Kahya hakkında sık sorulanlar: satın alma, cari takibi, ödeme planları, e-posta, personel ve puantaj, dokümanlar ve Kahya AI.",
});

const fromFeature = (slug: string) => featureBySlug(slug)?.faq ?? [];

/** Eight topics; the rest of each module's questions stay on its own page. */
const topics = [
  { id: "genel", title: "Genel", items: generalFaq },
  { id: "satin-alma", title: "Satın alma", items: pricingFaq },
  { id: "cari", title: "Cari", items: fromFeature("cari-takibi") },
  { id: "odeme-planlari", title: "Ödeme planları", items: fromFeature("odeme-planlari") },
  { id: "e-posta", title: "E-posta", items: fromFeature("e-posta") },
  { id: "personel", title: "Personel", items: fromFeature("personel-ve-izin") },
  { id: "dokumanlar", title: "Dokümanlar", items: fromFeature("dokuman-ve-sozlesme") },
  { id: "kahya-ai", title: "Kahya AI", items: fromFeature("kahya-ai") },
].filter((t) => t.items.length > 0);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(topics.flatMap((t) => t.items))} />
      <PageHero
        crumbs={[{ name: "Sık sorulanlar", path: "/sss" }]}
        title="Sık sorulan sorular"
        lead="Konuya göre ayrıldı. Bir soruya dokunun, cevabı altında açılır."
      >
        <SectionJumps label="Konular" items={topics.map((t) => ({ href: `#${t.id}`, label: `${t.title} (${t.items.length})` }))} />
      </PageHero>

      <section aria-label="Sorular" className="bg-paper">
        <div className="wrap py-6 md:py-10">
          {topics.map((t) => (
            <section
              key={t.id}
              aria-labelledby={t.id}
              className="grid gap-4 border-t border-line py-10 first:border-t-0 md:py-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-16"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 id={t.id} className="font-display text-[1.6rem] font-bold leading-tight tracking-[-0.01em]">
                  {t.title}
                </h2>
                <p className="mt-1 text-sm tabular-nums text-muted">{t.items.length} soru</p>
              </div>
              <Faq items={t.items} />
            </section>
          ))}
        </div>
      </section>
      <CtaBand
        tex
        title="Bulamadınız mı? Yazın"
        body="Sorunuzu iletişim formundan gönderin, cevabı e-postanıza yazalım. Hesabınız varsa uygulamada Destek › Yeni talep ile de sorabilirsiniz."
      />
    </>
  );
}
