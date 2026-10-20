import { features } from "@/content/features";
import { tutorials } from "@/content/tutorials";
import { absoluteUrl } from "@/lib/seo";
import { formatTry, plans, site } from "@/lib/site";

// A plain-text summary for AI search assistants (llmstxt.org).
export function GET() {
  const lines = [
    `# ${site.fullName}`,
    "",
    `> ${site.description}`,
    "",
    "Kahya bir ofis yönetim yazılımıdır; muhasebe programı değildir. Finans tarafı cari bakiye takibidir: fatura, kasa ve banka hesabı yoktur. Tarayıcıda çalışır, telefonda ana ekrana eklenebilir.",
    "",
    "## Özellikler",
    ...features.map((f) => `- [${f.name}](${absoluteUrl(`/ozellikler/${f.slug}`)}): ${f.metaDescription}`),
    "",
    "## Fiyatlar",
    ...plans.map(
      (p) =>
        `- ${p.name}: ${p.monthly === null ? "teklif üzerine" : p.monthly === 0 ? "ücretsiz" : `${formatTry(p.monthly)}/ay`}, ${p.users === null ? "sınırsız kullanıcı" : `${p.users} kullanıcı`}`,
    ),
    `- Ayrıntılar: ${absoluteUrl("/fiyatlar")}`,
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
