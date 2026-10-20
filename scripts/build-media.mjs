// Builds web-ready media in public/ from the promo-video deliverables and the
// app's brand folder. Re-run after a new render:  pnpm media [--force]
// Source root defaults to the sibling Kahya project; override with KAHYA_SRC.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = process.env.KAHYA_SRC ?? resolve(root, "../../bihesap-kahya-app");
const out = (...p) => join(root, "public", ...p);
const promo = (...p) => join(src, "promo-video", ...p);
const force = process.argv.includes("--force");

function fresh(target) {
  mkdirSync(dirname(target), { recursive: true });
  return force || !existsSync(target);
}

function ffmpeg(args, target) {
  if (!fresh(target)) return;
  console.log("→", target.replace(root + "/", ""));
  execFileSync("ffmpeg", ["-v", "error", "-y", ...args, target], { stdio: "inherit" });
}

const h264 = (crf, extra = []) => [
  "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-pix_fmt", "yuv420p",
  "-movflags", "+faststart", ...extra,
];

async function still(input, target, width, quality = 80) {
  if (!fresh(target)) return;
  console.log("→", target.replace(root + "/", ""));
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(target);
}

async function frame(video, at, target, width = 1280) {
  if (!fresh(target)) return;
  const tmp = target + ".png";
  execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", String(at), "-i", video, "-frames:v", "1", tmp]);
  await still(tmp, target, width, 78);
  execFileSync("rm", [tmp]);
}

function vtt(srt, target) {
  if (!fresh(target)) return;
  const body = readFileSync(srt, "utf8").replace(/\r/g, "").replace(/Kâhya/g, "Kahya").replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2");
  writeFileSync(target, "WEBVTT\n\n" + body.trim() + "\n");
}

// Brand
for (const f of ["kahya-mark.svg", "kahya-mark-light.svg", "kahya-lockup.svg", "kahya-lockup-light.svg", "kahya-app-icon.svg"]) {
  const t = out("brand", f);
  if (fresh(t)) copyFileSync(join(src, "web/public/brand", f), t);
}
await still(join(src, "web/public/brand/kahya-app-icon-1024.png"), out("brand", "kahya-app-icon-512.png").replace(".png", ".webp"), 512);
for (const [size, name] of [[180, "apple-touch-icon.png"], [192, "icon-192.png"], [512, "icon-512.png"]]) {
  const t = out(name);
  if (fresh(t)) await sharp(join(src, "web/public/brand/kahya-app-icon-1024.png")).resize(size).png().toFile(t);
}

// Hero loop
const hero = promo("out/06-web-hero");
ffmpeg(["-i", join(hero, "kahya-hero.mp4"), "-an", ...h264(26)], out("media/hero/kahya-hero.mp4"));
ffmpeg(["-i", join(hero, "kahya-hero.mp4"), "-an", "-vf", "scale=960:-2", ...h264(27)], out("media/hero/kahya-hero-960.mp4"));
if (fresh(out("media/hero/kahya-hero.webm"))) copyFileSync(join(hero, "kahya-hero.webm"), out("media/hero/kahya-hero.webm"));
await still(join(hero, "kahya-hero-static.png"), out("media/hero/kahya-hero.webp"), 1920, 78);
await still(join(hero, "kahya-og-1200x630.jpg"), out("og/kahya-og.jpg").replace(".jpg", ".webp"), 1200);
if (fresh(out("og/kahya-og.jpg"))) copyFileSync(join(hero, "kahya-og-1200x630.jpg"), out("og/kahya-og.jpg"));

// Films (with voice-over and subtitles)
for (const [dir, name, slug] of [["01-ana-film", "Kahya-tanitim", "kahya-tanitim"], ["02-reklam", "Kahya-reklam", "kahya-reklam"]]) {
  const d = promo("out", dir);
  ffmpeg(["-i", join(d, `${name}.mp4`), ...h264(25, ["-c:a", "aac", "-b:a", "128k"])], out("media/film", `${slug}.mp4`));
  vtt(join(d, `${name}.srt`), out("media/film", `${slug}.vtt`));
  await still(join(d, `${name}-kapak.jpg`), out("media/film", `${slug}.webp`), 1280, 80);
}
{
  const d = promo("out/03-sosyal-dikey");
  ffmpeg(["-i", join(d, "Kahya-reklam-dikey.mp4"), "-vf", "scale=720:-2", ...h264(26, ["-c:a", "aac", "-b:a", "128k"])], out("media/film/kahya-reklam-dikey.mp4"));
  vtt(join(d, "Kahya-reklam-dikey.srt"), out("media/film/kahya-reklam-dikey.vtt"));
  await still(join(d, "Kahya-reklam-dikey-kapak.jpg"), out("media/film/kahya-reklam-dikey.webp"), 720, 80);
}

// Feature teasers (no voice-over)
const teasers = promo("out/04-teaser");
for (const f of readdirSync(teasers).filter((f) => f.endsWith(".mp4"))) {
  const slug = f.replace("Kahya-teaser-", "").replace(".mp4", "");
  ffmpeg(["-i", join(teasers, f), "-an", "-vf", "scale=1280:-2", ...h264(26)], out("media/teaser", `${slug}.mp4`));
  await still(join(teasers, f.replace(".mp4", "-kapak.jpg")), out("media/teaser", `${slug}.webp`), 1280, 78);
}

// Tutorials: screen recordings, so still-image tuning keeps UI text sharp
const tutorials = promo("out/07-ogrenim");
for (const f of readdirSync(tutorials).filter((f) => f.endsWith(".mp4"))) {
  const slug = f.replace(".mp4", "");
  const input = join(tutorials, f);
  ffmpeg(["-i", input, "-r", "15", ...h264(30, ["-tune", "stillimage", "-c:a", "aac", "-b:a", "64k", "-ac", "1"])], out("media/egitim", `${slug}.mp4`));
  const duration = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", input]).toString());
  await frame(input, Math.round(duration * 0.3), out("media/egitim", `${slug}.webp`));
}

// App screenshots (desktop 2880×1800, phone 1170×2532)
const ui = promo("public/ui3");
for (const f of readdirSync(ui).filter((f) => f.endsWith(".png"))) {
  const phone = f.includes("phone");
  await still(join(ui, f), out("screens", f.replace(".png", ".webp")), phone ? 780 : 2000, 84);
}
const store = promo("out/10-magaza-gorselleri/tr/light/iphone-6.9");
for (const f of readdirSync(store).filter((f) => f.endsWith(".png"))) {
  await still(join(store, f), out("screens/mobil", f.replace(".png", ".webp")), 660, 82);
}


// Stills cropped from tutorial recordings: the app window sits at a fixed
// 1440×898 area of each 1920×1080 frame (below the window's title bar).
for (const [file, at, name] of [["11-talepler.mp4", 45, "talepler"]]) {
  const target = out("screens", `${name}.webp`);
  if (!fresh(target)) continue;
  const tmp = target + ".png";
  execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", String(at), "-i", join(tutorials, file), "-frames:v", "1", "-vf", "crop=1440:898:448:108", tmp]);
  await still(tmp, target, 1440, 86);
  execFileSync("rm", [tmp]);
}
console.log("media ok");
