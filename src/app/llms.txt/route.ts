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
    "Kahya bir ofis yönetim yazılımıdır, muhasebe programı değildir. Finans tarafı cari bakiye takibidir; Kasa ve banka ek hizmetiyle kasa, banka hesabı ve kredi kartı bakiyeleri de tutulur. Fatura kesmez ve bankaya bağlanmaz. Tarayıcıda çalışır, telefonda ana ekrana eklenebilir.",
    "",
    "## Özellikler",
    ...features.map((f) => `- [${f.name}](${absoluteUrl(`/ozellikler/${f.slug}`)}): ${f.metaDescription}`),
    "",
    "## Çözümler",
    ...solutions.map((x) => `- [${x.name}${x.subtitle ? ` (${x.subtitle})` : ""}](${absoluteUrl(`/cozumler/${x.slug}`)}): ${x.summary}`),
    "",
    "## Ek hizmetler",
    ...extras.map((x) => (x.href ? `- [${x.name}](${absoluteUrl(x.href)}): ${x.body}` : `- ${x.name}: ${x.body}`)),
    "",
    "## Destek",
    supportAnswer,
    "",
    "## Sektörler",
    ...sectors.map((x) => `- [${x.name}](${absoluteUrl(`/sektorler/${x.slug}`)})`),
    "",
    "## Hizmetler",
    ...services.map((x) => `- ${x.name}: ${x.body}`),
    "",
    "## Kahya’da olmayanlar",
    ...notIncluded.map((x) => `- ${x}`),
    "",
    `Rakamlar sitede yayınlanmaz. Fiyat kullanıcı sayısına (paket: Ücretsiz, Başlangıç, Ekip, Büyüyen ve Kurumsal) ve ek hizmetlere göre verilir: ${site.email}. Kayıt olan firma 30 gün Kurumsal paketi dener, sonra Ücretsiz pakete geçer. Ayrıntılar: ${absoluteUrl("/fiyatlar")}`,
    "",
    "## Paketler",
    `Paketler: ${planNames.join(", ")}. Kullanıcı: ${planRows[0].cells.join(" / ")}. Dosya alanı: ${planRows[1].cells.join(" / ")}. Ücretsiz pakette 1 şube, 50 cari (müşteri ve tedarikçi) ve 3 personel; ücretli paketlerde sınırsız. Stok Ekip ve üstünde dahil, Başlangıç'ta ek hizmet. Teklif Kurumsal'da dahil, diğer ücretli paketlerde ek hizmet. Filo ve E-posta her ücretli pakette ek hizmettir. Kasa ve banka ile Abonelikler hiçbir pakete dahil değildir; talep üzerine ek hizmet olarak açılır, açık değilken menüde görünmez. Karşılaştırma: ${absoluteUrl("/fiyatlar")}`,
    "",
    "## Rehberler",
    ...guides.map((g) => `- [${g.title}](${absoluteUrl(`/rehber/${g.slug}`)}): ${g.answer}`),
    "",
    "## Eğitim",
    ...tutorials.map((t) => `- [${t.title}](${absoluteUrl(`/egitim/${t.slug}`)})`),
    "",
    "## Bağlantılar",
    `- Uygulama: ${site.app.url}`,
    `- Kayıt: ${site.app.register}`,
    `- Sık sorulanlar: ${absoluteUrl("/sss")}`,
    `- İletişim: ${site.email}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
