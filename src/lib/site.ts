/**
 * Company and product facts the site relies on. Prices are not published: solutions and
 * add-ons are quoted on request (src/content/solutions.ts).
 */
// The web app lives on its own subdomain; this site is kahya.bihesap.co.
export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://kahyaapp.bihesap.co";

export const site = {
  name: "Kahya",
  fullName: "Kahya by biHesap",
  tagline: "Ofisinizin bütün parçaları, bir arada.",
  description:
    "Kahya cari, görev, personel ve izin takibini, talep ve onayları tek yerde toplayan web tabanlı ofis yönetim programıdır. Ofis Yönetimi, CRM ve Finans & Cari çözümlerinden ihtiyacınız olanı seçersiniz.",
  // The marketing site's own address. Set NEXT_PUBLIC_SITE_URL in each environment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kahya.bihesap.co",
  email: "iletisim@bihesap.co",
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


