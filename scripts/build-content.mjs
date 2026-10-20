// Turns the promo deliverables' text (tutorial README, film subtitles) into
// JSON the site renders: src/content/generated/*.json.  pnpm content
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = process.env.KAHYA_SRC ?? resolve(root, "../../bihesap-kahya-app");
const outDir = join(root, "src/content/generated");
mkdirSync(outDir, { recursive: true });
// Brand spelling on the web is "Kahya"; the circumflex only guides voice-over.
const brand = (s) => s.replace(/Kâhya/g, "Kahya");

const slugify = (s) =>
  s.toLocaleLowerCase("tr").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o")
    .replace(/ş/g, "s").replace(/ü/g, "u").replace(/â/g, "a").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Tutorials
const md = brand(readFileSync(join(src, "promo-video/out/07-ogrenim/BENIOKU.md"), "utf8"));
const table = new Map();
for (const m of md.matchAll(/^\| (\d\d) · (.+?) \| `(.+?)\.mp4` \| (\d+):(\d\d) \|/gm)) {
  table.set(m[1], { file: m[3], seconds: Number(m[4]) * 60 + Number(m[5]) });
}
const tutorials = [];
const sections = md.split(/^### /m).slice(1);
for (const section of sections) {
  const [head, ...rest] = section.split("\n");
  const hm = head.match(/^(\d\d) · (.+)$/);
  if (!hm) continue;
  const body = rest.join("\n").split(/^---$/m)[0];
  const lessons = [];
  for (const block of body.split(/^\*\*/m).slice(1)) {
    const [title, ...lines] = block.split("\n");
    const steps = lines.map((l) => l.match(/^\d+\. (.+)$/)?.[1]).filter(Boolean);
    lessons.push({ title: title.replace(/\*\*$/, "").trim(), steps });
  }
  const meta = table.get(hm[1]);
  tutorials.push({
    no: hm[1],
    slug: slugify(hm[2].replace(/:.*/, "")),
    title: hm[2],
    file: meta.file,
    seconds: meta.seconds,
    lessons,
  });
}
writeFileSync(join(outDir, "tutorials.json"), JSON.stringify(tutorials, null, 2) + "\n");

// Film transcripts
function transcript(path) {
  const cues = readFileSync(path, "utf8").replace(/\r/g, "").trim().split(/\n\n+/);
  return cues.map((cue) => {
    const lines = cue.split("\n");
    const start = lines[1].match(/^(\d\d):(\d\d):(\d\d)/);
    return {
      t: Number(start[1]) * 3600 + Number(start[2]) * 60 + Number(start[3]),
      text: brand(lines.slice(2).join(" ")),
    };
  });
}
writeFileSync(
  join(outDir, "films.json"),
  JSON.stringify(
    {
      tanitim: transcript(join(src, "promo-video/out/01-ana-film/Kahya-tanitim.srt")),
      reklam: transcript(join(src, "promo-video/out/02-reklam/Kahya-reklam.srt")),
    },
    null,
    2,
  ) + "\n",
);
console.log(`content ok: ${tutorials.length} tutorials`);
