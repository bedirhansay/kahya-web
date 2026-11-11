import { Clock, Mail, MessageCircle, MonitorSmartphone, PlayCircle, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ContactForm, ContactFormFromQuery } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/iletisim",
  title: "İletişim",
  description:
    "Kahya ekibine yazın: kurumsal plan teklifi, Kahya AI ek hizmeti, kurulum ve veri aktarımı soruları için.",
});

type Way = { Icon: LucideIcon; title: string; body: string; href?: string; cta?: string };

const ways: Way[] = [
  { Icon: Mail, title: "E-posta", body: site.email, href: `mailto:${site.email}`, cta: "E-posta gönderin" },
  ...(site.whatsapp
    ? [
        {
          Icon: MessageCircle,
          title: "WhatsApp",
          body: "Kısa sorularınız için yazın.",
          href: `https://wa.me/${site.whatsapp}`,
          cta: "WhatsApp'tan yazın",
        } satisfies Way,
      ]
    : []),
  { Icon: Clock, title: "Dönüş süresi", body: "Bir iş günü içinde e-postayla dönüş yaparız." },
  {
    Icon: MonitorSmartphone,
    title: "Hesabınız varsa",
    body: "Uygulamadaki Destek bölümünden talep açın, kayıtlarınızla birlikte görelim.",
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

function WayLink({ href, children }: { href: string; children: string }) {
  const cls = "link inline-flex min-h-11 items-center text-[1.02rem]";
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

/**
 * The contact page: a short opening, then one unit in two halves: the ways to reach us on dark pine, the form
 * on white beside it, so the page reads as a single counter instead of a list beside a floating window.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "İletişim", path: "/iletisim" }]}
        title="Bize yazın, hemen dönelim"
        lead="Fiyat teklifi, tanıtım ya da verilerinizi taşımak: formu doldurun, ekibimiz bir iş günü içinde e-postayla dönüş yapsın."
      />

      <section aria-label="İletişim" className="bg-surface">
        <div className="wrap pb-12 md:pb-16">
          <div className="grid overflow-hidden rounded-[20px] border border-line lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div className="pine-tex on-dark relative p-7 sm:p-9 lg:p-11">
              <h2 className="font-display text-[1.7rem] font-bold leading-tight tracking-[-0.02em]">
                Sorularınız için bize ulaşın
              </h2>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">
                Formu yazmak istemezseniz bu yollardan biri de olur.
              </p>
              <ul className="mt-9 grid gap-7">
                {ways.map(({ Icon, title, body, href, cta }) => (
                  <li key={title} className="flex gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-[10px] border border-brass/35 bg-brass/10 text-brass">
                      <Icon size={21} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1.02rem] font-semibold">{title}</h3>
                      <p className="mt-0.5 break-words text-[1.02rem] leading-relaxed text-muted">{body}</p>
                      {href && cta && <WayLink href={href}>{cta}</WayLink>}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-10 border-t border-line pt-5 text-[0.98rem] leading-relaxed text-muted">
                {site.fullName}, {site.city}. Kahya’yı yapan ekip destek taleplerine de kendisi bakar.
              </p>
            </div>

            <div className="min-w-0 p-6 sm:p-9 lg:p-11">
              <h2 className="font-display text-[1.7rem] font-bold leading-tight tracking-[-0.02em]">Mesaj gönderin</h2>
              <p className="mt-2 mb-7 text-[1.02rem] leading-relaxed text-muted">
                Konuyu seçin, iki cümle yeter. Yanıt e-postanıza gelir.
              </p>
              <Suspense fallback={<ContactForm />}>
                <ContactFormFromQuery />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
