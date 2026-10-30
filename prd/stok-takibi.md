# Stok takibi — PRD (kahya-web tanıtım sitesi, bağlı)

## 0. Künye
| Alan | Değer |
|---|---|
| Durum | Taslak — web + admin prod'da ve fiyat onaylanınca |
| Sürüm | 1.0 · 2026-10-21 · hazırlayan / uygulayan bedirhansay-84 · sahip Bedirhan Say |
| Ana PRD | `../../bihesap-kahya-app/api/prd/stok-takibi.md` |

## 1–9. Ürün bölümleri
Ana PRD. Sitede: "Stok takibi" eklentisi (fiyat KDV hariç, yıllık), Kurumsal'da dahil; özellik sayfası.

## 10. Etki tablosu
| ETK | Dosya | Değişiklik |
|---|---|---|
| ETK-S01 | `src/lib/site.ts` (`addons`) | "Stok takibi" eklentisi (fiyat onaydan sonra) |
| ETK-S02 | `src/app/fiyatlar/page.tsx` (`matrix`) | "Stok takibi" satırı: Başlangıç / Ekip / Büyüyen "Eklenti", Kurumsal ✓ |
| ETK-S03 | `src/content/faq.ts` (`pricingFaq`) | stok sorusu |
| ETK-S04 | `src/content/features.ts` + `/ozellikler/[slug]` | `stok-takibi` özelliği; gerçek ekran görüntüleri (`npm run media`), uydurma bilgi yok |
| ETK-S05 | `src/app/sitemap.ts`, `llms.txt` | kendiliğinden (features / addons listelerinden) — doğrulanır |
| ETK-S06 | `olmazsa-olmazlar` uyumu | metinlerde kasa / banka / fatura vaadi yok |

## 13. Arayüz
Mevcut tasarım dili; 375 / 768 / 1280 / 1440 px, yatay kayma yok.

## 19. Yayın
`npm run build` temiz → main → otomatik deploy (Coolify app 52; elle tetikleme yok) → `/fiyatlar` ve özellik sayfası canlıda.
