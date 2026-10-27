import { Mail, MonitorSmartphone, PlayCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/iletisim",
  title: "İletişim",
  description: "Kahya ekibine yazın: kurumsal plan teklifi, Kahya AI eklentisi, kurulum ve veri aktarımı soruları için.",
});

const items = [
  {
    Icon: Mail,
    title: "E-posta",
    body: "Kurumsal plan teklifi, Kahya AI eklentisi, veri aktarımı ya da herhangi bir soru için.",
    href: `mailto:${site.email}?subject=Kahya`,
    cta: site.email,
  },
  {
    Icon: MonitorSmartphone,
    title: "Uygulama içinden destek",
    body: "Hesabınız varsa uygulamadaki Destek bölümünden talep açın.",
    href: site.app.login,
    cta: "Giriş yap",
  },
  {
    Icon: PlayCircle,
    title: "Kendiniz öğrenin",
    body: "Her modül için adım adım eğitim videoları.",
    href: "/egitim",
    cta: "Eğitim videoları",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "İletişim", path: "/iletisim" }]}
        title="Bize yazın"
        lead="Kahya, biHesap’ın ürünüdür. Sorunuzu e-postayla gönderin, ekibimiz dönüş yapsın."
      />
      <section className="bg-paper">
        <div className="wrap grid gap-6 py-16 md:grid-cols-3 md:py-24">
          {items.map(({ Icon, title, body, href, cta }) => (
            <div
              key={title}
              className="flex flex-col rounded-[var(--radius-frame)] border border-line bg-white p-7"
            >
              <Icon size={24} className="text-petrol" aria-hidden />
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{body}</p>
              {href.startsWith("/") ? (
                <Link href={href} className="link mt-6">
                  {cta}
                </Link>
              ) : (
                <a href={href} className="link mt-6 break-all">
                  {cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
