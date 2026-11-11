/**
 * The add-on pages (/cozumler/<slug>). Every sentence is taken from the app's own help texts
 * (web src/components/help/help-topics.ts) or from the feature pages; nothing here is promised ahead.
 * Package facts (which plan carries what) live only on /fiyatlar, so each page links there.
 */
export type Addon = {
  slug: "e-posta" | "stok" | "teklif" | "kahya-ai" | "filo" | "ticari-paket";
  name: string;
  seo: { title: string; description: string };
  title: string;
  lead: string;
  /** The real app screen shown at the top; null until one is shot. */
  screen: { src: string; alt: string; width: number; height: number } | null;
  /** "Ne zaman gerekir": three situations in the customer's words. */
  when: [string, string, string];
  /** "Neler var": what the add-on holds, as plain term/text rows. */
  has: { term: string; text: string }[];
  /** "Nasıl açılır": the steps, in order. */
  open: string[];
  faq: { q: string; a: string }[];
  /** The feature page that explains the add-on in depth, when there is one. */
  more?: { href: string; label: string };
  cta: { title: string; body: string };
};

const request =
  "Uygulamada Abonelik sayfasından talep edin ya da bize yazın. Ödeme gelince ek hizmet firmanızda açılır.";

export const addons: Addon[] = [
  {
    slug: "e-posta",
    name: "E-posta",
    seo: {
      title: "E-posta ek hizmeti: firma e-postası carisiyle birlikte",
      description:
        "Kurumsal e-posta hesabınızı Kahya’ya bağlayın: gelen kutusu sekmelere ayrılır, gönderenin cari kaydı yanında durur, iş isteyen e-posta göreve döner.",
    },
    title: "Firma e-postası, gönderenin carisiyle yan yana",
    lead: "Mevcut e-posta hesabınızı bağlarsınız. Kişiler, faturalar ve bültenler ayrı sekmelere düşer; e-postayı açınca gönderenin cari kaydı ve ekleri yanında görünür.",
    screen: { src: "/screens/mail.webp", alt: "Kahya e-posta: kendi e-posta kutunuzu bağlama ekranı.", width: 2000, height: 1250 },
    when: [
      "Müşteri e-postaları ekipte birinin kişisel kutusunda kalıyor.",
      "Fatura ve bülten kalabalığında iş isteyen e-posta gözden kaçıyor.",
      "Bir e-postaya bakarken o firmanın bakiyesini ayrı programda arıyorsunuz.",
    ],
    has: [
      { term: "Otomatik sekmeler", text: "Kişiler, Faturalar ve Bültenler ayrı sekmelerde." },
      { term: "Cari ile bağlı", text: "E-postayı açınca gönderenin cari kaydı ve ekleri yanında durur." },
      { term: "E-postadan göreve", text: "Göreve çevir ile başlık e-postadan gelir; sorumlu, proje ve tarih siz verirsiniz." },
      { term: "Birden fazla hesap", text: "Firma e-postanızı, Gmail ya da iCloud hesabınızı ekleyebilirsiniz. Kutularınızı yalnız siz görürsünüz." },
      { term: "İmza, şablon, kurallar", text: "İmzalar, şablonlar, tekrarlı gönderimler ve kurallar E-posta ayarlarında." },
    ],
    open: [request, "Ayarlar › E-posta › Hesaplarım’dan hesabınızı ekleyin (IMAP ve SMTP bilgileriyle).", "Gelen kutunuz birkaç dakika içinde dolmaya başlar."],
    faq: [
      {
        q: "Hangi e-posta hesaplarıyla çalışır?",
        a: "IMAP ve SMTP destekleyen hesaplarla: hosting firmanızın kurumsal e-postası, Zoho, Yandex, Gmail ve iCloud (uygulama şifresiyle). Hesabınız sağlayıcınızda kalır.",
      },
      {
        q: "Ekipteki herkes benim e-postalarımı görür mü?",
        a: "Hayır. Bağladığınız kutuları yalnız siz görürsünüz. Ortak kutular ayrıca tanımlanır ve kimin göreceğini siz seçersiniz.",
      },
      {
        q: "Kahya benim yerime e-posta gönderir mi?",
        a: "Hayır. E-postayı siz yazar ve gönderirsiniz. Kahya AI yalnız taslak hazırlar.",
      },
    ],
    more: { href: "/ozellikler/e-posta", label: "E-posta özelliğinin ayrıntısı" },
    cta: { title: "E-postanızı Kahya’ya bağlayalım", body: "Hangi sağlayıcıyı kullandığınızı yazın, bağlantıyı birlikte kuralım." },
  },
  {
    slug: "stok",
    name: "Stok",
    seo: {
      title: "Stok ek hizmeti: ürün, depo ve stok hareketleri",
      description:
        "Ürünler ve depolar tek listede. Satış ve alışta seçilen ürünün miktarı kendiliğinden düşer ya da eklenir; kritik seviyeye inen ürün işaretlenir.",
    },
    title: "Satış girildikçe stok kendiliğinden düşer",
    lead: "Sattığınız ve aldığınız ürünlerin depodaki miktarını tutar. Satış ve alışta ürün seçtiğinizde miktar kendiliğinden düşer ya da eklenir; elle giriş, çıkış, sayım ve transfer de yapılır.",
    screen: { src: "/media/cozumler/stok.webp", alt: "Kahya’da ürünler ve hizmetler: stok miktarı ve satış fiyatı. Örnek veri.", width: 2400, height: 1520 },
    when: [
      "Depoda ne kaldığını sayım yapmadan bilemiyorsunuz.",
      "Satışı bir yere, stoğu başka bir Excel’e yazıyorsunuz.",
      "Biten ürünü ancak müşteri istediğinde fark ediyorsunuz.",
    ],
    has: [
      { term: "Ürünler ve hizmetler", text: "Üründe stok tutulur, hizmette tutulmaz; ikisi de satışta satır olarak seçilir." },
      { term: "Depolar", text: "Her ürünün toplam miktarı ve depo depo dağılımı. Varsayılan depo önce önerilir." },
      { term: "Kritik seviye", text: "Kartta girilen seviyeye inen ürün Kritik filtresinde görünür." },
      { term: "Giriş, çıkış, sayım, transfer", text: "Elle düzeltmeler. Sayımda fark tek bir sayım hareketi olarak yazılır." },
      { term: "Stok geçmişi", text: "Ürünün tüm hareketleri; satış ve alış satırları ilgili harekete bağlanır." },
      { term: "Ürün talebi", text: "Çalışan Talepler’den ürün ister; onaydan sonra teslim edilince stok düşer." },
    ],
    open: [request, "Ayarlar › Modüller’den Stok’u açın, depolarınızı ekleyin.", "Ürünlerinizi tek tek girin ya da Excel’den içe aktarın."],
    faq: [
      {
        q: "Depoda yeterli ürün yoksa ne olur?",
        a: "Satır altında depodaki miktar uyarı olarak çıkar, kayıt yine yapılır. Firma ayarlarında “Eksi stoğa izin verme” açıksa kayıt yapılmaz.",
      },
      {
        q: "Satışı silersem stok ne olur?",
        a: "Silinen satışın ürünleri depoya geri girer; satışı Silinenler’den geri yüklerseniz yeniden düşer. Geçmişte iki kayıt da görünür.",
      },
      {
        q: "Alış fiyatını herkes görür mü?",
        a: "Hayır. Alış fiyatını görme yetkisi rollerde ayrı verilir.",
      },
    ],
    cta: { title: "Ürün listenizle başlayalım", body: "Excel’deki ürün listenizi gönderin, içe aktarmayı birlikte yapalım." },
  },
  {
    slug: "teklif",
    name: "Teklif",
    seo: {
      title: "Teklif ek hizmeti: linkle teklif, tek adımda satış",
      description:
        "Kendi şablonunuzla teklif hazırlayın, bağlantı, WhatsApp ya da e-postayla gönderin. Müşteri giriş yapmadan açar ve kabul eder; kabul edilen teklif tek adımda satışa döner.",
    },
    title: "Teklif linkle gider, kabul edilince satışa döner",
    lead: "Müşterinize ya da henüz cari olmayan bir adaya fiyat teklifi hazırlar, bağlantıyla gönderir ve kararını izlersiniz. Kabul edilen teklif tek adımda satışa dönüşür.",
    screen: { src: "/media/home/s4-teklif.webp", alt: "Kahya’da kabul edilmiş bir teklif: kalemler, indirim, KDV ve genel toplam. Örnek veri.", width: 2400, height: 1520 },
    when: [
      "Teklifi Word’de yazıp PDF olarak yolluyorsunuz.",
      "Müşterinin teklife baktığını telefonla sorarak öğreniyorsunuz.",
      "Kabul edilen teklifi satış olarak bir daha giriyorsunuz.",
    ],
    has: [
      { term: "Şablonlar", text: "Logonuz, renkleriniz ve şartlarınızla PDF görünümü. Klasik, Modern ya da Sade ile başlarsınız." },
      { term: "Gönderim", text: "Bağlantı, WhatsApp ya da e-posta; müşteri giriş yapmadan açar ve karar verir." },
      { term: "Açıldı ×n", text: "Müşterinin bağlantıyı kaç kez açtığı. İlk açılışta, kabulde ve retde bildirim gelir." },
      { term: "Aday müşteri", text: "Cari olmayan kişiye de teklif verilir; satışa dönerken aday cari olarak eklenir." },
      { term: "Satışa dönüştür", text: "Satış formu teklifin satırları, KDV’si ve tutarıyla dolu açılır." },
      { term: "İç not", text: "Yalnız ekibinize görünür; PDF’e ve müşteri sayfasına girmez." },
    ],
    open: [request, "Ayarlar › Teklif şablonları’ndan logonuzu ve şartlarınızı girin.", "Teklifler › Yeni teklif ile ilk teklifinizi hazırlayıp gönderin."],
    faq: [
      {
        q: "Gönderdiğim teklifi değiştirebilir miyim?",
        a: "İlk gönderimden sonra teklif değiştirilemez; değişiklik için kopyalayıp yenisini gönderirsiniz.",
      },
      {
        q: "Geçerlilik süresi dolarsa ne olur?",
        a: "Teklif “Süresi doldu” olur, müşteri artık kabul edemez. “Geçerliliği uzat” ile yeni bir tarih verirsiniz; bağlantı yeniden açılır.",
      },
      {
        q: "Müşterinin giriş yapması gerekir mi?",
        a: "Hayır. Müşteri bağlantıyı giriş yapmadan açar, PDF indirir, kabul eder ya da reddeder.",
      },
    ],
    cta: { title: "İlk teklifinizi birlikte hazırlayalım", body: "Logonuzu ve şartlarınızı gönderin, şablonunuzu kuralım." },
  },
  {
    slug: "kahya-ai",
    name: "Kahya AI",
    seo: {
      title: "Kahya AI ek hizmeti: sorun, hazırlasın, siz onaylayın",
      description:
        "Kahya AI kayıtlarınıza bakarak yanıt verir, günün özetini çıkarır, fişten alış kaydı ve tahsilat hatırlatması hazırlar. Siz onaylamadan hiçbir şey kaydedilmez.",
    },
    title: "Sorun, Kahya hazırlasın, siz onaylayın",
    lead: "Kahya AI ofisinizin kayıtlarına bakarak yanıt verir ve iş hazırlar: görev, not, tahsilat, toplantı, e-posta taslağı. Her öneri bir kart olarak gelir; siz Onayla demeden hiçbir şey kaydedilmez.",
    screen: { src: "/screens/receipt.webp", alt: "Kahya AI: hazır sorular, mesaj alanı ve kalan kredi.", width: 2000, height: 1250 },
    when: [
      "Gün başında neyin geciktiğini birkaç ekrandan topluyorsunuz.",
      "Fişleri akşam tek tek elle giriyorsunuz.",
      "Vadesi geçen müşterilere tek tek mesaj yazıyorsunuz.",
    ],
    has: [
      { term: "Günün özeti", text: "Rakamlar, görevler, vadeler ve uzun süredir aranmayan müşteriler." },
      { term: "Fiş fotoğrafından kayıt", text: "Tedarikçiyi, tutarı ve tarihi okuyup alış kaydını hazırlar. Görsel saklanmaz." },
      { term: "Tahsilat hatırlatmaları", text: "Vadesi geçenler için WhatsApp ekstre linki ya da e-posta taslağını toplu hazırlar." },
      { term: "Her sayfadan Alt+K", text: "Bulunduğunuz sayfayı bırakmadan Kahya panelini açarsınız." },
      { term: "“Bunu nasıl yaparım?”", text: "Adımları anlatır ve yetkiniz olan sayfaya götürür." },
    ],
    open: [
      "Her firmada ayda 100 soru ücretsizdir; denemek için bir şey açmanız gerekmez.",
      "Firma yöneticisi veri işleme koşullarını onaylar; yetkisi olan kullanıcılar kullanmaya başlar.",
      "Daha fazla soru için Abonelik sayfasından Kahya AI ek hizmetini talep edin.",
    ],
    faq: [
      {
        q: "Kahya AI kendi başına kayıt değiştirir mi?",
        a: "Hayır. Yazan her iş bir öneri kartıdır. Siz Onayla’ya bastığınızda, sizin yetkinizle kaydedilir. E-posta göndermez, yalnız taslak hazırlar.",
      },
      {
        q: "Konuşmalar ne kadar saklanır?",
        a: "Kahya AI konuşmaları 180 gün sonra otomatik silinir. Fiş görselleri yalnız okunur, saklanmaz.",
      },
      {
        q: "Deneme süresinde açık mı?",
        a: "30 günlük denemede Kahya AI ek hizmeti kapalıdır; ayda 100 ücretsiz soru her firmada açıktır.",
      },
    ],
    more: { href: "/ozellikler/kahya-ai", label: "Kahya AI’ın ayrıntısı" },
    cta: { title: "Kahya AI’ı kendi verinizle görün", body: "Hesabınızı açın, ayda 100 soru ücretsiz. Sorunuz varsa yazın." },
  },
  {
    slug: "filo",
    name: "Filo",
    seo: {
      title: "Filo ek hizmeti: araçlar, seferler, araç bazında kâr",
      description:
        "Araçlarınızı ve seferlerinizi Kahya’da tutun. Her gelir ve gider araca ya da sefere yazılır; araç ve sefer kârlılığı raporda hazır.",
    },
    title: "Her aracın geliri, gideri ve kârı ayrı ayrı",
    lead: "Filonuzdaki araçları ekler, sefer, gelir ve gider takibini araç bazında tutarsınız. Araç ve sefer kârlılığı raporu yıl yıl hazır gelir.",
    screen: { src: "/media/cozumler/filo.webp", alt: "Kahya’da araç ve sefer kârlılığı: her aracın geliri, gideri, kârı ve marjı. Örnek veri.", width: 2400, height: 1520 },
    when: [
      "Yakıt ve bakım fişleri hangi araca ait, ay sonunda çıkaramıyorsunuz.",
      "Bir seferin kâr mı zarar mı ettiğini hesap makinesiyle buluyorsunuz.",
      "Muayenesi ya da sigortası yaklaşan aracı son gün fark ediyorsunuz.",
    ],
    has: [
      { term: "Araçlar", text: "Plaka ve adıyla araç listesi; muayenesi ya da sigortası yaklaşanlar ayrı sıralanır." },
      { term: "Seferler", text: "Açık ve tamamlanan seferler; her seferin geliri, gideri, kârı ve tonajı." },
      { term: "Gelir ve gider", text: "Her kayıt bir araca yazılır; sefer seçerseniz seferin kârlılığına da yazılır." },
      { term: "Araç / sefer kârlılığı", text: "Raporlar’da yıl seçerek toplam gelir, gider ve kâr ya da zarar." },
      { term: "Hatırlatmalar", text: "Araç sigorta ve muayene bitiş tarihleri hatırlatmalara düşer." },
    ],
    open: [request, "Ayarlar › Modüller’den Filo’yu açın.", "Araçlarınızı ekleyin; seferleri ve gelir giderleri araca bağlayarak girin."],
    faq: [
      {
        q: "Filo hangi pakette?",
        a: "Filo ek hizmettir; hangi paketlere eklendiği Paketler ve fiyatlar sayfasında yazar.",
      },
      {
        q: "Sefer girmeden kullanabilir miyim?",
        a: "Evet. Gelir ve gideri yalnız araca yazabilirsiniz; sefer seçmek isteğe bağlıdır.",
      },
      {
        q: "Filo kapalıyken araç kayıtları ne olur?",
        a: "Kapattığınız bölüm menüde görünmez; hiçbir veri silinmez. Yeniden açınca kayıtlarınız yerinde durur.",
      },
    ],
    cta: { title: "Filonuzu Kahya’ya taşıyalım", body: "Kaç aracınız olduğunu yazın, nasıl başlayacağınızı birlikte planlayalım." },
  },
  {
    slug: "ticari-paket",
    name: "Ticari paket",
    seo: {
      title: "Ticari paket: Stok ve Teklif birlikte",
      description:
        "Stok ve Teklif tek ek hizmette. Teklif kabul edilince satışa döner, satışta seçilen ürün stoktan düşer.",
    },
    title: "Teklif, satış ve stok tek akışta",
    lead: "Stok ve Teklif’i birlikte açar. Kabul edilen teklif satışa döner; satışta seçilen ürünün miktarı depodan kendiliğinden düşer.",
    screen: { src: "/media/cozumler/stok.webp", alt: "Kahya’da ürünler ve hizmetler: stok miktarı ve satış fiyatı. Örnek veri.", width: 2400, height: 1520 },
    when: [
      "Hem teklif veriyor hem ürün satıyorsunuz.",
      "Paketinizde Stok dahil değil, Teklif de ayrıca lazım.",
      "Teklif, satış ve depo üç ayrı yerde tutuluyor.",
    ],
    has: [
      { term: "Teklif", text: "Kendi şablonunuzla, linkle gönderim, açıldı bilgisi ve tek adımda satışa dönüşüm." },
      { term: "Stok", text: "Ürünler, depolar, kritik seviye ve stok hareketleri." },
      { term: "Birlikte", text: "Teklifteki ürün satışa döndüğünde stoktan düşer." },
    ],
    open: [request, "Ayarlar › Modüller’den Stok ve Teklif’i açın.", "Önce ürünlerinizi girin, sonra tekliflerinizi bu ürünlerle hazırlayın."],
    faq: [
      {
        q: "Paketimde Stok zaten varsa?",
        a: "O zaman yalnız Teklif ek hizmetini almanız yeterli. Hangi pakette ne olduğu Paketler ve fiyatlar sayfasında.",
      },
      {
        q: "Sonradan yalnız birini kapatabilir miyim?",
        a: "Ayarlar › Modüller’den kapattığınız bölüm menüde görünmez; hiçbir veri silinmez.",
      },
      {
        q: "Ayrı ayrı almaktan farkı ne?",
        a: "İkisini tek ek hizmetle açarsınız; talebi de tek seferde verirsiniz.",
      },
    ],
    cta: { title: "Teklif ve stokla başlayalım", body: "Ürün listenizi ve teklif şablonunuzu gönderin, ikisini birlikte kuralım." },
  },
];

export const addonBySlug = (slug: string) => addons.find((a) => a.slug === slug);
