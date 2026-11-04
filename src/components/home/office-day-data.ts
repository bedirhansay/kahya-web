/** Sample data for the home's live window and Kahya AI answers. Every surface that shows it says "Örnek veri". */

export type IconKey = "in" | "ok" | "box" | "clock" | "warn";

export const icons: Record<IconKey, { bg: string; fg: string; d: string }> = {
  in: { bg: "rgb(143 207 189 / 0.14)", fg: "#8fcfbd", d: "M12 5v14M5 12l7 7 7-7" },
  ok: { bg: "rgb(227 178 97 / 0.14)", fg: "#e3b261", d: "M5 12l5 5 9-10" },
  box: { bg: "rgb(191 218 200 / 0.1)", fg: "#9db4ac", d: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" },
  clock: { bg: "rgb(143 207 189 / 0.14)", fg: "#8fcfbd", d: "M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z" },
  warn: { bg: "rgb(240 138 108 / 0.14)", fg: "#f08a6c", d: "M12 8v5M12 16v.5M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" },
};

export type DayEvent = { t: string; i: IconKey; txt: string; sub: string; a: string; cls?: "pos" | "gold" | "warn"; income?: true };

/** The office's day, oldest first. The window shows the newest on top. */
export const dayEvents: DayEvent[] = [
  { t: "09:12", i: "clock", txt: "Puantaj", sub: "Ahmet T. giriş yaptı, 08:58", a: "" },
  { t: "09:40", i: "in", txt: "Müşteriden tahsilat", sub: "Karadeniz Gıda San. ve Tic.", a: "+₺48.200", cls: "pos", income: true },
  { t: "10:05", i: "ok", txt: "Teklif kabul edildi", sub: "Ege Muhasebe Bürosu, satışa döndü", a: "₺7.500", cls: "gold" },
  { t: "10:31", i: "box", txt: "Stoktan düştü", sub: "Satışta seçilen ürün, ana depo", a: "" },
  { t: "11:15", i: "warn", txt: "Vadesi geçti", sub: "Akdeniz Yapı Malzemeleri, 50 gün", a: "₺29.000", cls: "warn" },
  { t: "11:48", i: "clock", txt: "İzin onaylandı", sub: "Murat K., Çarşamba ve Perşembe", a: "" },
];

export const INCOME_BEFORE = 521150;
export const INCOME_AFTER = 569350;

/** `p`: the sentence around one bold figure (before, figure, after). */
export type Answer = { q: string; p: [string, string, string]; src: string; ok: string; cls: "pos" | "gold" | "warn"; rows: [string, string, string][] };

export const answers: Answer[] = [
  {
    q: "Vadesi geçen müşterilerim kimler?",
    p: ["Vadesi geçen 2 müşteri var, toplam gecikme ", "₺36.000", "."],
    src: "Cari yaşlandırma",
    ok: "Seçilenlere link hazırla",
    cls: "warn",
    rows: [
      ["Akdeniz Yapı Malzemeleri A.Ş.", "₺60.000 açık, en eski 50 gün", "₺29.000"],
      ["Anadolu Mimarlık Ltd. Şti.", "₺26.750 açık, en eski 48 gün", "₺7.000"],
    ],
  },
  {
    q: "Kabul bekleyen teklifler",
    p: ["3 teklif kabul bekliyor, toplam ", "₺64.250", "."],
    src: "Teklifler",
    ok: "Hatırlatma taslağı hazırla",
    cls: "gold",
    rows: [
      ["Kuzey Lojistik", "TK-2026-0115, 3 gün önce gönderildi", "₺38.000"],
      ["Mavi Ajans", "TK-2026-0117, dün gönderildi", "₺18.750"],
      ["Ege Muhasebe Bürosu", "TK-2026-0112, 6 gün önce gönderildi", "₺7.500"],
    ],
  },
  {
    q: "Kritik seviyedeki ürünler",
    p: ["", "2 ürün", " kritik seviyenin altında."],
    src: "Stok",
    ok: "Satın alma görevi aç",
    cls: "warn",
    rows: [
      ["A4 fotokopi kâğıdı", "Ana depo, kritik seviye 10 koli", "4 koli"],
      ["Toner TN-2420", "Ana depo, kritik seviye 3 adet", "1 adet"],
    ],
  },
  {
    q: "Geçen ay kim kaç gün çalıştı?",
    p: ["Geçen ay 4 kişi toplam ", "66", " iş günü çalıştı."],
    src: "Puantaj",
    ok: "Puantaj raporunu aç",
    cls: "pos",
    rows: [
      ["Selin A.", "İzin ve devamsızlık yok", "18 gün"],
      ["Ahmet T.", "1 gün izinli", "17 gün"],
      ["Murat K.", "2 gün izinli", "16 gün"],
      ["Elif Y.", "1 gün gelmedi", "15 gün"],
    ],
  },
];
