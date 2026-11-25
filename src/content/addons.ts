/**
 * The add-on pages (/solutions/<slug>). Every sentence is taken from the app's own help texts
 * (web src/components/help/help-topics.ts) or from the feature pages; nothing here is promised ahead.
 * Package facts (which plan carries what) live only on /pricing, so each page links there.
 */
export type Addon = {
  slug: "email" | "inventory" | "quotes" | "kahya-ai" | "fleet" | "business-pack" | "customer-portal" | "education";
  name: string;
  seo: { title: string; description: string };
  title: string;
  lead: string;
  /** The real app screen shown at the top; null until one is shot. */
  screen: { src: string; alt: string; width: number; height: number } | null;
  /** The same work on a phone (390 × 844), drawn in front of the screen when there is one. */
  phone?: { src: string; alt: string; time: string };
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
  /**
   * Opened only on request, not in the 30-day trial (Eğitim, 2026-11-25): the closing call asks for it instead of
   * "Ücretsiz başlayın", which would open an account without it. Off again once the add-on is on sale.
   */
  requestOnly?: boolean;
};

const request =
  "Uygulamada Ayarlar › Modüller’den talep edin ya da bize yazın. Ödeme gelince ek hizmet firmanızda açılır.";

export const addons: Addon[] = [
  {
    slug: "email",
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
      { term: "Toplu gönderim", text: "Firma e-posta hesabınızdan kampanya gönderirsiniz; abonelikten çıkanlar listesi kendiliğinden tutulur." },
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
    more: { href: "/features/email", label: "E-posta özelliğinin ayrıntısı" },
    cta: { title: "E-postanızı Kahya’ya bağlayalım", body: "Hangi sağlayıcıyı kullandığınızı yazın, bağlantıyı birlikte kuralım." },
  },
  {
    slug: "inventory",
    name: "Stok",
    seo: {
      title: "Stok ek hizmeti: barkod, depo sayımı ve stok raporları",
      description:
        "Ürünü barkodla bulun, depoyu tek oturumda sayın. Satış ve alışta miktar kendiliğinden düşer ya da eklenir; stok kaç gün yeter ve atıl stok raporları hazır.",
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
      { term: "Barkod", text: "Kartta barkod tutulur; barkodla aradığınızda o ürün ilk sırada gelir. Excel’de Barkod sütunuyla içe ve dışa aktarılır." },
      { term: "Depo sayımı", text: "Bir depoyu tek sayım oturumunda sayarsınız: sayılanla sistemdeki miktarın farkını, fazla ve eksik kalemleri görür, onaylayınca stoğu düzeltirsiniz." },
      { term: "Son alış maliyeti", text: "Ürünün en son tedarikçi alışındaki birim fiyatı ve tarihi; yalnız yetkisi olan görür." },
      { term: "Stok kaç gün yeter", text: "Seçtiğiniz dönemdeki satışlara göre her ürünün kaç gün yeteceği; en önce bitecek olan en üstte." },
      { term: "Atıl stok", text: "Belirli bir süredir satılmayan ürünler, depoda bağlı kalan değeriyle; değeri yalnız yetkisi olan görür." },
      { term: "Giriş, çıkış, transfer", text: "Elle düzeltmeler ve depolar arası transfer; her biri stok geçmişine yazılır." },
      { term: "Stok geçmişi", text: "Ürünün tüm hareketleri; satış ve alış satırları ilgili harekete bağlanır." },
      { term: "Ürün talebi", text: "Çalışan Talepler’den ürün ister; onaydan sonra teslim edilince stok düşer." },
    ],
    open: [request, "Ayarlar › Modüller’den Stok’u açın, depolarınızı ekleyin.", "Ürünlerinizi barkodlarıyla tek tek girin ya da Excel’den içe aktarın."],
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
        q: "Alış fiyatını ve stok değerini herkes görür mü?",
        a: "Hayır. Alış fiyatını, son alış maliyetini ve atıl stok değerini görme yetkisi rollerde ayrı verilir.",
      },
    ],
    cta: { title: "Ürün listenizle başlayalım", body: "Excel’deki ürün listenizi gönderin, içe aktarmayı birlikte yapalım." },
  },
  {
    slug: "quotes",
    name: "Teklif",
    seo: {
      title: "Teklif ek hizmeti: linkle teklif, tek adımda satış",
      description:
        "Kendi şablonunuzla teklif hazırlayın, link, WhatsApp ya da e-postayla gönderin. Müşteri giriş yapmadan açıp kabul eder, teklif tek adımda satışa döner.",
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
    screen: { src: "/screens/ai.webp", alt: "Kahya AI: vadesi geçen iki müşteri için hazırlanan hatırlatma kartı, onay bekliyor.", width: 2000, height: 1250 },
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
      "Daha fazla soru için Ayarlar › Modüller’den Kahya AI ek hizmetini talep edin.",
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
    more: { href: "/features/kahya-ai", label: "Kahya AI’ın ayrıntısı" },
    cta: { title: "Kahya AI’ı kendi verinizle görün", body: "Hesabınızı açın, ayda 100 soru ücretsiz. Sorunuz varsa yazın." },
  },
  {
    slug: "fleet",
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
    slug: "business-pack",
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
  {
    slug: "customer-portal",
    name: "Müşteri portalı",
    seo: {
      title: "Müşteri portalı: müşteriniz borcunu ve taksitlerini kendisi görür",
      description:
        "Müşteriniz e-postasına gelen kodla şifresiz girer; bakiyesini, sıradaki taksitini, hesap ekstresini, belgelerini, tekliflerini ve duyurularınızı telefonundan görür.",
    },
    title: "Müşteriniz borcunu ve taksitini kendisi görür, sizi aramaz",
    lead: "Müşterinize kendi hesabını açarsınız. Firmanızın adı ve logosuyla açılan portalda bakiyesini, sıradaki ödemesini, hesap ekstresini, paylaştığınız belgeleri ve duyurularınızı görür; ödediğini oradan bildirir.",
    screen: { src: "/media/portal/musteri-hesap.webp", alt: "Kahya müşteri portalı: bir firma müşterisinin ödenecek tutarı, sıradaki ödemesi ve ödeme planları. Örnek veri.", width: 2400, height: 1500 },
    phone: { src: "/media/portal/odemeler-tel.webp", alt: "Telefonda veli portalı: ödemeler ve sıradaki taksit. Örnek veri.", time: "09.41" },
    when: [
      "Ne kadar borcu kaldığını soran müşteri her gün telefon ediyor.",
      "Ekstreyi ve sözleşmeyi her istendiğinde tek tek gönderiyorsunuz.",
      "Müşteri ödediğini söylüyor, siz dekontu WhatsApp’ta arıyorsunuz.",
    ],
    has: [
      { term: "Şifresiz giriş", text: "Müşteri e-postasına gelen kodla ya da sizin gönderdiğiniz bağlantıyla girer; cihazı hatırlanır." },
      { term: "Hesabım", text: "Bakiye, sıradaki ödeme ve kaç gün kaldığı, taksitler ve canlı hesap ekstresi." },
      { term: "Ödedim bildirimi", text: "Müşteri ödediğini ya da ödeyeceği tarihi bildirir; bildirim size düşer, siz onaylarsınız." },
      { term: "Belgeler ve teklifler", text: "Yalnız Portalda olarak işaretlediğiniz belgeler görünür; gönderdiğiniz teklifleri açıp yanıtlar." },
      { term: "Duyurular", text: "Müşterilerinize duyuru yayınlarsınız; önemli olanı üste sabitler, kimin okuduğunu görürsünüz." },
      { term: "Firmanızın görünümü", text: "Portal firmanızın adı ve logosuyla açılır; telefonda uygulama gibi kullanılır." },
    ],
    open: [
      request,
      "Ayarlar › Portal’dan müşterinin göreceği bölümleri seçin.",
      "Cari kartında Portala davet et ile müşterinize giriş bağlantısını gönderin.",
    ],
    faq: [
      {
        q: "Müşterim başka müşterilerin bilgisini görebilir mi?",
        a: "Hayır. Her müşteri yalnız kendi carisini görür. Birden fazla carisi olan kişi girişten sonra hangi hesabı açacağını seçer.",
      },
      {
        q: "Müşterinin şifre hatırlaması gerekir mi?",
        a: "Hayır. Girişte e-postasına bir kod gelir ya da sizin gönderdiğiniz bağlantıyla girer. Erişimi istediğiniz an kapatırsınız.",
      },
      {
        q: "Hangi belgeleri görür?",
        a: "Yalnız sizin Portalda olarak işaretlediğiniz belgeleri. Diğer dosyalarınız ve iç notlarınız görünmez.",
      },
    ],
    cta: { title: "Portalı müşterilerinize açalım", body: "Kaç müşterinize açmak istediğinizi yazın, ilk davetleri birlikte gönderelim." },
  },
  {
    slug: "education",
    name: "Eğitim",
    seo: {
      title: "Eğitim ek hizmeti: kurs ve okul için öğrenci, yoklama, sınav, veli",
      description:
        "Kurslar ve eğitim kurumları için öğrenci ve sınıflar, ders programı, telefondan yoklama, sınav, ödev ve karne. Veli çocuğunun programını, notlarını ve taksitlerini portaldan görür.",
    },
    title: "Yoklama telefondan, not ve taksit velinin cebinde",
    lead: "Öğrencilerinizi, sınıflarınızı ve ders programınızı Kahya’da tutarsınız. Öğretmen yoklamayı telefondan alır, sınav ve ödevi girer; veli çocuğunun programını, yoklamasını, notlarını ve taksitlerini portaldan görür.",
    screen: { src: "/media/egitim-modul/ogrenci.webp", alt: "Kahya Eğitim: öğrenci kartı; veli, devam, ödeme, haftalık program ve kardeşler. Örnek veri.", width: 2400, height: 1500 },
    phone: { src: "/media/egitim-modul/veli-ana-tel.webp", alt: "Veli portalı telefonda: çocuklar, devam, gecikmiş ödeme ve bölümler. Örnek veri.", time: "09.41" },
    when: [
      "Yoklama kâğıtta, devamsızlığı ay sonunda sayıyorsunuz.",
      "Sınav sonucunu velilere tek tek mesajla yazıyorsunuz.",
      "Hangi velinin hangi taksidi kaldı, ayrı tablodan bakıyorsunuz.",
    ],
    has: [
      { term: "Öğrenci ve veli", text: "Her öğrenci velisinin carisine bağlı; kardeşler aynı veli kaydında durur." },
      { term: "Sınıflar ve program", text: "Sınıflar, öğretmenleri ve haftalık ders programı; çakışan ders satırda uyarılır." },
      { term: "Yoklama", text: "Öğretmen bugünkü dersini açar, herkes Geldi gelir; gelmeyene dokunur, kaydeder." },
      { term: "Sınav, ödev, karne", text: "Sonuçlar ve ödevler girilir; veli yalnız sizin yayınladığınızı görür." },
      { term: "Etkinlikler", text: "Gezi ya da gösteriyi sınıfa veya öğrenciye açarsınız; veli portaldan Geliyor ya da Gelmiyor der; ücretliyse Borç yaz ile gelenlerin carisine borç işlenir." },
      { term: "Duyurular", text: "Duyuruyu bütün velilere ya da seçtiğiniz sınıflara yayınlarsınız; kimin okuduğunu görürsünüz." },
      { term: "Mesajlar", text: "Veli öğretmene portaldan yazar; yazışma öğrenciye bağlı kalır, öğrenci kartından açılır." },
      { term: "Taksitler", text: "Kayıt ücreti öğrenciye bağlı ödeme planıdır; tahsilat cari bakiyesine işlenir." },
      { term: "Öğretmen rolü", text: "Öğretmen yalnız atandığı sınıfların öğrencilerini görür; velinin bakiyesini, ekstresini ve taksitlerini görmez." },
    ],
    open: [
      request,
      "Dönemi, sınıflarınızı ve öğretmenlerinizi ekleyin; haftalık ders programını girin.",
      "Öğrencileri Excel’den içe aktarın; velileri Portala davet edin.",
    ],
    faq: [
      {
        q: "Velinin görmesi için Müşteri portalı gerekir mi?",
        a: "Evet. Eğitim tek başına da çalışır; velinin program, yoklama, not ve taksitleri görmesi için Müşteri portalı açık olmalıdır.",
      },
      {
        q: "Öğretmen velinin borcunu görür mü?",
        a: "Hayır. Öğretmen yalnız atandığı sınıfların yoklamasını, ödevini ve sınavını görür; velinin bakiyesi, ekstresi ve taksitleri görünmez.",
      },
      {
        q: "Kahya AI öğrenci bilgilerini okur mu?",
        a: "Hayır. Kahya AI öğrenci kayıtlarını, notları ve sağlık bilgisini okumaz.",
      },
    ],
    more: { href: "/sectors/education-and-courses", label: "Kurslar ve eğitim kurumları için Kahya" },
    cta: { title: "Kurumunuzu Kahya’ya taşıyalım", body: "Öğrenci listenizi gönderin, sınıfları ve velileri birlikte açalım." },
    requestOnly: true,
  },
];

export const addonBySlug = (slug: string) => addons.find((a) => a.slug === slug);
