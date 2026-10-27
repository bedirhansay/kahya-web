import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { sectors } from "@/content/sectors";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/sektorler",
  title: "Sektörler: Danışmanlık, Mimarlık, Emlak ve Teknik Servis için Kahya",
  description:
    "Kahya’nın danışmanlık firmaları, mimarlık ve mühendislik ofisleri, emlak ofisleri ve teknik servis firmalarında nasıl kullanıldığını görün.",
});

export default function SectorsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Sektörler", path: "/sektorler" }]}
        title="Sizin gibi bir ofiste Kahya"
        lead="Aynı uygulama, farklı işler. Sektörünüzü seçin, Kahya’nın sizde nasıl çalışacağını görün."
      />
      <section className="bg-paper">
        <div className="wrap py-12 md:py-20">
          <ul className="grid gap-5 md:grid-cols-2">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link href={`/sektorler/${s.slug}`} className="group flex h-full flex-col rounded-[16px] border border-line bg-white p-6 hover:border-petrol md:p-8">
                  <h2 className="text-2xl font-bold tracking-[-0.02em] group-hover:text-petrol">{s.name}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{s.lead}</p>
                  <span className="link mt-6 inline-flex items-center gap-1.5">
                    Nasıl kullanılır <ArrowRight size={15} aria-hidden />
                  </span>
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
