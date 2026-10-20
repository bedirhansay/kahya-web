# Kahya web sitesi

Kahya by biHesap'ın tanıtım sitesi. Next.js 16 (App Router, Cache Components), Tailwind CSS 4, TypeScript.
Tüm sayfalar derleme anında statik üretilir.

## Çalıştırma

```bash
nvm use            # Node >= 22.13
pnpm install
pnpm dev           # http://localhost:3000
pnpm build && pnpm start
```

`NEXT_PUBLIC_SITE_URL` canonical adresleri, sitemap'i ve paylaşım kartlarını belirler; her ortamda ayarlayın (`.env.example`).

## İçerik nereden geliyor

| Ne | Kaynak | Güncelleme |
|---|---|---|
| Videolar, ekran görüntüleri, logolar | `../../bihesap-kahya-app/promo-video/out`, `promo-video/public/ui3`, `web/public/brand` | `pnpm media` (yalnız eksikleri üretir; `--force` hepsini) |
| Eğitim bölümleri ve adımları, film metinleri | `promo-video/out/07-ogrenim/BENIOKU.md`, film `.srt` dosyaları | `pnpm content` → `src/content/generated/*.json` |
| Özellik sayfaları | `src/content/features.ts` | elle; yalnız uygulamada olan özellikler |
| Planlar ve fiyatlar | `src/lib/site.ts` | API plan seed'i (`api/src/modules/system/seeder/plan-seed.service.ts`) ile birlikte |

Kaynak klasör farklıysa: `KAHYA_SRC=/yol/bihesap-kahya-app pnpm media`.

Marka adı sitede her yerde **Kahya** (şapkasız) yazılır; betikler altyazı ve metinlerdeki "Kâhya"yı dönüştürür.

## SEO

- Sayfa başına canonical, Open Graph ve Twitter kartı (`src/lib/seo.ts` → `pageMetadata`)
- JSON-LD (`schema-dts` ile tipli): Organization, WebSite, SoftwareApplication + fiyat teklifleri, FAQPage, BreadcrumbList, VideoObject (metinle), ItemList
- `sitemap.xml` (görsel ve video uzantılarıyla), `robots.txt`, `manifest.webmanifest`, `llms.txt`
- Özellik ve eğitim sayfalarına `next/og` ile üretilen paylaşım görselleri
- Denetim: `npx lighthouse@12 <url> --only-categories=seo,accessibility,performance,best-practices`
