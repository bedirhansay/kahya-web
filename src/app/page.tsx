import {
  ArrowRight,
  BellRing,
  Check,
  Coins,
  CreditCard,
  DatabaseBackup,
  Download,
  KeyRound,
  LifeBuoy,
  ShieldCheck,
  Undo2,
  Users,
  Wallet,
  X,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { DayTabs, type DayMoment } from "@/components/DayTabs";
import { Faq } from "@/components/Faq";
import { OfficeDay } from "@/components/home/OfficeDay";
import { JsonLd } from "@/components/JsonLd";
import {
  AiMock,
  CariMock,
  LeavePhoneMock,
  MailMock,
  MailToTaskMock,
  MeetingsMock,
  StockMock,
  TaskSummaryMock,
} from "@/components/mock/screens";
import { SectorMock } from "@/components/mock/SectorMock";
import { SectionHead } from "@/components/SectionHead";
import { SectorTabs } from "@/components/SectorTabs";
import { VideoPlayer } from "@/components/VideoPlayer";
import { generalFaq } from "@/content/faq";
import { featuredSectors, sectorBySlug } from "@/content/sectors";
import { extras, homeMessages, homeTrustLine, promises, trust, vsAccounting } from "@/content/solutions";
import { faqLd, pageMetadata, softwareLd, videoLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Kahya | Ofis Yönetim Programı: Görev, CRM, Cari ve Personel Takibi",
    description: site.description,
  }),
  title: {
    absolute: "Kahya | Ofis Yönetim Programı: Görev, CRM, Cari ve Personel Takibi",
  },
};

const tabSectors = featuredSectors.map((slug) => sectorBySlug(slug)!);

const compare = [
  ["İş kimde, ne durumda?", "Mesaj grubunda soruluyor.", "Görev sorumlusu ve durumuyla herkesin önünde."],
  ["Bu hafta kim izinli?", "İzin kâğıdı ya da mesaj.", "İzin telefondan istenir, onaylanınca takvime işlenir."],
  ["Müşteriyle en son ne konuşuldu?", "Görüşen kişinin aklında.", "Görüşme müşteri kartında, takip günüyle."],
  [
    "Kim kime ne kadar borçlu?",
    "Ayrı tablolarda, elle toplanıyor.",
    "Cari bakiye her tahsilatta kendiliğinden güncellenir.",
  ],
  ["Taksit ne zaman?", "Takvime not düşülüyor, unutulursa geçiyor.", "Ödeme planı vadesinde hatırlatır."],
  ["Ay sonunda ne gönderilecek?", "Dosyalar tek tek toplanıyor.", "Mali Müşavir Paketi tek dosya olarak hazırlanır."],
] as const;

const OFIS = { name: "Ofis Yönetimi", href: "/cozumler/ofis-yonetimi" };
const CRM = { name: "CRM", href: "/cozumler/crm" };
const FINANS = { name: "Finans ve Cari", href: "/cozumler/finans-cari" };

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

const trustIcons = [KeyRound, Undo2, ShieldCheck, DatabaseBackup];
const messageIcons = [Wallet, Users, BellRing];
const promiseIcons = [CreditCard, Coins, LifeBuoy, Download];

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

      {/* The office's day: one live window, one job through the office, Kahya AI and the team's week */}
      <OfficeDay />

      {/* H13 §2: what Kahya does, in three sentences, and the trust line under them */}
      <section aria-labelledby="kahya-ne-yapar">
        <div className="wrap py-16 md:py-20">
          <h2 id="kahya-ne-yapar" className="sr-only">
            Kahya ne yapar
          </h2>
          <dl className="grid gap-x-10 gap-y-9 lg:grid-cols-3">
            {homeMessages.map((m, i) => {
              const Icon = messageIcons[i] ?? Check;
              return (
                <div key={m.term} className="relative min-h-10 pl-14">
                  <dt className="font-semibold">
                    <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-xl bg-brand-50 text-brand">
                      <Icon size={19} aria-hidden />
                    </span>
                    {m.term}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-muted">{m.text}</dd>
                </div>
              );
            })}
          </dl>
          <p className="mt-10 flex gap-2 text-muted">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
            {homeTrustLine}
          </p>
        </div>
      </section>

      {/* One office day */}
      <section aria-labelledby="bir-gun" className="chapter">
        <div className="wrap py-16 md:py-20">
          <SectionHead
            id="bir-gun"
            eyebrow="Bir gün"
            title="Kahya’da bir ofis günü"
            lead="Sabah gelen izin talebinden akşamki tahsilata kadar her iş bir kayıtta. Bir saate dokunun, o anın ekranını görün."
          />
          <div className="mt-12">
            <DayTabs moments={day} />
          </div>
        </div>
      </section>

      {/* Before and after */}
      <section aria-labelledby="karsilastir">
        <div className="wrap py-16 md:py-20">
          <SectionHead
            id="karsilastir"
            eyebrow="Neden Kahya"
            title="Excel, WhatsApp ve kâğıt yerine"
            lead="Bir ofisin her gün sorduğu sorular. Dağınık araçlarla ve Kahya ile cevabı nerede?"
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-line">
            <div className="hidden grid-cols-[1fr_1fr_1.2fr] bg-mist text-sm font-semibold md:grid">
              <span className="px-5 py-3">Soru</span>
              <span className="px-5 py-3 text-muted">Excel, WhatsApp, kâğıt</span>
              <span className="px-5 py-3 text-brass">Kahya</span>
            </div>
            <ul className="divide-y divide-line">
              {compare.map(([q, before, after]) => (
                <li key={q} className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_1fr_1.2fr] md:gap-0 md:p-0">
                  <span className="font-semibold md:px-5 md:py-4">{q}</span>
                  <span className="flex gap-2 text-muted md:px-5 md:py-4">
                    <X size={17} className="mt-0.5 shrink-0 text-danger/80" aria-hidden />
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
          {/* Halfway down a long page: the next step, without scrolling to the end. */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={site.app.register} className="btn btn-brass">
              Ücretsiz başlayın
              <ArrowRight size={17} aria-hidden />
            </a>
            <Link href="/cozumler#paketler" className="btn btn-line">
              Paketleri karşılaştırın
            </Link>
          </div>
        </div>
      </section>

      {/* H13 §4: honest comparison with accounting programs (no product named) */}
      <section aria-labelledby="ne-yapmaz">
        <div className="wrap py-16 md:py-20">
          <SectionHead
            id="ne-yapmaz"
            eyebrow="Karşılaştırma"
            title="Kahya ne yapar, ne yapmaz"
            lead="Kahya fatura kesmez ve bankanıza bağlanmaz. Bunlar için muhasebe programınızı kullanmaya devam edersiniz; Kahya ofisin geri kalanını yönetir."
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-line">
            <div className="hidden grid-cols-[1fr_1.2fr_1fr] bg-mist text-sm font-semibold md:grid">
              <span className="px-5 py-3">Konu</span>
              <span className="px-5 py-3 text-brass">Kahya</span>
              <span className="px-5 py-3 text-muted">Ön muhasebe programları</span>
            </div>
            <ul className="divide-y divide-line">
              {vsAccounting.map(([topic, kahya, others]) => (
                <li key={topic} className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_1.2fr_1fr] md:gap-0 md:p-0">
                  <span className="font-semibold md:px-5 md:py-4">{topic}</span>
                  <span className="md:bg-brand-50/60 md:px-5 md:py-4">
                    <span className="font-semibold md:hidden">Kahya: </span>
                    {kahya}
                  </span>
                  <span className="text-muted md:px-5 md:py-4">
                    <span className="font-semibold md:hidden">Ön muhasebe programları: </span>
                    {others}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm text-muted">
            &quot;Ürüne göre&quot;: programdan programa değişir. e-Fatura mükellefiyseniz programınız kalır.
          </p>
        </div>
      </section>

      {/* Sectors */}
      <section aria-labelledby="sektorler" className="chapter">
        <div className="wrap py-16 md:py-20">
          <SectionHead
            id="sektorler"
            eyebrow="Sektörler"
            title="Sizin gibi bir ofiste Kahya"
            lead="Aynı uygulama, farklı işler. Sektörünüzü seçin, Kahya’nın sizde nasıl çalışacağını görün."
          />
          <div className="mt-10">
            <SectorTabs
              sectors={tabSectors}
              mocks={Object.fromEntries(tabSectors.map((s) => [s.slug, <SectorMock key={s.slug} kind={s.mock} />]))}
            />
            <Link href="/sektorler" className="link mt-4 inline-flex min-h-11 items-center gap-1.5">
              Tüm sektörler <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section aria-labelledby="ek-hizmetler">
        <div className="wrap py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div className="min-w-0">
              <SectionHead
                id="ek-hizmetler"
                eyebrow="Ek hizmetler"
                title="İhtiyacınız olduğunda ekleyin"
                lead="Ek hizmetler aynı kayıtlarla çalışır. Cari, görev ve müşteri kartı zaten Kahya’da."
              />
              <ul data-points className="mt-8 grid">
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
            <div className="stage relative min-w-0 self-center p-2 sm:p-8">
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
      <section aria-labelledby="guven">
        <div className="wrap py-16 md:py-20">
          <SectionHead
            id="guven"
            eyebrow="Güven"
            title="Verileriniz sizin, kontrol sizde"
            lead="Kahya’yı ekibinize güvenle açmanız için temel kurallar."
          />
          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {trust.map((t, i) => {
              const Icon = trustIcons[i] ?? ShieldCheck;
              return (
                <div key={t.term} className="relative min-h-10 pl-14">
                  <dt className="font-semibold">
                    <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-xl bg-brand-50 text-brand">
                      <Icon size={19} aria-hidden />
                    </span>
                    {t.term}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-muted">{t.text}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* H13 §5: four promises */}
      <section aria-labelledby="soz">
        <div className="wrap py-16 md:py-20">
          <SectionHead id="soz" eyebrow="Söz" title="Size söz verdiklerimiz" />
          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {promises.map((p, i) => {
              const Icon = promiseIcons[i] ?? Check;
              return (
                <div key={p.term} className="relative min-h-10 pl-14">
                  <dt className="font-semibold">
                    <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-xl bg-brand-50 text-brand">
                      <Icon size={19} aria-hidden />
                    </span>
                    {p.term}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-muted">{p.text}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* Film */}
      <section aria-labelledby="film" className="chapter">
        <div className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHead
              id="film"
              eyebrow="Tanıtım"
              title="Yarım dakikada Kahya"
              lead="Müşteriler bir dosyada, yazışmalar başka bir kutuda, bakiyeler tablolarda. Hepsi tek yerde olunca ne değişir?"
            />
            <Link href="/tanitim-filmi" className="link mt-4 inline-flex min-h-11 items-center">
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
      <section aria-labelledby="sss">
        <div className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead id="sss" eyebrow="Sorular" title="Aklınızdaki sorular" />
            <Link href="/sss" className="link mt-3 inline-flex min-h-11 items-center">
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
