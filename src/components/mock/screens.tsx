import { Check, Paperclip, Sparkles } from "lucide-react";

import { cn } from "@/lib/cn";

import { Avatar, Badge, Btn, MockPhone, MockWindow, Panel } from "./Mock";

/* Ofis Yönetimi */

const taskRows = [
  ["Selin Aydın", 14, 1, 3],
  ["Can Koç", 9, 2, 5],
  ["Ayşe Demir", 11, 0, 2],
  ["Ali Yılmaz", 6, 3, 4],
] as const;

export function TaskSummaryMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Raporlar · Görev Özeti"
      caption="Kişi bazında biten, geciken ve açık işler"
      label="Görev Özeti raporu: her çalışanın bu ay bitirdiği, geciken ve açık görev sayısı"
      className={className}
    >
      <Panel>
        <div className="grid grid-cols-[1fr_3rem_3.5rem_3rem] gap-2 border-b border-line px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wide text-muted">
          <span>Kişi</span>
          <span className="text-right">Biten</span>
          <span className="text-right">Geciken</span>
          <span className="text-right">Açık</span>
        </div>
        {taskRows.map(([name, done, late, open]) => (
          <div key={name} className="grid grid-cols-[1fr_3rem_3.5rem_3rem] items-center gap-2 border-b border-line px-3 py-2 last:border-0">
            <span className="flex min-w-0 items-center gap-2">
              <Avatar name={name} />
              <span className="min-w-0">
                <span className="block truncate font-medium">{name}</span>
                <span className="mt-1 block h-1 overflow-hidden rounded-full bg-mist">
                  <span className="block h-full rounded-full bg-brand" style={{ width: `${(done / (done + open + late)) * 100}%` }} />
                </span>
              </span>
            </span>
            <span className="text-right font-semibold tabular-nums">{done}</span>
            <span className={cn("text-right tabular-nums", late ? "font-semibold text-[#b42318]" : "text-muted")}>{late}</span>
            <span className="text-right tabular-nums text-muted">{open}</span>
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

export function ApprovalsMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Talepler · Onayımı bekleyenler"
      caption="Onay bekleyen talepler tek listede"
      label="Onay bekleyen izin ve avans talepleri, Onayla ve Reddet düğmeleriyle"
      className={className}
    >
      <div className="grid gap-2.5 @lg:grid-cols-2">
        {[
          ["Ayşe Demir", "Yıllık izin", "12.11 – 14.11", "3 gün"],
          ["Can Koç", "Avans talebi", "Ev taşıma", "₺7.500"],
        ].map(([name, kind, detail, amount]) => (
          <Panel key={name} className="p-3">
            <div className="flex items-start justify-between gap-2">
              <span className="flex items-center gap-2">
                <Avatar name={name} />
                <span className="font-semibold">{name}</span>
              </span>
              <Badge tone="warn">Onayınızı bekliyor</Badge>
            </div>
            <p className="mt-2 text-muted">
              {kind} · {detail}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[15px] font-bold">{amount}</span>
              <span className="flex gap-1.5">
                <Btn>Reddet</Btn>
                <Btn primary>Onayla</Btn>
              </span>
            </div>
          </Panel>
        ))}
      </div>
    </MockWindow>
  );
}

export function ApprovalTimesMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Raporlar · Onay süreleri"
      caption="Hangi onay ne kadar sürdü, kimde takıldı"
      label="Onay süreleri raporu: talep türüne göre ortalama onay süresi ve bekleyen talepler"
      className={className}
    >
      <Panel>
        {[
          ["İzin talebi", "3 saat", 0.15, "Bekleyen yok"],
          ["Avans talebi", "1 gün", 0.45, "1 bekliyor · Selin Aydın"],
          ["Satın alma", "2 gün", 0.8, "2 bekliyor · Can Koç"],
        ].map(([kind, avg, w, note]) => (
          <div key={kind as string} className="border-b border-line px-3 py-2.5 last:border-0">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">{kind}</span>
              <span className="font-semibold tabular-nums">{avg}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist">
              <div className="h-full rounded-full bg-brass" style={{ width: `${(w as number) * 100}%` }} />
            </div>
            <p className="mt-1 text-[11px] text-muted">{note}</p>
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

export function LeavePhoneMock({ className }: { className?: string }) {
  return (
    <MockPhone label="Telefonda izin talebi: çalışan izin ister, yönetici tek dokunuşla onaylar" className={className}>
      <p className="font-bold">İzinlerim</p>
      <p className="mt-1 text-[11px] text-muted">Hak 14 · Kullanılan 3 · Kalan 11</p>
      <div className="mt-3 rounded-[10px] border border-line bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Yıllık izin</span>
          <Badge tone="warn">Bekliyor</Badge>
        </div>
        <p className="mt-1.5 text-muted">12.11.2026 – 14.11.2026</p>
        <p className="mt-2 font-bold">3 gün</p>
      </div>
      <div className="mt-2.5 rounded-[10px] border border-line bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Ücretli izin</span>
          <Badge tone="brand">Onaylandı</Badge>
        </div>
        <p className="mt-1.5 text-muted">Onaylayan: Selin Aydın</p>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-petrol px-3 py-2 text-[11px] font-medium text-white">
        <Check size={14} className="text-brass" />
        İzin talebiniz iletildi
      </div>
    </MockPhone>
  );
}

export function MailToTaskMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="E-posta → Görev"
      caption="Gelen e-posta göreve dönüşür: sorumlusu, projesi, bitiş tarihi"
      label="Gelen e-postadan görev oluşturma: sorumlu, proje ve bitiş tarihi seçilir"
      className={className}
    >
      <Panel className="p-3">
        <p className="text-[11px] text-muted">Karadeniz Gıda · info@karadenizgida.example</p>
        <p className="mt-1 font-semibold">Ekim raporu ve ERP geçişi hakkında</p>
        <p className="mt-1.5 line-clamp-2 text-muted">Merhaba, ekim ayı raporunu ve stok aktarım planını cuma gününe kadar paylaşabilir misiniz?</p>
        <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted">
          <Paperclip size={12} /> stok-listesi.xlsx
        </p>
      </Panel>
      <Panel className="mt-2.5 p-3">
        <p className="font-semibold">Göreve çevir</p>
        <dl className="mt-2 grid grid-cols-[5.5rem_1fr] gap-y-1.5 text-[12px]">
          <dt className="text-muted">Sorumlu</dt>
          <dd className="flex items-center gap-1.5">
            <Avatar name="Can Koç" /> Can Koç
          </dd>
          <dt className="text-muted">Proje</dt>
          <dd>Karadeniz Gıda · ERP geçişi</dd>
          <dt className="text-muted">Bitiş</dt>
          <dd>Cuma, 13.11.2026</dd>
        </dl>
        <div className="mt-3 flex justify-end">
          <Btn primary>Görev oluştur</Btn>
        </div>
      </Panel>
    </MockWindow>
  );
}

/* CRM */

const meetings = [
  ["Kuzey Mobilya", "Murat Kaya", "Telefon", "Yeni ofis için teklif istedi, ölçüler gelecek.", "14 Kasım"],
  ["Ege Yazılım", "Deniz Arslan", "Toplantı", "Bakım sözleşmesi yenilemesi konuşuldu.", "20 Kasım"],
  ["Demir Gayrimenkul", "Hakan Demir", "E-posta", "Fiyat listesini bekliyor.", "Bugün"],
] as const;

export function MeetingsMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Müşteri · Görüşmeler"
      caption="Her görüşme müşteri kartında, kişisi, notu ve takip günüyle"
      label="Müşteri kartında görüşme kaydı: kiminle, nasıl görüşüldü, not ve takip günü"
      className={className}
    >
      <Panel title="Kuzey Mobilya Dekorasyon" action="+ Görüşme ekle">
        {[
          ["03.11.2026", "Murat Kaya", "Telefon", "Yeni ofis için teklif istedi. Ölçüler bu hafta gelecek.", "14 Kasım"],
          ["21.10.2026", "Murat Kaya", "Toplantı", "Showroom ziyareti. Ödeme planı konuşuldu.", null],
        ].map(([date, who, how, note, follow]) => (
          <div key={date} className="border-b border-line px-3 py-2.5 last:border-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
              <span className="font-semibold text-ink">{date}</span>
              <span>· {who}</span>
              <Badge>{how}</Badge>
            </div>
            <p className="mt-1">{note}</p>
            {follow && (
              <p className="mt-1.5">
                <Badge tone="warn">Takip günü: {follow}</Badge>
              </p>
            )}
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

export function RecentMeetingsMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Ana Sayfa · Son görüşmeler"
      caption="Takip günü gelen görüşmeler listede önünüze çıkar"
      label="Ana sayfada son görüşmeler ve takip günü gelen müşteriler"
      className={className}
    >
      <Panel title="Son görüşmeler" action="Tümü">
        {meetings.map(([firm, who, how, note, follow]) => (
          <div key={firm} className="flex items-start gap-2.5 border-b border-line px-3 py-2.5 last:border-0">
            <Avatar name={firm} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-semibold">{firm}</span>
                <Badge tone={follow === "Bugün" ? "danger" : "warn"}>{follow === "Bugün" ? "Takip bugün" : follow}</Badge>
              </div>
              <p className="truncate text-[11.5px] text-muted">
                {who} · {how} · {note}
              </p>
            </div>
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

/* Finans & Cari */

export function MoneyHomeMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Ana Sayfa"
      caption="Para kartları ve vadesi geçenler"
      label="Ana sayfa: bu ayın geliri, gideri ve neti, vadesi geçen alacaklar"
      className={className}
    >
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Bu ay gelir", "₺569.350", "text-brand"],
          ["Bu ay gider", "₺361.260", "text-[#b42318]"],
          ["Net", "₺208.090", "text-ink"],
        ].map(([k, v, c]) => (
          <Panel key={k} className="p-2.5">
            <p className="truncate text-[10.5px] text-muted">{k}</p>
            <p className={cn("mt-1 truncate text-[13px] font-bold tabular-nums sm:text-[15px]", c)}>{v}</p>
          </Panel>
        ))}
      </div>
      <Panel title="Vadesi geçenler" action="5 taksit" className="mt-2.5">
        {[
          ["Demir Gayrimenkul", "6 gün", "₺4.000,00"],
          ["Ege Yazılım", "5 gün", "₺28.000,00"],
          ["Pirli Temizlik", "2 gün", "₺750,00"],
        ].map(([n, d, a]) => (
          <div key={n} className="flex items-center justify-between gap-2 border-b border-line px-3 py-2 last:border-0">
            <span className="truncate">{n}</span>
            <span className="flex items-center gap-2">
              <Badge tone="danger">{d}</Badge>
              <span className="font-semibold tabular-nums">{a}</span>
            </span>
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

export function CariMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Cariler · Kuzey Mobilya Dekorasyon"
      caption="Bakiye ve hesap ekstresi her müşteri ve tedarikçide"
      label="Cari kartı: bakiye, son tahsilat ve yürüyen bakiyeli hesap hareketleri"
      className={className}
    >
      <div className="grid gap-2.5 @lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Panel className="p-3">
          <p className="text-[11px] text-muted">Bakiye</p>
          <p className="mt-0.5 text-[18px] font-bold tabular-nums">₺87.200,00</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-brand">
            <span className="size-1.5 rounded-full bg-brand" /> Müşteriden tahsil edilecek
          </p>
          <div className="mt-3 flex gap-1.5">
            <Btn primary>Tahsilat al</Btn>
            <Btn>Ekstre gönder</Btn>
          </div>
        </Panel>
        <Panel>
          {[
            ["03.11", "Tahsilat", "−₺20.000", "₺87.200"],
            ["28.10", "Satış · Ofis mobilyası", "+₺62.000", "₺107.200"],
            ["15.10", "Taksit 2/6", "−₺15.000", "₺45.200"],
          ].map(([d, t, a, b]) => (
            <div key={d} className="grid grid-cols-[2.6rem_1fr_auto] items-center gap-2 border-b border-line px-3 py-2 last:border-0">
              <span className="text-[11px] text-muted">{d}</span>
              <span className="truncate">{t}</span>
              <span className="text-right">
                <span className={cn("block font-semibold tabular-nums", a.startsWith("−") ? "text-[#b42318]" : "text-brand")}>{a}</span>
                <span className="block text-[10.5px] text-muted tabular-nums">{b}</span>
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </MockWindow>
  );
}

export function PaymentPlanMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Ödeme planı · Kuzey Mobilya"
      caption="Taksitler tek seferde oluşur, vadesi gelen hatırlatılır"
      label="Altı taksitli ödeme planı: ödenen, vadesi gelen ve bekleyen taksitler"
      className={className}
    >
      <Panel>
        {[
          ["1/6", "15.09.2026", "Ödendi", "brand"],
          ["2/6", "15.10.2026", "Ödendi", "brand"],
          ["3/6", "15.11.2026", "Vadesi geldi", "warn"],
          ["4/6", "15.12.2026", "Bekliyor", "muted"],
        ].map(([n, d, s, t]) => (
          <div key={n} className="flex items-center justify-between gap-2 border-b border-line px-3 py-2 last:border-0">
            <span className="flex items-center gap-3">
              <span className="font-semibold tabular-nums">{n}</span>
              <span className="text-muted tabular-nums">{d}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-semibold tabular-nums">₺15.000</span>
              <Badge tone={t as "brand" | "warn" | "muted"}>{s}</Badge>
            </span>
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

/* Ek hizmetler */

export function MailMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="E-posta · Gelen kutusu"
      caption="Her e-posta kendi carisiyle eşleşir"
      label="Gelen kutusu: e-postalar gönderen carinin adıyla eşleşmiş, yeni firma cari olarak eklenebilir"
      className={className}
    >
      <Panel>
        {[
          ["Karadeniz Gıda", "Ekim raporu ve ERP geçişi", "Müşteri", true],
          ["Marmara Hukuk Bürosu", "Sözleşme taslağı ektedir", "Tedarikçi", true],
          ["info@yenifirma.example", "Fiyat teklifi rica ediyoruz", null, false],
        ].map(([from, subj, kind, matched]) => (
          <div key={from as string} className="flex items-center gap-2.5 border-b border-line px-3 py-2.5 last:border-0">
            <Avatar name={from as string} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-semibold">{from}</span>
                {kind && <Badge tone="brand">{kind}</Badge>}
              </div>
              <p className="truncate text-[11.5px] text-muted">{subj}</p>
            </div>
            {!matched && <Btn>Cari olarak ekle</Btn>}
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

export function StockMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Stok · Ürünler"
      caption="Satışta seçilen ürün stoktan düşer, kritik seviye işaretlenir"
      label="Ürün listesi: depodaki miktar ve kritik seviyeye inen ürün"
      className={className}
    >
      <Panel>
        {[
          ["A4 fotokopi kâğıdı", "Merkez depo", "42 koli", null],
          ["Toner TN-2420", "Merkez depo", "3 adet", "Kritik"],
          ["Ofis sandalyesi", "Şube depo", "18 adet", null],
        ].map(([n, w, q, c]) => (
          <div key={n as string} className="flex items-center justify-between gap-2 border-b border-line px-3 py-2.5 last:border-0">
            <span className="min-w-0">
              <span className="block truncate font-medium">{n}</span>
              <span className="block text-[11px] text-muted">{w}</span>
            </span>
            <span className="flex items-center gap-2">
              {c && <Badge tone="danger">{c}</Badge>}
              <span className="font-semibold tabular-nums">{q}</span>
            </span>
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

export function AiMock({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Kahya AI: 'Bugün ne var?' sorusuna günün özeti ve onay bekleyen bir takip görevi önerisi"
      className={cn(
        "rounded-[var(--radius-frame)] border p-4 text-[13px]",
        dark ? "border-white/12 bg-pine-900 text-white" : "frame text-ink",
        className,
      )}
    >
      <div aria-hidden>
        <p className="flex items-center gap-2 font-semibold">
          <Sparkles size={15} className="text-brass" /> Kahya AI
        </p>
        <p className={cn("ml-auto mt-3 w-fit max-w-[80%] rounded-xl rounded-br-sm px-3 py-2", dark ? "bg-white/10" : "bg-mist")}>
          Bugün ne var?
        </p>
        <p className={cn("mt-3 leading-relaxed", dark ? "text-white/80" : "text-muted")}>
          Bugün 4 görev, 2 onay bekleyen talep ve vadesi gelen 3 tahsilat var. Ege Yazılım ile 20 gündür görüşülmedi.
        </p>
        <div className="mt-3 rounded-[10px] bg-white p-3 text-ink">
          <p className="text-[11px] font-semibold text-muted">Öneri · Görev</p>
          <p className="mt-1 font-semibold">Ege Yazılım’ı ara: bakım sözleşmesi yenilemesi</p>
          <p className="mt-0.5 text-[11.5px] text-muted">Sorumlu: Selin Aydın · Yarın</p>
          <div className="mt-2.5 flex gap-1.5">
            <Btn primary>Onayla</Btn>
            <Btn>Vazgeç</Btn>
          </div>
        </div>
        <p className={cn("mt-2.5 text-[11px]", dark ? "text-white/50" : "text-muted")}>Siz onaylamadan hiçbir şey kaydedilmez.</p>
      </div>
    </div>
  );
}

export function FleetMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Filo · Araçlar"
      caption="Araç, sefer ve araç bazında gelir gider"
      label="Filo: araçların bu ayki sefer sayısı, geliri ve gideri"
      className={className}
    >
      <Panel>
        <div className="grid grid-cols-[1fr_3rem_4.5rem_4.5rem] gap-2 border-b border-line px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wide text-muted">
          <span>Araç</span>
          <span className="text-right">Sefer</span>
          <span className="text-right">Gelir</span>
          <span className="text-right">Gider</span>
        </div>
        {[
          ["34 KHY 101", "Kamyon", 12, "₺186.000", "₺74.300"],
          ["34 KHY 205", "Kamyonet", 18, "₺96.500", "₺31.800"],
          ["06 KHY 330", "Tır", 7, "₺214.000", "₺121.600"],
        ].map(([plate, kind, trips, inc, exp]) => (
          <div key={plate as string} className="grid grid-cols-[1fr_3rem_4.5rem_4.5rem] items-center gap-2 border-b border-line px-3 py-2 last:border-0">
            <span className="min-w-0">
              <span className="block truncate font-semibold tabular-nums">{plate}</span>
              <span className="block text-[11px] text-muted">{kind}</span>
            </span>
            <span className="text-right tabular-nums">{trips}</span>
            <span className="text-right font-semibold tabular-nums text-brand">{inc}</span>
            <span className="text-right tabular-nums text-[#b42318]">{exp}</span>
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}

export function BranchesMock({ className }: { className?: string }) {
  return (
    <MockWindow
      title="Firma ayarları · Şubeler"
      caption="Her şubenin kaydı ayrı, raporu tek merkezde"
      label="Şubeler listesi: merkez ve iki şube"
      className={className}
    >
      <Panel>
        {[
          ["Kadıköy", true],
          ["Ankara", false],
          ["İzmir", false],
        ].map(([n, main]) => (
          <div key={n as string} className="flex items-center justify-between gap-2 border-b border-line px-3 py-2.5 last:border-0">
            <span className="font-medium">{n}</span>
            <span className="flex items-center gap-2">
              {main ? <Badge tone="brand">Merkez</Badge> : <Badge>Şube</Badge>}
            </span>
          </div>
        ))}
      </Panel>
    </MockWindow>
  );
}
