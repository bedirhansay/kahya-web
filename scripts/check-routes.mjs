// Keeps src/content/legacy-routes.json in step with the content: every English slug the map points at is a
// page, every page has its Turkish address in the map, and no source file links a Turkish address any more.
// Runs in `pnpm lint`.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import legacyRoutes from "../src/content/legacy-routes.json" with { type: "json" };

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const slugsIn = (...files) =>
  files.flatMap((f) =>
    [...read(f).matchAll(/^ {4}slug: "([^"]+)"/gm)].map((m) => m[1]),
  );
const pages = {
  solutions: slugsIn("src/content/solutions.ts", "src/content/addons.ts"),
  features: slugsIn("src/content/features.ts"),
  sectors: slugsIn("src/content/sectors.ts"),
  guides: slugsIn("src/content/guides.ts"),
  training: JSON.parse(read("src/content/generated/tutorials.json")).map(
    (t) => t.slug,
  ),
};
const errors = [];
for (const [section, slugs] of Object.entries(pages)) {
  const mapped = Object.values(legacyRoutes.slugs[section] ?? {});
  for (const s of slugs)
    if (!mapped.includes(s))
      errors.push(
        `${section}/${s}: page has no Turkish address in legacy-routes.json`,
      );
  for (const s of mapped)
    if (!slugs.includes(s))
      errors.push(
        `${section}/${s}: legacy-routes.json points at a page that does not exist`,
      );
  if (!slugs.length) errors.push(`${section}: no pages read`);
}
const old = new RegExp(
  `(?<![\\w/.-])/(${Object.keys(legacyRoutes.sections).join("|")}|api/iletisim)(?=[/"'\`#?\\s)\\]]|$)`,
);
const walk = (dir) =>
  readdirSync(join(root, dir)).flatMap((n) => {
    const p = join(dir, n);
    return statSync(join(root, p)).isDirectory() ? walk(p) : [p];
  });
for (const file of [...walk("src"), "next.config.ts"].filter((f) =>
  /\.(ts|tsx|mjs|css)$/.test(f),
)) {
  read(file)
    .split("\n")
    .forEach((line, i) => {
      if (file === "next.config.ts" && line.includes("moved(")) return;
      if (old.test(line))
        errors.push(
          `${file}:${i + 1}: Turkish address: ${line.trim().slice(0, 100)}`,
        );
    });
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `routes ok: ${Object.values(pages).flat().length} pages mapped, no Turkish address in the source`,
);
