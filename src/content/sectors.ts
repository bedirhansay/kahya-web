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
  /** Add-ons that matter for this sector. */
  addons?: string[];
  mock: "task" | "meetings" | "plan" | "stock" | "cari" | "approvals" | "fleet";
  /** What Kahya does not do for this sector, said plainly on the page. */
  notDone: string[];
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
        "Müşteri işleri, projeler, görüşmeler ve tahsilatlar tek yerde. Kahya ile hangi işin kimde olduğunu, hangi müşteriyle ne konuşulduğunu ve kimden ne alacaklı olduğunuzu görün.",
    },
    lead: "Birden çok müşteriye aynı anda iş yapan ekipler için. Hangi iş kimde, hangi müşteriyle ne konuşuldu, hangi ödeme tahsil edilmedi?",
    pains: [
      "Müşteri işi e-postada geliyor, kimin üstlendiği belli değil.",
      "Son görüşmede ne konuşulduğunu yalnız görüşen kişi biliyor.",
      "Hangi ödeme tahsil edildi, hangisi bekliyor, tabloya bakmadan bilinmiyor.",
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
        points: [{ term: "Taksit ve tahsilat", text: "ödeme planıyla vadeler takipte, tahsilat bakiyeye hemen yansır." }],
      },
    ],
    addons: ["E-posta", "Teklif"],
    mock: "task",
    notDone: ["Fatura ve e-Fatura", "Zaman çizelgesi ve saatlik faturalama", "Satış hunisi ve fırsat yönetimi"],
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
    notDone: ["Çizim ve dosya sürüm yönetimi", "Metraj, keşif ve maliyet hesabı", "Fatura ve e-Fatura"],
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
    notDone: ["İlan ve portföy yönetimi", "İlan sitelerine aktarım", "SMS gönderimi"],
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
    addons: ["Stok", "Filo"],
    mock: "stock",
    notDone: ["Servis formu ve müşteri imzası", "Araç konum (GPS) takibi", "Fatura ve e-Fatura"],
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
  {
    slug: "toptan-ticaret-ve-dagitim",
    name: "Toptan ticaret ve dağıtım firmaları",
    tab: "Toptan ticaret",
    seo: {
      title: "Toptancı Cari Takip Programı: Vade, Tahsilat, Stok ve Dağıtım Takibi",
      h1: "Toptan ticaret ve dağıtım firmaları için Kahya",
      description:
        "Çok sayıda müşteri ve tedarikçi carisi, vadeler, taksitler, stok ve dağıtım araçları tek yerde. Kahya ile kimden ne alacaklı olduğunuzu, hangi vadenin geçtiğini ve depoda ne kaldığını görün.",
    },
    lead: "Yüzlerce müşteri ve tedarikçi, vadeli satış, depodan çıkan mal ve yolda araçlar. Kimin ne borcu olduğu her an önünüzde.",
    pains: [
      "Hangi müşterinin vadesi geçti, ay sonunda tek tek bakılıyor.",
      "Tedarikçiye ne kadar borç olduğu ayrı bir defterde.",
      "Depoda hangi ürünün azaldığı sipariş gelince anlaşılıyor.",
    ],
    uses: [
      {
        solution: "finans-cari",
        points: [
          { term: "Cari", text: "her müşteri ve tedarikçinin bakiyesi ve hesap ekstresi." },
          { term: "Vade ve taksit", text: "vadesi geçenler Ana Sayfa’da, taksitler ödeme planıyla takipte." },
          { term: "Alacak raporları", text: "alacakların kaç gündür beklediği yaşlandırma raporunda." },
        ],
      },
      {
        solution: "crm",
        points: [{ term: "Görüşmeler", text: "müşteriyle yapılan her görüşme kartında, takip günüyle." }],
      },
    ],
    addons: ["Stok", "Teklif", "Filo", "E-posta"],
    mock: "cari",
    notDone: ["Fatura ve e-Fatura", "Bayi sipariş portalı (B2B)", "Plasiyer ve araç içi satış", "Kasa ve banka hesabı"],
    faq: [
      {
        q: "Kahya fatura keser mi?",
        a: "Hayır. Kahya satışları ve tahsilatları cari bakiyede takip eder. Fatura ve e-Fatura için muhasebe ya da e-Fatura programınızı kullanmaya devam edersiniz.",
      },
      {
        q: "Satış girdiğimde stok düşer mi?",
        a: "Evet, Stok ek hizmetiyle. Satışta seçtiğiniz ürün stoktan düşer, kritik seviyeye inen ürün işaretlenir.",
      },
    ],
  },
  {
    slug: "insaat-ve-taseron",
    name: "İnşaat ve taşeron firmaları",
    tab: "İnşaat ve taşeron",
    seo: {
      title: "İnşaat Firmaları için Proje, Taşeron Ödemesi ve Saha Ekibi Takip Programı",
      h1: "İnşaat ve taşeron firmaları için Kahya",
      description:
        "Projeler, sözleşmeler, taşeron ve tedarikçi ödemeleri, saha ekibinin izinleri ve zimmetli aletler tek yerde. Kahya ile hangi projede ne yapıldığını ve kime ne ödeneceğini görün.",
    },
    lead: "Birden çok şantiye, taşeronlar, tedarikçiler ve sahada çalışan ekip. İş ve ödeme aynı yerde takip edilir.",
    pains: [
      "Hangi taşerona ne zaman ne ödeneceği ayrı tablolarda.",
      "Sahadaki ekibin izinleri mesajla isteniyor, kayıt yok.",
      "Hangi aletin hangi ustada olduğu bilinmiyor.",
    ],
    uses: [
      {
        solution: "ofis-yonetimi",
        points: [
          { term: "Projeler", text: "her şantiye bir proje. Görevler, dosyalar ve geçmiş içinde." },
          { term: "Demirbaş ve zimmet", text: "alet ve ekipman kimde, ne zamandan beri, kayıtta." },
          { term: "İzin", text: "saha ekibi izni telefondan ister." },
        ],
      },
      {
        solution: "finans-cari",
        points: [
          { term: "Taşeron ödemeleri", text: "ödeme planıyla takipte, vadesi gelen Ana Sayfa’da." },
          { term: "Tedarikçi carisi", text: "malzeme alımları ve ödemeler bakiyede." },
        ],
      },
    ],
    addons: ["Filo", "Stok"],
    mock: "plan",
    notDone: ["Hakediş ve metraj hesabı", "Şantiye günlük raporu", "Fatura ve e-Fatura"],
    faq: [
      {
        q: "Taşeron ödemelerini nasıl takip ederim?",
        a: "Taşeronu tedarikçi carisi olarak açarsınız. Ödemeleri ödeme planıyla tanımlarsınız, vadesi gelen ödeme Ana Sayfa’da görünür.",
      },
      {
        q: "Hakediş hesabı yapar mı?",
        a: "Hayır. Kahya’da hakediş ve metraj hesabı yoktur. Anlaşılan tutarları ödeme planıyla ve cari bakiyesiyle takip edersiniz.",
      },
    ],
  },
  {
    slug: "lojistik-ve-nakliye",
    name: "Lojistik ve nakliye firmaları",
    tab: "Lojistik ve nakliye",
    seo: {
      title: "Nakliye Firmaları için Araç, Sefer, Cari ve Şoför Takip Programı",
      h1: "Lojistik ve nakliye firmaları için Kahya",
      description:
        "Araçlar, seferler, araç bazında gelir ve gider, müşteri carileri ve şoförlerin izin ve masraf talepleri tek yerde. Kahya ile hangi aracın ne kazandırdığını ve kimden ne alacaklı olduğunuzu görün.",
    },
    lead: "Araçlar yolda, şoförler sahada, müşteriler vadeli. Sefer, masraf ve tahsilat aynı yerde.",
    pains: [
      "Hangi aracın ne kazandırdığı ay sonunda hesaplanıyor.",
      "Şoförün yol masrafı ve avansı kâğıtla geliyor.",
      "Müşterinin ödemediği sefer bedeli gözden kaçıyor.",
    ],
    uses: [
      {
        solution: "finans-cari",
        points: [
          { term: "Müşteri carisi", text: "sefer bedeli müşterinin carisine işlenir, tahsilat bakiyeyi düşürür." },
          { term: "Vadesi geçenler", text: "Ana Sayfa’da, gün sayısıyla." },
        ],
      },
      {
        solution: "ofis-yonetimi",
        points: [
          { term: "Talepler", text: "şoför masraf ve avans talebini telefondan gönderir, siz onaylarsınız." },
          { term: "İzin", text: "şoför izinleri takvimde." },
        ],
      },
    ],
    addons: ["Filo"],
    mock: "fleet",
    notDone: ["Araç konum (GPS) ve rota takibi", "Yük ve irsaliye yönetimi", "Fatura ve e-Fatura"],
    faq: [
      {
        q: "Araçlarımı Kahya’da takip edebilir miyim?",
        a: "Evet, Filo ek hizmetiyle. Araçları, seferleri ve araç bazında gelir ve gideri kaydedersiniz.",
      },
      {
        q: "Araçların konumunu görebilir miyim?",
        a: "Hayır. Kahya’da GPS ve rota takibi yoktur. Filo, araç ve sefer kayıtlarını ve gelir gideri tutar.",
      },
    ],
  },
  {
    slug: "guvenlik-ve-temizlik",
    name: "Güvenlik ve temizlik hizmet firmaları",
    tab: "Güvenlik ve temizlik",
    seo: {
      title: "Güvenlik ve Temizlik Şirketleri için Personel, İzin ve Müşteri Sözleşmesi Takibi",
      h1: "Güvenlik ve temizlik hizmet firmaları için Kahya",
      description:
        "Kalabalık saha personelinin izin ve devam takibi, avans talepleri, müşteri sözleşmeleri ve aylık hizmet bedelleri tek yerde. Kahya ile kim izinde, hangi sözleşme bitiyor, kim ödemedi, görün.",
    },
    lead: "Çok sayıda saha personeli, birçok müşteri sözleşmesi ve her ay kesilen hizmet bedeli.",
    pains: [
      "Kimin izinde olduğu ve kaç gün izni kaldığı tabloda tutuluyor.",
      "Personelin avans talebi telefonda kalıyor.",
      "Müşteri sözleşmesinin bitişi son anda fark ediliyor.",
    ],
    uses: [
      {
        solution: "ofis-yonetimi",
        points: [
          { term: "İzin ve devam", text: "çalışılan, gelinmeyen ve izinli günler. Kim ne zaman, kaç gün izinde." },
          { term: "Avans talepleri", text: "personel telefondan ister, onay tek listede." },
          { term: "Sözleşmeler", text: "müşteri sözleşmesi bitiş tarihiyle, bitmeden hatırlatılır." },
        ],
      },
      {
        solution: "finans-cari",
        points: [{ term: "Aylık hizmet bedeli", text: "düzenli ödeme olarak tanımlanır, her ay vadesinde hatırlatılır." }],
      },
    ],
    addons: ["E-posta"],
    mock: "approvals",
    notDone: ["Vardiya planlama", "Puantaj ve bordro", "Personel konum (GPS) takibi"],
    faq: [
      {
        q: "Vardiya planı yapabilir miyim?",
        a: "Hayır. Kahya’da vardiya planlama yoktur. İzin, devam ve talepleri takip edersiniz.",
      },
      {
        q: "Personel izinlerini telefondan isteyebilir mi?",
        a: "Evet. Personel Kahya’yı telefonundan açar, izin talebini gönderir. Yöneticisi onaylayınca izin takvime işlenir.",
      },
    ],
  },
  {
    slug: "mali-musavir-burosu",
    name: "Mali müşavir büroları",
    tab: "Mali müşavir",
    seo: {
      title: "Mali Müşavir Büroları için İş Takibi, Mükellef Görüşmeleri ve Ücret Takibi",
      h1: "Mali müşavir büroları için Kahya",
      description:
        "Büronun işlerini ekibe dağıtın, mükellef görüşmelerini kaydedin, aylık ücretleri takip edin. Kahya kullanan müşterileriniz ayın hareketlerini Mali Müşavir Paketi ile tek dosyada gönderir.",
    },
    lead: "Her ay tekrar eden işler, çok sayıda mükellef ve aylık ücretler. Büronun kendi işi de düzenli olsun.",
    pains: [
      "Ay sonu işleri kime verildi, hangisi bitti, sorarak öğreniliyor.",
      "Mükellefle ne konuşulduğu görüşen kişinin aklında.",
      "Aylık ücreti geciken mükellef gözden kaçıyor.",
    ],
    uses: [
      {
        solution: "ofis-yonetimi",
        points: [
          { term: "Görevler ve takımlar", text: "dönem işleri kişiye ya da takıma verilir, durumu herkes görür." },
          { term: "Dokümanlar", text: "kimin göreceğini seçerek yüklenir." },
        ],
      },
      {
        solution: "crm",
        points: [{ term: "Görüşmeler", text: "mükellefle yapılan her görüşme kartında, takip günüyle." }],
      },
      {
        solution: "finans-cari",
        points: [{ term: "Aylık ücret", text: "düzenli ödeme olarak tanımlanır, geciken Ana Sayfa’da görünür." }],
      },
    ],
    addons: ["E-posta"],
    mock: "task",
    notDone: ["Beyanname hazırlama ve gönderme", "e-Defter ve resmî muhasebe kaydı", "Fatura ve e-Fatura"],
    faq: [
      {
        q: "Kahya muhasebe programımın yerine geçer mi?",
        a: "Hayır. Kahya büronun iş takibini, görüşmelerini ve ücret takibini tutar. Beyanname, e-Defter ve resmî kayıtlar için mevcut programınızı kullanırsınız.",
      },
      {
        q: "Mali Müşavir Paketi nedir?",
        a: "Kahya kullanan bir firmanın seçtiği ayın hareketlerini, cari bakiyelerini ve ekstrelerini tek dosyada hazırladığı rapordur. Firma bu dosyayı indirip mali müşavirine gönderir.",
      },
    ],
  },
  {
    slug: "egitim-ve-kurs",
    name: "Eğitim kurumları ve kurslar",
    tab: "Eğitim ve kurs",
    seo: {
      title: "Kurslar ve Eğitim Kurumları için Taksit, Veli Görüşmesi ve Personel Takibi",
      h1: "Eğitim kurumları ve kurslar için Kahya",
      description:
        "Öğrenci ve veli taksitleri, kayıt adayı görüşmeleri, eğitmen izinleri ve duyurular tek yerde. Kahya ile hangi taksitin geciktiğini ve hangi adayı ne zaman arayacağınızı görün.",
    },
    lead: "Taksitle ödenen kayıtlar, kayıt dönemindeki aday görüşmeleri ve eğitmen kadrosu.",
    pains: [
      "Hangi velinin taksidi gecikti, tek tek bakılıyor.",
      "Kayıt için arayan adayın ne zaman tekrar aranacağı unutuluyor.",
      "Eğitmen izinleri ve duyurular mesaj gruplarında kayboluyor.",
    ],
    uses: [
      {
        solution: "finans-cari",
        points: [
          { term: "Taksit planı", text: "kayıt ücreti taksitlere bölünür, taksitler tek seferde oluşur." },
          { term: "Vadesi geçenler", text: "geciken taksit Ana Sayfa’da, gün sayısıyla." },
        ],
      },
      {
        solution: "crm",
        points: [{ term: "Aday görüşmeleri", text: "her görüşme kayıtta, takip günü gelen aday önünüze çıkar." }],
      },
      {
        solution: "ofis-yonetimi",
        points: [{ term: "İzin ve duyurular", text: "eğitmen izni telefondan, duyuru tüm ekibe tek yerden." }],
      },
    ],
    addons: ["E-posta"],
    mock: "plan",
    notDone: ["Ders programı ve yoklama", "Öğrenci ve veli portalı", "SMS gönderimi"],
    faq: [
      {
        q: "Öğrenci taksitlerini takip edebilir miyim?",
        a: "Evet. Her öğrenciyi ya da veliyi cari olarak açar, kayıt ücretini ödeme planıyla taksitlere bölersiniz. Vadesi gelen taksit Ana Sayfa’da görünür.",
      },
      {
        q: "Ders programı ve yoklama var mı?",
        a: "Hayır. Kahya’da ders programı ve yoklama yoktur. Kurumun ödeme, görüşme ve personel tarafını tutar.",
      },
    ],
  },
  {
    slug: "hukuk-burosu",
    name: "Hukuk büroları",
    tab: "Hukuk bürosu",
    seo: {
      title: "Hukuk Büroları için Müvekkil Görüşmesi, Görev, Doküman ve Ücret Takibi",
      h1: "Hukuk büroları için Kahya",
      description:
        "Müvekkil görüşmeleri, büro içi görevler, kimin göreceği seçilen dokümanlar, sözleşmeler ve vekâlet ücreti taksitleri tek yerde. Kahya ile büronun işini ve tahsilatını takip edin.",
    },
    lead: "Müvekkil görüşmeleri, büro içinde dağıtılan işler, gizli tutulması gereken belgeler ve taksitli ücretler.",
    pains: [
      "Müvekkille en son ne konuşulduğu dosyayı tutan avukatın aklında.",
      "Büro içi işler kime verildi, takibi zor.",
      "Vekâlet ücreti taksitlerinden hangisinin geciktiği belli değil.",
    ],
    uses: [
      {
        solution: "crm",
        points: [{ term: "Müvekkil görüşmeleri", text: "her görüşme kartında, kişisi, notu ve takip günüyle." }],
      },
      {
        solution: "ofis-yonetimi",
        points: [
          { term: "Görevler", text: "büro içi işler kişiye ya da takıma verilir." },
          { term: "Dokümanlar", text: "kimin göreceğini seçerek yüklenir." },
        ],
      },
      {
        solution: "finans-cari",
        points: [{ term: "Ücret taksitleri", text: "ödeme planıyla takipte, geciken Ana Sayfa’da." }],
      },
    ],
    addons: ["E-posta"],
    mock: "meetings",
    notDone: ["Dava ve duruşma takibi", "UYAP bağlantısı", "Fatura ve e-Fatura"],
    faq: [
      {
        q: "Dava ve duruşma takibi yapar mı?",
        a: "Hayır. Kahya’da dava, duruşma ve UYAP takibi yoktur. Büronun müvekkil görüşmelerini, görevlerini, belgelerini ve tahsilatlarını tutar.",
      },
      {
        q: "Belgeleri herkes görebilir mi?",
        a: "Hayır. Dokümanı yüklerken kimin göreceğini seçersiniz. Rol ve yetkilerle kimin neyi göreceğini de belirlersiniz.",
      },
    ],
  },
  {
    slug: "uretim-atolyesi",
    name: "Üretim atölyeleri ve imalathaneler",
    tab: "Üretim atölyesi",
    seo: {
      title: "Atölye ve İmalathaneler için Teklif, Stok ve Tahsilat Takibi",
      h1: "Üretim atölyeleri ve imalathaneler için Kahya",
      description:
        "Müşteriye teklif, depodaki ürün ve malzeme, satış ve tahsilat tek yerde. Kahya ile teklifinizin durumunu, stokta ne kaldığını ve kimden ne alacaklı olduğunuzu görün.",
    },
    lead: "Teklif verilir, kabul edilen iş satışa döner, malzeme depodan düşer, tahsilat cariye işlenir.",
    pains: [
      "Verilen teklifin kabul edilip edilmediği telefonda soruluyor.",
      "Malzemenin bittiği iş başlayınca anlaşılıyor.",
      "Müşterinin borcu ayrı bir defterde.",
    ],
    uses: [
      {
        solution: "finans-cari",
        points: [
          { term: "Cari ve tahsilat", text: "satış müşterinin carisine işlenir, tahsilat bakiyeyi düşürür." },
          { term: "Taksit", text: "taksitli satışlar ödeme planıyla takipte." },
        ],
      },
      {
        solution: "crm",
        points: [{ term: "Görüşmeler", text: "müşteriyle konuşulanlar kartında, takip günüyle." }],
      },
    ],
    addons: ["Teklif", "Stok"],
    mock: "stock",
    notDone: ["Üretim emri ve iş planlama", "Reçete ve maliyet hesabı", "Fatura ve e-Fatura"],
    faq: [
      {
        q: "Üretim planlama ve reçete var mı?",
        a: "Hayır. Kahya’da üretim emri, reçete ve maliyet hesabı yoktur. Teklif, stok ve tahsilat tarafını tutar.",
      },
      {
        q: "Kabul edilen teklif satışa dönüşür mü?",
        a: "Evet, Teklif ek hizmetiyle. Müşteri teklifi linkten açıp kabul eder, kabul edilen teklif tek tıkla satışa döner.",
      },
    ],
  },
];

/** Shown as tabs on the home page, in this order. */
export const featuredSectors = [
  "toptan-ticaret-ve-dagitim",
  "insaat-ve-taseron",
  "lojistik-ve-nakliye",
  "danismanlik-ve-ajans",
  "mali-musavir-burosu",
  "emlak-ofisi",
];

export const sectorBySlug = (slug: string) => sectors.find((s) => s.slug === slug);
