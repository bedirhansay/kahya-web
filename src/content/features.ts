/**
 * Feature pages. Every claim here is checked against the app (tutorial
 * recordings in promo-video/out/07-ogrenim and the plan seed). Do not add a
 * capability the product does not ship.
 */
export type Feature = {
  slug: string;
  /** Short name used in menus and lists. */
  name: string;
  /** One line under the name in lists. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  /** Media under /public. */
  screen: { src: string; alt: string; phone?: boolean };
  teaser?: string;
  /** Slugs in src/content/generated/tutorials.json. */
  tutorials: string[];
  points: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  /** Plan note shown under the points, when the module is not on every plan. */
};

export const features: Feature[] = [
  {
    slug: "cari-takibi",
    name: "Cari ve bakiye takibi",
    summary: "Kim kime ne kadar borçlu, tek bakışta.",
    metaTitle: "Cari hesap takip programı",
    metaDescription:
      "Müşteri ve tedarikçi carilerinizi Kahya’da tutun: satış, tahsilat, alış ve ödeme kaydı, yürüyen bakiye, WhatsApp ve e-postayla ekstre paylaşımı.",
    title: "Kim, kime, ne kadar borçlu? Her an belli",
    lead:
      "Müşteri ve tedarikçi kartlarında bakiye ve tüm hareketler bir arada durur. Satışı, tahsilatı, alışı ve ödemeyi kaydedin; bakiye anında güncellenir, ekstreyi tek tıkla paylaşın.",
    screen: { src: "/screens/cari.webp", alt: "Kahya’da bir müşterinin cari kartı: bakiye, hareketler ve yürüyen bakiye" },
    teaser: "finans",
    tutorials: ["cari", "odeme-planlari-ve-vadeler"],
    points: [
      {
        title: "Satış, tahsilat, alış, ödeme",
        body: "Yaptığınız işi satış olarak, gelen parayı tahsilat olarak girin. Tedarikçi faturası alış, ödediğiniz tutar ödeme olur. KDV oranını seçebilirsiniz.",
      },
      {
        title: "Yürüyen bakiyeli hareketler",
        body: "Her hareket listede yürüyen bakiyesiyle görünür; bir kaydın bakiyeyi nasıl değiştirdiği açıkça okunur.",
      },
      {
        title: "Ekstreyi WhatsApp’tan gönderin",
        body: "Ekstreyi WhatsApp, e-posta, link, PDF ya da Excel olarak paylaşın. Müşteri linkten ekstresini giriş yapmadan görür; linki istediğiniz an kapatırsınız.",
      },
      {
        title: "Açılış bakiyesi ve Excel’den aktarım",
        body: "Önceden kalan borcu açılış bakiyesi olarak girin ya da müşteri, tedarikçi ve bakiyeleri hazır şablonla Excel’den içeri alın.",
      },
      {
        title: "Görüşmeler ve notlar",
        body: "Müşteriyle yapılan görüşmeyi konu ve özetiyle kaydedin; kim, ne zaman konuştu tüm ekip görür.",
      },
    ],
    faq: [
      {
        q: "Kahya bir muhasebe programı mı?",
        a: "Hayır. Kahya alacak ve borçlarınızı cari bakiye olarak takip eder; kasa, banka hesabı ve fatura kesme yoktur. Resmî muhasebe için mali müşavirinize ayın kayıtlarını tek dosyada hazırlayan Mali Müşavir Paketi’ni kullanabilirsiniz.",
      },
      {
        q: "Müşterim ekstresini nasıl görür?",
        a: "Cari kartında Ekstre gönder’e tıklayıp WhatsApp, e-posta ya da link seçersiniz. Müşteri linki açınca dönem hareketlerini ve yürüyen bakiyeyi giriş yapmadan görür.",
      },
      {
        q: "Eski kayıtlarımı taşıyabilir miyim?",
        a: "Evet. Ayarlar’daki Veri aktarımı ile müşteri, tedarikçi, personel, açılış bakiyesi ve hareketleri Excel şablonundan alırsınız; yüklemeden önce önizleme ve hata kontrolü yapılır.",
      },
    ],
  },
  {
    slug: "odeme-planlari",
    name: "Ödeme planları ve vadeler",
    summary: "Taksit, kira ve aidat vadesinde hatırlatılır.",
    metaTitle: "Vade ve taksit takibi, ödeme planı",
    metaDescription:
      "Taksitli tahsilat planları, düzenli ödemeler ve vade hatırlatmaları. Vadesi gelen ve geciken ödemeleri Kahya’da tek listede görün.",
    title: "Vadeler kâğıtta değil, önünüzde",
    lead:
      "Taksitli anlaşmaları tek seferde kurun, kira ve abonelik gibi düzenli ödemeleri tanımlayın. Vadeler takvime ve Ana Sayfa’ya düşer; zamanı gelince hatırlatılırsınız.",
    screen: { src: "/screens/home.webp", alt: "Kahya Ana Sayfa: bu hafta vadesi gelen tahsilat ve ödemeler" },
    teaser: "finans",
    tutorials: ["odeme-planlari-ve-vadeler", "masraflar-ve-kategoriler"],
    points: [
      {
        title: "Taksitli tahsilat planı",
        body: "Aylık tutarı, ayın kaçında alınacağını ve başlangıç–bitiş ayını seçin; taksitler tek seferde oluşur.",
      },
      {
        title: "Vadesi gelenler listesi",
        body: "Geciken ve yaklaşan taksitler bir arada. Ödeme geldiğinde Tahsilatı işle ile taksit cariye tahsilat olarak yazılır.",
      },
      {
        title: "Düzenli ödemeler",
        body: "Kira, aidat ve abonelikleri sıklığı ve masraf kategorisiyle tanımlayın; her vadede hatırlatılırsınız.",
      },
      {
        title: "Masraflar ve kategoriler",
        body: "Giderleri kategoriyle kaydedin; masraf dağılımı paranın nereye gittiğini gösterir.",
      },
    ],
    faq: [
      {
        q: "Hatırlatmalar ne zaman gelir?",
        a: "Otomasyonlar ayarından vadeden 1, 3 ya da 7 gün önce hatırlatılmayı seçersiniz. Görev ve sözleşme bitiş tarihleri de hatırlatılır.",
      },
      {
        q: "Taksit ödendiğinde ne olur?",
        a: "Vadesi gelenler listesinde Tahsilatı işle’ye tıklarsınız; taksit ilgili cariye tahsilat olarak işlenir ve bakiye düşer.",
      },
    ],
  },
  {
    slug: "gorev-takibi",
    name: "Görevler, takımlar ve takvim",
    summary: "İş kimde, ne durumda; ekip aynı panoda.",
    metaTitle: "Görev ve ekip takip programı",
    metaDescription:
      "Görev panosu, takımlara iş verme, takvim, toplantı ve duyurular. Kahya ile ofisinizin işini ve ekibini tek panodan yönetin.",
    title: "Ekibin işi tek panoda",
    lead:
      "Görevleri kişiye ya da takıma verin, panoda Yapılacak’tan Tamamlandı’ya ilerletin. Toplantılar, vadeler, izinler ve teslimler aynı takvimde buluşur.",
    screen: { src: "/screens/claim.webp", alt: "Kahya’da görev detayı: durum, sorumlu, takım ve proje" },
    teaser: "gorev-takim",
    tutorials: ["gorevler-takimlar-ve-takvim", "projeler"],
    points: [
      {
        title: "Görev panosu",
        body: "Yapılacak, Devam ediyor, Tamamlandı. Önceliği, projeyi, bitiş tarihini ve sorumluyu seçin; takip edenler de eklenebilir.",
      },
      {
        title: "Takıma iş verin",
        body: "Sorumluyu boş bırakıp görevi takıma verin; iş takımın havuzuna düşer, uygun olan Üstlen ile alır ve ekip görür.",
      },
      {
        title: "Takımlar",
        body: "Satış, Muhasebe, Proje Ekibi… Her takımın açık görevleri, yaklaşan teslimleri, üyeleri ve lideri bir sayfada.",
      },
      {
        title: "Takvim ve toplantılar",
        body: "Toplantıyı müşteriye ve projeye bağlayarak planlayın; katılımcılara bildirim gider.",
      },
      {
        title: "Duyurular",
        body: "Tüm firmaya ya da seçili kişi ve takımlara duyuru yayınlayın; duyuru Ana Sayfa’da görünür.",
      },
    ],
    faq: [
      {
        q: "Bir e-postayı göreve çevirebilir miyim?",
        a: "Evet. E-postayı açıp Göreve çevir’e tıklarsınız; başlık e-postadan gelir, ekleri kopyalamak isteğe bağlıdır. E-posta ile görev birbirine bağlı kalır.",
      },
    ],
  },
  {
    slug: "proje-yonetimi",
    name: "Projeler",
    summary: "Her işin ilerlemesi, bütçesi ve geçmişi.",
    metaTitle: "Proje takip programı",
    metaDescription:
      "Müşteriye bağlı projeler, ilerleme ve proje sağlığı, görevler, toplantılar, dosyalar ve geçmiş. Kahya ile projelerinizi tek yerde izleyin.",
    title: "Her projenin ilerlemesi en üstte",
    lead:
      "Projeyi müşteriye, sorumluya ve ekibe bağlayın; teslim tarihi ve bütçesini girin. Proje sayfasında ilerleme, görevler, toplantılar, dosyalar ve geçmiş ayrı sekmelerde durur.",
    screen: { src: "/screens/project.webp", alt: "Kahya proje detayı: ilerleme, bütçe, ekip ve görevler" },
    teaser: "proje",
    tutorials: ["projeler", "gorevler-takimlar-ve-takvim"],
    points: [
      {
        title: "Proje sağlığı",
        body: "Tamamlanma oranı, geciken görevler ve teslime kalan gün proje sayfasının en üstünde.",
      },
      {
        title: "Müşteriyle bağlı",
        body: "Proje, müşterinin cari kartında da görünür; müşteriyle ilgili her şey aynı yerde birleşir.",
      },
      {
        title: "Geçmiş",
        body: "Projede kim, ne zaman, ne yaptı; tüm değişiklikler kayıt altında.",
      },
    ],
    faq: [
      {
        q: "Projeye bütçe girebilir miyim?",
        a: "Evet. Proje oluştururken teslim tarihi ve bütçeyi girersiniz; proje sayfasında görünür.",
      },
    ],
  },
  {
    slug: "e-posta",
    name: "E-posta",
    summary: "Firmanın gelen kutusu, carisiyle birlikte.",
    metaTitle: "Ofis için ortak e-posta kutusu",
    metaDescription:
      "Mevcut e-posta hesabınızı Kahya’ya bağlayın: gelen kutusu, gönderenin cari kaydı, tek tıkla e-postadan görev. IMAP/SMTP destekleyen sağlayıcılarla çalışır.",
    title: "Gelen kutunuz da burada",
    lead:
      "Firmanızın e-postası Kahya’nın içinde. Kişiler, faturalar ve bültenler otomatik ayrılır; gönderenin cari kaydı ve ekler yanında görünür. İş isteyen e-postayı tek tıkla göreve çevirin.",
    screen: { src: "/screens/mail.webp", alt: "Kahya e-posta: gelen kutusu ve açık bir e-posta" },
    teaser: "eposta",
    tutorials: ["e-posta"],
    points: [
      {
        title: "Otomatik sekmeler",
        body: "Kişiler, Faturalar ve Bültenler ayrı sekmelerde; önemli yazışmalar kalabalıkta kaybolmaz.",
      },
      {
        title: "Cari ile bağlı",
        body: "E-postayı açınca gönderenin cari kaydı ve ekleri yanında durur.",
      },
      {
        title: "E-postadan göreve",
        body: "Göreve çevir ile başlık e-postadan gelir; sorumlu, proje, takım ve tarih verin. E-posta ile görev bağlı kalır.",
      },
    ],
    faq: [
      {
        q: "Hangi e-posta hesaplarıyla çalışır?",
        a: "IMAP ve SMTP destekleyen hesaplarla: hosting firmanızın kurumsal e-postası, Zoho, Yandex; Gmail ve iCloud uygulama şifresiyle. Kahya kendi e-posta sunucusunu işletmez, hesabınız sağlayıcınızda kalır.",
      },
      {
        q: "Kahya benim yerime e-posta gönderir mi?",
        a: "Hayır. E-postayı siz yazar ve gönderirsiniz. Kahya AI yalnızca taslak hazırlar; göndermek her zaman sizin elinizde.",
      },
    ],
  },
  {
    slug: "personel-ve-izin",
    name: "Personel ve izinler",
    summary: "İzin talebi telefondan, onay tek dokunuşta.",
    metaTitle: "Personel ve izin takip programı",
    metaDescription:
      "Personel kartları, departmanlar, devam takibi ve izinler. Çalışan izni telefondan ister, yönetici onaylar, izin takvime işlenir.",
    title: "İzin telefondan istenir, takvime kendiliğinden işlenir",
    lead:
      "Personeli işe giriş tarihi, departmanı ve görevine göre tutun. Çalışan izin talebini telefondan gönderir, yöneticisi onaylar; çalışana bildirim gider, izin takvime işlenir.",
    screen: { src: "/screens/izinler.webp", alt: "Kahya’da izin talepleri: personel, tarih, gün sayısı, durum ve onaylayan" },
    teaser: "personel-izin",
    tutorials: ["personel-ve-izinler", "talepler-ve-onaylar"],
    points: [
      {
        title: "Personel kartı",
        body: "Ad, telefon, işe giriş tarihi, günlük ücret, departman ve görev. Avans, maaş ve izinler bu karttan yürür.",
      },
      {
        title: "Devam takibi",
        body: "Çalışılan, gelinmeyen ve izinli günler; kim ne zaman, kaç gün izinde.",
      },
      {
        title: "İzin talebi ve onayı",
        body: "Gün sayısı tarihlerden otomatik hesaplanır. Talep yöneticiye gider; onay ya da red gerekçesiyle çalışana bildirilir.",
      },
    ],
    faq: [
      {
        q: "Çalışanlarımın uygulama indirmesi gerekir mi?",
        a: "Hayır. Kahya tarayıcıda çalışır; telefonda ana ekrana eklenip uygulama gibi açılabilir.",
      },
      {
        q: "İzne çıkan yöneticinin onayları ne olur?",
        a: "Yönetici, izin tarihleri için onaylarını bir vekile devreder; o tarihlerde talepler vekile gider.",
      },
    ],
  },
  {
    slug: "talep-ve-onay",
    name: "Talepler ve onaylar",
    summary: "Avans, masraf, satın alma; onay zinciri hazır.",
    metaTitle: "Talep ve onay akışı yazılımı",
    metaDescription:
      "Avans, masraf, satın alma ve belge talepleri için onay akışı. Kendi talep formunuzu kurun, onay adımlarını izleyin, vekâlet verin.",
    title: "Onaylar tek dokunuşta",
    lead:
      "Avans, masraf, satın alma, belge… Talebi açan kişi, talebin kime gideceğini önceden görür. Onaylayan kişi kimin onayladığını ve sırada kimin olduğunu izler.",
    screen: { src: "/screens/talepler.webp", alt: "Kahya Talepler: onayımı bekleyen izin ve avans talepleri" },
    teaser: "talep-onay",
    tutorials: ["talepler-ve-onaylar"],
    points: [
      {
        title: "Onay zinciri otomatik başlar",
        body: "Talep gönderildiği an akış başlar; Onayımı bekleyenler sekmesinde sizi bekleyenleri görürsünüz.",
      },
      {
        title: "Kendi talep tipiniz",
        body: "Formun alanlarını ve onaylayıcılarını siz belirlersiniz; Yeni Tip ile kendi formunuzu kurun.",
      },
      {
        title: "Vekâlet",
        body: "İzne çıkarken onaylarınızı tarih aralığı ve gerekçeyle bir vekile devredin.",
      },
      {
        title: "Gerekçeli red",
        body: "Talep onaylanır ya da gerekçesiyle reddedilir; talep sahibi nedenini görür.",
      },
    ],
    faq: [
      {
        q: "Talebim kimde bekliyor, nasıl görürüm?",
        a: "Talebin onay adımlarında kimin onayladığı ve sırada kimin olduğu görünür. Talebi açarken de kime gideceğini önceden görürsünüz.",
      },
    ],
  },
  {
    slug: "dokuman-ve-sozlesme",
    name: "Dokümanlar, sözleşmeler, demirbaş",
    summary: "Belge kimde, sözleşme ne zaman bitiyor.",
    metaTitle: "Doküman, sözleşme ve demirbaş takibi",
    metaDescription:
      "Firmanın belgeleri tek yerde, sözleşmeler bitmeden hatırlatılır, demirbaş ve zimmet kimde kayıtlı. Paylaşılan linkleri izleyin ve kapatın.",
    title: "Belgeler kaybolmaz, sözleşmeler sürpriz yapmaz",
    lead:
      "Dokümanları kimin göreceğini seçerek yükleyin. Sözleşmeleri bitiş tarihiyle girin; bitmeden kaç gün önce hatırlatılacağını siz belirleyin. Hangi cihazın kimde olduğu zimmet kaydında.",
    screen: { src: "/screens/contracts.webp", alt: "Kahya sözleşmeler listesi ve bitiş tarihleri" },
    tutorials: ["dokumanlar-sozlesmeler-ve-demirbas"],
    points: [
      {
        title: "Görünürlük sizde",
        body: "Her doküman özel, seçili kişilere açık ya da şirket geneli olabilir.",
      },
      {
        title: "Sözleşme hatırlatması",
        body: "Karşı taraf, başlangıç–bitiş tarihi ve bedeliyle; bitişten önce hatırlatılırsınız.",
      },
      {
        title: "Demirbaş ve zimmet",
        body: "Marka ve seri numarasıyla demirbaş kartı; zimmet verildiğinde kimde, ne zamandan beri olduğu kayda geçer.",
      },
      {
        title: "Paylaşılan linkler",
        body: "Dışarıya açtığınız her ekstre ve belge tek listede; kaç kez açıldığını görün, istediğinizde kapatın.",
      },
    ],
    faq: [
      {
        q: "Sözleşmenin bittiğini nasıl öğrenirim?",
        a: "Sözleşmeyi bitiş tarihiyle girersiniz; bitmeden kaç gün önce hatırlatılacağını siz belirlersiniz.",
      },
      {
        q: "Dışarıya paylaştığım bir belgeyi geri alabilir miyim?",
        a: "Evet. Paylaşılan her ekstre ve belge tek listede durur; kaç kez açıldığını görür, istediğinizde linki kapatırsınız.",
      },
    ],
  },
  {
    slug: "raporlar",
    name: "Raporlar",
    summary: "Alacak yaşlandırma, nakit, mali müşavir paketi.",
    metaTitle: "Alacak, borç ve nakit raporları",
    metaDescription:
      "Alacak ve borç yaşlandırma, gelir-gider, tahsilat-ödeme, cari ekstre ve aylık kategori raporları. Mali müşavir paketi ve Excel’e aktarma.",
    title: "Ayın durumu tek bakışta",
    lead:
      "Kimden ne alacaklı, kime ne borçlu olduğunuzu; ay ay gelir ve giderinizi; nakdin gerçekte ne zaman girip çıktığını görün. Ayın kayıtlarını mali müşavirinize tek dosyada gönderin.",
    screen: { src: "/screens/package.webp", alt: "Kahya Mali Müşavir Paketi ekranı" },
    tutorials: ["raporlar", "ana-sayfa-ve-kisayollar"],
    points: [
      {
        title: "Alacaklar ve borçlar",
        body: "Yaşlandırma ile alacakların kaç gündür beklediği; Excel ya da PDF olarak indirin.",
      },
      {
        title: "Gelir, gider ve nakit",
        body: "Ay ay kâr tablosu, tahsilat ve ödemelerin gerçek tarihleri, büyüyen gider kalemleri.",
      },
      {
        title: "Mali Müşavir Paketi",
        body: "Ayın tüm kayıtları tek dosyada; Paketi hazırla, indir, gönder.",
      },
      {
        title: "Her liste Excel’e",
        body: "Listeyi filtreleyin, gördüğünüz liste Excel dosyası olarak insin.",
      },
    ],
    faq: [
      {
        q: "Mali müşavirim Kahya’ya giriş yapmak zorunda mı?",
        a: "Hayır. Mali Müşavir Paketi’ni hazırlayıp indirir, dosyayı mali müşavirinize gönderirsiniz.",
      },
    ],
  },
  {
    slug: "kahya-ai",
    name: "Kahya AI",
    summary: "Sorun, hazırlasın; siz onaylayın.",
    metaTitle: "Kahya AI: ofisiniz için yapay zekâ asistanı",
    metaDescription:
      "Kahya AI kayıtlarınızı okuyup soruları yanıtlar, günün özetini çıkarır, fiş fotoğrafından kayıt ve tahsilat hatırlatması hazırlar. Hiçbir şeyi onayınız olmadan kaydetmez.",
    title: "Söyleyin, Kahya hazırlasın, siz onaylayın",
    lead:
      "Kahya AI ofisinizin kayıtlarına bakarak yanıt verir ve iş hazırlar: görev, not, tahsilat, toplantı, e-posta taslağı. Her öneri bir kart olarak gelir; siz Onayla demeden hiçbir şey kaydedilmez.",
    screen: { src: "/screens/receipt.webp", alt: "Kahya AI sohbeti: fişten hazırlanan alış kaydı önerisi" },
    teaser: "kahya-ai",
    tutorials: ["kahya-ai"],
    points: [
      {
        title: "Günün özeti",
        body: "Rakamlar, görevler, vadeler ve uzun süredir aranmayan müşteriler; Ana Sayfa’daki Günün özeti düğmesiyle.",
      },
      {
        title: "Fiş fotoğrafından kayıt",
        body: "Fişin fotoğrafını ekleyin; Kahya tedarikçiyi, tutarı ve tarihi okuyup alış kaydını hazırlar. Görsel saklanmaz.",
      },
      {
        title: "Tahsilat hatırlatmaları",
        body: "Vadesi geçen müşteriler için WhatsApp ekstre linki ya da e-posta taslağını toplu hazırlar.",
      },
      {
        title: "Her sayfadan Alt+K",
        body: "Bulunduğunuz sayfayı bırakmadan Kahya panelini açın, sorunuzu yazın.",
      },
      {
        title: "Önce onay, sonra kayıt",
        body: "Kahya yalnız önerir. Kaydı sizin yetkinizle siz oluşturursunuz; e-posta göndermez, yalnız taslak hazırlar.",
      },
      {
        title: "“Bunu nasıl yaparım?”",
        body: "Uygulamada bir şeyi nasıl yapacağınızı sorun; Kahya adımları anlatır ve yetkiniz olan sayfaya götürür.",
      },
    ],
    faq: [
      {
        q: "Kahya AI kendi başına kayıt değiştirir mi?",
        a: "Hayır. Yazan her iş bir öneri kartıdır; siz Onayla’ya bastığınızda, sizin yetkinizle kaydedilir. Kahya AI e-posta göndermez, yalnızca taslak hazırlar.",
      },
      {
        q: "Kahya AI herkes için açık mı?",
        a: "Kahya AI ayrı açılan bir eklentidir. Firma yöneticisi veri işleme koşullarını onayladıktan sonra, yetkisi olan kullanıcılar kullanır.",
      },
      {
        q: "Konuşmalar ne kadar saklanır?",
        a: "Kahya AI konuşmaları 180 gün sonra otomatik silinir. Fiş görselleri yalnızca okunur, saklanmaz.",
      },
    ],
  },
];

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug);
