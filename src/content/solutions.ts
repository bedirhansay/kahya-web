/**
 * The three solutions Kahya is sold as, and the add-ons on top. Only what the app does today:
 * no cash/bank accounts, e-invoice, SMS, pipeline, online payment or third-party integrations.
 */
export type Solution = {
  slug: string;
  name: string;
  question: string;
  body: string;
  points: string[];
  screen: { src: string; alt: string };
  links: { href: string; label: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "ofis-yonetimi",
    name: "Ofis Yönetimi",
    question: "Ekip bugün ne yaptı, kim izinde, onay kimde bekliyor?",
    body: "Görevi kişiye ya da takıma verirsiniz, durumunu herkes aynı yerden görür. Çalışan izin ve avans talebini telefondan gönderir, siz bekleyenleri tek listede onaylarsınız.",
    points: [
      "Görevler, takımlar ve takvim",
      "Personel kartları, izin ve devam takibi",
      "Avans, masraf ve satın alma talepleri, onayınızı bekleyenler tek listede",
      "Projeler, dokümanlar, sözleşmeler ve demirbaşlar",
      "Duyurular, personel özeti ve onay süresi raporları",
    ],
    screen: { src: "/screens/talepler.webp", alt: "Kahya talepler ekranı: onay bekleyen izin ve avans talepleri" },
    links: [
      { href: "/ozellikler/gorev-takibi", label: "Görevler" },
      { href: "/ozellikler/personel-ve-izin", label: "Personel ve izin" },
      { href: "/ozellikler/talep-ve-onay", label: "Talepler ve onaylar" },
      { href: "/ozellikler/proje-yonetimi", label: "Projeler" },
      { href: "/ozellikler/dokuman-ve-sozlesme", label: "Dokümanlar" },
    ],
  },
  {
    slug: "musteri-iliskileri",
    name: "Müşteri İlişkileri",
    question: "Hangi müşteriyle ne konuşuldu, bir sonraki arama ne zaman?",
    body: "Her görüşmeyi müşterinin kartına not edersiniz ve bir takip günü yazarsınız. Kimi ne zaman arayacağınız kâğıtta ya da akılda kalmaz.",
    points: [
      "Müşteri kartı ve görüşme geçmişi",
      "Her müşteri için takip günü",
      "Teklif ek hizmetiyle kendi antetli teklifiniz",
    ],
    screen: { src: "/screens/cari.webp", alt: "Kahya müşteri kartı: iletişim bilgileri ve hareketler" },
    links: [{ href: "/ozellikler/cari-takibi", label: "Müşteri kartı" }],
  },
  {
    slug: "finans-cari",
    name: "Finans & Cari",
    question: "Kim kime ne kadar borçlu, hangi taksit ne zaman?",
    body: "Müşteri ve tedarikçi carilerini, tahsilat ve ödemeleri tutarsınız. Taksitli işlerde ödeme planı kurarsınız, vadesi gelen ödeme ana sayfada önünüze çıkar. Ay sonunda mali müşavirinize tek dosya gönderirsiniz.",
    points: [
      "Müşteri, tedarikçi ve personel carileri",
      "Tahsilat, ödeme ve yürüyen bakiye",
      "Taksit ve ödeme planları",
      "Alacak ve borç raporları",
      "Gelir ve gider kaydıyla ön muhasebe",
    ],
    screen: { src: "/screens/home.webp", alt: "Kahya ana sayfa: aylık gelir, gider ve vadesi gelen ödemeler" },
    links: [
      { href: "/ozellikler/cari-takibi", label: "Cari takibi" },
      { href: "/ozellikler/odeme-planlari", label: "Ödeme planları" },
      { href: "/ozellikler/raporlar", label: "Raporlar" },
    ],
  },
];

export type Extra = { name: string; body: string; href?: string };

export const extras: Extra[] = [
  {
    name: "E-posta",
    body: "Firmanın e-posta kutusu Kahya’nın içinde. Gelen e-postayı müşterinin kartına bağlar ya da göreve çevirirsiniz.",
    href: "/ozellikler/e-posta",
  },
  {
    name: "Stok",
    body: "Ürün ve depo kartları, giriş ve çıkış hareketleri. Satış girdiğinizde stok kendiliğinden düşer.",
  },
  {
    name: "Teklif",
    body: "Kendi antetinizle teklif hazırlarsınız. Müşteri linkten açıp kabul eder, kabul edilen teklif tek tıkla satışa döner.",
  },
  {
    name: "Kahya AI",
    body: "Kayıtlarınıza bakarak soruları yanıtlar, görev ve tahsilat taslağı hazırlar. Siz onaylamadan hiçbir şey kaydedilmez.",
    href: "/ozellikler/kahya-ai",
  },
  {
    name: "Filo",
    body: "Araçlar, seferler ve araç bazında gelir gider takibi.",
  },
];

/** Work we do for the customer, quoted per job. */
export const services: Extra[] = [
  {
    name: "Kurulum ve veri aktarımı",
    body: "Carilerinizi, personelinizi ve açılış bakiyelerinizi Excel’den ya da eski programınızdan biz aktarırız.",
  },
  {
    name: "Kurumsal e-posta",
    body: "ad@firmaniz.com.tr adresleri, kurulumu ve Kahya’ya bağlanması dahil.",
  },
  {
    name: "Web sitesi",
    body: "Firmanıza özel, telefonda da düzgün görünen tanıtım ya da e-ticaret sitesi. Kurulumu ve bakımı biz yaparız.",
  },
];

/** What Kahya does not do. Shown as is, so nobody buys it for the wrong job. */
export const notIncluded = [
  "Fatura, e-Fatura ve resmî muhasebe kaydı",
  "Kasa ve banka hesabı",
  "SMS gönderimi",
  "Online ödeme ve kartla satın alma",
  "Başka programlarla entegrasyon",
];
