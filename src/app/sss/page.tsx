import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { generalFaq } from "@/content/faq";
import { features } from "@/content/features";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/sss",
  title: "Sık sorulan sorular",
  description:
    "Kahya hakkında sık sorulanlar: kurulum, cari takibi, e-posta, personel ve izinler, talepler, raporlar ve Kahya AI.",
});

const groups = [
  { title: "Genel", items: generalFaq },
  ...features.map((f) => ({ title: f.name, items: f.faq })),
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(groups.flatMap((g) => g.items))} />
      <PageHero
        crumbs={[{ name: "Sık sorulanlar", path: "/sss" }]}
        title="Sık sorulan sorular"
        lead="Aradığınızı bulamazsanız bize yazın."
      />
      <div className="bg-paper">
        <div className="wrap space-y-16 py-16 md:py-24">
          {groups.map((g) => (
            <section key={g.title} aria-label={g.title} className="grid gap-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
              <h2 className="text-2xl font-extrabold tracking-[-0.025em]">{g.title}</h2>
              <Faq items={g.items} />
            </section>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
