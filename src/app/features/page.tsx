// avoid-ai-design-ignore: I3 -- Star is the icon of the real "Favoriler" feature in the app, not a fake rating star.
import {
  Bell,
  Building2,
  FileSpreadsheet,
  LayoutDashboard,
  RotateCcw,
  Search,
  ShieldCheck,
  Star,
  Tags,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CasePanel, type CaseTone } from "@/components/CaseRow";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { SectionJumps } from "@/components/SectionJumps";
import { features } from "@/content/features";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/features",
  title: "Özellikler: cari, görev, e-posta, personel, onay",
  description:
    "Kahya’nın modülleri: cari takibi, ödeme planları, görevler, projeler, e-posta, personel ve izin, talep ve onay, dokümanlar, raporlar ve Kahya AI.",
});

const toolIcons: Record<string, LucideIcon> = {
  "Hızlı ara ve hızlı oluştur": Search,
  Favoriler: Star,
  "Bildirimler ve bekleyenler": Bell,
  "Ana Sayfa’yı düzenleyin": LayoutDashboard,
  Otomasyonlar: Workflow,
  "Etiketler ve özel alanlar": Tags,
  "Excel’den içe aktarma": FileSpreadsheet,
  "Roller ve yetkiler": ShieldCheck,
  Şubeler: Building2,
  Silinenler: RotateCcw,
};

const tools = [
  [
    "Hızlı ara ve hızlı oluştur",
    "⌘K ile her kayda ulaşın. “+” ile açık kayda göre tahsilat, satış ya da not ekleyin.",
  ],
  [
    "Favoriler",
    "Sık açtığınız kaydı yıldızlayın, menüde tek tık uzağınızda dursun.",
  ],
  [
    "Bildirimler ve bekleyenler",
    "Onayınızı bekleyen her şey zilin altında. Tıklayınca kayıt açılır.",
  ],
  [
    "Ana Sayfa’yı düzenleyin",
    "Bölümleri gizleyin, sürükleyip sıralayın, yan panele taşıyın.",
  ],
  [
    "Otomasyonlar",
    "Vade, görev ve sözleşme hatırlatmaları, haftalık özet, temas kopan müşteri, tekrarlayan görevler.",
  ],
  [
    "Etiketler ve özel alanlar",
    "Kayıtları renkle gruplayın, kartlara kendi alanınızı ekleyin.",
  ],
  [
    "Excel’den içe aktarma",
    "Müşteri, tedarikçi, personel ve bakiyeleri şablonla alın. Yüklemeden önce önizleme ve hata kontrolü yapılır.",
  ],
  [
    "Roller ve yetkiler",
    "Her modülde görüntüle, oluştur, güncelle, sil, onayla ayrı ayrı.",
  ],
  [
    "Şubeler",
    "Birden fazla ofisiniz varsa her şubenin kayıtları ayrı tutulur.",
  ],
  ["Silinenler", "Silinen kayıt 30 gün bekler, Geri yükle ile döner."],
];

const tones: CaseTone[] = ["pine", "sage", "cream", "mist"];
/** The two older 1440 captures are 1440 × 898; the rest of /screens are 2000 × 1250. */
const size = (src: string) =>
  src.endsWith("izinler.webp") || src.endsWith("talepler.webp")
    ? [1440, 898]
    : [2000, 1250];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Özellikler", path: "/features" }]}
        title="Bir ofisin ihtiyaç duyduğu her şey, aynı yerde"
        lead="Her modül diğerlerine bağlı: e-posta göreve, görev projeye, proje müşterinin cari kartına. Kullanmadığınızı kapatın, menüden kalksın."
      >
        <SectionJumps
          label="Özellikler"
          items={[
            ...features.map((f) => ({ href: `#${f.slug}`, label: f.name })),
            { href: "#ek-hizmetler", label: "Ek hizmetler" },
          ]}
        />
      </PageHero>
      <section aria-label="Tüm özellikler" className="bg-surface">
        <ul className="wrap grid gap-x-10 gap-y-10 py-12 md:grid-cols-2 md:py-16">
          {features.map((f, i) => {
            const [width, height] = size(f.screen.src);
            return (
              <li key={f.slug} id={f.slug} className="scroll-mt-28">
                <Link href={`/features/${f.slug}`} className="group block">
                  <CasePanel
                    className="aspect-[2/1]"
                    tone={tones[i % tones.length]}
                    priority={i < 2}
                    screen={{
                      src: f.screen.src,
                      alt: f.screen.alt,
                      width,
                      height,
                    }}
                  />
                  <h2 className="mt-5 text-2xl font-bold tracking-[-0.02em] group-hover:text-brand">
                    {f.name}
                  </h2>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted">
                    {f.summary}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section aria-labelledby="ek-hizmetler" className="bg-mist">
        <div className="wrap flex flex-col gap-3 py-10 md:flex-row md:items-baseline md:justify-between md:gap-10">
          <h2 id="ek-hizmetler" className="text-2xl font-bold tracking-[-0.02em]">
            Ek hizmetler
          </h2>
          <p className="max-w-2xl leading-relaxed text-muted">
            E-posta, Stok, Teklif, Filo ve Kahya AI gibi ek hizmetler ihtiyacınız olunca açılır.{" "}
            <Link href="/solutions#ek-hizmetler" className="link">
              Ek hizmetlerin hepsi
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="araclar" className="bg-paper">
        <div className="wrap py-12 md:py-16">
          <h2 id="araclar" className="title max-w-2xl">
            Her gün işinizi hızlandıran küçük şeyler
          </h2>
          <dl className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(([t, d]) => {
              const Icon = toolIcons[t] ?? Search;
              return (
                <div key={t} className="flex gap-4 border-b border-line py-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-brand-50 text-brand">
                    <Icon size={20} aria-hidden strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-semibold">{t}</dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                      {d}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>
      <CtaBand
        tex
        title="Bir özellikle başlayın, gerisi yerinde"
        body="Bu ekranları kendi carilerinizle görün: hesap açın, kayıtlarınızı Excel’den aktarın. Nereden başlayacağınızı sorun."
      />
    </>
  );
}
