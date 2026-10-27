/**
 * The three solutions Kahya is sold as, and the add-ons on top. Wording follows the campaign
 * deck (promo-video/out/13-sunum-pdf). Only what the app does today: no cash/bank accounts,
 * e-invoice, SMS, pipeline, online payment or third-party integrations.
 */
export type Point = { term: string; text: string };

export type Solution = {
  slug: "ofis-yonetimi" | "crm" | "finans-cari";
  no: string;
  kicker: string;
  name: string;
  /** Second line under the name, as the app shows it. */
  subtitle?: string;
  /** One line for cards and menus. */
  summary: string;
  title: string;
  lead: string;
  points: Point[];
  /** Search-facing page title and h1 for /cozumler/[slug]. */
  seo: { title: string; h1: string; description: string };
  more: { title: string; lead: string; points: Point[] };
  features: string[];
  faq: { q: string; a: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "ofis-yonetimi",
    no: "01",
    kicker: "Ekip ve işleyiş",
    name: "Ofis Yönetimi",
    summary: "Ekip, görev, izin, onay, takvim, belgeler ve talepler.",
    title: "Ekibiniz bugün ne yaptı?",
    lead: "Kimseyi aramadan görün: kim kaç iş bitirdi, nerede gecikme var, hangi onay kimde bekliyor.",
    points: [
      { term: "Görev Özeti", text: "kişi bazında biten, geciken ve açık işler tek raporda." },
      { term: "Onay süreleri", text: "hangi onay ne kadar sürdü, kimde takıldı." },
      { term: "Ana Sayfa · Ekip bugün", text: "kim izinde, ne zaman dönüyor." },
    ],
    seo: {
      title: "Ofis Yönetim Programı: Görev, Personel, İzin ve Onay Takibi",
      h1: "Ofis yönetim programı: görev, izin ve onaylar tek yerde",
      description:
        "Kahya Ofis Yönetimi ile görevleri kişiye ya da takıma verin, izin ve avans taleplerini telefondan alın, onayları tek listeden verin. Görev Özeti ve onay süreleri raporlarıyla ekibin durumunu görün.",
    },
    more: {
      title: "Bütün ekip içeride",
      lead: "Kahya yalnız yöneticinin değil, bütün ekibin aracı. Herkes kendi işini kendi ekranından yürütür.",
      points: [
        { term: "İzin", text: "personel telefondan ister, yönetici tek dokunuşla onaylar." },
        { term: "E-posta → görev", text: "gelen e-posta göreve dönüşür. Sorumlusu, projesi ve bitiş tarihiyle." },
        { term: "Talepler ve duyurular", text: "masraf talebi, onay akışı ve ekip duyurusu tek yerde." },
      ],
    },
    features: ["gorev-takibi", "personel-ve-izin", "talep-ve-onay", "proje-yonetimi", "dokuman-ve-sozlesme"],
    faq: [
      {
        q: "Çalışanlarım Kahya’yı kullanmak için ayrı bir uygulama indirmeli mi?",
        a: "Hayır. Kahya tarayıcıda çalışır. Çalışan telefonundan açıp ana ekrana ekler, izin talebini oradan gönderir.",
      },
      {
        q: "Bir görevi kişiye değil takıma verebilir miyim?",
        a: "Evet. Sorumluyu boş bırakıp görevi takıma verirsiniz. İş takımın listesine düşer, uygun olan Üstlen ile alır ve ekip görür.",
      },
      {
        q: "Onay kimde bekliyor, nasıl görürüm?",
        a: "Talepler sayfasındaki Onayımı bekleyenler sekmesinde. Onay süreleri raporu da hangi talebin ne kadar beklediğini gösterir.",
      },
      {
        q: "Hangi talepleri yönetebilirim?",
        a: "İzin, avans, masraf ve satın alma talepleri hazır gelir. Kendi formunuzu ve onaylayıcılarını da tanımlayabilirsiniz.",
      },
    ],
  },
  {
    slug: "crm",
    no: "02",
    kicker: "Müşteri ve görüşme",
    name: "CRM",
    subtitle: "Müşteri İlişkileri",
    summary: "Müşteri görüşmeleri ve takip günleri. Teklif ek hizmet.",
    title: "Her görüşme kayıtta",
    lead: "Müşteriyle ne konuşuldu, sırada ne var? Ekipten kim bakarsa baksın aynı bilgiyi görür.",
    points: [
      { term: "Görüşme kaydı", text: "müşteri kartında, kişisi ve notuyla." },
      { term: "Takip günü", text: "takip günü gelen görüşmeler listede önünüze çıkar." },
      { term: "Ana Sayfa · Son görüşmeler", text: "kimle en son ne konuşuldu, tek listede." },
    ],
    seo: {
      title: "CRM Programı: Müşteri Görüşme ve Takip Programı",
      h1: "CRM programı: her müşteri görüşmesi kayıtta, takip günü unutulmaz",
      description:
        "Kahya CRM ile müşteri görüşmelerini kişisi ve notuyla kaydedin, takip günü yazın, takibi gelenler listede önünüze çıksın. Teklif ek hizmetiyle kendi antetli teklifinizi hazırlayın.",
    },
    more: {
      title: "Müşteri bilgisi bir kişinin aklında kalmaz",
      lead: "Görüşmeyi kim yaptıysa müşteri kartına yazar. Ertesi gün telefonu başka biri açsa da konu kaldığı yerden devam eder.",
      points: [
        { term: "Müşteri kartı", text: "iletişim bilgileri, kişiler, notlar ve görüşme geçmişi aynı yerde." },
        { term: "Teklif", text: "kendi antetinizle hazırlayın, müşteri linkten açıp kabul etsin. Ek hizmet." },
        { term: "E-posta", text: "müşterinin e-postaları kartında görünür. Ek hizmet." },
      ],
    },
    features: ["cari-takibi", "e-posta"],
    faq: [
      {
        q: "Kahya’nın CRM’i satış hunisi (pipeline) içeriyor mu?",
        a: "Hayır. Kahya’nın CRM çözümü müşteri kartı, görüşme kaydı ve takip günü üzerine kuruludur. Fırsat ve satış hunisi yönetimi yoktur.",
      },
      {
        q: "Takip günü gelen müşteriyi nasıl görürüm?",
        a: "Görüşmeye takip günü yazarsınız. O gün geldiğinde görüşme Son görüşmeler listesinde önünüze çıkar.",
      },
      {
        q: "Teklif hazırlayabilir miyim?",
        a: "Evet, Teklif ek hizmetiyle. Kendi antetinizle teklif hazırlarsınız, müşteri linkten açıp kabul eder, kabul edilen teklif satışa dönüşür.",
      },
    ],
  },
  {
    slug: "finans-cari",
    no: "03",
    kicker: "Ön muhasebe",
    name: "Finans & Cari",
    summary: "Cari hesaplar, tahsilat ve ödemeler, taksit planları, alacak raporları.",
    title: "Kim kime borçlu, tek bakışta",
    lead: "Ön muhasebe: cari hesaplarınız, tahsilat ve ödemeleriniz, vadeleriniz tek yerde.",
    points: [
      { term: "Cari", text: "bakiye ve hesap ekstresi her müşteri ve tedarikçide." },
      { term: "Tahsilat", text: "anında kayıtta, bakiyeye hemen yansır." },
      { term: "Taksit", text: "ödeme planıyla vadeler takipte." },
      { term: "Ana Sayfa", text: "para kartları ve vadesi geçenler." },
    ],
    seo: {
      title: "Cari Hesap Takip Programı: Tahsilat, Taksit ve Alacak Takibi",
      h1: "Cari hesap takip programı: kim kime borçlu, tek bakışta",
      description:
        "Kahya Finans & Cari ile müşteri ve tedarikçi carilerini, tahsilat ve ödemeleri, taksitli ödeme planlarını takip edin. Alacak ve borç raporlarını alın, ekstreyi paylaşın, ay sonunda mali müşavirinize tek dosya gönderin.",
    },
    more: {
      title: "Vade gelmeden önünüzde",
      lead: "Taksitli anlaşmayı bir kez kurarsınız, taksitler tek seferde oluşur. Vadesi gelen ödeme Ana Sayfa’ya düşer.",
      points: [
        { term: "Ödeme planları", text: "taksit, kira ve aidat vadesinde hatırlatılır." },
        { term: "Ekstre", text: "WhatsApp, e-posta, link, PDF ya da Excel olarak paylaşılır." },
        { term: "Mali Müşavir Paketi", text: "ayın hareketleri ve ekstreler tek dosyada." },
      ],
    },
    features: ["cari-takibi", "odeme-planlari", "raporlar"],
    faq: [
      {
        q: "Kahya fatura keser mi, kasa ve banka tutar mı?",
        a: "Hayır. Kahya’da finans, cari bakiye takibidir: kimden alacaklı, kime borçlu olduğunuz. Fatura, e-Fatura, kasa ve banka hesabı yoktur.",
      },
      {
        q: "Muhasebe programımın yerine geçer mi?",
        a: "Hayır. Kahya ön muhasebe tarafını tutar. Resmî kayıtlar için ayın hareketlerini Mali Müşavir Paketi ile tek dosyada mali müşavirinize gönderirsiniz.",
      },
      {
        q: "Eski carilerimi ve açılış bakiyelerimi aktarabilir miyim?",
        a: "Evet. Müşteri, tedarikçi ve açılış bakiyelerini Excel şablonuyla içe aktarırsınız. Yüklemeden önce önizleme ve hata kontrolü yapılır.",
      },
    ],
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);

export type Extra = { name: string; body: string; href?: string };

export const extras: Extra[] = [
  {
    name: "E-posta",
    body: "Kurumsal e-posta adresinizi bağlayın. Her e-posta kendi carisiyle eşleşir, yeni firma tek tıkla cari olur.",
    href: "/ozellikler/e-posta",
  },
  {
    name: "Stok",
    body: "Depolar tek listede. Kritik seviyeye ineni Kahya işaretler, satışta seçilen ürün stoktan düşer.",
  },
  {
    name: "Teklif",
    body: "Kendi antetinizle teklif hazırlarsınız. Müşteri linkten açıp kabul eder, kabul edilen teklif satışa döner.",
  },
  {
    name: "Kahya AI",
    body: "Sorun, Kahya kendi verinizden yanıtlasın. Görev ve kayıt taslağı hazırlar, siz onaylamadan hiçbir şey kaydedilmez.",
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
  "Satış hunisi ve fırsat yönetimi",
  "Online ödeme ve kartla satın alma",
  "Başka programlarla entegrasyon",
];

/** Facts we can stand behind. Nothing here is a certificate or a legal claim. */
export const trust = [
  { term: "Verileriniz Türkiye’de", text: "Kayıtlarınız Türkiye’deki sunucularda tutulur." },
  { term: "Rol ve yetki", text: "Kim neyi görür, neyi değiştirir, neyi onaylar, modül modül siz belirlersiniz." },
  { term: "Silinenler", text: "Silinen kayıt 30 gün Silinenler sayfasında bekler, Geri yükle ile döner." },
  { term: "Destek erişimi", text: "Destek ekibi hesabınıza yalnız siz izin verirseniz girer, giriş kayıt altına alınır." },
  { term: "Günlük yedek", text: "Veriler her gün yedeklenir." },
];
