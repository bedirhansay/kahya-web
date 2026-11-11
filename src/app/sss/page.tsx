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
        <div className="wrap max-w-4xl py-10 md:py-12">

          <div className="grid gap-10">
            {topics.map((t) => (
              <section key={t.id} aria-labelledby={t.id} className="scroll-mt-24">
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <h2 id={t.id} className="scroll-mt-24 font-display text-[1.4rem] font-bold tracking-[-0.01em]">
                    {t.title}
                  </h2>
                  <span className="text-sm tabular-nums text-muted">{t.items.length} soru</span>
                </div>
                <div className="[&>div]:border-t-0">
                  <Faq items={t.items} />
                </div>
              </section>
            ))}
          </div>
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
