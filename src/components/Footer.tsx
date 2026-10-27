import Link from "next/link";

import { features } from "@/content/features";
import { site } from "@/lib/site";

import { Logo } from "./Logo";

const columns = [
  {
    title: "Özellikler",
    links: features.slice(0, 7).map((f) => ({ href: `/ozellikler/${f.slug}`, label: f.name })),
  },
  {
    title: "Kahya",
    links: [
      { href: "/ozellikler/kahya-ai", label: "Kahya AI" },
      { href: "/cozumler", label: "Çözümler" },
      { href: "/tanitim-filmi", label: "Tanıtım filmi" },
      { href: "/egitim", label: "Eğitim videoları" },
      { href: "/sss", label: "Sık sorulanlar" },
      { href: "/iletisim", label: "İletişim" },
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
    <footer className="bg-pine-950 text-white/70">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-[0.95rem] leading-relaxed">
            Ofis yönetim yazılımı. Cari, görevler, e-posta, personel ve onaylar tek yerde.
          </p>
          <p className="mt-5 text-sm">
            <a href={`mailto:${site.email}`} className="font-semibold text-white hover:text-brass">
              {site.email}
            </a>
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-bold text-white">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-[0.93rem]">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} className="hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8">
        <div className="wrap flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            Kahya, bir{" "}
            <a href={site.companyUrl} className="font-semibold text-white hover:text-brass">
              biHesap
            </a>{" "}
            ürünüdür.
          </p>
          <p>Görüntülerdeki firma ve kişiler örnek veridir.</p>
        </div>
      </div>
    </footer>
  );
}
