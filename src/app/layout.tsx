import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, SITE_URL, websiteLd } from "@/lib/seo";
import { site } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kahya | Ofis Yönetim Programı: Cari, Görev, Personel ve İzin Takibi",
    template: "%s | Kahya",
  },
  description: site.description,
  applicationName: site.fullName,
  authors: [{ name: site.company, url: site.companyUrl }],
  creator: site.company,
  publisher: site.company,
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    siteName: site.fullName,
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og/kahya-og.jpg", width: 1200, height: 630, alt: site.fullName }],
  },
  twitter: { card: "summary_large_image", images: ["/og/kahya-og.jpg"] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-video-preview": -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f9fbfa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
