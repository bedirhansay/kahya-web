import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { guides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/rehber",
  title: "Rehberler: ofis yönetimi, cari takibi, izin takibi",
  description:
    "Ofis yönetim programı seçmek, cari hesabı takip etmek ve personel iznini düzenli tutmak üzerine sade, kısa rehberler.",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Rehberler", path: "/rehber" }]}
        title="Ofisinizi düzenlemek için kısa rehberler"
        lead="Program seçmeden önce sorulan sorular, sade cevaplarıyla."
      />
      <section aria-label="Rehberler" className="bg-paper">
        <ul className="wrap grid gap-5 pb-24 md:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/rehber/${g.slug}`}
                className="group flex h-full flex-col rounded-[16px] border border-line bg-surface p-6 hover:border-brand md:p-8"
              >
                <h2 className="text-xl font-bold tracking-[-0.01em] group-hover:text-brand">{g.title}</h2>
                <p className="mt-3 line-clamp-4 flex-1 leading-relaxed text-muted">{g.answer}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand">
                  Rehberi okuyun
                  <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
