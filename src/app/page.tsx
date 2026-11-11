import type { Metadata } from "next";
import Link from "next/link";

import { DayTabs, type DayMoment } from "@/components/DayTabs";
import { Faq } from "@/components/Faq";
import { HomeHero, type HeroSlide } from "@/components/home/HomeHero";
import { Problems } from "@/components/home/Problems";
import { JsonLd } from "@/components/JsonLd";
import { CariMock, LeavePhoneMock, MailToTaskMock, MeetingsMock, TaskSummaryMock } from "@/components/mock/screens";
import { generalFaq } from "@/content/faq";
import { extras, solutionBySlug } from "@/content/solutions";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Kahya | Ofis yönetim programı: görev, CRM, cari ve personel takibi",
    description: site.description,
  }),
  title: {
    absolute: "Kahya | Ofis yönetim programı: görev, CRM, cari ve personel takibi",
  },
};

const OFIS = { name: "Ofis yönetimi", href: "/cozumler/ofis-yonetimi" };
const CRM = { name: "CRM", href: "/cozumler/crm" };
const FINANS = { name: "Finans ve cari", href: "/cozumler/finans-cari" };

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
    text: "Görev özeti kimin kaç iş bitirdiğini, nerede gecikme olduğunu gösteriyor.",
    solution: OFIS,
    visual: <TaskSummaryMock className="w-full max-w-xl" />,
  },
];

const shot = (name: string, alt: string) => ({
  src: `/media/home/${name}.webp`,
  alt: `${alt} Örnek veri.`,
  width: 2400,
  height: 1520,
});
/** The same screen on a phone (390 × 844 at 3×), as the installed app. */
const phone = (name: string, alt: string) => ({
  src: `/media/home/${name}-tel.webp`,
  alt: `Aynı ekran telefonda: ${alt}`,
  width: 1170,
  height: 2532,
});

/** The opening's five slides; every sentence is a live feature, every screen the app's own (local sample office). */
const slides: HeroSlide[] = [
  {
    tag: "Cari ve tahsilat",
    lines: ["Kim ne borçlu,", "kimden ne zaman tahsilat var:", "tek ekranda."],
    points: ["Vadesi geçen ana sayfanıza düşer.", "Ekstreyi müşterinize linkle gönderirsiniz.", "Tahsilat açık taksitleri en eskiden kapatır."],
    href: "/cozumler/finans-cari",
    shot: shot("s1-cari", "Kahya’da bir müşterinin cari kartı: bakiye, gecikmiş ödeme, sonraki vade ve hesap ekstresi."),
    phone: phone("s1-cari", "cari kart."),
    event: { title: "Tahsilat cariye işlendi", value: "+₺2.500,00" },
  },
  {
    tag: "Ekip ve görevler",
    lines: ["Bugün kim ne yapıyor,", "hangi iş", "nerede kaldı."],
    points: ["Görevi kişiye ya da takıma verirsiniz.", "İzin telefondan istenir, tek dokunuşla onaylanır.", "Onayınızı bekleyenler tek listede."],
    href: "/cozumler/ofis-yonetimi",
    shot: shot("s2-gorev", "Kahya’da görevler listesi: sorumlu, durum ve bitiş tarihi."),
    phone: phone("s2-gorev", "görevler."),
    event: { title: "Görev tamamlandı", value: "Depo sayımı" },
  },
  {
    tag: "Müşteri takibi",
    lines: ["Her görüşme kayıtta,", "takip günü", "ana sayfada."],
    points: ["Görüşme notu müşterinin kartında durur.", "Takip günü gelen görüşme ana sayfada önünüze çıkar.", "Temas koptuğunda sorumlu kişiye haber gider."],
    href: "/cozumler/crm",
    shot: shot("s3-gorusme", "Kahya’da bir müşterinin görüşmeleri: ziyaret, telefon ve e-posta kayıtları."),
    phone: phone("s3-gorusme", "görüşmeler."),
    event: { title: "Takip günü", value: "13 Kasım" },
  },
  {
    tag: "Teklif ve stok",
    lines: ["Teklif linkle gider,", "müşteri linkten kabul eder,", "tek tıkla satışa döner."],
    points: ["Teklifi kendi antetinizle hazırlarsınız.", "Müşterinin teklifi açtığını görürsünüz.", "Kritik seviyeye inen ürünü Kahya işaretler."],
    href: "/cozumler#ek-hizmetler",
    shot: shot("s4-teklif", "Kahya’da kabul edilmiş bir teklif: kalemler, indirim, KDV ve genel toplam, yanında Satışa dönüştür düğmesi."),
    phone: phone("s4-teklif", "kabul edilmiş bir teklif."),
    event: { title: "Teklif kabul edildi", value: "₺10.260,00" },
  },
  {
    tag: "Personel ve puantaj",
    lines: ["Kim işte, kim gelmedi,", "kim kaç saat çalıştı:", "devam takibinde."],
    points: ["Giriş ve çıkış saatleri günlük puantaja yazılır.", "İzin telefondan istenir, onaylanınca işlenir.", "Yevmiye ve aylık hakediş personelin kartında."],
    href: "/ozellikler/personel-ve-izin",
    shot: shot("s5-puantaj", "Kahya’da devam takibi: şu an işte olanlar, çalışılan ve gelinmeyen günler, toplam süre."),
    phone: phone("s5-puantaj", "devam takibi."),
    event: { title: "Şu an işte", value: "2 kişi" },
  },
];

/** The three solutions, in the order an office meets them: money first. */
const modules = (["finans-cari", "ofis-yonetimi", "crm"] as const).map((slug) => solutionBySlug(slug)!);

/** How an office starts: each sentence is the app's own (SSS, Veri aktarımı, roles). */
const steps = [
  {
    h: "Ücretsiz başlayın",
    d: "Hesabınızı birkaç dakikada açarsınız. İlk 30 gün Kurumsal paketi denersiniz; süre bitince Ücretsiz pakete geçersiniz, verileriniz kalır.",
  },
  {
    h: "Verinizi aktarın",
    d: "Müşteri, tedarikçi, personel ve açılış bakiyelerini Excel şablonuyla alırsınız. Yüklemeden önce önizleme ve hata kontrolü yapılır.",
  },
  {
    h: "Ekibinizi ekleyin",
    d: "Her kişiye hazır bir rol verirsiniz: Ofis yöneticisi, Ekip yöneticisi ya da Personel. Herkes kendi işini kendi ekranından yürütür.",
  },
];

const faq = generalFaq.slice(0, 6);

/** One rhythm for every band: a single h2, at most two lines under it, room above and below. */
const band = "py-20 md:py-28 lg:py-32";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareLd(), faqLd(faq)]} />

      {/* 1. Opening: five real screens, one benefit each. */}
      <HomeHero slides={slides} />

      {/* 2. Which problems it solves: eight sentences from offices, each with its answer. */}
      <Problems />

      {/* 3. What Kahya does: three solutions, the add-ons in one line. */}
      <section aria-labelledby="ne-yapar" className="band-dark">
        <div className={`wrap ${band}`}>
          <div className="max-w-2xl">
            <h2 id="ne-yapar" className="title">
              Kahya ne yapar
            </h2>
            <p className="lead mt-4 text-ink/75">
              Üç çözüm, aynı kayıtlar. Kullanmadığınızı kapatırsınız, menüden kalkar.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {modules.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/cozumler/${m.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-brand/50"
                >
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{m.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-brand">
                    Çözümü inceleyin
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-ink/75">
            <Link href="/cozumler#ek-hizmetler" className="link">
              Ek hizmetler
            </Link>
            : {extras.map((x) => x.name).join(", ").replace(/, ([^,]*)$/, " ve $1")}. İhtiyacınız olduğunda eklenir.
          </p>
        </div>
      </section>

      {/* 4. One office day: pick an hour, see its screen. */}
      <section aria-labelledby="bir-gun">
        <div className={`wrap ${band}`}>
          <div className="max-w-2xl">
            <h2 id="bir-gun" className="title">
              Kahya’da bir ofis günü
            </h2>
            <p className="lead mt-4 text-muted">
              Sabahki izin talebinden akşamki tahsilata kadar her iş bir kayıtta. Bir saate dokunun, o anın ekranını görün.
            </p>
          </div>
          <div className="mt-12">
            <DayTabs moments={day} />
          </div>
        </div>
      </section>

      {/* 5. How to start: three steps, in order. */}
      <section aria-labelledby="nasil-baslanir" className="bg-mist">
        <div className={`wrap ${band}`}>
          <div className="max-w-2xl">
            <h2 id="nasil-baslanir" className="title">
              Nasıl başlanır
            </h2>
            <p className="lead mt-4 text-muted">Kurulum yok. Kahya tarayıcıda çalışır; telefonda ana ekrana eklenir.</p>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {steps.map((s, i) => (
              <li key={s.h} className="border-t border-ink/15 pt-6">
                <span className="font-display text-[1.05rem] font-bold text-brand tabular-nums">{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold">{s.h}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Questions, then the way in. */}
      <section aria-labelledby="sss">
        <div className={`wrap ${band}`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <h2 id="sss" className="title">
                Aklınızdaki sorular
              </h2>
              <Link href="/sss" className="link mt-4 inline-flex min-h-11 items-center">
                Tüm sorular
              </Link>
            </div>
            <Faq items={faq} />
          </div>
          <div className="mt-20 flex flex-col gap-6 border-t border-line pt-12 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-2xl font-bold tracking-[-0.02em]">Ofisinizi Kahya’ya taşıyın</p>
              <p className="mt-2 text-muted">Hesabınızı birkaç dakikada açarsınız. Sorunuz varsa bize yazın, biz döneriz.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={site.app.register} className="btn btn-brass">
                Ücretsiz başlayın
              </a>
              <Link href="/iletisim" className="btn btn-line">
                Bize yazın
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
