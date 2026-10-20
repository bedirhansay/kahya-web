import { ArrowRight, ArrowUpRight, Check, CheckCheck, Minus, Play, Sparkles, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, type CSSProperties } from "react";

import { AiDemo } from "@/components/AiDemo";
import { CountUp } from "@/components/CountUp";
import { FeatureIcon } from "@/components/FeatureIcon";
import { Img } from "@/components/Img";

import { CtaBand } from "@/components/CtaBand";
import { DayTimeline, type DayStep } from "@/components/DayTimeline";
import { Faq } from "@/components/Faq";
import { Frame } from "@/components/Frame";
import { HeroTour } from "@/components/HeroTour";
import { JsonLd } from "@/components/JsonLd";
import { VideoPlayer } from "@/components/VideoPlayer";
import { generalFaq } from "@/content/faq";
import { features } from "@/content/features";
import { tutorials } from "@/content/tutorials";
import { faqLd, pageMetadata, softwareLd, videoLd } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Kahya | Ofis Yönetim Programı: Cari, Görev, Personel ve İzin Takibi",
    description: site.description,
  }),
  title: { absolute: "Kahya | Ofis Yönetim Programı: Cari, Görev, Personel ve İzin Takibi" },
};

const day: DayStep[] = [
  {
    time: "08:45",
    title: "Güne tek ekranla başlayın",
    body: "Bu ayın geliri, gideri ve kârı; vadesi geçen ve bu hafta vadesi gelen ödemeler; haftanın takvimi, bekleyen onaylar ve bugün izinde olanlar. Menülerde dolaşmadan.",
    href: "/ozellikler/raporlar",
    linkLabel: "Ana Sayfa ve raporlar",
    screen: "/screens/home.webp",
    alt: "Kahya Ana Sayfa: aylık gelir, gider, kâr ve vadesi gelen ödemeler",
  },
  {
    time: "09:20",
    title: "Müşterinin e-postası göreve dönüşür",
    body: "Gelen kutusu Kahya’nın içinde. İş isteyen e-postayı ekleriyle birlikte tek tıkla göreve çevirin; e-posta ile görev bağlı kalır.",
    href: "/ozellikler/e-posta",
    linkLabel: "E-posta",
    screen: "/screens/mail.webp",
    alt: "Kahya e-posta gelen kutusu",
  },
  {
    time: "10:30",
    title: "İş takıma gider, uygun olan üstlenir",
    body: "Görevi kişiye ya da takıma verin. Takımdan biri Üstlen der, ekip görür; durum Yapılacak’tan Tamamlandı’ya ilerler.",
    href: "/ozellikler/gorev-takibi",
    linkLabel: "Görevler ve takımlar",
    screen: "/screens/claim.webp",
    alt: "Kahya görev detayı: durum, takım, proje ve sorumlu",
  },
  {
    time: "13:40",
    title: "Tahsilat girilir, bakiye anında düşer",
    body: "Para geldiğinde cari kartından tahsilatı kaydedin. Hareket yürüyen bakiyesiyle listede; ekstreyi WhatsApp’tan müşteriye gönderin.",
    href: "/ozellikler/cari-takibi",
    linkLabel: "Cari ve bakiye takibi",
    screen: "/screens/cari.webp",
    alt: "Kahya cari kartı: bakiye ve hareketler",
  },
  {
    time: "15:10",
    title: "İzin ve avans talepleri onaylanır",
    body: "Çalışan izni telefondan ister. Onayımı bekleyenler sekmesinde tek tıkla onaylayın ya da gerekçesiyle reddedin; izin takvime işlenir.",
    href: "/ozellikler/talep-ve-onay",
    linkLabel: "Talepler ve onaylar",
    screen: "/screens/talepler.webp",
    alt: "Kahya talepler: onay bekleyen izin ve avans talepleri",
  },
  {
    time: "17:30",
    title: "Ay sonu paketi tek dosyada",
    body: "Ayın hareketleri, cari bakiyeleri ve ekstreler tek dosyada hazırlanır; indirip mali müşavirinize gönderirsiniz.",
    href: "/ozellikler/raporlar",
    linkLabel: "Mali Müşavir Paketi",
    screen: "/screens/package.webp",
    alt: "Kahya Mali Müşavir Paketi",
  },
];

const heroWords = ["Ofisinizin", "bütün", "parçaları,"];

// Example events around the hero screen; the same kinds of records the app keeps.
const heroToasts = [
  {
    title: "Tahsilat kaydedildi",
    body: "Bakiye anında güncellendi",
    icon: Wallet,
    tone: "bg-mint text-petrol",
    place: "-left-14 top-[34%]",
    bob: "0s",
  },
  {
    title: "İzin talebi onaylandı",
    body: "Takvime işlendi",
    icon: CheckCheck,
    tone: "bg-petrol text-white",
    place: "-right-12 top-[20%]",
    bob: "-2s",
  },
  {
    title: "Kahya AI",
    body: "3 hatırlatma taslağı hazır",
    icon: Sparkles,
    tone: "bg-brass text-pine-950",
    place: "-right-16 top-[62%]",
    bob: "-4s",
  },
];

const stats = [
  { value: features.length, suffix: "", label: "modül, tek uygulamada" },
  { value: tutorials.length, suffix: "", label: "eğitim videosu" },
  { value: 4, suffix: "", label: "hazır rol ve yetki seti" },
  { value: 0, suffix: "", label: "kurulum; tarayıcıda açılır" },
];

/** Modules shown as wide cards on the home grid, with their screen. */
const bento: Record<string, string> = {
  "cari-takibi": "/screens/cari.webp",
  "personel-ve-izin": "/screens/izinler.webp",
};

const phones = [
  ["01", "Cari, görev ve e-posta tek yerde"],
  ["02", "Ayın durumu tek bakışta"],
  ["03", "Kahya AI telefonda da yanınızda"],
  ["04", "Ekibin işi tek panoda"],
  ["05", "Gelen kutunuz da burada"],
  ["06", "Onaylar tek dokunuşta"],
  ["07", "Bakiye ve vade hep önünüzde"],
] as const;

const scope = {
  yes: [
    "Müşteri, tedarikçi ve personel carileri",
    "Taksit, vade ve düzenli ödeme hatırlatmaları",
    "Görevler, takımlar, projeler, takvim",
    "Ofisin e-posta kutusu",
    "Personel, izin, devam; talep ve onaylar",
    "Doküman, sözleşme, demirbaş ve zimmet",
  ],
  no: ["Fatura kesmek", "Kasa ve banka hesabı tutmak", "Resmî muhasebe kaydı"],
};

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
      <section className="relative overflow-hidden bg-pine-950 text-white">
        <div aria-hidden className="grid-bg absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
        <div aria-hidden className="aurora -left-40 top-10 size-[38rem] bg-petrol-600/50" />
        <div
          aria-hidden
          className="aurora -right-32 top-48 size-[26rem] bg-brass/18"
          style={{ animationDelay: "-6s", animationDuration: "22s" }}
        />
        <div
          aria-hidden
          className="aurora bottom-0 left-1/3 size-[30rem] bg-sage/25"
          style={{ animationDelay: "-11s", animationDuration: "26s" }}
        />

        <div className="wrap relative pb-10 pt-12 text-center md:pt-16">
          <p className="intro mx-auto inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/4 px-3 py-1.5 text-sm font-semibold text-white/80 backdrop-blur">
            <span className="rounded bg-brass px-1.5 py-0.5 text-xs font-bold text-pine-950">Yeni</span>
            Kahya AI artık ofisinizde
          </p>
          <h1 className="mx-auto mt-6 max-w-5xl">
            <span className="block text-[0.95rem] font-bold uppercase tracking-[0.18em] text-sage md:text-base">
              Ofis yönetim programı
            </span>
            <span className="display mt-4 block">
              {heroWords.map((w, i) => (
                <Fragment key={w + i}>
                  <span className="word" style={{ "--i": i } as CSSProperties}>
                    {w}
                  </span>{" "}
                </Fragment>
              ))}
              <span className="word text-brass" style={{ "--i": heroWords.length } as CSSProperties}>
                bir arada
              </span>
            </span>
          </h1>
          <p className="intro lead mx-auto mt-6 max-w-2xl text-white/72" style={{ "--d": "550ms" } as CSSProperties}>
            Cari bakiyeler, görevler, e-posta, personel ve izinler, talepler ve onaylar. Ayrı dosyalarda, mesajlarda ve
            kâğıtlarda değil; tek bir yerde.
          </p>
          <div className="intro mt-9 flex flex-wrap justify-center gap-3" style={{ "--d": "700ms" } as CSSProperties}>
            <a href={site.app.register} className="btn btn-brass group shadow-[0_10px_40px_-10px_rgb(227_178_97/0.6)]">
              Hemen başla
              <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link href="/tanitim-filmi" className="btn btn-line-dark group">
              <Play size={16} aria-hidden className="fill-current text-brass" />
              Tanıtım filmini izle, 2 dk
            </Link>
          </div>
          <p className="intro mt-5 text-sm text-white/50" style={{ "--d": "800ms" } as CSSProperties}>
            Kurulum gerekmez · Bilgisayarda, tablette ve telefonda çalışır
          </p>

          <div className="rise relative mx-auto mt-12 max-w-6xl">
            <HeroTour />
            {heroToasts.map((t) => (
              <div key={t.title} aria-hidden className={`absolute z-10 hidden xl:block ${t.place}`}>
                <div className="bob" style={{ "--b": t.bob } as CSSProperties}>
                  <div className="flex items-center gap-3 rounded-xl bg-white/95 py-2.5 pl-2.5 pr-4 text-left text-ink shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-black/5 backdrop-blur">
                    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${t.tone}`}>
                      <t.icon size={18} />
                    </span>
                    <span>
                      <span className="block text-[0.85rem] font-bold">{t.title}</span>
                      <span className="block text-[0.78rem] text-muted">{t.body}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module strip */}
        <div className="marquee-mask relative border-t border-white/8 py-5">
          <ul className="marquee gap-10 pr-10 text-[0.95rem] font-semibold text-white/55">
            {[...features, ...features].map((f, i) => (
              <li key={f.slug + i} aria-hidden={i >= features.length || undefined} className="flex items-center gap-2.5 whitespace-nowrap">
                <FeatureIcon slug={f.slug} size={17} className="text-brass" />
                {f.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Numbers */}
      <section aria-label="Kahya kısaca" className="border-b border-line bg-paper">
        <dl className="wrap grid grid-cols-2 gap-y-8 py-12 md:grid-cols-4 md:py-14">
          {stats.map((st, i) => (
            <div
              key={st.label}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as CSSProperties}
              className="border-line px-2 text-center md:border-l md:first:border-l-0"
            >
              <dt className="sr-only">{st.label}</dt>
              <dd className="text-4xl font-extrabold tracking-[-0.04em] text-petrol md:text-5xl">
                <CountUp to={st.value} />
                {st.suffix}
              </dd>
              <dd className="mt-2 text-[0.95rem] font-semibold text-muted">{st.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Modules */}
      <section aria-labelledby="moduller" className="bg-paper">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-end">
            <h2 id="moduller" data-reveal className="title max-w-xl">
              Ofisin bütün işi, tek uygulamada
            </h2>
            <div data-reveal style={{ "--d": "120ms" } as CSSProperties} className="md:justify-self-end">
              <p className="lead max-w-xl text-muted">
                Kullanmadığınız bölümü kapatın, menüden kalksın. Ekran yalnızca ofisinizin işine göre sadeleşir.
              </p>
              <Link href="/ozellikler" className="link group mt-4 inline-flex items-center gap-1.5">
                Tüm özellikler
                <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {features.map((f, i) => {
              const big = bento[f.slug];
              return (
                <li
                  key={f.slug}
                  data-reveal="zoom"
                  style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties}
                  className={big ? "sm:col-span-2 lg:col-span-4" : "lg:col-span-2"}
                >
                  <Link
                    href={`/ozellikler/${f.slug}`}
                    className="spot group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-sage/60 hover:shadow-[0_30px_60px_-30px_rgb(6_27_25/0.35)]"
                  >
                    <div className="flex flex-col gap-3 p-6">
                      <span className="grid size-11 place-items-center rounded-xl bg-mist text-petrol transition-colors duration-300 group-hover:bg-petrol group-hover:text-brass">
                        <FeatureIcon slug={f.slug} size={21} />
                      </span>
                      <span className="mt-1 flex items-center gap-2 text-lg font-extrabold tracking-[-0.02em] group-hover:text-petrol">
                        {f.name}
                        <ArrowUpRight
                          size={18}
                          aria-hidden
                          className="-translate-x-1 opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </span>
                      <span className="text-[0.95rem] text-muted">{f.summary}</span>
                    </div>
                    <div
                      className={cn(
                        "relative mx-6 -mb-px overflow-hidden rounded-t-xl border border-b-0 border-line bg-mist",
                        big ? "h-48 md:h-60" : "h-40 lg:mt-auto",
                      )}
                    >
                      <Img
                        src={big ?? f.screen.src}
                        alt=""
                        fill
                        sizes={big ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
                        className={cn(
                          "transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.05]",
                          f.screen.phone && !big ? "object-contain object-top pt-4" : "object-cover object-left-top",
                        )}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* A day */}
      <section aria-labelledby="bir-gun" className="border-t border-line bg-paper">
        <div className="wrap py-20 md:py-28">
          <h2 id="bir-gun" data-reveal className="title max-w-2xl">
            Kahya’da bir iş günü
          </h2>
          <p data-reveal style={{ "--d": "100ms" } as CSSProperties} className="lead mt-5 max-w-2xl text-muted">
            Sabah özetinden ay sonu paketine kadar, bir ofisin günü Kahya’da böyle akar. Görüntüler uygulamanın kendisi.
          </p>
          <div className="mt-14">
            <DayTimeline steps={day} />
          </div>
        </div>
      </section>

      {/* Kahya AI */}
      <section aria-labelledby="ai" className="relative overflow-hidden bg-pine-950 text-white">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="aurora -right-40 top-1/4 size-[34rem] bg-petrol-600/45" />
        <div aria-hidden className="aurora -left-20 bottom-0 size-[22rem] bg-brass/12" style={{ animationDelay: "-8s" }} />
        <div className="wrap relative grid gap-14 py-20 md:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div>
            <p data-reveal className="inline-flex items-center gap-2 text-sm font-bold text-brass">
              <Img src="/brand/kahya-mark.svg" alt="" width={20} height={20} unoptimized className="size-5" />
              Kahya AI
            </p>
            <h2 id="ai" data-reveal style={{ "--d": "80ms" } as CSSProperties} className="title mt-4">
              Söyleyin, Kahya hazırlasın, <span className="shimmer">siz onaylayın</span>
            </h2>
            <p data-reveal style={{ "--d": "160ms" } as CSSProperties} className="lead mt-5 text-white/72">
              Kayıtlarınıza bakarak soruları yanıtlar; görev, not, tahsilat, toplantı ve e-posta taslağı hazırlar. Her
              öneri bir kart olarak gelir. Siz Onayla demeden hiçbir şey kaydedilmez.
            </p>
            <ul className="mt-8 space-y-3 text-white/85">
              {[
                "“Bugün ne var?” diye sorun; günün özeti hazır",
                "Fişin fotoğrafını ekleyin; alış kaydı hazır",
                "Vadesi geçenlere toplu hatırlatma taslağı",
                "Her sayfadan Alt+K ile açılır",
              ].map((t, i) => (
                <li key={t} data-reveal="left" style={{ "--d": `${200 + i * 90}ms` } as CSSProperties} className="flex gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-brass" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/ozellikler/kahya-ai" data-reveal style={{ "--d": "560ms" } as CSSProperties} className="btn btn-line-dark group mt-9">
              Kahya AI’ı tanıyın
              <ArrowRight size={17} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div data-reveal="zoom" className="relative lg:pb-16">
            <Frame src="/screens/brief.webp" alt="Kahya AI paneli: günün özeti ve takip görevi önerisi" dark className="lg:w-[88%]" />
            <div className="mt-6 flex justify-center lg:absolute lg:-bottom-2 lg:right-0 lg:mt-0 lg:w-[23rem]">
              <AiDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Phone */}
      <section aria-labelledby="telefon" className="overflow-hidden bg-mist">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <h2 id="telefon" data-reveal className="title max-w-xl">
              Ofis cebinizde de açık
            </h2>
            <p data-reveal style={{ "--d": "100ms" } as CSSProperties} className="lead max-w-xl text-muted">
              Kahya telefonda da tam çalışır. Ana ekrana ekleyin; izin isteyin, onay verin, bakiyeye bakın. Ayrı bir uygulama
              indirmeniz gerekmez.
            </p>
          </div>
        </div>
        <div data-reveal className="marquee-mask -mt-6 pb-20 md:pb-28">
          <ul className="marquee gap-5 pr-5 [animation-duration:60s] md:gap-7 md:pr-7">
            {[...phones, ...phones].map(([n, alt], i) => (
              <li key={n + i} aria-hidden={i >= phones.length || undefined} className="shrink-0">
                <Img
                  src={`/screens/mobil/${n}.webp`}
                  alt={i >= phones.length ? "" : alt}
                  width={660}
                  height={1434}
                  sizes="(min-width: 768px) 15rem, 55vw"
                  className="h-auto w-[55vw] max-w-[15rem] rounded-[1.6rem] shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:rotate-[-1deg]"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Scope */}
      <section aria-labelledby="kapsam" className="bg-paper">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1fr]">
          <div data-reveal>
            <h2 id="kapsam" className="title max-w-lg">
              Neyi yapar, neyi yapmaz?
            </h2>
            <p className="lead mt-5 max-w-lg text-muted">
              Kahya ofisinizin işini ve alacak-borç durumunu tutar. Muhasebe programınızın yerini almaz; mali müşavirinize
              ay sonu paketini hazırlar.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div data-reveal="zoom" className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-extrabold">Kahya’da var</h3>
              <ul className="mt-4 space-y-3">
                {scope.yes.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.98rem]">
                    <Check size={19} className="mt-0.5 shrink-0 text-petrol" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="zoom" style={{ "--d": "120ms" } as CSSProperties} className="rounded-2xl border border-dashed border-line p-6">
              <h3 className="font-extrabold">Kahya’da yok</h3>
              <ul className="mt-4 space-y-3">
                {scope.no.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.98rem] text-muted">
                    <Minus size={19} className="mt-0.5 shrink-0" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Film */}
      <section aria-labelledby="film" className="relative overflow-hidden bg-pine-900 text-white">
        <div aria-hidden className="aurora -left-32 top-0 size-[30rem] bg-petrol-600/40" />
        <div className="wrap relative grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
          <div data-reveal>
            <h2 id="film" className="title">
              Yarım dakikada Kahya
            </h2>
            <p className="lead mt-5 text-white/72">
              Müşteriler bir dosyada, yazışmalar başka bir kutuda, bakiyeler tablolarda. Peki işler tam olarak nerede?
            </p>
            <Link href="/tanitim-filmi" className="link mt-6 inline-block text-brass-300">
              İki dakikalık tanıtım filmi ve metni
            </Link>
          </div>
          <div data-reveal="zoom" style={{ "--d": "120ms" } as CSSProperties}>
            <VideoPlayer
              src="/media/film/kahya-reklam.mp4"
              poster="/media/film/kahya-reklam.webp"
              captions="/media/film/kahya-reklam.vtt"
              title="Kahya reklam filmi"
              duration="0:36"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="sss" className="border-t border-line bg-paper">
        <div className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div data-reveal>
            <h2 id="sss" className="title">
              Sık sorulanlar
            </h2>
            <Link href="/sss" className="link mt-5 inline-block">
              Tüm sorular
            </Link>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            <Faq items={generalFaq.slice(0, 6)} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
