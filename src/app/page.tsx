import { ArrowRight, Check, Minus, Play } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Frame } from "@/components/Frame";
import { Img } from "@/components/Img";
import { JsonLd } from "@/components/JsonLd";
import { VideoPlayer } from "@/components/VideoPlayer";
import { generalFaq } from "@/content/faq";
import { extras, notIncluded, solutions } from "@/content/solutions";
import { cn } from "@/lib/cn";
import { faqLd, pageMetadata, softwareLd, videoLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Kahya | Ofis Yönetim Programı: Cari, Görev, Personel ve İzin Takibi",
    description: site.description,
  }),
  title: { absolute: "Kahya | Ofis Yönetim Programı: Cari, Görev, Personel ve İzin Takibi" },
};

const day = [
  ["08:45", "Ana sayfayı açarsınız. Bu ayın geliri ve gideri, vadesi geçen ödemeler ve bugün izinde olanlar orada."],
  ["09:20", "Müşteriden iş isteyen bir e-posta gelir. Tek tıkla göreve çevirip takıma verirsiniz."],
  ["10:30", "Takımdan biri işi üstlenir. Görev Yapılacak’tan Tamamlandı’ya kadar herkesin önünde ilerler."],
  ["13:40", "Müşteri ödeme yapar. Tahsilatı cari kartına girersiniz, bakiye hemen düşer."],
  ["15:10", "Bir çalışan telefondan izin ister. Onaylarsınız, izin takvime işlenir."],
  ["17:30", "Ay sonu geldiyse hareketleri ve ekstreleri tek dosya olarak indirip mali müşavirinize gönderirsiniz."],
] as const;

const phones = [
  ["phone-home", "Kahya telefonda: ana sayfa, ayın geliri, gideri ve vadesi geçenler"],
  ["leave-phone", "Kahya telefonda: izin talepleri ve kalan izin günleri"],
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          softwareLd(),
          faqLd(generalFaq),
          videoLd({
            name: "Kahya tanıtım filmi",
            description: "Kahya’nın bir ofis gününde nasıl kullanıldığını iki dakikada anlatan tanıtım filmi.",
            seconds: 131,
            contentUrl: "/media/film/kahya-tanitim.mp4",
            thumbnailUrl: "/media/film/kahya-tanitim.webp",
            pagePath: "/tanitim-filmi",
          }),
        ]}
      />

      {/* Hero */}
      <section className="bg-paper">
        <div className="wrap pb-14 pt-12 md:pb-20 md:pt-20">
          <p className="text-[0.95rem] font-medium text-petrol">Ofis yönetim programı</p>
          <h1 className="display mt-4 max-w-4xl">Kim kime borçlu, onay kimde, ekip bugün ne yaptı?</h1>
          <p className="lead mt-6 max-w-2xl text-muted">
            Kahya küçük ve orta ölçekli ofislerin carisini, görevlerini, izinlerini ve onaylarını tek uygulamada tutar.
            Tarayıcıda açılır, kurulum gerekmez.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.app.register} className="btn btn-petrol">
              Hemen başla
              <ArrowRight size={17} aria-hidden />
            </a>
            <Link href="/tanitim-filmi" className="btn btn-line">
              <Play size={15} aria-hidden className="fill-current" />
              Tanıtım filmi, 2 dk
            </Link>
          </div>
          <Frame
            src="/screens/home.webp"
            alt="Kahya ana sayfa: aylık gelir, gider ve kâr, vadesi geçen ödemeler ve haftanın takvimi"
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="mt-12 md:mt-16"
          />
        </div>
      </section>

      {/* Solutions */}
      <section aria-labelledby="cozumler" className="border-t border-line bg-white">
        <div className="wrap py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 id="cozumler" className="title">
              İhtiyacınız olanı seçin, gerisi gizli kalsın
            </h2>
            <p className="lead mt-4 text-muted">
              Kahya üç çözümden oluşur. Hangisini kullanırsanız menüde o görünür. Sonradan bir diğerine ihtiyacınız olursa
              talep edersiniz, hesabınızda açılır.
            </p>
          </div>

          <div className="mt-12 divide-y divide-line border-y border-line md:mt-16">
            {solutions.map((s, i) => (
              <article
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-24 gap-8 py-10 md:py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14"
              >
                <div className={cn(i % 2 === 1 && "lg:order-2")}>
                  <p className="text-sm font-semibold text-petrol">
                    {s.name}
                    {s.subtitle && <span className="font-medium text-muted"> · {s.subtitle}</span>}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-snug md:text-[1.7rem]">{s.question}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <Check size={18} className="mt-1 shrink-0 text-petrol" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem]">
                    {s.links.map((l) => (
                      <Link key={l.href + l.label} href={l.href} className="link">
                        {l.label}
                      </Link>
                    ))}
                  </p>
                </div>
                <Frame src={s.screen.src} alt={s.screen.alt} sizes="(min-width: 1024px) 600px, 100vw" />
              </article>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <h3 className="text-2xl font-semibold">Ek hizmetler</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Hangi çözümü seçerseniz seçin, ihtiyacınız olursa bunları da açtırabilirsiniz.
              </p>
            </div>
            <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {extras.map((e) => (
                <div key={e.name}>
                  <dt className="font-semibold">
                    {e.href ? (
                      <Link href={e.href} className="hover:text-petrol">
                        {e.name}
                      </Link>
                    ) : (
                      e.name
                    )}
                  </dt>
                  <dd className="mt-1.5 text-[0.97rem] leading-relaxed text-muted">{e.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* A day */}
      <section aria-labelledby="bir-gun" className="border-t border-line bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h2 id="bir-gun" className="title">
              Bir ofis günü
            </h2>
            <p className="lead mt-4 text-muted">
              Kahya’yı kullanan bir ofiste gün aşağı yukarı böyle geçer. Hepsi aynı uygulamada, aynı kayıtlar üzerinde.
            </p>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {day.map(([time, text]) => (
              <li key={time} className="grid grid-cols-[4rem_1fr] gap-4 py-4 md:grid-cols-[5rem_1fr]">
                <span className="font-semibold tabular-nums text-petrol">{time}</span>
                <span className="leading-relaxed">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Kahya AI */}
      <section aria-labelledby="ai" className="border-t border-line bg-white">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-petrol">Ek hizmet</p>
            <h2 id="ai" className="title mt-2">
              Kahya AI taslağı hazırlar, kaydı siz onaylarsınız
            </h2>
            <p className="lead mt-4 text-muted">
              “Bugün ne var?” diye sorarsınız, günün özetini çıkarır. Fişin fotoğrafını eklersiniz, alış kaydını hazırlar.
              Her öneri bir kart olarak gelir ve siz Onayla demeden hiçbir şey kaydedilmez.
            </p>
            <Link href="/ozellikler/kahya-ai" className="link mt-6 inline-block">
              Kahya AI neler yapar
            </Link>
          </div>
          <Frame src="/screens/brief.webp" alt="Kahya AI paneli: günün özeti ve takip görevi önerisi" sizes="(min-width: 1024px) 600px, 100vw" />
        </div>
      </section>

      {/* Phone + data */}
      <section aria-labelledby="telefon" className="border-t border-line bg-mist">
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
          <div>
            <h2 id="telefon" className="title">
              Telefonda da aynı Kahya
            </h2>
            <p className="lead mt-4 text-muted">
              Ayrı bir uygulama indirmeniz gerekmez. Telefonun tarayıcısından açıp ana ekrana eklersiniz. İzin istemek, onay
              vermek ve bakiyeye bakmak masadaki kadar kolay.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="font-semibold">Verileriniz Türkiye’de</dt>
                <dd className="mt-1 text-[0.97rem] text-muted">Kayıtlarınız Türkiye’deki sunucularda tutulur.</dd>
              </div>
              <div>
                <dt className="font-semibold">İçe ve dışa aktarma</dt>
                <dd className="mt-1 text-[0.97rem] text-muted">Kayıtlarınızı içe aktarır, istediğiniz zaman Excel olarak dışarı alırsınız.</dd>
              </div>
            </dl>
          </div>
          <ul className="mx-auto grid w-full max-w-md grid-cols-2 gap-4 sm:gap-6">
            {phones.map(([n, alt]) => (
              <li key={n}>
                <Img
                  src={`/screens/${n}.webp`}
                  alt={alt}
                  width={780}
                  height={1688}
                  sizes="(min-width: 1024px) 14rem, 45vw"
                  className="h-auto w-full rounded-[1.4rem] border border-line bg-white"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Scope */}
      <section aria-labelledby="kapsam" className="border-t border-line bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h2 id="kapsam" className="title">
              Kahya’da olmayanlar
            </h2>
            <p className="lead mt-4 text-muted">
              Kahya ofisin işini ve alacak borç durumunu tutar. Muhasebe programınızın yerini almaz. Resmî kayıtlar için ay
              sonu dosyasını mali müşavirinize gönderirsiniz.
            </p>
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

      {/* Film */}
      <section aria-labelledby="film" className="border-t border-line bg-white">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
          <div>
            <h2 id="film" className="title">
              Yarım dakikada Kahya
            </h2>
            <p className="lead mt-4 text-muted">
              Müşteriler bir dosyada, yazışmalar başka bir kutuda, bakiyeler tablolarda. Bu kısa film, hepsi tek yerde
              olunca neyin değiştiğini gösteriyor.
            </p>
            <Link href="/tanitim-filmi" className="link mt-6 inline-block">
              İki dakikalık tanıtım filmi ve metni
            </Link>
          </div>
          <VideoPlayer
            src="/media/film/kahya-reklam.mp4"
            poster="/media/film/kahya-reklam.webp"
            captions="/media/film/kahya-reklam.vtt"
            title="Kahya reklam filmi"
            duration="0:36"
          />
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="sss" className="border-t border-line bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h2 id="sss" className="title">
              Sık sorulanlar
            </h2>
            <Link href="/sss" className="link mt-5 inline-block">
              Tüm sorular
            </Link>
          </div>
          <Faq items={generalFaq.slice(0, 6)} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
