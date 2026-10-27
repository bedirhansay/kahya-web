import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { pricingFaq } from "@/content/faq";
import { extras, notIncluded, services, solutions } from "@/content/solutions";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/cozumler",
  title: "Çözümler: Ofis Yönetimi, Müşteri İlişkileri, Finans & Cari",
  description:
    "Kahya üç çözümden oluşur: Ofis Yönetimi, Müşteri İlişkileri ve Finans & Cari. E-posta, Stok, Teklif ve Kahya AI ek hizmet olarak açılır. Fiyat için bize yazın.",
});

const quote = (what: string) => `mailto:${site.email}?subject=${encodeURIComponent(`Kahya fiyat talebi: ${what}`)}`;

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={[softwareLd(), faqLd(pricingFaq)]} />
      <PageHero
        crumbs={[{ name: "Çözümler", path: "/cozumler" }]}
        title="İhtiyacınız olanı seçin, gerisi gizli kalsın"
        lead="Kahya üç çözümden oluşur. Birini, ikisini ya da üçünü birden kullanabilirsiniz. Fiyat, seçtiğiniz çözümlere ve kullanıcı sayınıza göre verilir."
      />

      <section aria-label="Çözümler" className="bg-paper">
        <div className="wrap py-12 md:py-20">
          <ol className="grid gap-px overflow-hidden rounded-[var(--radius-frame)] border border-line bg-line lg:grid-cols-3">
            {solutions.map((s) => (
              <li key={s.slug} id={s.slug} className="flex scroll-mt-24 flex-col bg-white p-6 md:p-8">
                <h2 className="text-xl font-semibold">{s.name}</h2>
                <p className="mt-2 text-muted">{s.question}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.97rem]">
                      <Check size={18} className="mt-0.5 shrink-0 text-petrol" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={quote(s.name)} className="btn btn-petrol mt-8 w-full">
                  Fiyat talep et
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            Hesabınızı açtıktan sonra uygulamadaki Abonelik sayfasından da talep edebilirsiniz.
          </p>
        </div>
      </section>

      <section aria-labelledby="ek-hizmetler" className="border-t border-line bg-white">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h2 id="ek-hizmetler" className="title">
              Ek hizmetler
            </h2>
            <p className="lead mt-4 text-muted">Hangi çözümü kullanırsanız kullanın, bunları da açtırabilirsiniz.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {extras.map((e) => (
              <li key={e.name} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <h3 className="font-semibold">
                  {e.href ? (
                    <Link href={e.href} className="hover:text-petrol">
                      {e.name}
                    </Link>
                  ) : (
                    e.name
                  )}
                </h3>
                <p className="leading-relaxed text-muted">{e.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="hizmetler" className="border-t border-line bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h2 id="hizmetler" className="title">
              Hizmetler
            </h2>
            <p className="lead mt-4 text-muted">İsterseniz bu işleri de biz yaparız. Fiyatı işe göre veririz.</p>
          </div>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {services.map((e) => (
                <li key={e.name} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <h3 className="font-semibold">{e.name}</h3>
                  <p className="leading-relaxed text-muted">{e.body}</p>
                </li>
              ))}
            </ul>
            <a href={quote("Hizmetler")} className="btn btn-line mt-6">
              Hizmet için yazın
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="olmayanlar" className="border-t border-line bg-white">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h2 id="olmayanlar" className="title">
              Kahya’da olmayanlar
            </h2>
            <p className="lead mt-4 text-muted">Satın almadan önce bilin, yanlış iş için almayın.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {notIncluded.map((t) => (
              <li key={t} className="flex gap-3 py-3.5 text-muted">
                <Minus size={18} className="mt-0.5 shrink-0" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="sorular" className="border-t border-line bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <h2 id="sorular" className="title">
            Satın alma soruları
          </h2>
          <Faq items={pricingFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
