import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionJumps } from "@/components/SectionJumps";
import { PlanTable } from "@/components/PlanTable";
import { pricingFaq } from "@/content/faq";
import { promises, vsAccounting } from "@/content/solutions";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/pricing",
  title: "Paketler ve fiyatlar",
  description:
    "Kahya paketleri yan yana: Ücretsiz, Başlangıç, Ekip, Büyüyen ve Kurumsal. Kullanıcı sayısı, dosya alanı, modüller ve ek hizmetler. Fiyatı ekibinize ve ek hizmetlere göre veririz.",
});

const quote = (what: string) => `/contact?konu=fiyat&cozum=${encodeURIComponent(what)}`;

/** The one place for package facts: the table (add-ons per package in it), the promises with what Kahya does not do, and the buying questions. */
export default function PricingPage() {
  return (
    <>
      <JsonLd data={[softwareLd(), faqLd(pricingFaq)]} />
      <PageHero
        crumbs={[{ name: "Fiyatlar", path: "/pricing" }]}
        title="Paketler ve fiyatlar"
        lead="Paketler kullanıcı sayısına ve dosya alanına göre ayrılır; fiyatı ekibinize ve ek hizmetlere göre veririz. Kayıt olan her firma 30 gün Kurumsal paketi dener."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={quote("Paket")} className="btn btn-petrol">
            Fiyat talep edin
          </a>
          <Link href="#paketler" className="btn btn-line">
            Paketleri karşılaştırın
          </Link>
        </div>
        <SectionJumps
          items={[
            { href: "#paketler", label: "Paketler" },
            { href: "#soz", label: "Size söz verdiklerimiz" },
            { href: "#ne-yapmaz", label: "Ne yapar, ne yapmaz" },
            { href: "#sorular", label: "Satın alma soruları" },
          ]}
        />
      </PageHero>

      <section aria-labelledby="paketler" className="bg-paper">
        <div className="wrap py-10 md:py-12">
          <h2 id="paketler" className="sr-only">
            Paketler
          </h2>
          <PlanTable />
          <div className="mt-5 grid gap-2 text-sm leading-relaxed text-muted md:grid-cols-2 md:gap-10">
            <p>
              Ücretli paketlerin hepsinde üç çözüm de açılır. Hesabınızı açtıktan sonra uygulamadaki Abonelik sayfasından
              da talep edebilirsiniz.
            </p>
            <p>
              Tabloda olmayan iki ek hizmet: <span className="font-semibold text-ink">Kahya AI</span> (her firmada ayda 100
              soru ücretsiz, daha fazlası ek hizmetle) ve <span className="font-semibold text-ink">Ticari paket</span> (Stok
              ve Teklif birlikte). Ek hizmetlerin ne yaptığı{" "}
              <Link href="/solutions#ek-hizmetler" className="link">
                Çözümler
              </Link>{" "}
              sayfasında.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="soz" className="bg-surface">
        <div className="wrap grid gap-12 py-14 md:py-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
          <div>
            <h2 id="soz" className="title">
              Size söz verdiklerimiz
            </h2>
            <dl className="mt-6">
              {promises.map((t) => (
                <div key={t.term} className="border-t border-line py-4">
                  <dt className="font-semibold">{t.term}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{t.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 id="ne-yapmaz" className="title">
              Kahya ne yapar, ne yapmaz
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              Kahya ofisin günlük işini yönetir: cari, tahsilat, görev, izin, müşteri. Fatura ve resmî kayıt muhasebe
              programınızda kalır; ikisi yan yana çalışır.
            </p>
            <div className="mt-6 overflow-hidden rounded-[14px] border border-line">
              <div className="hidden grid-cols-[1fr_1.4fr_0.75fr] bg-mist text-sm font-semibold md:grid">
                <span className="px-4 py-2.5">Konu</span>
                <span className="px-4 py-2.5 text-brass">Kahya</span>
                <span className="px-4 py-2.5 text-muted">Ön muhasebe programları</span>
              </div>
              <ul className="divide-y divide-line text-[0.95rem]">
                {vsAccounting.map(([topic, kahya, others]) => (
                  <li key={topic} className="grid gap-1 px-4 py-3 md:grid-cols-[1fr_1.4fr_0.75fr] md:gap-0 md:p-0">
                    <span className="font-semibold md:px-4 md:py-2.5">{topic}</span>
                    <span className="md:bg-brand-50/60 md:px-4 md:py-2.5">
                      <span className="font-semibold md:hidden">Kahya: </span>
                      {kahya}
                    </span>
                    <span className="text-muted md:px-4 md:py-2.5">
                      <span className="font-semibold md:hidden">Ön muhasebe programları: </span>
                      {others}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-muted">
              &quot;Ürüne göre&quot;: programdan programa değişir. e-Fatura mükellefiyseniz programınız kalır.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="sorular" className="bg-mist">
        <div className="wrap grid gap-8 py-14 md:py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <h2 id="sorular" className="title">
            Satın alma soruları
          </h2>
          <Faq items={pricingFaq} />
        </div>
      </section>

      <CtaBand
        tex
        title="Ekibinize göre fiyat alın"
        body="Kaç kişi kullanacağınızı ve hangi ek hizmetleri istediğinizi yazın, biz dönelim. Beklemeden denemek için ücretsiz başlayın."
      />
    </>
  );
}
