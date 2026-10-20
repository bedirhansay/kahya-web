import {
  CalendarClock,
  ChartColumn,
  ClipboardCheck,
  FileText,
  FolderKanban,
  ListChecks,
  Mail,
  Sparkles,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

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
  "kahya-ai": Sparkles,
};

export function FeatureIcon({ slug, size = 20, className }: { slug: string; size?: number; className?: string }) {
  const Icon = icons[slug] ?? Sparkles;
  return <Icon size={size} aria-hidden className={className} />;
}
