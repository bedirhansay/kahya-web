import {
  Bot,
  Boxes,
  Briefcase,
  Building2,
  Calculator,
  CalendarClock,
  ChartColumn,
  CheckCheck,
  DraftingCompass,
  Factory,
  FileText,
  FolderKanban,
  GraduationCap,
  HardHat,
  Handshake,
  LayoutGrid,
  ListChecks,
  Mail,
  Scale,
  ShieldCheck,
  Truck,
  UsersRound,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { features } from "@/content/features";
import { sectors } from "@/content/sectors";
import { extras, solutions } from "@/content/solutions";

export type NavLink = { href: string; label: string; hint?: string; icon?: LucideIcon; no?: string; bullets?: string[] };

export type MegaMenu = {
  columns: { title: string; items: NavLink[] }[];
  aside: { eyebrow: string; title: string; text: string; links: NavLink[] };
};

export type NavGroup = {
  href: string;
  label: string;
  children?: NavLink[];
  mega?: MegaMenu;
};

const solutionIcons: Record<string, LucideIcon> = {
  "ofis-yonetimi": LayoutGrid,
  crm: Handshake,
  "finans-cari": Wallet,
};

const solutionBullets: Record<string, string[]> = {
  "ofis-yonetimi": ["Görevler ve takvim", "İzin ve onaylar", "E-posta → görev", "Talepler ve duyurular"],
  crm: ["Müşteri kartı", "Görüşme kaydı", "Takip günü", "Son görüşmeler"],
  "finans-cari": ["Cari ve ekstre", "Tahsilat", "Ödeme planları", "Mali Müşavir Paketi"],
};

const sectorMeta: Record<string, { icon: LucideIcon; hint: string }> = {
  "danismanlik-ve-ajans": { icon: Briefcase, hint: "Müşteri işleri, görüşmeler, tahsilat" },
  "mimarlik-ve-muhendislik": { icon: DraftingCompass, hint: "Uzun projeler, taksitli ödemeler" },
  "emlak-ofisi": { icon: Building2, hint: "Kira, aidat ve sözleşme vadeleri" },
  "mali-musavir-burosu": { icon: Calculator, hint: "Aylık tekrar eden mükellef işleri" },
  "hukuk-burosu": { icon: Scale, hint: "Müvekkil, gizli belge, taksitli ücret" },
  "egitim-ve-kurs": { icon: GraduationCap, hint: "Taksitli kayıtlar, eğitmen kadrosu" },
  "teknik-servis": { icon: Wrench, hint: "İş dağıtımı, parça, servis tahsilatı" },
  "insaat-ve-taseron": { icon: HardHat, hint: "Şantiyeler, taşeron ve tedarikçiler" },
  "lojistik-ve-nakliye": { icon: Truck, hint: "Araç, sefer, masraf ve tahsilat" },
  "guvenlik-ve-temizlik": { icon: ShieldCheck, hint: "Saha personeli, müşteri sözleşmeleri" },
  "toptan-ticaret-ve-dagitim": { icon: Boxes, hint: "Vadeli satış, bayi carisi, depo" },
  "uretim-atolyesi": { icon: Factory, hint: "Teklif, malzeme, sipariş tahsilatı" },
};

const sectorGroups: { title: string; slugs: string[] }[] = [
  {
    title: "Büro ve danışmanlık",
    slugs: ["danismanlik-ve-ajans", "mimarlik-ve-muhendislik", "mali-musavir-burosu", "hukuk-burosu"],
  },
  { title: "Hizmet ve saha", slugs: ["teknik-servis", "guvenlik-ve-temizlik", "emlak-ofisi", "egitim-ve-kurs"] },
  {
    title: "Ticaret, üretim, şantiye",
    slugs: ["toptan-ticaret-ve-dagitim", "uretim-atolyesi", "insaat-ve-taseron", "lojistik-ve-nakliye"],
  },
];

const featureIcons: Record<string, LucideIcon> = {
  "cari-takibi": Wallet,
  "odeme-planlari": CalendarClock,
  "gorev-takibi": ListChecks,
  "proje-yonetimi": FolderKanban,
  "e-posta": Mail,
  "personel-ve-izin": UsersRound,
  "talep-ve-onay": CheckCheck,
  "dokuman-ve-sozlesme": FileText,
  raporlar: ChartColumn,
  "kahya-ai": Bot,
};

const featureGroups: { title: string; slugs: string[] }[] = [
  { title: "Para ve cari", slugs: ["cari-takibi", "odeme-planlari", "raporlar"] },
  { title: "Ekip ve iş", slugs: ["gorev-takibi", "proje-yonetimi", "personel-ve-izin", "talep-ve-onay"] },
  { title: "Belge ve iletişim", slugs: ["dokuman-ve-sozlesme", "e-posta", "kahya-ai"] },
];

const sectorLink = (slug: string): NavLink => {
  const s = sectors.find((x) => x.slug === slug)!;
  return { href: `/sektorler/${s.slug}`, label: s.tab, hint: sectorMeta[s.slug]?.hint, icon: sectorMeta[s.slug]?.icon };
};

const featureLink = (slug: string): NavLink => {
  const f = features.find((x) => x.slug === slug)!;
  return { href: `/ozellikler/${f.slug}`, label: f.name, hint: f.summary, icon: featureIcons[f.slug] };
};

export const mainNav: NavGroup[] = [
  {
    href: "/cozumler",
    label: "Çözümler",
    children: [
      ...solutions.map((s) => ({ href: `/cozumler/${s.slug}`, label: s.name, hint: s.summary })),
      { href: "/cozumler", label: "Çözümler, ek hizmetler ve hizmetler" },
    ],
    mega: {
      columns: [
        {
          title: "Üç çözüm, tek uygulama",
          items: solutions.map((s) => ({
            href: `/cozumler/${s.slug}`,
            label: s.subtitle ? `${s.name} · ${s.subtitle}` : s.name,
            hint: s.summary,
            icon: solutionIcons[s.slug],
            no: s.no,
            bullets: solutionBullets[s.slug],
          })),
        },
      ],
      aside: {
        eyebrow: "Ek hizmetler",
        title: "İhtiyaç olunca açılır",
        text: "Çözümlerin üzerine, ihtiyaç olduğunda eklenir.",
        links: [
          ...extras.map((e) => ({ href: e.href ?? "/cozumler#ek-hizmetler", label: e.name })),
          { href: "/cozumler", label: "Tüm çözümler ve hizmetler" },
        ],
      },
    },
  },
  {
    href: "/sektorler",
    label: "Sektörler",
    children: sectors.map((s) => ({ href: `/sektorler/${s.slug}`, label: s.name })),
    mega: {
      columns: sectorGroups.map((g) => ({ title: g.title, items: g.slugs.map(sectorLink) })),
      aside: {
        eyebrow: "12 sektör",
        title: "Aynı uygulama, size göre açılır",
        text: "Her sektör sayfasında Kahya'nın orada ne yaptığı ve ne yapmadığı açıkça yazar.",
        links: [{ href: "/sektorler", label: "Tüm sektörler" }],
      },
    },
  },
  {
    href: "/ozellikler",
    label: "Özellikler",
    children: features.map((f) => ({ href: `/ozellikler/${f.slug}`, label: f.name, hint: f.summary })),
    mega: {
      columns: featureGroups.map((g) => ({ title: g.title, items: g.slugs.map(featureLink) })),
      aside: {
        eyebrow: "Eğitim",
        title: "Kısa videolarla öğrenin",
        text: "Her özelliğin nasıl kullanıldığını birkaç dakikalık videolarda gösteriyoruz.",
        links: [
          { href: "/egitim", label: "Eğitim videoları" },
          { href: "/tanitim-filmi", label: "Tanıtım filmi" },
        ],
      },
    },
  },
  { href: "/egitim", label: "Eğitim" },
  { href: "/sss", label: "Sık sorulanlar" },
];
