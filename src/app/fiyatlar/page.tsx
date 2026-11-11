import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PlanTable } from "@/components/PlanTable";
import { VsAccounting } from "@/components/sections/Comparisons";
import { Promises } from "@/components/sections/TrustAndPromises";
import { pricingFaq } from "@/content/faq";
import { extras } from "@/content/solutions";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/fiyatlar",
  title: "Paketler ve fiyatlar",
  description:
    "Kahya paketleri yan yana: Ücretsiz, Başlangıç, Ekip, Büyüyen ve Kurumsal. Kullanıcı sayısı, dosya alanı, modüller ve ek hizmetler. Fiyatı ekibinize ve ek hizmetlere göre veririz.",
});

const quote = (what: string) => `/iletisim?konu=fiyat&cozum=${encodeURIComponent(what)}`;

/** The one place for package facts: the table, which add-on goes with which package, the promises and the buying questions. */
export default function PricingPage() {
  return (
    <>
      <JsonLd data={[softwareLd(), faqLd(pricingFaq)]} />
      <PageHero
        crumbs={[{ name: "Fiyatlar", path: "/fiyatlar" }]}
        title="Paketler ve fiyatlar"
        lead="Paketler kullanıcı sayısına ve dosya alanına göre ayrılır. Fiyatı ekibinize ve seçtiğiniz ek hizmetlere göre veririz. Kayıt olan her firma 30 gün Kurumsal paketi dener."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={quote("Paket")} className="btn btn-petrol">
            Fiyat talep edin
          </a>
          <Link href="#paketler" className="btn btn-line">
            Paketleri karşılaştırın
          </Link>
        </div>
      </PageHero>

      <section aria-labelledby="paketler" className="bg-paper">
        <div className="wrap py-12 md:py-16">
          <h2 id="paketler" className="sr-only">
            Paketler
          </h2>
          <PlanTable />
          <p className="mt-4 text-sm text-muted">
            Ücretli paketlerin hepsinde üç çözüm de açılır. Hesabınızı açtıktan sonra uygulamadaki Abonelik sayfasından
            da talep edebilirsiniz.
          </p>
        </div>
      </section>

      <section aria-labelledby="ek-hizmetler">
        <div className="wrap py-14 md:py-20">
          <h2 id="ek-hizmetler" className="title max-w-2xl">
            Ek hizmetler hangi pakette
          </h2>
          <div className="mt-8 overflow-hidden rounded-[var(--radius-frame)] border border-line">
            <table className="w-full border-collapse text-left text-[0.97rem]">
              <caption className="sr-only">Ek hizmetler ve paketler</caption>
              <thead className="bg-paper max-md:sr-only">
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Ek hizmet
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Ne yapar
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Paketlerde
                  </th>
                </tr>
              </thead>
              <tbody>
                {extras.map((e) => (
                  <tr key={e.name} className="border-b border-line last:border-0 max-md:grid max-md:gap-1 max-md:py-4">
                    <th scope="row" className="px-5 align-top font-semibold md:py-4">
                      {e.href ? (
                        <Link href={e.href} className="hover:text-brand">
                          {e.name}
                        </Link>
                      ) : (
                        e.name
                      )}
                    </th>
                    <td className="px-5 align-top leading-relaxed text-muted md:py-4">{e.body}</td>
                    <td className="px-5 align-top font-medium md:w-[30%] md:py-4">{e.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="bg-paper">
        <Promises />
      </div>
      <div className="bg-surface">
        <VsAccounting />
      </div>

      <section aria-labelledby="sorular">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <h2 id="sorular" className="title">
            Satın alma soruları
          </h2>
          <Faq items={pricingFaq} />
        </div>
      </section>

      <CtaBand
        title="Ekibinize göre fiyat alın"
        body="Kaç kişi kullanacağınızı ve hangi ek hizmetleri istediğinizi yazın, biz dönelim. Beklemeden denemek için ücretsiz başlayın."
      />
    </>
  );
}
