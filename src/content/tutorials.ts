import films from "./generated/films.json";
import data from "./generated/tutorials.json";

export type Tutorial = (typeof data)[number];

export const tutorials: Tutorial[] = data;
export const tutorialBySlug = (slug: string) => tutorials.find((t) => t.slug === slug);

export const filmTranscripts = films;

export const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export const tutorialDescription = (t: Tutorial) =>
  `Kahya eğitim videosu: ${t.lessons.map((l) => l.title.toLocaleLowerCase("tr")).join(", ")}. Adım adım, ${clock(t.seconds)} dakika.`;

export const anchor = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/â/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
