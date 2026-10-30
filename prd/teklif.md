# Teklif — PRD (kahya-web, bağlı)

## 0. Künye
| Durum | Taslak · 1.0 · 2026-10-21 · uygulayan bedirhansay-84 · ana PRD `../../bihesap-kahya-app/api/prd/teklif.md` |
|---|---|

## 10. Etki tablosu
| ETK | Dosya | Değişiklik |
|---|---|---|
| ETK-S01 | `src/lib/site.ts` (`addons`) | "Teklif" ve "Ticari paket (Stok + Teklif)" (fiyat onayından sonra) |
| ETK-S02 | `src/app/fiyatlar/page.tsx` (`matrix`) | "Teklif" satırı (Kurumsal ✓, diğerleri Eklenti) |
| ETK-S03 | `src/content/faq.ts` | teklif / linkten kabul / antet soruları |
| ETK-S04 | `src/content/features.ts` + `/ozellikler/teklif` | gerçek ekran görüntüleri (liste, tasarımcı, herkese açık sayfa); uydurma bilgi yok |
| ETK-S05 | `olmazsa-olmazlar` | fatura / e-imza / kasa-banka vaadi yok |

## 13 / 19
375 / 768 / 1280 / 1440 px; build temiz → main → otomatik deploy.
