/**
 * Guides: plain answers to the questions an office asks before choosing software. The first paragraph answers the
 * question in a sentence or two (search and AI answers quote it). Kahya claims follow src/content/features.ts and
 * the plan catalogue (src/content/plans.ts); no figures we cannot stand behind.
 */
export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** The short answer, first on the page. */
  answer: string;
  sections: { heading: string; body: string[]; list?: string[] }[];
  faq: { q: string; a: string }[];
  /** Feature slugs to read next. */
  related: string[];
  updated: string;
};

export const guides: Guide[] = [
  {
    slug: "ofis-yonetim-programi-nedir",
    title: "Ofis yönetim programı nedir, nasıl seçilir?",
    metaTitle: "Ofis yönetim programı nedir? Seçerken bakılacak 7 şey",
    metaDescription:
      "Ofis yönetim programı görevleri, müşteri ve tedarikçi carilerini, personel izinlerini ve onayları tek yerde toplar. Seçerken nelere bakılacağını sade bir dille anlattık.",
    answer:
      "Ofis yönetim programı, bir ofisin günlük işlerini tek uygulamada toplayan yazılımdır: kimin hangi işi yaptığı, müşteri ve tedarikçilerle alacak-borç durumu, personelin izni, onay bekleyen talepler ve belgeler. Amaç, bu bilgilerin Excel dosyalarına, mesaj gruplarına ve kâğıtlara dağılmasını önlemektir.",
    sections: [
      {
        heading: "Ofis yönetim programı ne işe yarar?",
        body: [
          "Küçük ve orta ölçekli bir ofiste aynı soru her gün birkaç kez sorulur: iş kimde, müşteriyle en son ne konuşuldu, kim kime ne kadar borçlu, bu hafta kim izinli? Cevaplar farklı yerlerde durduğunda biri sormadan kimse bilmez.",
          "Ofis yönetim programı bu cevapları tek kayda bağlar. Bir görev müşteri kartına, bir tahsilat cari bakiyeye, bir izin talebi personelin takvimine aynı anda işlenir. Böylece aynı bilgi birkaç yere ayrı ayrı yazılmaz.",
        ],
      },
      {
        heading: "Muhasebe programından farkı ne?",
        body: [
          "Muhasebe programı resmî kayıt içindir: fatura, yevmiye, beyanname. Ofis yönetim programı ise ofisin günlük işini izler: görevler, müşteri görüşmeleri, cari bakiye, izinler, onaylar.",
          "İkisi birbirinin yerine geçmez. Kahya da bir muhasebe programı değildir; fatura kesmez ve bankanıza bağlanmaz. Ay sonunda kayıtları mali müşavirinize tek dosyada gönderirsiniz.",
        ],
      },
      {
        heading: "Seçerken bakılacak 7 şey",
        body: ["Bir programı denemeden önce şu soruları sorun:"],
        list: [
          "Tek kayıt: Bir iş müşteri kartından satışa, tahsilata ve rapora aynı kayıtla ilerliyor mu, yoksa her adımda yeniden mi yazılıyor?",
          "Telefon: Çalışan izin ya da avans talebini telefondan açabiliyor mu, yönetici oradan onaylayabiliyor mu?",
          "Yetki: Kimin neyi göreceğini, neyi değiştireceğini modül modül belirleyebiliyor musunuz?",
          "Sadelik: Kullanmadığınız modüller menüden gizlenebiliyor mu?",
          "Veri aktarımı: Mevcut müşteri, tedarikçi ve açılış bakiyelerinizi Excel'den içeri alabiliyor musunuz?",
          "Verinin yeri: Kayıtlarınız nerede tutuluyor, yedekleniyor mu, silinen kayıt geri alınabiliyor mu?",
          "Deneme: Kart bilgisi vermeden, kendi verinizle deneyebiliyor musunuz?",
        ],
      },
      {
        heading: "Kahya bunları nasıl karşılıyor?",
        body: [
          "Kahya üç çözümden oluşur: Ofis yönetimi, CRM (müşteri ilişkileri) ile Finans ve cari. İhtiyacınız olanı açarsınız; menü yalnızca onları gösterir. Tarayıcıda çalışır, telefonda ana ekrana eklenir.",
          "Kayıt olan her firma 30 gün Kurumsal paketi dener, süre bitince Ücretsiz pakete geçer ve verileri yerinde kalır. Kayıtlar Türkiye'deki sunucularda tutulur ve her gün yedeklenir.",
        ],
      },
    ],
    faq: [
      {
        q: "Ofis yönetim programı kimler için uygun?",
        a: "Birden fazla kişinin aynı müşteriler, işler ve ödemeler üzerinde çalıştığı her ofis için: mali müşavir büroları, mimarlık ve mühendislik ofisleri, toptancılar, servis firmaları, ajanslar ve benzerleri.",
      },
      {
        q: "Excel ile devam etsem ne kaybederim?",
        a: "Excel tek kişinin hesabı için iyidir. Birden fazla kişi aynı dosyaya yazdığında hangi sürümün doğru olduğu, kimin neyi değiştirdiği ve hatırlatmalar kaybolur. Program bunları kendisi tutar.",
      },
    ],
    related: ["gorev-takibi", "cari-takibi", "personel-ve-izin"],
    updated: "2026-11-07",
  },
  {
    slug: "cari-takibi-excel-mi-program-mi",
    title: "Cari hesap takibi: Excel mi, program mı?",
    metaTitle: "Cari hesap takibi Excel'de mi programda mı yapılmalı?",
    metaDescription:
      "Cari hesap takibini Excel'de yapmanın nerede yettiğini, nerede sorun çıkardığını ve cari takip programına ne zaman geçmek gerektiğini anlattık.",
    answer:
      "Az sayıda müşteriniz varsa ve kayıtları tek kişi tutuyorsa Excel yeterli olabilir. Müşteri sayısı arttığında, birden fazla kişi kayıt girdiğinde ya da taksit ve vade takibi gerektiğinde cari takip programı hem hatayı hem zamanı azaltır.",
    sections: [
      {
        heading: "Cari hesap nedir?",
        body: [
          "Cari hesap, bir müşteri ya da tedarikçiyle aranızdaki alacak ve borç hareketlerinin kaydıdır. Satış ve alış bakiyeyi bir yöne, tahsilat ve ödeme diğer yöne götürür. Sonuçta kimden ne kadar alacaklı, kime ne kadar borçlu olduğunuzu gösterir.",
        ],
      },
      {
        heading: "Excel nerede yeter?",
        body: ["Excel şu durumlarda işinizi görür:"],
        list: [
          "Müşteri ve tedarikçi sayınız azsa,",
          "Kayıtları tek kişi giriyorsa,",
          "Taksitli satış ya da vadeli ödeme takibiniz yoksa,",
          "Ekstreyi müşteriye nadiren gönderiyorsanız.",
        ],
      },
      {
        heading: "Excel nerede zorlanır?",
        body: [
          "Bakiye formüllerle hesaplandığında, bir satır eksik ya da yanlış yere girildiğinde hata fark edilmeden büyür. Birden fazla kişi aynı dosyayı kullandığında hangi kopyanın güncel olduğu belirsizleşir.",
          "Vadesi geçen ödemeleri bulmak için listeyi elle süzmek gerekir, hatırlatma kendiliğinden gelmez. Müşteriye ekstre göndermek için dosyayı ayrıca hazırlamak gerekir.",
        ],
      },
      {
        heading: "Cari takip programı ne kazandırır?",
        body: ["Bir cari takip programında:"],
        list: [
          "Her hareket kaydedildiği anda bakiye güncellenir; yürüyen bakiye satır satır görünür.",
          "Taksitli tahsilatlar ödeme planına bağlanır, vadesi gelen ve geciken ödemeler tek listede çıkar.",
          "Ekstre müşteriye WhatsApp, e-posta ya da link olarak gider.",
          "Alacak yaşlandırma raporu kimin ne kadar süredir ödemediğini gösterir.",
          "Kimin hangi kaydı ne zaman girdiği izlenir.",
        ],
      },
      {
        heading: "Excel'den geçiş zor mu?",
        body: [
          "Değil. Kahya'da müşteri, tedarikçi ve açılış bakiyelerini hazır bir şablonla Excel'den içeri alırsınız; içeri almadan önce bir önizleme görürsünüz. İsterseniz bu aktarımı bizim ekibimiz yapar.",
          "Kahya bir muhasebe programı değildir: fatura kesmez ve bankanıza bağlanmaz. Cari bakiyenizi takip eder; resmî kayıt için ayın hareketlerini mali müşavirinize tek dosyada gönderirsiniz.",
        ],
      },
    ],
    faq: [
      {
        q: "Cari takip programı muhasebe programının yerine geçer mi?",
        a: "Hayır. Cari takip programı alacak ve borç durumunu izler. Fatura, resmî defter ve beyanname muhasebe programında ve mali müşavirinizde kalır.",
      },
      {
        q: "Mevcut Excel dosyalarımı aktarabilir miyim?",
        a: "Evet. Kahya'da müşteri, tedarikçi ve açılış bakiyeleri hazır şablonla Excel'den aktarılır; aktarmadan önce önizleme görürsünüz.",
      },
    ],
    related: ["cari-takibi", "odeme-planlari", "raporlar"],
    updated: "2026-11-07",
  },
  {
    slug: "personel-izin-takibi-nasil-yapilir",
    title: "Personel izin takibi nasıl yapılır?",
    metaTitle: "Personel izin takibi nasıl yapılır? Yıllık izin hakları ve pratik yöntem",
    metaDescription:
      "Personel izin takibinde yıllık izin hakları, izin talebi ve onayı, kalan izin hesabı ve takvim. Küçük bir ofiste izin takibini düzenli tutmanın yolu.",
    answer:
      "İzin takibi için üç şeyi düzenli tutmak yeter: her çalışanın yıllık izin hakkı, kullandığı ve kalan izin, ve kimin hangi gün izinli olduğu. Bunu talep ve onay üzerinden yürütürseniz kayıtlar kendiliğinden oluşur ve takvim her zaman günceldir.",
    sections: [
      {
        heading: "Yıllık izin hakkı ne kadar?",
        body: [
          "4857 sayılı İş Kanunu'na göre en az bir yıl çalışmış işçinin yıllık ücretli izni, hizmet süresine göre şöyledir:",
        ],
        list: [
          "1 yıldan 5 yıla kadar (5 yıl dahil): en az 14 gün,",
          "5 yıldan fazla, 15 yıldan az: en az 20 gün,",
          "15 yıl (dahil) ve daha fazla: en az 26 gün.",
          "18 yaşından küçük ve 50 yaşından büyük işçilere verilecek izin 20 günden az olamaz.",
        ],
      },
      {
        heading: "İzin takibinde sık yapılan hatalar",
        body: [
          "İzin talepleri sözlü ya da mesajla gelir, onay kimsede kayıtlı kalmaz. Kalan izin yıl sonunda elle hesaplanır ve çalışanla anlaşmazlık çıkar. Kimin hangi gün izinli olduğu yalnızca yöneticinin aklındadır; iş planlanırken unutulur.",
        ],
      },
      {
        heading: "Düzenli bir izin takibi nasıl kurulur?",
        body: ["Şu sırayı izleyin:"],
        list: [
          "Her çalışanın işe giriş tarihini ve yıllık izin hakkını kaydedin.",
          "İzinler yalnızca talep olarak gelsin: tarih, tür (yıllık, ücretsiz, mazeret) ve açıklama.",
          "Talebi yönetici onaylasın ya da reddetsin; karar ve tarih kayıtta kalsın.",
          "Onaylanan izin takvime ve puantaja işlensin.",
          "Kalan izin her talepte kendiliğinden hesaplansın.",
        ],
      },
      {
        heading: "Kahya'da izin takibi",
        body: [
          "Kahya'da çalışan izni telefondan ister; talep yöneticinin Onayınızı bekleyenler listesine düşer. Onaylanan izin takvime ve puantaja işlenir, kalan hak personel kartında görünür.",
          "Avans, masraf ve satın alma talepleri de aynı onay akışından geçer. Onay adımlarını siz belirlersiniz, yokken yerinize birine vekâlet verebilirsiniz.",
        ],
      },
    ],
    faq: [
      {
        q: "Yıllık izin bölünerek kullanılabilir mi?",
        a: "İş Kanunu'na göre yıllık izin tarafların anlaşmasıyla bölümler hâlinde kullanılabilir; bölümlerden biri on günden az olamaz. Güncel düzenlemeyi ve iş sözleşmenizi kontrol edin.",
      },
      {
        q: "Bu bilgiler hukuki danışmanlık yerine geçer mi?",
        a: "Hayır. Buradaki bilgiler genel bilgilendirme içindir; kendi durumunuz için mali müşavirinize ya da bir iş hukukçusuna danışın.",
      },
    ],
    related: ["personel-ve-izin", "talep-ve-onay", "gorev-takibi"],
    updated: "2026-11-07",
  },
  {
    slug: "kasa-ve-banka-takibi-nasil-yapilir",
    title: "Kasa ve banka takibi nasıl yapılır?",
    metaTitle: "Kasa ve banka takibi nasıl yapılır? Kasa, banka hesabı ve kredi kartı",
    metaDescription:
      "Kasa, banka hesabı ve kredi kartı bakiyelerini düzenli izlemenin yolu. Küçük bir ofiste paranın nerede durduğunu düzenli tutmak için pratik bir sıra.",
    answer:
      "Kasa ve banka takibi, paranın hangi kasada ve hangi banka hesabında durduğunu, kredi kartına ne kadar borçlu olduğunuzu her an bilmek demektir. Her hesabı bir kez açılış bakiyesiyle kaydedip para hareket ettikçe aynı hesaba işlerseniz bakiyeler güncel kalır.",
    sections: [
      {
        heading: "Cari takibinden farkı ne?",
        body: [
          "Cari takibi kimden alacaklı, kime borçlu olduğunuzu gösterir. Kasa ve banka takibi ise paranın şu an nerede durduğunu: merkez kasada mı, hangi banka hesabında, kredi kartının borcu ne kadar.",
          "İkisi birbirini tamamlar. Müşteri ödediğinde cari bakiyesi düşer; para da bir kasaya ya da banka hesabına girer.",
        ],
      },
      {
        heading: "Düzenli bir kasa ve banka takibi nasıl kurulur?",
        body: ["Şu sırayı izleyin:"],
        list: [
          "Her kasayı, banka hesabını ve kredi kartını ayrı bir hesap olarak açın.",
          "Bir başlangıç günü seçin ve o günkü bakiyeyi açılış olarak yazın. Kredi kartında açılış, o günkü kart borcudur.",
          "Kartın hesap kesim ve son ödeme gününü not edin; ödeme günü kaçmasın.",
          "Kasadan bankaya yatırılan para iki hesap arasında aktarımdır, gelir ya da gider değildir.",
          "Ay sonunda banka ekstresindeki bakiyeyi kendi kaydınızla karşılaştırın.",
        ],
      },
      {
        heading: "Kahya'da kasa ve banka",
        body: [
          "Kahya'da Kasa ve banka ek hizmetiyle kasalarınızı, banka hesaplarınızı ve kredi kartlarınızı bakiyeleriyle tutarsınız. Hesap eklerken ad yeter; banka, şube, IBAN, kartın son 4 hanesi, limiti, hesap kesim ve son ödeme günü isteğe bağlıdır. Hesap TL, dolar ya da euro olarak açılır.",
          "Hesabı eklerken açılış bakiyesini ve tarihini yazarsınız; kredi kartında açılıştaki kart borcunu. Kasa ve bankada bakiye, kartta kart borcu görünür; kartta kullanılabilir limit ve son ödeme günü de yazar. Kullanmadığınız hesabı pasife alırsınız; kaydı silinmez.",
        ],
      },
      {
        heading: "Kahya ne yapmaz?",
        body: [
          "Kahya bankanıza bağlanmaz, hesap hareketlerini kendiliğinden çekmez ve fatura kesmez. Banka ekstresini dosyadan yükleyip satırları cariye işlemek ile çek ve senet takibi sonraki sürümlerde gelecek.",
        ],
      },
    ],
    faq: [
      {
        q: "Kasa ve banka her pakette var mı?",
        a: "Hayır. Kasa ve banka ek hizmettir, hiçbir paketin içinde değildir ve deneme süresinde kapalıdır. Uygulamada Abonelik sayfasından talep edersiniz ya da bize yazarsınız.",
      },
      {
        q: "Kasa ve banka kayıtları resmî kaydın yerine geçer mi?",
        a: "Hayır. Kahya resmî kayıt tutmaz; kasa ve banka kayıtları ofisin günlük takibi içindir. Resmî defterleriniz muhasebe programınızda ya da müşavirinizde kalır.",
      },
    ],
    related: ["cari-takibi", "odeme-planlari", "raporlar"],
    updated: "2026-11-11",
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
