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
    name: "Ofis yönetimi",
    summary: "Ekip, görev, izin, onay, takvim, belgeler ve talepler.",
    title: "Ekibiniz bugün ne yaptı?",
    lead: "Kimseyi aramadan görün: kim kaç iş bitirdi, nerede gecikme var, hangi onay kimde bekliyor.",
    points: [
      { term: "Görev özeti", text: "kişi bazında biten, geciken ve açık işler tek raporda." },
      { term: "Onay süreleri", text: "hangi onay ne kadar sürdü, kimde takıldı." },
      { term: "Ana Sayfa · Ekip bugün", text: "kim izinde, ne zaman dönüyor." },
    ],
    seo: {
      title: "Ofis yönetim programı: görev, personel, izin ve onay takibi",
      h1: "Ofis yönetim programı: görev, izin ve onaylar tek yerde",
      description:
        "Kahya Ofis yönetimi ile görevleri kişiye ya da takıma verin, izin ve avans taleplerini telefondan alın, onayları tek listeden verin. Görev özeti ve onay süreleri raporlarıyla ekibin durumunu görün.",
    },
    more: {
      title: "Bütün ekip içeride",
      lead: "Kahya yalnız yöneticinin değil, bütün ekibin aracı. Herkes kendi işini kendi ekranından yürütür.",
      points: [
        { term: "İzin", text: "personel telefondan ister, yönetici tek dokunuşla onaylar." },
        { term: "Puantaj", text: "her gün giriş-çıkış saati ve yevmiyesiyle; ayın hakediş toplamı personelin kartında." },
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
    subtitle: "Müşteri ilişkileri",
    summary: "Müşteri görüşmeleri ve takip günleri. Teklif Kurumsal pakette dahil.",
    title: "Her görüşme kayıtta",
    lead: "Müşteriyle ne konuşuldu, sırada ne var? Ekipten kim bakarsa baksın aynı bilgiyi görür.",
    points: [
      { term: "Görüşme kaydı", text: "müşteri kartında, kişisi ve notuyla." },
      { term: "Takip günü", text: "takip günü gelen görüşmeler listede önünüze çıkar." },
      { term: "Ana Sayfa · Son görüşmeler", text: "kimle en son ne konuşuldu, tek listede." },
    ],
    seo: {
      title: "CRM programı: müşteri görüşme ve takip programı",
      h1: "CRM programı: her müşteri görüşmesi kayıtta, takip günü unutulmaz",
      description:
        "Kahya CRM ile müşteri görüşmelerini kişisi ve notuyla kaydedin, takip günü yazın, takibi gelenler listede önünüze çıksın. Teklif ile kendi antetli teklifinizi hazırlayın (Kurumsal pakette dahil, diğer paketlerde ek hizmet).",
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
        a: "Evet. Teklif Kurumsal pakette dahil, diğer paketlerde ek hizmet. Kendi antetinizle teklif hazırlarsınız, müşteri linkten açıp kabul eder, kabul edilen teklif satışa dönüşür.",
      },
    ],
  },
  {
    slug: "finans-cari",
    no: "03",
    kicker: "Cari ve tahsilat",
    name: "Finans ve cari",
    summary: "Cari hesaplar, tahsilat ve ödemeler, taksit planları, alacak raporları.",
    title: "Kim kime borçlu, tek bakışta",
    lead: "Cari hesaplarınız, tahsilat ve ödemeleriniz, vadeleriniz tek yerde.",
    points: [
      { term: "Cari", text: "bakiye ve hesap ekstresi her müşteri ve tedarikçide." },
      { term: "Tahsilat", text: "anında kayıtta, bakiyeye hemen yansır." },
      { term: "Taksit", text: "ödeme planıyla vadeler takipte." },
      { term: "Ana Sayfa", text: "para kartları ve vadesi geçenler." },
    ],
    seo: {
      title: "Cari hesap takip programı: tahsilat, taksit ve alacak takibi",
      h1: "Cari hesap takip programı: kim kime borçlu, tek bakışta",
      description:
        "Kahya Finans ve cari ile müşteri ve tedarikçi carilerini, tahsilat ve ödemeleri, taksitli ödeme planlarını takip edin. Alacak ve borç raporlarını alın, ekstreyi paylaşın, ay sonunda mali müşavirinize tek dosya gönderin.",
    },
    more: {
      title: "Vade gelmeden önünüzde",
      lead: "Taksitli anlaşmayı bir kez kurarsınız, taksitler tek seferde oluşur. Vadesi gelen ödeme Ana Sayfa’ya düşer.",
      points: [
        { term: "Ödeme planları", text: "taksit, kira ve aidat vadesinde hatırlatılır." },
        { term: "Ekstre", text: "WhatsApp, e-posta, link, PDF ya da Excel olarak paylaşılır." },
        { term: "Mali müşavir paketi", text: "ayın hareketleri ve ekstreler tek dosyada." },
      ],
    },
    features: ["cari-takibi", "odeme-planlari", "raporlar"],
    faq: [
      {
        q: "Kahya fatura keser mi, bankama bağlanır mı?",
        a: "Hayır. Kahya’da finans, cari bakiye takibidir: kimden alacaklı, kime borçlu olduğunuz. Fatura ve e-Fatura kesmez, bankanıza bağlanıp ekstre çekmez. Kasa ve banka ek hizmetiyle kasa, banka hesabı ve kredi kartı bakiyelerini Kahya’da kendiniz tutarsınız.",
      },
      {
        q: "Muhasebe programımı bırakmam gerekir mi?",
        a: "Hayır. Kahya fatura kesmez ve resmî kayıt tutmaz. Faturanız ve beyannameniz muhasebe programınızda ya da müşavirinizde kalır. Kahya cari, tahsilat, ekip ve müşteri takibini yönetir. Ay sonunda hareketlerinizi Mali müşavir paketi’yle tek dosyada müşavirinize verirsiniz.",
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
    body: "Ekip ve üstü paketlerde dahil, Başlangıç’ta ek hizmet. Depolar tek listede. Kritik seviyeye ineni Kahya işaretler, satışta seçilen ürün stoktan düşer.",
  },
  {
    name: "Teklif",
    body: "Kurumsal pakette dahil, diğer paketlerde ek hizmet. Kendi antetinizle teklif hazırlarsınız. Müşteri linkten açıp kabul eder, kabul edilen teklif satışa döner.",
  },
  {
    name: "Ticari paket",
    body: "Stok ve Teklif birlikte. Stok paketinize dahil değilse ikisini tek ek hizmetle açarsınız.",
  },
  {
    name: "Kahya AI",
    body: "Sorun, Kahya kendi verinizden yanıtlasın. Görev ve kayıt taslağı hazırlar, siz onaylamadan hiçbir şey kaydedilmez. Her firmada ayda 100 soru ücretsiz, daha fazlası Kahya AI ek hizmetiyle.",
    href: "/ozellikler/kahya-ai",
  },
  {
    name: "Kasa ve banka",
    body: "Hiçbir pakete dahil değil, ek hizmet olarak eklenir. Kasa, banka hesabı ve kredi kartı bakiyeleriyle; açılış bakiyesi, kartın limiti ve son ödeme günü.",
    href: "/rehber/kasa-ve-banka-takibi-nasil-yapilir",
  },
  {
    name: "Filo",
    body: "Ücretli her pakete ek hizmet olarak eklenir. Araçlar, seferler ve araç bazında gelir gider takibi.",
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
  "Banka bağlantısı (otomatik ekstre çekme)",
  "Toplu SMS / kampanya gönderimi",
  "Satış hunisi ve fırsat yönetimi",
  "Online ödeme ve kartla satın alma",
  "Başka programlarla entegrasyon",
];

/**
 * Facts we can stand behind. Nothing here is a certificate or a legal claim. H13: no "servers in Türkiye" line
 * until the hosting company's details are confirmed.
 */
export const trust = [
  { term: "Rol ve yetki", text: "Kim neyi görür, neyi değiştirir, neyi onaylar, modül modül siz belirlersiniz." },
  { term: "Silinenler", text: "Silinen kayıt 30 gün Silinenler sayfasında bekler, Geri yükle ile döner." },
  { term: "Destek erişimi", text: "Destek ekibi hesabınıza yalnız siz izin verirseniz girer, giriş kayıt altına alınır." },
  { term: "Günlük yedek", text: "Veriler her gün yedeklenir." },
];

/** H13 §2 — one sentence under the trust facts (moved from the home with them, 2026-11-11). */
export const homeTrustLine =
  "Her firmanın verisi ayrı tutulur ve bu her sürümde testle denetlenir. Verinizin tamamını istediğiniz an dışarı alırsınız.";

/** Questions an office asks every day: scattered tools against Kahya (moved from the home to /ozellikler). */
export const vsScattered: readonly (readonly [string, string, string])[] = [
  ["İş kimde, ne durumda?", "Mesaj grubunda soruluyor.", "Görev sorumlusu ve durumuyla herkesin önünde."],
  ["Bu hafta kim izinli?", "İzin kâğıdı ya da mesaj.", "İzin telefondan istenir, onaylanınca takvime işlenir."],
  ["Müşteriyle en son ne konuşuldu?", "Görüşen kişinin aklında.", "Görüşme müşteri kartında, takip günüyle."],
  [
    "Kim kime ne kadar borçlu?",
    "Ayrı tablolarda, elle toplanıyor.",
    "Cari bakiye her tahsilatta kendiliğinden güncellenir.",
  ],
  ["Taksit ne zaman?", "Takvime not düşülüyor, unutulursa geçiyor.", "Ödeme planı vadesinde hatırlatır."],
  ["Ay sonunda ne gönderilecek?", "Dosyalar tek tek toplanıyor.", "Mali müşavir paketi tek dosya olarak hazırlanır."],
];

/** H13 §4 — what Kahya does and does not do, beside accounting programs in general (no product named). */
export const vsAccounting: readonly (readonly [string, string, string])[] = [
  ["Fatura, e-Fatura, e-Arşiv", "Yok. Faturanız muhasebe programınızda ya da müşavirinizde kalır.", "Var"],
  ["Banka hesabı bağlantısı", "Yok.", "Var"],
  ["Resmî muhasebe kaydı", "Yok. Ayın hareketleri müşavirinize tek pakette gider.", "Ürüne göre"],
  ["Cari, tahsilat, taksit, vade", "Var", "Var"],
  ["Görev, izin, onay akışı", "Var", "Ürüne göre"],
  ["Müşteri görüşmesi ve takip günü", "Var", "Ürüne göre"],
  ["Telefonda uygulama gibi kullanım", "Var (ana ekrana eklenir, bildirim gelir)", "Ürüne göre"],
  [
    "Müşteriye vade hatırlatması",
    "Var: e-posta kendiliğinden gider, WhatsApp mesajı gönderilmeye hazır olur, SMS kendi Netgsm hesabınızla",
    "Ürüne göre",
  ],
  ["Kontör (e-Fatura / SMS kredisi)", "Yok, çünkü Kahya e-Fatura ve SMS satmaz", "Var"],
];

/** H13 §5 — four promises (maestro 2026-11-10: the unverified "know what you pay" promise is out). */
export const promises: Point[] = [
  {
    term: "Kartınızdan habersiz para çekilmez.",
    text: "Kahya’da otomatik ödeme yoktur. Paketiniz biterse ücretsiz pakete geçersiniz, verileriniz yerinde kalır.",
  },
  {
    term: "Kontör satmayız.",
    text: "Kahya AI’ın aylık soru sınırı vardır; sınır dolunca durur, faturanıza bir şey eklenmez.",
  },
  {
    term: "Destek talebiniz kaybolmaz.",
    text: "Talebinizi uygulamanın içinden açarsınız; numaralıdır ve takip edilir.",
  },
  {
    term: "Verinizin tamamını istediğiniz an dışarı alırsınız.",
    text: "Ücretsiz pakete geçseniz de verileriniz durur. Hesabınızı kapatırsanız ya da 6 ay hiç kullanmazsanız, önceden haber vererek sileriz.",
  },
];
