import type { MetadataRoute } from "next";

import { features } from "@/content/features";
import { guides } from "@/content/guides";
import { sectors } from "@/content/sectors";
import { addons } from "@/content/addons";
import { solutions } from "@/content/solutions";
import { tutorials } from "@/content/tutorials";
import { absoluteUrl } from "@/lib/seo";

// Bump when content changes meaningfully; a fixed date keeps the build static.
const updated = new Date("2026-11-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, extra: Partial<MetadataRoute.Sitemap[number]> = {}) => ({
    url: absoluteUrl(path),
    lastModified: updated,
    priority,
    ...extra,
  });
  return [
    page("/", 1),
    page("/features", 0.9),
    ...features.map((f) => page(`/features/${f.slug}`, 0.8, { images: [absoluteUrl(f.screen.src)] })),
    page("/solutions", 0.9),
    page("/pricing", 0.8),
    ...solutions.map((s) => page(`/solutions/${s.slug}`, 0.9)),
    ...addons.map((a) => page(`/solutions/${a.slug}`, 0.7)),
    page("/sectors", 0.7),
    ...sectors.map((s) => page(`/sectors/${s.slug}`, 0.7)),
    page("/film", 0.6, {
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
    page("/training", 0.7),
    ...tutorials.map((t) =>
      page(`/training/${t.slug}`, 0.6, {
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
    page("/guides", 0.6),
    ...guides.map((g) => page(`/guides/${g.slug}`, 0.6, { lastModified: new Date(g.updated) })),
    page("/faq", 0.6),
    page("/contact", 0.4),
  ];
}
