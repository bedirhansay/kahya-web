import { ArrowRight, Check, DatabaseBackup, KeyRound, MapPin, Play, ShieldCheck, Undo2, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AppStage } from "@/components/AppStage";
import { CtaBand } from "@/components/CtaBand";
import { DayTabs, type DayMoment } from "@/components/DayTabs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { AiMock, CariMock, LeavePhoneMock, MailMock, MailToTaskMock, MeetingsMock, StockMock, TaskSummaryMock } from "@/components/mock/screens";
import { SectorMock } from "@/components/mock/SectorMock";
import { SectionHead } from "@/components/SectionHead";
import { SectorTabs } from "@/components/SectorTabs";
import { VideoPlayer } from "@/components/VideoPlayer";
import { generalFaq } from "@/content/faq";
import { featuredSectors, sectorBySlug } from "@/content/sectors";
import { extras, trust } from "@/content/solutions";
import { faqLd, pageMetadata, softwareLd, videoLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Kahya | Ofis Yönetim Programı: Görev, CRM, Cari ve Personel Takibi",
    description: site.description,
  }),
  title: { absolute: "Kahya | Ofis Yönetim Programı: Görev, CRM, Cari ve Personel Takibi" },
};

const tabSectors = featuredSectors.map((slug) => sectorBySlug(slug)!);

const compare = [
  ["İş kimde, ne durumda?", "Mesaj grubunda soruluyor.", "Görev sorumlusu ve durumuyla herkesin önünde."],
  ["Bu hafta kim izinli?", "İzin kâğıdı ya da mesaj.", "İzin telefondan istenir, onaylanınca takvime işlenir."],
  ["Müşteriyle en son ne konuşuldu?", "Görüşen kişinin aklında.", "Görüşme müşteri kartında, takip günüyle."],
  ["Kim kime ne kadar borçlu?", "Ayrı tablolarda, elle toplanıyor.", "Cari bakiye her tahsilatta kendiliğinden güncellenir."],
  ["Taksit ne zaman?", "Takvime not düşülüyor, unutulursa geçiyor.", "Ödeme planı vadesinde hatırlatır."],
  ["Ay sonunda ne gönderilecek?", "Dosyalar tek tek toplanıyor.", "Mali Müşavir Paketi tek dosya olarak hazırlanır."],
] as const;

const OFIS = { name: "Ofis Yönetimi", href: "/cozumler/ofis-yonetimi" };
const CRM = { name: "CRM", href: "/cozumler/crm" };
const FINANS = { name: "Finans & Cari", href: "/cozumler/finans-cari" };

const day: DayMoment[] = [
  {
    key: "izin",
    time: "09.10",
    title: "Ayşe telefondan izin istedi",
    text: "Talep yöneticinin Onayınızı bekleyenler listesine düştü. Tek dokunuşla onaylandı, izin takvime işlendi.",
    solution: OFIS,
    visual: <LeavePhoneMock />,
  },
  {
    key: "eposta",
    time: "11.30",
    title: "Müşterinin e-postası göreve döndü",
    text: "Karadeniz Gıda ekim raporunu istedi. E-posta sorumlusu, projesi ve bitiş tarihiyle Can’ın görevi oldu.",
    solution: OFIS,
    visual: <MailToTaskMock className="w-full max-w-xl" />,
  },
  {
    key: "gorusme",
    time: "14.00",
    title: "Görüşme müşteri kartına yazıldı",
    text: "Kuzey Mobilya yeni ofis için teklif istedi. Not ve takip günü kartta, o gün geldiğinde listede önünüze çıkar.",
    solution: CRM,
    visual: <MeetingsMock className="w-full max-w-xl" />,
  },
  {
    key: "tahsilat",
    time: "17.45",
    title: "Tahsilat bakiyeye işlendi",
    text: "Kuzey Mobilya ₺20.000 ödedi. Kayıt girildiği anda cari bakiye ve hesap ekstresi güncellendi.",
    solution: FINANS,
    visual: <CariMock className="w-full max-w-xl" />,
  },
  {
    key: "ozet",
    time: "18.30",
    title: "Gün kimseyi aramadan kapandı",
    text: "Görev Özeti kimin kaç iş bitirdiğini, nerede gecikme olduğunu gösteriyor.",
    solution: OFIS,
    visual: <TaskSummaryMock className="w-full max-w-xl" />,
  },
];

const trustIcons = [MapPin, KeyRound, Undo2, ShieldCheck, DatabaseBackup];

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

      {/* Hero: the product itself, narrowed by the visitor's choice */}
      <section className="hero-tint">
        <div className="wrap pb-16 pt-12 md:pb-20 md:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:gap-14">
            <h1 className="display max-w-3xl [font-size:clamp(2.4rem,1.5rem+2.9vw,4rem)]">Ekibiniz, müşterileriniz ve carileriniz tek uygulamada</h1>
            <div>
              <p className="lead text-muted">
                Kahya ofisler için yönetim programı. İhtiyacınız olan çözümleri seçin, ekibiniz yalnızca işine yarayanı görsün.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={site.app.register} className="btn btn-brass">
                  Hemen başla
                </a>
                <Link href="/tanitim-filmi" className="btn btn-line">
                  <Play size={15} aria-hidden className="fill-current text-brand" />
                  Tanıtım filmi, 2 dk
                </Link>
              </div>
            </div>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem] text-muted">
            {["Kurulum yok, tarayıcıda açılır", "Telefonda da aynı Kahya", "Verileriniz Türkiye’de"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check size={16} className="shrink-0 text-brand" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-12 md:mt-16">
            <AppStage />
          </div>
        </div>
      </section>

      {/* One office day */}
      <section aria-labelledby="bir-gun" className="bg-white">
        <div className="wrap py-16 md:py-20">
          <SectionHead
            id="bir-gun"
            title="Kahya’da bir ofis günü"
            lead="Sabah gelen izin talebinden akşamki tahsilata kadar her iş bir kayıtta. Bir saate dokunun, o anın ekranını görün."
          />
          <div className="mt-12">
            <DayTabs moments={day} />
          </div>
        </div>
      </section>

      {/* Before and after */}
      <section aria-labelledby="karsilastir" className="bg-white">
        <div className="wrap py-16 md:py-20">
          <SectionHead
            id="karsilastir"
            title="Excel, WhatsApp ve kâğıt yerine"
            lead="Bir ofisin her gün sorduğu sorular. Dağınık araçlarla ve Kahya ile cevabı nerede?"
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-line">
            <div className="hidden grid-cols-[1fr_1fr_1.2fr] bg-mist text-sm font-semibold md:grid">
              <span className="px-5 py-3">Soru</span>
              <span className="px-5 py-3 text-muted">Excel, WhatsApp, kâğıt</span>
              <span className="px-5 py-3 text-brand">Kahya</span>
            </div>
            <ul className="divide-y divide-line">
              {compare.map(([q, before, after]) => (
                <li key={q} className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_1fr_1.2fr] md:gap-0 md:p-0">
                  <span className="font-semibold md:px-5 md:py-4">{q}</span>
                  <span className="flex gap-2 text-muted md:px-5 md:py-4">
                    <X size={17} className="mt-0.5 shrink-0 text-[#b42318]/70" aria-hidden />
                    <span>
                      <span className="sr-only">Excel, WhatsApp ve kâğıtla: </span>
                      {before}
                    </span>
                  </span>
                  <span className="flex gap-2 md:bg-brand-50/60 md:px-5 md:py-4">
                    <Check size={17} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <span>
                      <span className="sr-only">Kahya ile: </span>
                      {after}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section aria-labelledby="sektorler" className="bg-white">
        <div className="wrap py-16 md:py-20">
          <SectionHead
            id="sektorler"
            title="Sizin gibi bir ofiste Kahya"
            lead="Aynı uygulama, farklı işler. Sektörünüzü seçin, Kahya’nın sizde nasıl çalışacağını görün."
          />
          <div className="mt-10">
            <SectorTabs
              sectors={tabSectors}
              mocks={Object.fromEntries(tabSectors.map((s) => [s.slug, <SectorMock key={s.slug} kind={s.mock} />]))}
            />
            <Link href="/sektorler" className="link mt-6 inline-flex items-center gap-1.5">
              Tüm sektörler <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section aria-labelledby="ek-hizmetler" className="bg-white">
        <div className="wrap py-16 md:py-20">
          <div className="stage grid gap-10 p-6 md:p-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div className="min-w-0">
              <SectionHead
                id="ek-hizmetler"
                title="İhtiyacınız olduğunda ekleyin"
                lead="Ek hizmetler aynı kayıtlarla çalışır. Cari, görev ve müşteri kartı zaten Kahya’da."
              />
              <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                {extras.map((x) => (
                  <li key={x.name} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                    <span className="font-semibold">
                      {x.href ? (
                        <Link href={x.href} className="link">
                          {x.name}
                        </Link>
                      ) : (
                        x.name
                      )}
                    </span>
                    <span className="text-muted">{x.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-w-0 self-center">
              <MailMock />
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <StockMock />
                <AiMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section aria-labelledby="guven" className="bg-white">
        <div className="wrap py-16 md:py-20">
          <SectionHead id="guven" title="Verileriniz sizin, kontrol sizde" lead="Kahya’yı ekibinize güvenle açmanız için temel kurallar." />
          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {trust.map((t, i) => {
              const Icon = trustIcons[i] ?? ShieldCheck;
              return (
                <div key={t.term} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                    <Icon size={19} aria-hidden />
                  </span>
                  <span>
                    <dt className="font-semibold">{t.term}</dt>
                    <dd className="mt-1 leading-relaxed text-muted">{t.text}</dd>
                  </span>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* Film */}
      <section aria-labelledby="film" className="bg-white">
        <div className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHead
              id="film"
              title="Yarım dakikada Kahya"
              lead="Müşteriler bir dosyada, yazışmalar başka bir kutuda, bakiyeler tablolarda. Hepsi tek yerde olunca ne değişir?"
            />
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
      <section aria-labelledby="sss" className="bg-white">
        <div className="wrap grid gap-10 pb-20 pt-4 md:pb-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead id="sss" title="Aklınızdaki sorular" />
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
