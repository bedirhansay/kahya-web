import type { Metadata } from "next";
import type { BreadcrumbList, FAQPage, Organization, SoftwareApplication, VideoObject, WebSite, WithContext } from "schema-dts";

import { plans, site } from "@/lib/site";

export const SITE_URL = site.url.replace(/\/$/, "");

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/** Per-page metadata: canonical, Open Graph and Twitter card in one place. */
export function pageMetadata({
  path,
  title,
  description,
  image,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  /** Absolute or root-relative image; defaults to the campaign OG image. */
  image?: { url: string; width: number; height: number; alt?: string };
  type?: "website" | "article" | "video.other";
}): Metadata {
  const og = image ?? { url: "/og/kahya-og.jpg", width: 1200, height: 630, alt: site.fullName };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: type === "video.other" ? "video.other" : type,
      locale: "tr_TR",
      siteName: site.fullName,
      images: [{ ...og, alt: og.alt ?? title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og.url] },
  };
}

const orgId = `${SITE_URL}/#organization`;

export function organizationLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.company,
    url: site.companyUrl,
    email: site.email,
    logo: absoluteUrl("/icon-512.png"),
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "TR" },
  };
}

export function websiteLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: site.fullName,
    url: SITE_URL,
    inLanguage: "tr-TR",
    publisher: { "@id": orgId },
  };
}

export function softwareLd(): WithContext<SoftwareApplication> {
  const priced = plans.filter((p) => p.monthly !== null);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: site.fullName,
    alternateName: "Kahya",
    url: SITE_URL,
    description: site.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Ofis yönetim yazılımı",
    operatingSystem: "Web, iOS, Android (tarayıcı)",
    inLanguage: "tr-TR",
    image: absoluteUrl("/og/kahya-og.jpg"),
    screenshot: absoluteUrl("/screens/home.webp"),
    publisher: { "@id": orgId },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "TRY",
      lowPrice: Math.min(...priced.map((p) => p.monthly!)),
      highPrice: Math.max(...priced.map((p) => p.monthly!)),
      offerCount: priced.length,
      offers: priced.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.monthly!,
        priceCurrency: "TRY",
        url: absoluteUrl(`/fiyatlar#${p.slug}`),
      })),
    },
  };
}

export function faqLd(items: { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Ana sayfa", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function videoLd(v: {
  name: string;
  description: string;
  seconds: number;
  contentUrl: string;
  thumbnailUrl: string;
  pagePath: string;
  transcript?: string;
}): WithContext<VideoObject> {
  const m = Math.floor(v.seconds / 60);
  const s = v.seconds % 60;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    duration: `PT${m ? `${m}M` : ""}${s}S`,
    contentUrl: absoluteUrl(v.contentUrl),
    thumbnailUrl: absoluteUrl(v.thumbnailUrl),
    embedUrl: absoluteUrl(v.pagePath),
    uploadDate: "2026-10-19",
    inLanguage: "tr-TR",
    publisher: { "@id": orgId },
    ...(v.transcript ? { transcript: v.transcript } : {}),
  };
}
