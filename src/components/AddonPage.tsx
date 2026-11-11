import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import type { Addon } from "@/content/addons";
import { faqLd } from "@/lib/seo";

const quote = (what: string) => `/iletisim?konu=fiyat&cozum=${encodeURIComponent(what)}`;

/**
 * One add-on: the real screen first, then when you need it, what it holds, how it is switched on and three questions
 * of its own. Which package carries it is told only on /fiyatlar.
 */
export function AddonPage({ a }: { a: Addon }) {
  return (
    <>
      <JsonLd data={faqLd(a.faq)} />
      <PageHero
        crumbs={[
          { name: "Çözümler", path: "/cozumler" },
          { name: a.name, path: `/cozumler/${a.slug}` },
        ]}
        title={a.title}
        lead={a.lead}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={quote(a.name)} className="btn btn-petrol">
            {a.name} için talep edin
          </a>
          <Link href="/fiyatlar#ek-hizmetler" className="link inline-flex min-h-11 items-center">
            Hangi pakette olduğu
          </Link>
        </div>
      </PageHero>

      {a.screen && (
        <div className="wrap">
          <figure className="overflow-hidden rounded-[var(--radius-frame)] border border-line bg-surface">
            <Image
              src={a.screen.src}
              alt={a.screen.alt}
              width={a.screen.width}
              height={a.screen.height}
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
              className="h-auto w-full"
            />
          </figure>
        </div>
      )}

      <section aria-labelledby="ne-zaman" className="wrap py-14 md:py-20">
        <h2 id="ne-zaman" className="title max-w-2xl">
          Ne zaman gerekir
        </h2>
        <ul className="mt-8 grid border-t border-line md:grid-cols-3 md:gap-x-10">
          {a.when.map((w) => (
            <li key={w} className="border-b border-line py-5 font-display text-[1.12rem] font-bold leading-snug">
              “{w}”
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="neler-var" className="bg-paper">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
          <h2 id="neler-var" className="title">
            Neler var
          </h2>
          <dl className="border-t border-line">
            {a.has.map((h) => (
              <div key={h.term} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-semibold">{h.term}</dt>
                <dd className="leading-relaxed text-muted">{h.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="nasil-acilir" className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
        <h2 id="nasil-acilir" className="title">
          Nasıl açılır
        </h2>
        <ol className="grid gap-5">
          {a.open.map((step, i) => (
            <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 leading-relaxed">
              <span className="font-display text-xl font-bold tabular-nums text-brand">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="sorular" className="bg-paper">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
          <div>
            <h2 id="sorular" className="title">
              {a.name} hakkında sorular
            </h2>
            {a.more && (
              <Link href={a.more.href} className="link mt-4 inline-flex min-h-11 items-center">
                {a.more.label}
              </Link>
            )}
          </div>
          <Faq items={a.faq} />
        </div>
      </section>

      <CtaBand title={a.cta.title} body={a.cta.body} />
    </>
  );
}
