import { featureBySlug, features } from "@/content/features";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Kahya özelliği";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = featureBySlug(slug);
  return ogImage({ kicker: f?.name ?? "Kahya", title: f?.title ?? "Ofisinizin bütün parçaları, bir arada." });
}
