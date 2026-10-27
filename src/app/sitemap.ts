import type { MetadataRoute } from "next";

import { features } from "@/content/features";
import { sectors } from "@/content/sectors";
import { solutions } from "@/content/solutions";
import { tutorials } from "@/content/tutorials";
import { absoluteUrl } from "@/lib/seo";

// Bump when content changes meaningfully; a fixed date keeps the build static.
const updated = new Date("2026-10-27");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, extra: Partial<MetadataRoute.Sitemap[number]> = {}) => ({
    url: absoluteUrl(path),
    lastModified: updated,
    priority,
    ...extra,
  });
  return [
    page("/", 1),
    page("/ozellikler", 0.9),
    ...features.map((f) => page(`/ozellikler/${f.slug}`, 0.8, { images: [absoluteUrl(f.screen.src)] })),
    page("/cozumler", 0.9),
    ...solutions.map((s) => page(`/cozumler/${s.slug}`, 0.9)),
    page("/sektorler", 0.7),
    ...sectors.map((s) => page(`/sektorler/${s.slug}`, 0.7)),
    page("/tanitim-filmi", 0.6, {
      videos: [
        {
          title: "Kahya tanıtım filmi",
          thumbnail_loc: absoluteUrl("/media/film/kahya-tanitim.webp"),
          description: "Kahya’nın bir ofis gününde nasıl kullanıldığını anlatan tanıtım filmi.",
          content_loc: absoluteUrl("/media/film/kahya-tanitim.mp4"),
          duration: 131,
        },
      ],
    }),
    page("/egitim", 0.7),
    ...tutorials.map((t) =>
      page(`/egitim/${t.slug}`, 0.6, {
        videos: [
          {
            title: `Kahya eğitimi: ${t.title}`,
            thumbnail_loc: absoluteUrl(`/media/egitim/${t.file}.webp`),
            description: t.lessons.map((l) => l.title).join(", "),
            content_loc: absoluteUrl(`/media/egitim/${t.file}.mp4`),
            duration: t.seconds,
          },
        ],
      }),
    ),
    page("/sss", 0.6),
    page("/iletisim", 0.4),
  ];
}
