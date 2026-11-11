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
  "accounts": Wallet,
  "payment-plans": CalendarClock,
  "tasks": ListChecks,
  "projects": FolderKanban,
  "email": Mail,
  "staff-and-leave": UsersRound,
  "requests-and-approvals": ClipboardCheck,
  "documents-and-contracts": FileText,
  reports: ChartColumn,
};

export function FeatureIcon({ slug, size = 20, className }: { slug: string; size?: number; className?: string }) {
  const Icon = icons[slug];
  if (!Icon) return <KahyaGlyph size={size} className={className} />;
  return <Icon size={size} aria-hidden className={className} />;
}
