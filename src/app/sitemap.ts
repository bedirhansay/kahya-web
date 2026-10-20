import type { MetadataRoute } from "next";

import { features } from "@/content/features";
import { tutorials } from "@/content/tutorials";
import { absoluteUrl } from "@/lib/seo";

// Bump when content changes meaningfully; a fixed date keeps the build static.
const updated = new Date("2026-10-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, extra: Partial<MetadataRoute.Sitemap[number]> = {}) => ({
    url: absoluteUrl(path),
    lastModified: updated,
    priority,
    ...extra,
  });
  return [
    page("/", 1, {
      images: ["home", "mail", "cari", "project", "ai", "brief"].map((n) => absoluteUrl(`/screens/${n}.webp`)),
    }),
    page("/ozellikler", 0.9),
    ...features.map((f) => page(`/ozellikler/${f.slug}`, 0.8, { images: [absoluteUrl(f.screen.src)] })),
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
