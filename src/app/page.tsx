import { ArrowRight, Check, Minus, Play, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { FeatureRow } from "@/components/FeatureRow";
import { JsonLd } from "@/components/JsonLd";
import {
  AiMock,
  ApprovalsMock,
  ApprovalTimesMock,
  BranchesMock,
  CariMock,
  LeavePhoneMock,
  MailMock,
  MailToTaskMock,
  MeetingsMock,
  MoneyHomeMock,
  PaymentPlanMock,
  RecentMeetingsMock,
  StockMock,
  TaskSummaryMock,
} from "@/components/mock/screens";
import { SectorMock } from "@/components/mock/SectorMock";
import { SectionHead } from "@/components/SectionHead";
import { SectorTabs } from "@/components/SectorTabs";
import { SolutionPicker } from "@/components/SolutionPicker";
import { VideoPlayer } from "@/components/VideoPlayer";
import { generalFaq } from "@/content/faq";
import { featuredSectors, sectorBySlug } from "@/content/sectors";
import { notIncluded, solutions, trust } from "@/content/solutions";
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

const [ofis, crm, finans] = solutions;
const tabSectors = featuredSectors.map((slug) => sectorBySlug(slug)!);

const compare = [
  ["İş kimde, ne durumda?", "Mesaj grubunda soruluyor.", "Görev sorumlusu ve durumuyla herkesin önünde."],
  ["Bu hafta kim izinli?", "İzin kâğıdı ya da mesaj.", "İzin telefondan istenir, onaylanınca takvime işlenir."],
  ["Müşteriyle en son ne konuşuldu?", "Görüşen kişinin aklında.", "Görüşme müşteri kartında, takip günüyle."],
  ["Kim kime ne kadar borçlu?", "Ayrı tablolarda, elle toplanıyor.", "Cari bakiye her tahsilatta kendiliğinden güncellenir."],
  ["Taksit ne zaman?", "Takvime not düşülüyor, unutulursa geçiyor.", "Ödeme planı vadesinde hatırlatır."],
  ["Ay sonunda ne gönderilecek?", "Dosyalar tek tek toplanıyor.", "Mali Müşavir Paketi tek dosya olarak hazırlanır."],
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
      <section className="band-dark overflow-hidden">
        <div className="wrap grid gap-12 pb-16 pt-14 md:pt-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:pb-24">
          <div>
            <h1>
              <span className="eyebrow block text-brass">Ofis yönetim programı</span>
              <span className="display mt-5 block">
                İşletmenizin <span className="accent">yönetim merkezi.</span>
              </span>
            </h1>
            <p className="lead mt-6 max-w-xl text-white/75">
              Ekip, müşteri ve cari tek uygulamada. Ofis Yönetimi, CRM ve Finans & Cari çözümlerinden ihtiyacınız olanı
              seçin, gerisi menünüzde görünmesin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.app.register} className="btn btn-brass">
                Hemen başla
                <ArrowRight size={17} aria-hidden />
              </a>
              <Link href="/tanitim-filmi" className="btn btn-line-dark">
                <Play size={15} aria-hidden className="fill-current text-brass" />
                Tanıtım filmi, 2 dk
              </Link>
            </div>
            <ul className="mt-8 grid gap-2 text-[0.95rem] text-white/70 sm:grid-cols-2">
              {["Kurulum yok, tarayıcıda açılır", "Telefonda da aynı Kahya", "Verileriniz Türkiye’de", "Bütün ekip içeride"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check size={16} className="shrink-0 text-sage" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-w-0 lg:pb-14">
            <MoneyHomeMock className="lg:w-[88%]" />
            <ApprovalsMock className="relative -mt-6 ml-auto w-[94%] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[78%]" />
          </div>
        </div>
      </section>

      {/* Solutions picker */}
      <section aria-labelledby="cozumler" className="band-dark border-t border-white/8">
        <div className="wrap py-16 md:py-24">
          <SectionHead
            id="cozumler"
            dark
            eyebrow="Üç çözüm, tek uygulama"
            title={
              <>
                İhtiyacınız olanı seçin. <span className="text-brass">Gerisi gizli kalsın.</span>
              </>
            }
            lead="Kurulumda çözümünüzü seçersiniz. Menü, ana sayfa ve ayarlar seçiminize göre sadeleşir. Ekibiniz yalnızca işine yarayanı görür."
          />
          <div className="mt-12">
            <SolutionPicker />
          </div>
        </div>
      </section>

      {/* Ofis Yönetimi, CRM, Finans */}
      <section aria-label="Çözümler ayrıntılı" className="bg-paper">
        <div className="wrap space-y-24 py-20 md:space-y-32 md:py-28">
          <FeatureRow
            id="ofis"
            eyebrow={`${ofis.no} · ${ofis.name}`}
            title={ofis.title}
            lead={ofis.lead}
            points={ofis.points}
            primary={<TaskSummaryMock />}
            secondary={<ApprovalTimesMock />}
          >
            <Link href="/cozumler/ofis-yonetimi" className="link mt-6 inline-flex items-center gap-1.5">
              Ofis Yönetimi’ni inceleyin <ArrowRight size={15} aria-hidden />
            </Link>
          </FeatureRow>
          <FeatureRow
            id="ekip"
            reverse
            phone
            eyebrow={`${ofis.no} · ${ofis.name}`}
            title={ofis.more.title}
            lead={ofis.more.lead}
            points={ofis.more.points}
            primary={<MailToTaskMock />}
            secondary={<LeavePhoneMock />}
          />
          <FeatureRow
            id="crm"
            eyebrow={`${crm.no} · CRM · ${crm.subtitle}`}
            title={crm.title}
            lead={crm.lead}
            points={crm.points}
            primary={<MeetingsMock />}
            secondary={<RecentMeetingsMock />}
          >
            <p className="mt-4 text-[0.95rem] text-muted">
              <span className="tag">Ek hizmet</span> <strong className="font-semibold text-ink">Teklif:</strong> müşteriye
              teklif hazırlayın ve takip edin.
            </p>
            <Link href="/cozumler/crm" className="link mt-5 inline-flex items-center gap-1.5">
              CRM’i inceleyin <ArrowRight size={15} aria-hidden />
            </Link>
          </FeatureRow>
          <FeatureRow
            id="finans"
            reverse
            eyebrow={`${finans.no} · ${finans.name}`}
            title={finans.title}
            lead={finans.lead}
            points={finans.points}
            primary={<CariMock />}
            secondary={<PaymentPlanMock />}
          >
            <Link href="/cozumler/finans-cari" className="link mt-6 inline-flex items-center gap-1.5">
              Finans & Cari’yi inceleyin <ArrowRight size={15} aria-hidden />
            </Link>
          </FeatureRow>
        </div>
      </section>

      {/* Compare */}
      <section aria-labelledby="karsilastir" className="border-t border-line bg-white">
        <div className="wrap py-20 md:py-28">
          <SectionHead
            id="karsilastir"
            eyebrow="Her şey birbirine bağlı"
            title="Excel, WhatsApp ve kâğıt yerine tek uygulama"
            lead="Bir ofisin her gün sorduğu sorular. Dağınık araçlarla ve Kahya ile cevabı nerede?"
          />
          <div className="mt-12 overflow-hidden rounded-[16px] border border-line">
            <div className="hidden grid-cols-[1fr_1fr_1.2fr] bg-mist text-sm font-semibold md:grid">
              <span className="px-5 py-3">Soru</span>
              <span className="px-5 py-3 text-muted">Excel, WhatsApp, kâğıt</span>
              <span className="px-5 py-3 text-petrol">Kahya</span>
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
      <section aria-labelledby="sektorler" className="border-t border-line bg-paper">
        <div className="wrap py-20 md:py-28">
          <SectionHead
            id="sektorler"
            eyebrow="Sektörünüze göre"
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

      {/* Add-ons and branches */}
      <section aria-label="Ek hizmetler" className="border-t border-line bg-white">
        <div className="wrap space-y-24 py-20 md:space-y-32 md:py-28">
          <FeatureRow
            id="ek-hizmetler"
            eyebrow="Ek hizmet · E-posta"
            title="Mailiniz, carinizle konuşur"
            lead="Kurumsal e-posta adresinizi bağlayın. Her e-posta kendi carisiyle eşleşir."
            points={[
              { term: "Yeni firma mı yazdı?", text: "tek tıkla cari olarak ekleyin." },
              { term: "Gelen belge", text: "doğrudan carinin dosyasına." },
              { term: "İş isteyen e-posta", text: "göreve dönüşür." },
            ]}
            primary={<MailMock />}
          />
          <FeatureRow
            id="stok-ai"
            reverse
            eyebrow="Ek hizmet · Stok ve Kahya AI"
            title={
              <>
                Stok satışla düşer. <span className="text-petrol">Kahya, verinizden yanıtlar.</span>
              </>
            }
            lead="İhtiyacınız olduğunda ekleyin. İkisi de aynı kayıtlarla çalışır."
            points={[
              { term: "Stok", text: "depolar tek listede, kritik seviyeye ineni Kahya işaretler, satışta seçilen ürün stoktan düşer." },
              { term: "Kahya AI", text: "sorun, Kahya kendi verinizden yanıtlasın. Siz onaylamadan hiçbir şey kaydedilmez." },
            ]}
            primary={<StockMock />}
            secondary={<AiMock />}
          >
            <p className="mt-5 text-[0.95rem] text-muted">
              Ayrıca <strong className="font-semibold text-ink">Teklif</strong> ve <strong className="font-semibold text-ink">Filo</strong>{" "}
              ek hizmetleri var.{" "}
              <Link href="/cozumler#ek-hizmetler" className="link">
                Tüm ek hizmetler
              </Link>
            </p>
          </FeatureRow>
          <FeatureRow
            id="her-yerde"
            phone
            eyebrow="Her yerde"
            title="Birden fazla şube, tek merkez"
            lead="Şubelerinizi ve ekibinizi tek hesaptan yönetin. Masada da cepte de aynı Kahya."
            points={[
              { term: "Şubeler", text: "her şubenin kaydı ayrı, raporu tek merkezde." },
              { term: "Telefonda", text: "personel izni, onaylar ve cari tek dokunuşla." },
              { term: "Çözümünüzü seçin", text: "menü ihtiyacınıza göre sadeleşir." },
            ]}
            primary={<BranchesMock />}
            secondary={<LeavePhoneMock />}
          />
        </div>
      </section>

      {/* Trust */}
      <section aria-labelledby="guven" className="band-dark">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHead
            id="guven"
            dark
            eyebrow="Türkiye için geliştirildi"
            title="Verileriniz sizin, kontrol sizde"
            lead="Kahya’yı ekibinize güvenle açmanız için temel kurallar."
          />
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {trust.map((t, i) => (
              <div key={t.term} className="border-t border-white/12 pt-5">
                <dt className="flex items-baseline gap-3 font-semibold">
                  <span className="eyebrow text-brass">{String(i + 1).padStart(2, "0")}</span>
                  {t.term}
                </dt>
                <dd className="mt-2 leading-relaxed text-white/70">{t.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Scope + film */}
      <section aria-label="Kapsam ve tanıtım filmi" className="bg-paper">
        <div className="wrap grid gap-14 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead
              id="kapsam"
              eyebrow="Açık konuşalım"
              title="Kahya’da olmayanlar"
              lead="Kahya ofisin işini ve alacak borç durumunu tutar. Muhasebe programınızın yerini almaz."
            />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {notIncluded.map((t) => (
                <li key={t} className="flex gap-3 py-3 text-muted">
                  <Minus size={18} className="mt-0.5 shrink-0" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead
              id="film"
              eyebrow="Tanıtım filmi"
              title="Yarım dakikada Kahya"
              lead="Müşteriler bir dosyada, yazışmalar başka bir kutuda, bakiyeler tablolarda. Hepsi tek yerde olunca ne değişir?"
            />
            <VideoPlayer
              src="/media/film/kahya-reklam.mp4"
              poster="/media/film/kahya-reklam.webp"
              captions="/media/film/kahya-reklam.vtt"
              title="Kahya reklam filmi"
              duration="0:36"
              className="mt-8"
            />
            <Link href="/tanitim-filmi" className="link mt-4 inline-block">
              İki dakikalık tanıtım filmi ve metni
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="sss" className="border-t border-line bg-white">
        <div className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead id="sss" eyebrow="Sık sorulanlar" title="Aklınızdaki sorular" />
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
