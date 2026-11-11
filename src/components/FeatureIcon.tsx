import {
  CalendarClock,
  ChartColumn,
  ClipboardCheck,
  FileText,
  FolderKanban,
  ListChecks,
  Mail,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { KahyaGlyph } from "@/components/KahyaGlyph";

const icons: Record<string, LucideIcon> = {
  "cari-takibi": Wallet,
  "odeme-planlari": CalendarClock,
  "gorev-takibi": ListChecks,
  "proje-yonetimi": FolderKanban,
  "e-posta": Mail,
  "personel-ve-izin": UsersRound,
  "talep-ve-onay": ClipboardCheck,
  "dokuman-ve-sozlesme": FileText,
  raporlar: ChartColumn,
};

export function FeatureIcon({ slug, size = 20, className }: { slug: string; size?: number; className?: string }) {
  const Icon = icons[slug];
  if (!Icon) return <KahyaGlyph size={size} className={className} />;
  return <Icon size={size} aria-hidden className={className} />;
}
