import { tutorialBySlug, tutorials } from "@/content/tutorials";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Kahya eğitim videosu";

export function generateStaticParams() {
  return tutorials.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tutorialBySlug(slug);
  return ogImage({ kicker: `Eğitim · Bölüm ${t?.no ?? ""}`, title: t?.title ?? "Kahya eğitim videoları" });
}
