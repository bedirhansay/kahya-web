import Link from "next/link";

import { features } from "@/content/features";
import { featuredSectors, sectors } from "@/content/sectors";
import { solutions } from "@/content/solutions";
import { site } from "@/lib/site";

import { ConsentLink } from "./Consent";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Çözümler",
    links: [
      ...solutions.map((s) => ({ href: `/solutions/${s.slug}`, label: s.name })),
      { href: "/solutions", label: "Ek hizmetler ve hizmetler" },
      { href: "/pricing", label: "Paketler ve fiyatlar" },
    ],
  },
  {
    title: "Sektörler",
    links: [
      ...featuredSectors.map((slug) => ({
        href: `/sectors/${slug}`,
        label: sectors.find((s) => s.slug === slug)!.name,
      })),
      { href: "/sectors", label: "Tüm sektörler" },
    ],
  },
  {
    title: "Özellikler",
    links: features.slice(0, 6).map((f) => ({ href: `/features/${f.slug}`, label: f.name })),
  },
  {
    title: "Kahya",
    links: [
      { href: "/features/kahya-ai", label: "Kahya AI" },
      { href: "/film", label: "Tanıtım filmi" },
      { href: "/training", label: "Eğitim videoları" },
      { href: "/guides", label: "Rehberler" },
      { href: "/faq", label: "Sık sorulanlar" },
      { href: "/contact", label: "İletişim" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { href: site.legal.privacy, label: "Gizlilik politikası" },
      { href: site.legal.kvkk, label: "KVKK aydınlatma metni" },
      { href: site.legal.terms, label: "Kullanım koşulları" },
      { href: site.legal.cookies, label: "Çerez politikası" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark border-t border-line bg-paper text-muted">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-[0.95rem] leading-relaxed">
            Ofisinizin bütün parçaları, bir arada.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brass/50"
          >
            İletişim, bize yazın
          </Link>
          <p className="mt-3 text-sm">{site.email}</p>
        </div>
        {columns.map((col, n) => (
          <div key={col.title}>
            <p id={`footer-col-${n}`} className="text-sm font-bold text-ink">
              {col.title}
            </p>
            <ul aria-labelledby={`footer-col-${n}`} className="mt-4 space-y-2.5 text-[0.93rem]">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} className="hover:text-ink">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="hover:text-ink">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            Kahya, bir{" "}
            <a href={site.companyUrl} className="font-semibold text-ink hover:text-brass">
              biHesap
            </a>{" "}
            ürünüdür.
          </p>
          <p className="flex flex-wrap items-center gap-x-4">
            Görüntülerdeki firma ve kişiler örnek veridir.
            <ConsentLink className="min-h-11 underline-offset-4 hover:text-ink hover:underline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
