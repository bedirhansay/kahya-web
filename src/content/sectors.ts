import type { Point, Solution } from "./solutions";

/**
 * Sector landing pages. Each one is an example of how a kind of office uses Kahya,
 * built only from features the app has. No customer names, no numbers we cannot show.
 */
export type Sector = {
  slug: string;
  name: string;
  /** Short tab label on the home page. */
  tab: string;
  seo: { title: string; h1: string; description: string };
  lead: string;
  pains: string[];
  uses: { solution: Solution["slug"]; points: Point[] }[];
  mock: "task" | "meetings" | "plan" | "stock";
  faq: { q: string; a: string }[];
};

export const sectors: Sector[] = [
  {
    slug: "danismanlik-ve-ajans",
    name: "Danışmanlık firmaları ve ajanslar",
    tab: "Danışmanlık ve ajans",
    seo: {
      title: "Danışmanlık Firmaları ve Ajanslar için Proje, Müşteri ve Cari Takip Programı",
      h1: "Danışmanlık firmaları ve ajanslar için Kahya",
      description:
        "Müşteri işleri, projeler, görüşmeler ve hakediş tahsilatları tek yerde. Kahya ile hangi işin kimde olduğunu, hangi müşteriyle ne konuşulduğunu ve kimden ne alacaklı olduğunuzu görün.",
    },
    lead: "Birden çok müşteriye aynı anda iş yapan ekipler için. Hangi iş kimde, hangi müşteriyle ne konuşuldu, hangi hakediş tahsil edilmedi?",
    pains: [
      "Müşteri işi e-postada geliyor, kimin üstlendiği belli değil.",
      "Son görüşmede ne konuşulduğunu yalnız görüşen kişi biliyor.",
      "Hakedişlerin hangisi tahsil edildi, hangisi bekliyor, tabloya bakmadan bilinmiyor.",
    ],
    uses: [
      {
        solution: "ofis-yonetimi",
        points: [
          { term: "Projeler", text: "her müşteri işi bir proje. Görevler, dosyalar ve geçmiş içinde." },
          { term: "E-posta → görev", text: "müşterinin isteği tek tıkla göreve dönüşür." },
        ],
      },
      {
        solution: "crm",
        points: [{ term: "Görüşmeler", text: "her görüşme müşteri kartında, takip günüyle." }],
      },
      {
        solution: "finans-cari",
        points: [{ term: "Hakediş ve taksit", text: "ödeme planıyla vadeler takipte, tahsilat bakiyeye hemen yansır." }],
      },
    ],
    mock: "task",
    faq: [
      {
        q: "Her müşteri için ayrı proje açabilir miyim?",
        a: "Evet. Projeyi müşteriye, sorumluya ve ekibe bağlarsınız. Proje müşterinin cari kartında da görünür.",
      },
      {
        q: "Müşteriden gelen e-postaları Kahya’da görebilir miyim?",
        a: "Evet, E-posta ek hizmetiyle. Kurumsal adresinizi bağlarsınız, her e-posta gönderen müşterinin kartıyla eşleşir.",
      },
    ],
  },
  {
    slug: "mimarlik-ve-muhendislik",
    name: "Mimarlık ve mühendislik ofisleri",
    tab: "Mimarlık ve mühendislik",
    seo: {
      title: "Mimarlık ve Mühendislik Ofisleri için Proje, Sözleşme ve Ödeme Planı Takibi",
      h1: "Mimarlık ve mühendislik ofisleri için Kahya",
      description:
        "Projeler, sözleşmeler, müşteri ödeme planları ve ekibin izinleri tek yerde. Kahya ile proje ilerlemesini, sözleşme bitiş tarihlerini ve taksitleri takip edin.",
    },
    lead: "Uzun soluklu projeler, taksitli ödemeler ve sahada çalışan bir ekip. Hepsi aynı yerde takip edilir.",
    pains: [
      "Proje ilerlemesi ve teslim tarihi herkesin aklında farklı.",
      "Sözleşmenin bitiş tarihi geldiğinde fark ediliyor.",
      "Müşterinin taksitleri ayrı bir tabloda, vadesi geçen gözden kaçıyor.",
    ],
    uses: [
      {
        solution: "ofis-yonetimi",
        points: [
          { term: "Projeler", text: "teslim tarihi, bütçe, görevler ve toplantılar proje sayfasında." },
          { term: "Sözleşmeler", text: "bitiş tarihiyle girilir, bitmeden hatırlatılırsınız." },
          { term: "İzin", text: "saha ekibi izni telefondan ister." },
        ],
      },
      {
        solution: "finans-cari",
        points: [{ term: "Ödeme planı", text: "taksitler tek seferde oluşur, vadesi gelen Ana Sayfa’ya düşer." }],
      },
    ],
    mock: "plan",
    faq: [
      {
        q: "Sözleşme bitiş tarihini hatırlatır mı?",
        a: "Evet. Sözleşmeyi bitiş tarihiyle girersiniz, bitmeden kaç gün önce hatırlatılacağını siz belirlersiniz.",
      },
      {
        q: "Müşterinin taksitlerini nasıl takip ederim?",
        a: "Finans & Cari çözümünde ödeme planı kurarsınız. Taksitler tek seferde oluşur, vadesi gelen ödeme Ana Sayfa’da görünür.",
      },
    ],
  },
  {
    slug: "emlak-ofisi",
    name: "Emlak ofisleri",
    tab: "Emlak ofisi",
    seo: {
      title: "Emlak Ofisleri için Müşteri Görüşme, Kira ve Sözleşme Takip Programı",
      h1: "Emlak ofisleri için Kahya",
      description:
        "Müşteri görüşmeleri ve takip günleri, kira ve aidat vadeleri, sözleşme bitiş tarihleri tek yerde. Kahya ile hangi müşteriyi ne zaman arayacağınızı ve hangi ödemenin geldiğini görün.",
    },
    lead: "Çok sayıda müşteri görüşmesi, düzenli kira ve aidat ödemeleri, süresi dolan sözleşmeler.",
    pains: [
      "Hangi müşteriyi ne zaman arayacağınız not defterinde kalıyor.",
      "Kira ve aidat ödemesinin gelip gelmediği ay sonunda fark ediliyor.",
      "Kira sözleşmesinin bitişi son haftada hatırlanıyor.",
    ],
    uses: [
      {
        solution: "crm",
        points: [
          { term: "Görüşmeler", text: "her görüşme müşteri kartında, kişisi ve notuyla." },
          { term: "Takip günü", text: "takip günü gelen müşteri listede önünüze çıkar." },
        ],
      },
      {
        solution: "finans-cari",
        points: [{ term: "Düzenli ödemeler", text: "kira ve aidat vadesinde hatırlatılır." }],
      },
      {
        solution: "ofis-yonetimi",
        points: [{ term: "Sözleşmeler", text: "bitiş tarihiyle girilir, bitmeden hatırlatılırsınız." }],
      },
    ],
    mock: "meetings",
    faq: [
      {
        q: "Kahya’da ilan ya da portföy yönetimi var mı?",
        a: "Hayır. Kahya ilan sitesi ya da portföy programı değildir. Müşteri görüşmelerini, ödemeleri, sözleşmeleri ve ofisin işini takip eder.",
      },
      {
        q: "Kira ödemesini hatırlatır mı?",
        a: "Evet. Kira ve aidat gibi düzenli ödemeleri sıklığıyla tanımlarsınız, her vadede hatırlatılırsınız.",
      },
    ],
  },
  {
    slug: "teknik-servis",
    name: "Teknik servis ve bakım firmaları",
    tab: "Teknik servis",
    seo: {
      title: "Teknik Servis ve Bakım Firmaları için Görev, Stok ve Cari Takip Programı",
      h1: "Teknik servis ve bakım firmaları için Kahya",
      description:
        "Servis işleri, ekibe dağıtılan görevler, parça stoğu ve müşteri tahsilatları tek yerde. Kahya ile işi kimin üstlendiğini, depoda ne kaldığını ve kimden ne alacaklı olduğunuzu görün.",
    },
    lead: "Gelen iş ekibe dağıtılır, parça depodan çıkar, ödeme müşterinin carisine işlenir.",
    pains: [
      "Gelen servis işi telefonda kalıyor, kimin gideceği belli değil.",
      "Depoda hangi parçanın bittiği iş başında anlaşılıyor.",
      "Müşterinin borcu ayrı bir defterde tutuluyor.",
    ],
    uses: [
      {
        solution: "ofis-yonetimi",
        points: [{ term: "Görevler ve takımlar", text: "iş takıma verilir, uygun olan Üstlen ile alır, ekip görür." }],
      },
      {
        solution: "finans-cari",
        points: [{ term: "Cari ve tahsilat", text: "servis bedeli müşterinin carisine işlenir, tahsilat bakiyeyi düşürür." }],
      },
    ],
    mock: "stock",
    faq: [
      {
        q: "Parça stoğunu takip edebilir miyim?",
        a: "Evet, Stok ek hizmetiyle. Depolar tek listede durur, kritik seviyeye inen ürün işaretlenir, satışta seçilen ürün stoktan düşer.",
      },
      {
        q: "Servis araçlarını takip edebilir miyim?",
        a: "Evet, Filo ek hizmetiyle. Araçlar, seferler ve araç bazında gelir gider takip edilir.",
      },
    ],
  },
];

export const sectorBySlug = (slug: string) => sectors.find((s) => s.slug === slug);
