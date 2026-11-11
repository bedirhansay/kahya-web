import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { guides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/guides",
  title: "Rehberler: ofis yönetimi, cari takibi, izin takibi",
  description:
    "Ofis yönetim programı seçmek, cari hesabı takip etmek ve personel iznini düzenli tutmak üzerine sade, kısa rehberler.",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Rehberler", path: "/guides" }]}
        title="Ofisinizi düzenlemek için kısa rehberler"
        lead="Program seçmeden önce sorulan sorular, sade cevaplarıyla."
      />
      <section aria-label="Rehberler" className="bg-paper">
        <ul className="wrap py-10 md:py-14">
          {guides.map((g) => (
            <li key={g.slug} className="border-t border-line last:border-b">
              <Link
                href={`/guides/${g.slug}`}
                className="group grid gap-4 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14 md:py-10"
              >
                <h2 className="title text-[clamp(1.5rem,2.4vw,2rem)] group-hover:text-brand">{g.title}</h2>
                <div>
                  <p className="leading-relaxed text-muted">{g.answer}</p>
                  <span className="link mt-4 inline-block font-semibold">Rehberi okuyun</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand
        tex
        title="Sorunuz rehberde yok mu?"
        body="Ofisinizde neyi düzenlemek istediğinizi yazın, Kahya’da nasıl kurulacağını birlikte konuşalım."
      />
    </>
  );
}
