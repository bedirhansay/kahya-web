/**
 * Company and product facts the site relies on. Prices and limits mirror the
 * Kahya API plan seed (api/src/modules/system/seeder/plan-seed.service.ts);
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

