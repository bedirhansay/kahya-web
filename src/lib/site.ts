/**
 * Company and product facts the site relies on. Prices (KDV hariç) and limits mirror the
 * Kahya API plan seed (api/src/modules/system/seeder/plan-seed.service.ts) and the add-on rows;
 * update both together.
 */
// The web app moved to its own subdomain when this site took kahya.bihesap.co.
export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kahya.bihesap.co";

export const site = {
  name: "Kahya",
  fullName: "Kahya by biHesap",
  tagline: "Ofisinizin bütün parçaları, bir arada.",
  description:
    "Kahya; cari hesap, görev, e-posta, personel ve izin takibini, talep ve onayları tek yerde toplayan web tabanlı ofis yönetim programıdır. Kurulum gerekmez.",
  // The marketing site's own address. Set NEXT_PUBLIC_SITE_URL in each environment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kahya.bihesap.co",
  email: "info@bihesap.co",
  company: "biHesap",
  companyUrl: "https://bihesap.co",
  city: "Bolu",
  app: {
    url: appUrl,
    register: `${appUrl}/register`,
    login: `${appUrl}/login`,
  },
  legal: {
    privacy: "https://bihesap.co/gizlilik",
    kvkk: "https://bihesap.co/kvkk",
    terms: "https://bihesap.co/kullanim-kosullari",
    cookies: "https://bihesap.co/cerez-politikasi",
  },
} as const;


/** VAT rate used for the "KDV dahil" line; every listed price excludes it. */
export const VAT_RATE = 0.2;

export type Plan = {
  slug: "basic" | "pro" | "growth" | "enterprise";
  name: string;
  summary: string;
  /** Yearly price in TRY, KDV hariç; null = quoted per contract. */
  yearly: number | null;
  users: number | null;
  storageGb: number | null;
  /** Mail client (own mailbox) included; otherwise the E-posta add-on. */
  mail: boolean;
};

export const paidHighlights = [
  "Sınırsız cari, personel ve şube",
  "Ödeme planları ve vade hatırlatmaları",
  "Personel, izin ve devam takibi",
  "Dokümanlar, sözleşmeler, demirbaş",
  "Görevler, projeler, toplantılar, talepler",
  "Gelişmiş raporlar ve Excel’e aktarma",
];

export const plans: Plan[] = [
  {
    slug: "basic",
    name: "Başlangıç",
    summary: "Küçük ofisler için, tüm temel modüller dahil.",
    yearly: 7990,
    users: 3,
    storageGb: 5,
    mail: false,
  },
  {
    slug: "pro",
    name: "Ekip",
    summary: "Büyüyen ekipler için, e-posta dahil.",
    yearly: 14990,
    users: 10,
    storageGb: 20,
    mail: true,
  },
  {
    slug: "growth",
    name: "Büyüyen",
    summary: "Kalabalık ofisler için, e-posta dahil.",
    yearly: 29990,
    users: 25,
    storageGb: 50,
    mail: true,
  },
  {
    slug: "enterprise",
    name: "Kurumsal",
    summary: "Sınırsız kullanım, filo dahil tüm modüller, öncelikli destek.",
    yearly: null,
    users: null,
    storageGb: null,
    mail: true,
  },
];

export const trialDays = 30;

export type Addon = {
  key: string;
  name: string;
  body: string;
  price: number;
  /** How the price is charged. */
  unit: "yıl" | "kullanıcı / yıl" | "tek sefer";
};

export const addons: Addon[] = [
  {
    key: "extra-user",
    name: "Ek kullanıcı",
    body: "Paketinizi değiştirmeden kullanıcı sayısını artırın; 3 kişilik pakete 2 kişi eklemek gibi.",
    price: 1200,
    unit: "kullanıcı / yıl",
  },
  {
    key: "mail",
    name: "E-posta",
    body: "Kendi e-posta kutunuzu Kahya’ya bağlayın: gelen kutusu, yanıt, şablon ve toplu gönderim. Ekip ve üstünde dahil.",
    price: 2490,
    unit: "yıl",
  },
  {
    key: "fleet",
    name: "Filo modülü",
    body: "Araç, sefer ve araç bazlı gelir / gider takibi. Kurumsal planda dahil.",
    price: 2490,
    unit: "yıl",
  },
  {
    key: "kahya-ai",
    name: "Kahya AI",
    body: "Sorularınızı yanıtlar, kayıt taslağı hazırlar, özet çıkarır. Aylık 500 soru, firmanın tüm kullanıcıları ortak kullanır.",
    price: 3990,
    unit: "yıl",
  },
  {
    key: "kahya-ai-credit",
    name: "Kahya AI ek kredi",
    body: "Ay bitmeden kotanız dolarsa bu ayki Kahya AI kotanıza 500 soru ekler.",
    price: 490,
    unit: "tek sefer",
  },
  {
    key: "onboarding",
    name: "Kurulum ve veri aktarımı",
    body: "Carilerinizi, personelinizi ve açılış bakiyelerinizi Excel ya da eski programınızdan biz aktarırız.",
    price: 3990,
    unit: "tek sefer",
  },
  {
    key: "email-hosting",
    name: "Kurumsal e-posta",
    body: "ad@firmaniz.com.tr adresleri: 5 hesap, 10 GB alan, kurulum ve Kahya bağlantısı dahil.",
    price: 4990,
    unit: "yıl",
  },
  {
    key: "website",
    name: "Kurumsal web sitesi",
    body: "Firmanıza özel, mobil uyumlu tanıtım sitesi; kurulumu biz yaparız. Barındırma ve bakım yıllık ayrıdır.",
    price: 13000,
    unit: "tek sefer",
  },
  {
    key: "ecommerce",
    name: "E-ticaret sitesi",
    body: "Ürünlerinizi online satacağınız, mobil uyumlu e-ticaret sitesi; kurulumu biz yaparız. Barındırma ve bakım yıllık ayrıdır.",
    price: 29990,
    unit: "tek sefer",
  },
  {
    key: "site-care",
    name: "Site bakım ve barındırma",
    body: "Sizin için yaptığımız web veya e-ticaret sitesinin barındırması, güncellemeleri ve yedekleri.",
    price: 2990,
    unit: "yıl",
  },
];

export const formatTry = (n: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
