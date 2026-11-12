import films from "./generated/films.json";
import data from "./generated/tutorials.json";

export type Tutorial = (typeof data)[number];

export const tutorials: Tutorial[] = data;
export const tutorialBySlug = (slug: string) => tutorials.find((t) => t.slug === slug);

export const filmTranscripts = films;

export const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

/** The lessons that fit a search snippet (155 characters), in order. */
export const tutorialDescription = (t: Tutorial) => {
  const tail = `. Adım adım, ${clock(t.seconds)} dakika.`;
  let list = "";
  for (const l of t.lessons) {
    const next = `${list ? `${list}, ` : ""}${l.title.toLocaleLowerCase("tr")}`;
    if (`Kahya eğitim videosu: ${next}${tail}`.length > 155) break;
    list = next;
  }
  return `Kahya eğitim videosu: ${list}${tail}`;
};

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
