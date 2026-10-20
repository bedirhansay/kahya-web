import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { features } from "@/content/features";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/ozellikler",
  title: "Özellikler: cari, görev, e-posta, personel, onay",
  description:
    "Kahya’nın tüm modülleri: cari ve bakiye takibi, ödeme planları, görevler ve takımlar, projeler, e-posta, personel ve izinler, talepler ve onaylar, dokümanlar, raporlar ve Kahya AI.",
});

const tools = [
  ["Hızlı ara ve hızlı oluştur", "⌘K ile her kayda ulaşın; “+” ile açık kayda göre tahsilat, satış ya da not ekleyin."],
  ["Favoriler", "Sık açtığınız kaydı yıldızlayın, menüde tek tık uzağınızda dursun."],
  ["Bildirimler ve bekleyenler", "Onayınızı bekleyen her şey zilin altında; tıklayınca kayıt açılır."],
  ["Ana Sayfa’yı düzenleyin", "Bölümleri gizleyin, sürükleyip sıralayın, yan panele taşıyın."],
  ["Otomasyonlar", "Vade, görev ve sözleşme hatırlatmaları; haftalık özet, temas kopan müşteri, tekrarlayan görevler."],
  ["Etiketler ve özel alanlar", "Kayıtları renkle gruplayın; kartlara kendi alanınızı ekleyin."],
  ["Excel’den içe aktarma", "Müşteri, tedarikçi, personel ve bakiyeleri şablonla alın; önizleme ve hata kontrolüyle."],
  ["Roller ve yetkiler", "Her modülde görüntüle, oluştur, güncelle, sil, onayla ayrı ayrı."],
  ["Şubeler", "Birden fazla ofisiniz varsa her şubenin kayıtları ayrı tutulur."],
  ["Silinenler", "Silinen kayıt bir süre bekler; Geri yükle ile döner."],
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Özellikler", path: "/ozellikler" }]}
        title="Bir ofisin ihtiyaç duyduğu her şey, aynı yerde."
        lead="Her modül diğerlerine bağlı: e-posta göreve, görev projeye, proje müşterinin cari kartına. Kullanmadığınızı kapatın, menüden kalksın."
      />
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {features.map((f) => (
              <li key={f.slug}>
                <Link href={`/ozellikler/${f.slug}`} className="group block">
                  <div className="frame aspect-[16/10] overflow-hidden">
                    <Image
                      src={f.screen.src}
                      alt={f.screen.alt}
                      width={2000}
                      height={1250}
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className={
                        f.screen.phone
                          ? "h-full w-full bg-mist object-contain object-top pt-6"
                          : "h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                      }
                    />
                  </div>
                  <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.025em] group-hover:text-petrol">{f.name}</h2>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted">{f.lead}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="araclar" className="border-t border-line bg-mist">
        <div className="wrap py-16 md:py-24">
          <h2 id="araclar" className="title max-w-2xl">
            Her gün işinizi hızlandıran küçük şeyler.
          </h2>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(([t, d]) => (
              <div key={t} className="border-t border-line pt-5">
                <dt className="font-extrabold">{t}</dt>
                <dd className="mt-2 text-[0.96rem] leading-relaxed text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
