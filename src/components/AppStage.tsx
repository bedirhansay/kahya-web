"use client";

import {
  BarChart3,
  Bell,
  Briefcase,
  Check,
  ClipboardCheck,
  FolderOpen,
  Home,
  Mail,
  MessagesSquare,
  Search,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/*
 * The hero: Kahya's own Ana Sayfa, drawn in code at real size. The visitor ticks the solutions
 * and the menu and the home cards follow, the way the app narrows after setup.
 * Records are the demo company's made-up ones (Atlas Danışmanlık and its customers).
 */

type Key = "ofis" | "crm" | "finans";

const choices: { key: Key; name: string; line: string }[] = [
  { key: "ofis", name: "Ofis Yönetimi", line: "Görev, izin, onay, belgeler" },
  { key: "crm", name: "CRM", line: "Görüşme ve takip günü" },
  { key: "finans", name: "Finans & Cari", line: "Cari, tahsilat, taksit" },
];

const rail: { label: string; icon: LucideIcon; of?: Key[] }[] = [
  { label: "Ana Sayfa", icon: Home },
  { label: "İşler", icon: ClipboardCheck, of: ["ofis"] },
  { label: "Talepler", icon: Briefcase, of: ["ofis"] },
  { label: "Personel", icon: Users, of: ["ofis"] },
  { label: "Ofis", icon: FolderOpen, of: ["ofis"] },
  { label: "Görüşmeler", icon: MessagesSquare, of: ["crm"] },
  { label: "Cariler", icon: Users, of: ["crm", "finans"] },
  { label: "Finans", icon: Wallet, of: ["finans"] },
  { label: "E-posta", icon: Mail },
  { label: "Raporlar", icon: BarChart3 },
];

function Card({ title, action, children, className }: { title: string; action?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("stage-in min-w-0 rounded-xl border border-line bg-white", className)}>
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <h3 className="truncate text-[13px] font-semibold">{title}</h3>
        {action && <span className="shrink-0 text-[12px] font-medium text-brand">{action}</span>}
      </header>
      {children}
    </section>
  );
}

function Initials({ name, tone = "brand" }: { name: string; tone?: "brand" | "brass" }) {
  const t = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full text-[10.5px] font-bold",
        tone === "brand" ? "bg-brand-100 text-brand" : "bg-[#fbeed5] text-brass-700",
      )}
    >
      {t}
    </span>
  );
}

function Pill({ tone, children }: { tone: "warn" | "danger" | "ok" | "muted"; children: ReactNode }) {
  const tones = {
    warn: "bg-[#fdf3e1] text-brass-700",
    danger: "bg-[#fdecea] text-[#b42318]",
    ok: "bg-brand-50 text-brand",
    muted: "bg-mist text-muted",
  };
  return <span className={cn("shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-semibold", tones[tone])}>{children}</span>;
}

const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-0">{children}</div>
);

function MoneyCards() {
  return (
    <div className="stage-in grid grid-cols-3 gap-3 max-sm:grid-cols-1 max-sm:gap-2">
      {[
        ["Bu ay tahsilat", "₺569.350", "Geçen ay ₺512.400"],
        ["Toplam alacak", "₺267.010", "29 borçlu cari"],
        ["Vadesi geçen", "5 taksit", "₺38.650 bekliyor"],
      ].map(([k, v, s], i) => (
        <div key={k} className="rounded-xl border border-line bg-white px-4 py-3">
          <p className="text-[12px] text-muted">{k}</p>
          <p className={cn("mt-1 text-[22px] font-bold leading-tight tracking-tight tabular-nums max-sm:text-lg", i === 2 && "text-[#b42318]")}>{v}</p>
          <p className="mt-0.5 text-[11.5px] text-muted">{s}</p>
        </div>
      ))}
    </div>
  );
}

function Approvals() {
  return (
    <Card title="Onayınızı bekleyenler" action="2 talep">
      {[
        ["Ayşe Demir", "Yıllık izin, 12–14 Kasım", "3 gün"],
        ["Can Koç", "Avans, ev taşıma", "₺7.500"],
      ].map(([n, d, v]) => (
        <Row key={n}>
          <Initials name={n} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold">{n}</span>
            <span className="block truncate text-[12px] text-muted">{d}</span>
          </span>
          <span className="text-[13px] font-bold tabular-nums">{v}</span>
          <span className="rounded-md bg-petrol px-2 py-1 text-[11.5px] font-semibold text-white">Onayla</span>
        </Row>
      ))}
    </Card>
  );
}

function TeamToday({ className }: { className?: string }) {
  return (
    <Card title="Ekip bugün" action="12 kişi" className={className}>
      {[
        ["Ayşe Demir", "İzinde", "15 Kasım’da dönüyor", "warn"],
        ["Ali Yılmaz", "Sahada", "Ege Yazılım ziyareti", "muted"],
        ["Selin Aydın", "Ofiste", "4 açık görev", "ok"],
      ].map(([n, s, d, t]) => (
        <Row key={n}>
          <Initials name={n} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold">{n}</span>
            <span className="block truncate text-[12px] text-muted">{d}</span>
          </span>
          <Pill tone={t as "warn"}>{s}</Pill>
        </Row>
      ))}
    </Card>
  );
}

function MyTasks() {
  return (
    <Card title="Görevlerim" action="Tümü">
      {[
        ["Ekim raporunu gönder", "Karadeniz Gıda", "Bugün", "danger"],
        ["Sözleşme taslağını kontrol et", "Marmara Hukuk", "Yarın", "warn"],
        ["Stok sayımı planı", "Depo", "Cuma", "muted"],
      ].map(([t, p, d, tone]) => (
        <Row key={t}>
          <span className="size-4 shrink-0 rounded border border-line" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium">{t}</span>
            <span className="block truncate text-[12px] text-muted">{p}</span>
          </span>
          <Pill tone={tone as "warn"}>{d}</Pill>
        </Row>
      ))}
    </Card>
  );
}

function RecentMeetings() {
  return (
    <Card title="Son görüşmeler" action="Tümü">
      {[
        ["Demir Gayrimenkul", "Fiyat listesini bekliyor", "Takip bugün", "danger"],
        ["Kuzey Mobilya", "Yeni ofis için teklif istedi", "14 Kasım", "warn"],
        ["Ege Yazılım", "Bakım sözleşmesi yenilenecek", "20 Kasım", "muted"],
      ].map(([f, n, d, tone]) => (
        <Row key={f}>
          <Initials name={f} tone="brass" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold">{f}</span>
            <span className="block truncate text-[12px] text-muted">{n}</span>
          </span>
          <Pill tone={tone as "warn"}>{d}</Pill>
        </Row>
      ))}
    </Card>
  );
}

function Overdue() {
  return (
    <Card title="Vadesi geçenler" action="5 taksit">
      {[
        ["Ege Yazılım", "5 gün", "₺28.000,00"],
        ["Demir Gayrimenkul", "6 gün", "₺4.000,00"],
        ["Pirli Temizlik", "2 gün", "₺750,00"],
      ].map(([n, d, a]) => (
        <Row key={n}>
          <span className="min-w-0 flex-1 truncate text-[13px]">{n}</span>
          <Pill tone="danger">{d}</Pill>
          <span className="w-24 text-right text-[13px] font-semibold tabular-nums">{a}</span>
        </Row>
      ))}
    </Card>
  );
}

export function AppStage() {
  const [on, setOn] = useState<Record<Key, boolean>>({ ofis: true, crm: true, finans: true });
  const toggle = (k: Key) =>
    setOn((prev) => {
      const next = { ...prev, [k]: !prev[k] };
      return Object.values(next).some(Boolean) ? next : prev;
    });
  const items = rail.filter((r) => !r.of || r.of.some((k) => on[k]));
  const picked = choices.filter((c) => on[c.key]).map((c) => c.name);
  // Görevlerim fills the second column when the other cards leave a gap.
  const cards = (on.ofis ? 2 : 0) + (on.crm ? 1 : 0) + (on.finans ? 1 : 0);

  return (
    <div>
      <fieldset>
        <legend className="text-[0.95rem] font-semibold text-ink">Hangi çözümler sizde olsun?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {choices.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={on[c.key]}
              onClick={() => toggle(c.key)}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                on[c.key] ? "border-petrol bg-white shadow-[0_1px_0_rgb(6_27_25/0.04)]" : "border-line bg-transparent hover:border-petrol/50",
              )}
            >
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
                  on[c.key] ? "border-petrol bg-petrol text-white" : "border-ink/25 bg-white",
                )}
              >
                {on[c.key] && <Check size={13} strokeWidth={3} aria-hidden />}
              </span>
              <span className="min-w-0">
                <span className={cn("block font-semibold", !on[c.key] && "text-muted")}>{c.name}</span>
                <span className="block truncate text-[0.82rem] text-muted">{c.line}</span>
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      <div
        role="img"
        aria-label={`Kahya ana sayfası. Seçili çözümler: ${picked.join(", ")}. Menü ve kartlar seçime göre değişir.`}
        className="mt-5 overflow-hidden rounded-2xl border border-ink/10 bg-[#f6f8f7] text-ink shadow-[0_40px_80px_-40px_rgb(6_27_25/0.45)]"
      >
        <div aria-hidden className="flex min-h-[30rem]">
          {/* The app's rail */}
          <nav className="hidden w-[5.25rem] shrink-0 flex-col items-center gap-1 bg-gradient-to-b from-petrol to-pine-900 py-4 md:flex">
            <span className="mb-3 grid size-9 place-items-center rounded-lg bg-white/10 text-lg font-bold text-brass">K</span>
            {items.map((r, i) => (
              <span
                key={r.label}
                className={cn(
                  "stage-in flex w-[4.4rem] flex-col items-center gap-1 rounded-lg py-1.5 text-[10.5px] text-white/80",
                  i === 0 && "bg-white/12 text-white",
                )}
              >
                <r.icon size={17} strokeWidth={1.75} />
                {r.label}
              </span>
            ))}
          </nav>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3 md:px-6">
              <span className="font-semibold">Ana Sayfa</span>
              <span className="ml-auto hidden items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-[12px] text-muted sm:flex">
                <Search size={14} /> Hızlı ara
              </span>
              <Bell size={17} className="text-muted" />
              <span className="grid size-7 place-items-center rounded-lg bg-petrol text-[10.5px] font-bold text-white">AD</span>
            </div>

            <div className="space-y-3 p-3 md:space-y-4 md:p-6">
              <div>
                <p className="text-[1.15rem] font-bold tracking-tight">Günaydın Selin</p>
                <p className="text-[12.5px] text-muted">Salı, 10 Kasım. Bugün 2 onay ve 1 takip sizi bekliyor.</p>
              </div>
              {on.finans && <MoneyCards />}
              <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
                {on.ofis && <Approvals />}
                {on.crm && <RecentMeetings />}
                {on.finans && <Overdue />}
                {on.ofis && <TeamToday className="max-md:hidden" />}
                {on.ofis && cards % 2 === 1 && <MyTasks />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[0.85rem] text-muted">
        Seçmediğiniz çözüm menüde ve ana sayfada görünmez. Sonradan Firma ayarlarından açarsınız.
      </p>
    </div>
  );
}
