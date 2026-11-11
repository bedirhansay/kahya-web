# avoid-ai-design detector (vendored)

`detect.mjs` and `LICENSE` are copied unchanged from
[funboy322/avoid-ai-design](https://github.com/funboy322/avoid-ai-design) (MIT),
commit `2b7c71836b06cdf6b3d73265b56490c1b75ad5aa` (2026-09-24, detect v0.4.0).
It has no dependencies and only reads files.

- `pnpm lint` runs ESLint and then `detect.mjs src --min=P1`: any P0/P1 tell fails the lint (exit 2).
- `pnpm lint:design` lists every finding, P2 included.
- A deliberate exception gets `avoid-ai-design-ignore: <ID>` on the line or the line above, with the reason in the
  same comment. Current exceptions are in `src/app/globals.css` (SD2 dark-mode ground, K3 header blur, K2 device frame).
