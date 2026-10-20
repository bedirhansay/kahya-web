/**
 * Company and product facts the site relies on. Prices and limits mirror the
 * Kahya API plan seed (api/src/modules/system/seeder/plan-seed.service.ts);
 * update both together.
 */
export const site = {
  name: "Kahya",
  fullName: "Kahya by biHesap",
  tagline: "Ofisinizin bütün parçaları, bir arada.",
  description:
    "Kahya; cari bakiyeleri, görevleri, e-postayı, personel ve izinleri, talep ve onayları tek yerde toplayan web tabanlı ofis yönetim yazılımıdır.",
  // The marketing site's own address. Set NEXT_PUBLIC_SITE_URL in each environment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kahya.bihesap.co",
  email: "info@bihesap.co",
  company: "biHesap",
  companyUrl: "https://bihesap.co",
  city: "Bolu",
  app: {
    url: "https://kahya.bihesap.co",
    register: "https://kahya.bihesap.co/register",
    login: "https://kahya.bihesap.co/login",
  },
  legal: {
    privacy: "https://bihesap.co/gizlilik",
    kvkk: "https://bihesap.co/kvkk",
    terms: "https://bihesap.co/kullanim-kosullari",
    cookies: "https://bihesap.co/cerez-politikasi",
  },
} as const;

export type Plan = {
  slug: "free" | "basic" | "pro" | "growth" | "enterprise";
  name: string;
  summary: string;
  /** Monthly price in TRY; null = quoted per contract. */
  monthly: number | null;
  yearly: number | null;
  users: number | null;
  storageGb: number | null;
  trialDays: number;
  highlights: string[];
};

const paidHighlights = [
  "Sınırsız cari, personel ve şube",
  "Ödeme planları ve vade hatırlatmaları",
  "Personel, izin ve devam takibi",
  "Dokümanlar, sözleşmeler, demirbaş",
  "Gelişmiş raporlar ve Excel’e aktarma",
];

export const plans: Plan[] = [
  {
    slug: "free",
    name: "Ücretsiz",
    summary: "Tek kişilik başlangıç; verileriniz hep sizde.",
    monthly: 0,
    yearly: null,
    users: 1,
    storageGb: 0.2,
    trialDays: 0,
    highlights: ["50 cari, 3 personel", "Görevler, projeler, takvim", "Toplantılar ve duyurular", "Talepler ve onaylar"],
  },
  {
    slug: "basic",
    name: "Başlangıç",
    summary: "Küçük ofisler için, tüm temel modüller dahil.",
    monthly: 399,
    yearly: 3990,
    users: 3,
    storageGb: 5,
    trialDays: 30,
    highlights: paidHighlights,
  },
  {
    slug: "pro",
    name: "Ekip",
    summary: "Büyüyen ekipler için, tüm temel modüller dahil.",
    monthly: 699,
    yearly: 6990,
    users: 10,
    storageGb: 20,
    trialDays: 30,
    highlights: paidHighlights,
  },
  {
    slug: "growth",
    name: "Büyüyen",
    summary: "Kalabalık ofisler için, tüm temel modüller dahil.",
    monthly: 1499,
    yearly: 14990,
    users: 25,
    storageGb: 50,
    trialDays: 30,
    highlights: paidHighlights,
  },
  {
    slug: "enterprise",
    name: "Kurumsal",
    summary: "Sınırsız kullanım, filo dahil tüm modüller, öncelikli destek.",
    monthly: null,
    yearly: null,
    users: null,
    storageGb: null,
    trialDays: 30,
    highlights: ["Sınırsız dosya alanı", "Filo modülü dahil", "Öncelikli destek", "Sözleşmeye özel fiyat"],
  },
];

export const formatTry = (n: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
