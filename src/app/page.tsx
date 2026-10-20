import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import { Img } from "@/components/Img";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { DayTimeline, type DayStep } from "@/components/DayTimeline";
import { Faq } from "@/components/Faq";
import { Frame } from "@/components/Frame";
import { HeroTour } from "@/components/HeroTour";
import { JsonLd } from "@/components/JsonLd";
import { VideoPlayer } from "@/components/VideoPlayer";
import { generalFaq } from "@/content/faq";
import { features } from "@/content/features";
import { faqLd, pageMetadata, softwareLd, videoLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Kahya | Ofis yönetim yazılımı: cari, görev, personel ve onay",
    description: site.description,
  }),
  title: { absolute: "Kahya | Ofis yönetim yazılımı: cari, görev, personel ve onay" },
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
      <section className="grid-bg relative overflow-hidden bg-pine-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(60%_60%_at_50%_100%,rgb(20_98_91/0.55),transparent)]"
        />
        <div className="wrap relative pb-14 pt-16 text-center md:pb-20 md:pt-24">
          <p className="mx-auto inline-flex items-center gap-2 rounded-md border border-white/12 px-3 py-1.5 text-sm font-semibold text-white/80">
            <span className="rounded bg-brass px-1.5 py-0.5 text-xs font-bold text-pine-950">Yeni</span>
            Kahya AI artık ofisinizde
          </p>
          <h1 className="display mx-auto mt-7 max-w-4xl">
            Ofisinizin bütün parçaları, <span className="text-brass">bir arada</span>
          </h1>
          <p className="lead mx-auto mt-6 max-w-2xl text-white/72">
            Cari bakiyeler, görevler, e-posta, personel ve izinler, talepler ve onaylar. Ayrı dosyalarda, mesajlarda ve
            kâğıtlarda değil; tek bir yerde.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={site.app.register} className="btn btn-brass">
              Hemen başla
            </a>
            <Link href="/tanitim-filmi" className="btn btn-line-dark">
              Tanıtım filmini izle, 2 dk
            </Link>
          </div>
          <div className="mx-auto mt-14 max-w-6xl md:mt-16">
            <HeroTour />
          </div>
        </div>
      </section>

      {/* Modules */}
      <section aria-labelledby="moduller" className="border-b border-line bg-paper">
        <div className="wrap py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-end">
            <h2 id="moduller" className="title max-w-xl">
              Ofisin bütün işi, tek uygulamada
            </h2>
            <p className="lead max-w-xl text-muted md:justify-self-end">
              Kullanmadığınız bölümü kapatın, menüden kalksın. Ekran yalnızca ofisinizin işine göre sadeleşir.
            </p>
          </div>
          <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.slug} className="border-b border-line sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
                <Link
                  href={`/ozellikler/${f.slug}`}
                  className="group flex h-full flex-col gap-1.5 px-1 py-6 transition-colors hover:bg-mist sm:px-6"
                >
                  <span className="text-lg font-extrabold tracking-[-0.02em] group-hover:text-petrol">{f.name}</span>
                  <span className="text-[0.95rem] text-muted">{f.summary}</span>
                </Link>
              </li>
            ))}
            <li className="border-b border-line sm:col-span-2">
              <Link href="/ozellikler" className="flex h-full flex-col gap-1.5 bg-mist px-1 py-6 sm:px-6">
                <span className="text-lg font-extrabold tracking-[-0.02em] text-petrol">Tüm özellikler</span>
                <span className="text-[0.95rem] text-muted">Otomasyonlar, etiketler, özel alanlar, Excel’den aktarım…</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* A day */}
      <section aria-labelledby="bir-gun" className="bg-paper">
        <div className="wrap py-20 md:py-28">
          <h2 id="bir-gun" className="title max-w-2xl">
            Kahya’da bir iş günü
          </h2>
          <p className="lead mt-5 max-w-2xl text-muted">
            Sabah özetinden ay sonu paketine kadar, bir ofisin günü Kahya’da böyle akar. Görüntüler uygulamanın kendisi.
          </p>
          <div className="mt-14">
            <DayTimeline steps={day} />
          </div>
        </div>
      </section>

      {/* Kahya AI */}
      <section aria-labelledby="ai" className="grid-bg overflow-hidden bg-pine-950 text-white">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold text-brass">
              <Img src="/brand/kahya-mark.svg" alt="" width={20} height={20} unoptimized className="size-5" />
              Kahya AI
            </p>
            <h2 id="ai" className="title mt-4">
              Söyleyin, Kahya hazırlasın, siz onaylayın
            </h2>
            <p className="lead mt-5 text-white/72">
              Kayıtlarınıza bakarak soruları yanıtlar; görev, not, tahsilat, toplantı ve e-posta taslağı hazırlar. Her
              öneri bir kart olarak gelir. Siz Onayla demeden hiçbir şey kaydedilmez.
            </p>
            <ul className="mt-8 space-y-3 text-white/85">
              {[
                "“Bugün ne var?” diye sorun; günün özeti hazır",
                "Fişin fotoğrafını ekleyin; alış kaydı hazır",
                "Vadesi geçenlere toplu hatırlatma taslağı",
                "Her sayfadan Alt+K ile açılır",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-brass" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/ozellikler/kahya-ai" className="btn btn-line-dark mt-9">
              Kahya AI’ı tanıyın
            </Link>
          </div>
          <Frame src="/screens/brief.webp" alt="Kahya AI paneli: günün özeti ve takip görevi önerisi" dark />
        </div>
      </section>

      {/* Phone */}
      <section aria-labelledby="telefon" className="overflow-hidden bg-mist">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <h2 id="telefon" className="title max-w-xl">
              Ofis cebinizde de açık
            </h2>
            <p className="lead max-w-xl text-muted">
              Kahya telefonda da tam çalışır. Ana ekrana ekleyin; izin isteyin, onay verin, bakiyeye bakın. Ayrı bir uygulama
              indirmeniz gerekmez.
            </p>
          </div>
        </div>
        <div className="-mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-20 md:gap-6 md:px-8 md:pb-28 [scrollbar-width:none]">
          {[
            ["01", "Cari, görev ve e-posta tek yerde"],
            ["02", "Ayın durumu tek bakışta"],
            ["03", "Kahya AI telefonda da yanınızda"],
            ["04", "Ekibin işi tek panoda"],
            ["05", "Gelen kutunuz da burada"],
            ["06", "Onaylar tek dokunuşta"],
            ["07", "Bakiye ve vade hep önünüzde"],
          ].map(([n, alt]) => (
            <Img
              key={n}
              src={`/screens/mobil/${n}.webp`}
              alt={alt}
              width={660}
              height={1434}
              sizes="(min-width: 768px) 15rem, 62vw"
              className="h-auto w-[62vw] max-w-[15rem] shrink-0 snap-center rounded-[1.6rem] shadow-xl first:ml-auto last:mr-auto"
            />
          ))}
        </div>
      </section>

      {/* Scope */}
      <section aria-labelledby="kapsam" className="bg-paper">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="kapsam" className="title max-w-lg">
              Neyi yapar, neyi yapmaz?
            </h2>
            <p className="lead mt-5 max-w-lg text-muted">
              Kahya ofisinizin işini ve alacak-borç durumunu tutar. Muhasebe programınızın yerini almaz; mali müşavirinize
              ay sonu paketini hazırlar.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
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
            <div>
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
      <section aria-labelledby="film" className="bg-pine-900 text-white">
        <div className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
          <div>
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
        <div className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
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
