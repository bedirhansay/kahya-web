import { Clock, Mail, MessageCircle, MonitorSmartphone, PlayCircle, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm, ContactFormFromQuery } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/iletisim",
  title: "İletişim",
  description:
    "Kahya ekibine yazın: kurumsal plan teklifi, Kahya AI ek hizmeti, kurulum ve veri aktarımı soruları için.",
});

const ways = [
  { Icon: Mail, title: "E-posta", body: site.email },
  ...(site.whatsapp
    ? [
        {
          Icon: MessageCircle,
          title: "WhatsApp",
          body: "Kısa sorularınız için yazın.",
          href: `https://wa.me/${site.whatsapp}`,
          cta: "WhatsApp'tan yazın",
        },
      ]
    : []),
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

/** The contact page: one opening, the words on the left, the form as a lit window on the right. */
export default function ContactPage() {
  return (
    <section className="hero-tint relative overflow-hidden">
      <div className="wrap grid gap-14 pb-24 pt-10 md:pt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="min-w-0">
          <Breadcrumbs items={[{ name: "İletişim", path: "/iletisim" }]} />
          <p className="chip mt-4">İletişim</p>
          <h1 className="display mt-5">
            Bize yazın, <span className="grad grad-b">hemen dönelim</span>
          </h1>
          <p className="lead mt-6 max-w-lg text-muted">
            Fiyat teklifi, tanıtım ya da verilerinizi taşımak: formu doldurun, ekibimiz bir iş günü içinde e-postayla
            dönüş yapsın.
          </p>
          <ul className="mt-12 grid gap-3">
            {ways.map(({ Icon, title, body, href, cta }) => (
              <li key={title} className="flex gap-4 rounded-2xl p-3 transition-colors hover:bg-ink/[0.03]">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brass/25 bg-brass/[0.07] text-brass">
                  <Icon size={19} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-0.5 break-words leading-relaxed text-muted">{body}</p>
                  {href &&
                    (href.startsWith("/") ? (
                      <Link href={href} className="link inline-flex min-h-11 items-center">
                        {cta}
                      </Link>
                    ) : (
                      <a href={href} className="link inline-flex min-h-11 items-center">
                        {cta}
                      </a>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-stage relative min-w-0 lg:pt-16">
          {/* Two small records floating at the window's corners, as on the home. */}
          <div aria-hidden className="contact-sat contact-sat-1">
            <Clock size={16} />
            <span>
              <b>Bir iş günü</b>
              <small>içinde yanıt</small>
            </span>
          </div>
          <div aria-hidden className="contact-sat contact-sat-2">
            <ShieldCheck size={16} />
            <span>
              <b>KVKK</b>
              <small>yalnızca dönüş için</small>
            </span>
          </div>
          <div className="window p-6 sm:p-9">
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromQuery />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
