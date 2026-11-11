/**
 * The packages side by side, without prices (prices are quoted on request). From the live plan catalogue
 * (plans + plan_features + addons, 2026-11-07, via kahya-backend); change it only when the catalogue changes.
 */
export const planNames = ["Ücretsiz", "Başlangıç", "Ekip", "Büyüyen", "Kurumsal"] as const;

/** A cell: true = included, false = not available, "ek" = an add-on, or a short text. */
export type PlanCell = boolean | "ek" | string;

export const planRows: { label: string; hint?: string; href?: string; cells: [PlanCell, PlanCell, PlanCell, PlanCell, PlanCell] }[] = [
  { label: "Kullanıcı", cells: ["1", "3", "10", "25", "Sınırsız"] },
  { label: "Dosya alanı", cells: ["200 MB", "3 GB", "5 GB", "20 GB", "100 GB"] },
  {
    label: "Şube / cari / personel",
    hint: "Cari: müşteri ve tedarikçi",
    cells: ["1 / 50 / 3", "Sınırsız", "Sınırsız", "Sınırsız", "Sınırsız"],
  },
  { label: "Görev, takvim, proje, toplantı", cells: [true, true, true, true, true] },
  { label: "Talepler, onaylar, duyurular", cells: [true, true, true, true, true] },
  { label: "Müşteri görüşmeleri (CRM)", cells: [false, true, true, true, true] },
  { label: "Personel, izin ve puantaj", cells: [false, true, true, true, true] },
  { label: "Ödeme planları ve vadeler", cells: [false, true, true, true, true] },
  { label: "Dokümanlar, sözleşmeler, demirbaş", cells: [false, true, true, true, true] },
  { label: "Excel ve PDF'e aktarma", cells: [false, true, true, true, true] },
  { label: "Gelişmiş raporlar", cells: [false, true, true, true, true] },
  { label: "Mali müşavir paketi", hint: "Ayın kayıtları tek dosyada", cells: [false, true, true, true, true] },
  { label: "Stok", cells: [false, "ek", true, true, true] },
  { label: "Teklif", cells: [false, "ek", "ek", "ek", true] },
  { label: "Filo", cells: [false, "ek", "ek", "ek", "ek"] },
  { label: "E-posta", hint: "Kendi e-posta kutunuz", cells: [false, "ek", "ek", "ek", "ek"] },
  {
    label: "Kasa ve banka",
    hint: "Kasa, banka hesabı ve kredi kartı",
    href: "/rehber/kasa-ve-banka-takibi-nasil-yapilir",
    cells: ["ek", "ek", "ek", "ek", "ek"],
  },
  { label: "Öncelikli destek", cells: [false, false, false, false, true] },
];
