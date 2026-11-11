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

export type NavLink = {
  href: string;
  label: string;
  hint?: string;
  icon?: LucideIcon;
  no?: string;
  bullets?: string[];
};

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
  "office-management": LayoutGrid,
  crm: Handshake,
  "finance": Wallet,
};

const solutionBullets: Record<string, string[]> = {
  "office-management": ["Görevler ve takvim", "İzin ve onaylar", "E-posta → görev", "Talepler ve duyurular"],
  crm: ["Müşteri kartı", "Görüşme kaydı", "Takip günü", "Son görüşmeler"],
  "finance": ["Cari ve ekstre", "Tahsilat", "Ödeme planları", "Mali müşavir paketi"],
};

const sectorMeta: Record<string, { icon: LucideIcon; hint: string }> = {
  "consulting-and-agencies": {
    icon: Briefcase,
    hint: "Müşteri işleri, görüşmeler, tahsilat",
  },
  "architecture-and-engineering": {
    icon: DraftingCompass,
    hint: "Uzun projeler, taksitli ödemeler",
  },
  "real-estate": { icon: Building2, hint: "Kira, aidat ve sözleşme vadeleri" },
  "accounting-firms": {
    icon: Calculator,
    hint: "Aylık tekrar eden mükellef işleri",
  },
  "law-firms": {
    icon: Scale,
    hint: "Müvekkil, gizli belge, taksitli ücret",
  },
  "education-and-courses": {
    icon: GraduationCap,
    hint: "Taksitli kayıtlar, eğitmen kadrosu",
  },
  "technical-service": {
    icon: Wrench,
    hint: "İş dağıtımı, parça, servis tahsilatı",
  },
  "construction-and-subcontracting": {
    icon: HardHat,
    hint: "Şantiyeler, taşeron ve tedarikçiler",
  },
  "logistics-and-transport": {
    icon: Truck,
    hint: "Araç, sefer, masraf ve tahsilat",
  },
  "security-and-cleaning": {
    icon: ShieldCheck,
    hint: "Saha personeli, müşteri sözleşmeleri",
  },
  "wholesale-and-distribution": {
    icon: Boxes,
    hint: "Vadeli satış, bayi carisi, depo",
  },
  "manufacturing-workshops": {
    icon: Factory,
    hint: "Teklif, malzeme, sipariş tahsilatı",
  },
};

const sectorGroups: { title: string; slugs: string[] }[] = [
  {
    title: "Büro ve danışmanlık",
    slugs: ["consulting-and-agencies", "architecture-and-engineering", "accounting-firms", "law-firms"],
  },
  {
    title: "Hizmet ve saha",
    slugs: ["technical-service", "security-and-cleaning", "real-estate", "education-and-courses"],
  },
  {
    title: "Ticaret, üretim, şantiye",
    slugs: ["wholesale-and-distribution", "manufacturing-workshops", "construction-and-subcontracting", "logistics-and-transport"],
  },
];

const featureIcons: Record<string, LucideIcon> = {
  "accounts": Wallet,
  "payment-plans": CalendarClock,
  "tasks": ListChecks,
  "projects": FolderKanban,
  "email": Mail,
  "staff-and-leave": UsersRound,
  "requests-and-approvals": CheckCheck,
  "documents-and-contracts": FileText,
  reports: ChartColumn,
  "kahya-ai": Bot,
};

const featureGroups: { title: string; slugs: string[] }[] = [
  {
    title: "Para ve cari",
    slugs: ["accounts", "payment-plans", "reports"],
  },
  {
    title: "Ekip ve iş",
    slugs: ["tasks", "projects", "staff-and-leave", "requests-and-approvals"],
  },
  {
    title: "Belge ve iletişim",
    slugs: ["documents-and-contracts", "email", "kahya-ai"],
  },
];

const sectorLink = (slug: string): NavLink => {
  const s = sectors.find((x) => x.slug === slug)!;
  return {
    href: `/sectors/${s.slug}`,
    label: s.tab,
    hint: sectorMeta[s.slug]?.hint,
    icon: sectorMeta[s.slug]?.icon,
  };
};

const featureLink = (slug: string): NavLink => {
  const f = features.find((x) => x.slug === slug)!;
  return {
    href: `/features/${f.slug}`,
    label: f.name,
    hint: f.summary,
    icon: featureIcons[f.slug],
  };
};

export const mainNav: NavGroup[] = [
  {
    href: "/solutions",
    label: "Çözümler",
    children: [
      ...solutions.map((s) => ({
        href: `/solutions/${s.slug}`,
        label: s.name,
        hint: s.summary,
      })),
      { href: "/solutions", label: "Çözümler, ek hizmetler ve hizmetler" },
    ],
    mega: {
      columns: [
        {
          title: "Üç çözüm, tek uygulama",
          items: solutions.map((s) => ({
            href: `/solutions/${s.slug}`,
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
          ...extras.map((e) => ({
            href: e.href ?? "/solutions#ek-hizmetler",
            label: e.name,
          })),
          { href: "/solutions", label: "Tüm çözümler ve hizmetler" },
        ],
      },
    },
  },
  {
    href: "/sectors",
    label: "Sektörler",
    children: sectors.map((s) => ({
      href: `/sectors/${s.slug}`,
      label: s.name,
    })),
    mega: {
      columns: sectorGroups.map((g) => ({
        title: g.title,
        items: g.slugs.map(sectorLink),
      })),
      aside: {
        eyebrow: "12 sektör",
        title: "Aynı uygulama, size göre açılır",
        text: "Her sektör sayfasında Kahya'nın orada ne yaptığı ve ne yapmadığı açıkça yazar.",
        links: [{ href: "/sectors", label: "Tüm sektörler" }],
      },
    },
  },
  {
    href: "/features",
    label: "Özellikler",
    children: features.map((f) => ({
      href: `/features/${f.slug}`,
      label: f.name,
      hint: f.summary,
    })),
    mega: {
      columns: featureGroups.map((g) => ({
        title: g.title,
        items: g.slugs.map(featureLink),
      })),
      aside: {
        eyebrow: "Eğitim",
        title: "Kısa videolarla öğrenin",
        text: "Her özelliğin nasıl kullanıldığını birkaç dakikalık videolarda gösteriyoruz.",
        links: [
          { href: "/training", label: "Eğitim videoları" },
          { href: "/film", label: "Tanıtım filmi" },
        ],
      },
    },
  },
  { href: "/pricing", label: "Fiyatlar" },
  { href: "/training", label: "Eğitim" },
  { href: "/faq", label: "Sık sorulanlar" },
  { href: "/contact", label: "İletişim" },
];
