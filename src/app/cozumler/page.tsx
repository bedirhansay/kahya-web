import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PlanTable } from "@/components/PlanTable";
import { PageHero } from "@/components/PageHero";
import { pricingFaq } from "@/content/faq";
import { extras, services, solutions } from "@/content/solutions";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/cozumler",
  title: "Çözümler: ofis yönetimi, CRM, finans ve cari",
  description:
    "Kahya üç çözümden oluşur: Ofis yönetimi, CRM (Müşteri İlişkileri) ile Finans ve cari. E-posta ve Kahya AI ek hizmettir; Stok Ekip ve üstünde, Teklif Kurumsal pakette dahil. Fiyat kullanıcı sayısına (paket) ve ek hizmetlere göre verilir.",
});

const quote = (what: string) => `/iletisim?konu=fiyat&cozum=${encodeURIComponent(what)}`;

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={[softwareLd(), faqLd(pricingFaq)]} />
      <PageHero
        crumbs={[{ name: "Çözümler", path: "/cozumler" }]}
        title="İhtiyacınız olanı seçin, gerisi gizli kalsın"
        lead="Kahya üç çözümden oluşur. Birini, ikisini ya da üçünü birden kullanabilirsiniz. Fiyat kullanıcı sayısına (paket: Ücretsiz, Başlangıç, Ekip, Büyüyen ve Kurumsal) ve ek hizmetlere göre verilir."
      />

      <section aria-label="Çözümler" className="bg-paper">
        <div className="wrap py-12 md:py-20">
          <ol className="grid gap-px overflow-hidden rounded-[var(--radius-frame)] border border-line bg-line lg:grid-cols-3">
            {solutions.map((s) => (
              <li key={s.slug} id={s.slug} className="flex scroll-mt-24 flex-col bg-surface p-6 md:p-8">
                <p className="eyebrow text-brand">{s.kicker}</p>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em]">
                  <Link href={`/cozumler/${s.slug}`} className="hover:text-brand">
                    {s.name}
                  </Link>
                </h2>
                {s.subtitle && <p className="text-sm font-medium text-muted">{s.subtitle}</p>}
                <p className="mt-2 text-muted">{s.summary}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p.term} className="flex gap-3 text-[0.97rem]">
                      <Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                      <span>
                        <strong className="font-semibold">{p.term}:</strong>{" "}
                        <span className="text-muted">{p.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 grid gap-2">
                  <Link href={`/cozumler/${s.slug}`} className="btn btn-line w-full">
                    Ayrıntılar
                  </Link>
                  <a href={quote(s.name)} className="btn btn-petrol w-full">
                    Fiyat talep et
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            Hesabınızı açtıktan sonra uygulamadaki Abonelik sayfasından da talep edebilirsiniz.
          </p>
        </div>
      </section>

      <section aria-labelledby="paketler">
        <div className="wrap py-16 md:py-24">
          <h2 id="paketler" className="title max-w-2xl">
            Paketler
          </h2>
          <p className="lead mt-4 max-w-2xl text-muted">
            Paketler kullanıcı sayısına ve dosya alanına göre ayrılır. Ücretli paketlerin hepsinde üç çözüm de açılır.
            Kayıt olan her firma 30 gün Kurumsal paketi dener.
          </p>
          <div className="mt-10">
            <PlanTable />
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
            Fiyatı ekibinize ve ek hizmetlere göre veriyoruz.
            <a href={quote("Paket")} className="link inline-flex min-h-11 items-center">
              Fiyat talep et
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="ek-hizmetler">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h2 id="ek-hizmetler" className="title">
              Ek hizmetler
            </h2>
            <p className="lead mt-4 text-muted">Hangi çözümü kullanırsanız kullanın, bunları da açtırabilirsiniz.</p>
          </div>
          <ul data-points className="grid">
            {extras.map((e) => (
              <li key={e.name} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <h3 className="font-semibold">
                  {e.href ? (
                    <Link href={e.href} className="hover:text-brand">
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

      <section aria-labelledby="hizmetler" className="bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h2 id="hizmetler" className="title">
              Hizmetler
            </h2>
            <p className="lead mt-4 text-muted">İsterseniz bu işleri de biz yaparız. Fiyatı işe göre veririz.</p>
          </div>
          <div>
            <ul data-points className="grid">
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

      <section aria-labelledby="sorular" className="bg-paper">
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
