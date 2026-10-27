import { features } from "@/content/features";
import { tutorials } from "@/content/tutorials";
import { absoluteUrl } from "@/lib/seo";
import { extras, notIncluded, services, solutions } from "@/content/solutions";
import { site } from "@/lib/site";

// A plain-text summary for AI search assistants (llmstxt.org).
export function GET() {
  const lines = [
    `# ${site.fullName}`,
    "",
    `> ${site.description}`,
    "",
    "Kahya bir ofis yönetim yazılımıdır, muhasebe programı değildir. Finans tarafı cari bakiye takibidir. Fatura, kasa ve banka hesabı yoktur. Tarayıcıda çalışır, telefonda ana ekrana eklenebilir. Verileri Türkiye’de tutulur.",
    "",
    "## Özellikler",
    ...features.map((f) => `- [${f.name}](${absoluteUrl(`/ozellikler/${f.slug}`)}): ${f.metaDescription}`),
    "",
    "## Çözümler",
    ...solutions.map((x) => `- ${x.name}: ${x.points.join(", ")}`),
    "",
    "## Ek hizmetler",
    ...extras.map((x) => `- ${x.name}: ${x.body}`),
    "",
    "## Hizmetler",
    ...services.map((x) => `- ${x.name}: ${x.body}`),
    "",
    "## Kahya’da olmayanlar",
    ...notIncluded.map((x) => `- ${x}`),
    "",
    `Fiyat sitede yayınlanmaz. Seçilen çözüme göre teklif verilir: ${site.email}. Ayrıntılar: ${absoluteUrl("/cozumler")}`,
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
