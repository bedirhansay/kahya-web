import type { Metadata } from "next";

import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
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
      />

      <div className="wrap grid gap-8 pb-16 pt-2 md:pb-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Konular" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="-mx-4 flex gap-x-5 overflow-x-auto border-b border-line px-4 lg:mx-0 lg:block lg:border-0 lg:px-0">
            {topics.map((t) => (
              <li key={t.id} className="shrink-0">
                <a
                  href={`#${t.id}`}
                  className="flex min-h-11 items-center justify-between gap-3 whitespace-nowrap text-[0.97rem] font-medium text-muted hover:text-ink lg:border-b lg:border-line"
                >
                  {t.title}
                  <span className="tabular-nums text-sm max-lg:hidden">{t.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-12">
          {topics.map((t) => (
            <section key={t.id} aria-labelledby={t.id} className="scroll-mt-24">
              <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2">
                <h2 id={t.id} className="scroll-mt-24 font-display text-xl font-bold tracking-[-0.01em]">
                  {t.title}
                </h2>
                <span className="text-sm tabular-nums text-muted">{t.items.length} soru</span>
              </div>
              <div className="[&>div]:border-t-0">
                <Faq items={t.items} />
              </div>
            </section>
          ))}

          <section aria-labelledby="bulamadiniz" className="border-t-2 border-ink pt-6">
            <h2 id="bulamadiniz" className="font-display text-xl font-bold tracking-[-0.01em]">
              Bulamadınız mı? Yazın
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">
              Sorunuzu iletişim formundan gönderin, cevabı e-postanıza yazalım. Hesabınız varsa uygulamada Destek ›
              Yeni talep ile de sorabilirsiniz.
            </p>
            <a href="/iletisim?konu=diger" className="btn btn-petrol mt-5">
              Sorunuzu yazın
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
