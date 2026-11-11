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
    "Kahya cari, görev, personel ve izin takibini, talep ve onayları tek yerde toplayan web tabanlı ofis yönetim programıdır. Ofis yönetimi, CRM ile Finans ve cari çözümlerinden ihtiyacınız olanı seçersiniz.",
  // The marketing site's own address. Set NEXT_PUBLIC_SITE_URL in each environment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kahya.bihesap.co",
  email: "info@bihesap.co",
  // WhatsApp Business number, digits only with the country code (905xxxxxxxxx); the chat button shows once it is set.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  // The contact form posts to the site's own endpoint (src/app/api/contact), which mails support through Resend.
  contactApi: "/api/contact",
  company: "biHesap",
  companyUrl: "https://bihesap.co",
  city: "Bolu",
  app: {
    url: appUrl,
    register: `${appUrl}/register`,
    login: `${appUrl}/login`,
  },
  // The legal texts are published from the admin and shown by the app without a login.
  legal: {
    privacy: `${appUrl}/legal/privacy`,
    kvkk: `${appUrl}/legal/kvkk`,
    terms: `${appUrl}/legal/terms`,
    cookies: `${appUrl}/legal/cookies`,
  },
} as const;
