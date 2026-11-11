# Kasa ve banka — PRD (kahya-web tanıtım sitesi, bağlı)

## 0. Künye
| Alan | Değer |
|---|---|
| Durum | Taslak, dal `kb-site-rehber`. main'e yalnız ek hizmet katalogda "Satışta" olunca ve sahip "yayınla" deyince girer (web PRD S8). |
| Sürüm | 1.0 · 2026-11-11 · hazırlayan reklamcı · sahip Bedirhan Say |
| Ana PRD | `../../bihesap-kahya-app/api/prd/kasa-banka.md`; bağlı `../../bihesap-kahya-app/web/prd/kasa-banka.md` |

## 1–9. Ürün bölümleri
Ana PRD. Sitede fiyat yok. Ek hizmet hiçbir pakete dahil değil, denemede kapalı (api `plan-seed.service.ts`, "never in a plan").

## 10. Etki tablosu
| ETK | Dosya | Değişiklik |
|---|---|---|
| ETK-S01 | `src/content/guides.ts` | Rehber › "Kasa ve banka takibi nasıl yapılır?" (sitemap ve llms.txt listeden kendiliğinden) |
| ETK-S02 | `src/content/solutions.ts` (`extras`) | "Kasa ve banka" ek hizmet satırı; Çözümler, ana sayfa, menü ve llms.txt aynı listeden |
| ETK-S03 | `src/content/solutions.ts` (finans SSS), `src/app/llms.txt/route.ts` | "Finans cari bakiye takibidir" cümlelerine ek hizmet notu; "bankaya bağlanmaz" aynen kalır |
| ETK-S04 | `src/content/plans.ts`, `src/components/PlanTable.tsx`, `llms.txt` | Paket tablosunda "Kasa ve banka" satırı, beş pakette de "Ek hizmet"; satır adı Rehber sayfasına bağlanır (`href`). Ücretsiz paket de alabilir: API ek hizmet satışında paket kısıtı yok, tek kural "modülü zaten olan firmaya satılmaz" (`tenant-addons.service.ts`, maestro 2026-11-11). |

## 11. Doğrulama (2026-11-11)
Yerel :5231, firma modul-denetim (modül açık), web develop aadef25aa:
- Doğrulandı ve sitede: kasa / banka / kredi kartı hesapları (sitede bakiyeleriyle, "tek liste" denmeden); "ad yeter, diğer bilgiler isteğe bağlıdır"; banka, şube, IBAN, hesap no, son 4 hane, limit, hesap kesim ve son ödeme günü; TRY / USD / EUR; açılış bakiyesi ve tarihi, kartta "Açılıştaki kart borcu"; bakiye ve kartta "Kart borcu"; kartta kullanılabilir limit ve "Son ödeme her ayın N'i"; Pasife al / Aktif yap.
- **Canlı değil, sitede yok:** virman ve hareket formlarındaki Hesap alanı. Bileşenler develop'ta var ama bağlı değil (35859e737, 982547c81: "not mounted until the API takes treasuryAccountId (KB-BE-017)"). Bağlanınca Rehber'in "Kahya'da kasa ve banka" bölümüne eklenecek cümleler:
  - "Tahsilat ve ödeme formunda tek bir Hesap alanı vardır: para hangi kasaya, bankaya ya da karta girdi, onu seçersiniz. Yeni kayıtta varsayılan giriş ve çıkış hesabı dolu gelir."
  - "Kasadan bankaya yatırılan parayı virmanla aktarırsınız; iki hesabın bakiyesi birlikte değişir, gelir ya da gider yazılmaz."
  - Ek hizmet satırına: "virman, tahsilat ve ödemede hesap seçimi".
- **Ekran düzeni değişiyor (KB-FE-026, sahip 2026-11-11):** kasa, banka ve kart ayrı sekmelerde (Kasalar / Banka hesapları / Kredi kartları), kart ızgarası. Bu yüzden sitede "tek liste" ve "listenin üstünde toplamlar" yazılmadı; yayın günü yeni ekranda metin yeniden okunur.
- Sonraki sürümler (sitede "sonraki sürümlerde" diye geçer): ekstre yükleme, çek ve senet.

## 13. Arayüz
Mevcut Rehber ve ek hizmet kalıbı; yeni bileşen yok.

## 19. Yayın
Satışa açılış günü: Hesap alanı ve virman canlıda yeniden doğrulanır, §11 cümleleri eklenir, lint + typecheck + build, maestro main'e alır (Coolify app 52).
