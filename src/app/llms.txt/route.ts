import { supportAnswer } from "@/content/faq";
import { features } from "@/content/features";
import { guides } from "@/content/guides";
import { planNames, planRows } from "@/content/plans";
import { tutorials } from "@/content/tutorials";
import { absoluteUrl } from "@/lib/seo";
import { sectors } from "@/content/sectors";
import { extras, notIncluded, services, solutions } from "@/content/solutions";
import { site } from "@/lib/site";

// A plain-text summary for AI search assistants (llmstxt.org).
export function GET() {
  const lines = [
    `# ${site.fullName}`,
    "",
    `> ${site.description}`,
    "",
    "Kahya bir ofis yönetim yazılımıdır, muhasebe programı değildir. Finans tarafı cari bakiye takibidir. Kasa, banka hesabı ve kredi kartı bakiyeleri Kasa ve banka ek hizmetiyle tutulur. Fatura kesmez ve bankaya canlı bağlanmaz. Tarayıcıda çalışır, telefonda ana ekrana eklenebilir.",
    "",
    "## Özellikler",
    ...features.map((f) => `- [${f.name}](${absoluteUrl(`/features/${f.slug}`)}): ${f.metaDescription}`),
    "",
    "## Çözümler",
    ...solutions.map((x) => `- [${x.name}${x.subtitle ? ` (${x.subtitle})` : ""}](${absoluteUrl(`/solutions/${x.slug}`)}): ${x.summary}`),
    "",
    "## Ek hizmetler",
    ...extras.map((x) => (x.href ? `- [${x.name}](${absoluteUrl(x.href)}): ${x.body} ${x.plan}` : `- ${x.name}: ${x.body} ${x.plan}`)),
    "",
    "## Firma",
    `${site.fullName}: ${site.company} tarafından ${site.city}'da geliştirilir; destek taleplerine de aynı ekip bakar. İletişim: ${site.email}.`,
    `Fiyat talebi: ${absoluteUrl("/contact")} adresindeki formla ya da e-postayla; bir iş günü içinde e-postayla dönülür.`,
    "",
    "## Destek",
    supportAnswer,
    "",
    "## Sektörler",
    ...sectors.map((x) => `- [${x.name}](${absoluteUrl(`/sectors/${x.slug}`)})`),
    "",
    "## Hizmetler",
    ...services.map((x) => `- ${x.name}: ${x.body}`),
    "",
    "## Kahya’da olmayanlar",
    ...notIncluded.map((x) => `- ${x}`),
    "",
    `Rakamlar sitede yayınlanmaz. Fiyat kullanıcı sayısına (paket: Ücretsiz, Başlangıç, Ekip, Büyüyen ve Kurumsal) ve ek hizmetlere göre verilir: ${site.email}. Kayıt olan firma 30 gün Kurumsal paketi dener, sonra Ücretsiz pakete geçer. Ayrıntılar: ${absoluteUrl("/pricing")}`,
    "",
    "## Paketler",
    `Paketler: ${planNames.join(", ")}. Kullanıcı: ${planRows[0].cells.join(" / ")}. Dosya alanı: ${planRows[1].cells.join(" / ")}. Ücretsiz pakette 1 şube, 50 cari (müşteri ve tedarikçi) ve 3 personel; ücretli paketlerde sınırsız. Stok Ekip ve üstünde dahil, Başlangıç'ta ek hizmet. Teklif Kurumsal'da dahil, diğer ücretli paketlerde ek hizmet. Filo ve E-posta her ücretli pakette ek hizmettir. Kasa ve banka hiçbir pakete dahil değil; Ücretsiz dahil her pakete ek hizmet olarak eklenir. Açık olmayan ek hizmet menüde görünmez. Karşılaştırma: ${absoluteUrl("/pricing")}`,
    "",
    "## Rehberler",
    ...guides.map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}`)}): ${g.answer}`),
    "",
    "## Eğitim",
    ...tutorials.map((t) => `- [${t.title}](${absoluteUrl(`/training/${t.slug}`)})`),
    "",
    "## Bağlantılar",
    `- Uygulama: ${site.app.url}`,
    `- Kayıt: ${site.app.register}`,
    `- Sık sorulanlar: ${absoluteUrl("/faq")}`,
    `- İletişim: ${site.email}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
