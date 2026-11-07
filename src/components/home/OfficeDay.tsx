import { FileCheck2, HandCoins, Package, ReceiptText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { sectors } from "@/content/sectors";
import { site } from "@/lib/site";

import { AskKahya } from "./AskKahya";
import { LiveDesk } from "./LiveDesk";
import { icons } from "./office-day-data";
import { OfficeDayMotion } from "./OfficeDayMotion";

import "./office-day.css";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

const H1 = "Ofisinizin bütün günü tek uygulamada.";
const SAT = "M12 5v14M5 12l7 7 7-7";

/** Short trade names for the strip; each links to its sector page. */
const short: Record<string, string> = {
  "danismanlik-ve-ajans": "Danışmanlık ve ajans",
  "mimarlik-ve-muhendislik": "Mimarlık ve mühendislik",
  "emlak-ofisi": "Emlak ofisi",
  "teknik-servis": "Teknik servis",
  "toptan-ticaret-ve-dagitim": "Toptan ticaret",
  "insaat-ve-taseron": "İnşaat ve taşeron",
  "lojistik-ve-nakliye": "Lojistik ve nakliye",
  "guvenlik-ve-temizlik": "Güvenlik ve temizlik",
  "mali-musavir-burosu": "Mali müşavir",
  "egitim-ve-kurs": "Eğitim ve kurs",
  "hukuk-burosu": "Hukuk bürosu",
  "uretim-atolyesi": "Üretim atölyesi",
};

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 12l5 5 9-10" />
  </svg>
);

const Sat = ({
  n,
  d,
  icon,
  bg,
  fg,
  title,
  sub,
  cls,
}: {
  n: 1 | 2 | 3;
  d: number;
  icon: string;
  bg: string;
  fg: string;
  title: string;
  sub: string;
  cls?: string;
}) => (
  <div className={`od-sat od-sat-${n}`} aria-hidden style={v({ "--d": `${d}ms` })}>
    <div>
      <span className="ic" style={{ background: bg, color: fg }}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
      </span>
      <span>
        <b className={cls}>{title}</b>
        <small>{sub}</small>
      </span>
    </div>
  </div>
);

/** One job through the office: the same customer's offer becomes the sale, leaves the stock and is paid into the cari. */
const flow = [
  {
    Icon: FileCheck2,
    h: "Teklif",
    d: "Kendi antetinizle gönderin; müşteri linkten açıp onaylasın.",
    plan: "Kurumsal pakette dahil",
    ref: "TKL-0112",
  },
  {
    Icon: ReceiptText,
    h: "Satış",
    d: "Kabul edilen teklif tek tıkla satışa döner; kalemler, KDV ve vade olduğu gibi gelir.",
    ref: "FT-0409",
  },
  {
    Icon: Package,
    h: "Stok",
    d: "Satılan ürün depodan düşer; kritik seviyenin altına inen ürün işaretlenir.",
    plan: "Ekip paketten itibaren",
    ref: "−5 adet",
  },
  {
    Icon: HandCoins,
    h: "Tahsilat",
    d: "Ödeme cariye işlenir; bakiye ve hesap ekstresi aynı anda güncellenir.",
    ref: "+₺7.500",
  },
];

const week: [string, ("" | "off" | "leave")[]][] = [
  ["Selin A.", ["", "", "", "", ""]],
  ["Murat K.", ["", "", "leave", "leave", ""]],
  ["Elif Y.", ["", "off", "", "", ""]],
  ["Ahmet T.", ["", "", "", "", ""]],
];

/** Home: the office's day in one live window, then one job through the office, then Kahya AI and the team's week. */
export function OfficeDay() {
  const strip = sectors.filter((s) => short[s.slug]);
  return (
    <div className="od" id="od">
      <div className="od-beams" aria-hidden>
        <i />
        <i />
        <i />
      </div>

      <section className="wrap od-hero" id="od-hero">
        <div>
          <span className="od-pill" data-in style={v({ "--d": "0ms" })}>
            <span className="dot" />
            <span>
              <b>30 gün</b> Kurumsal paketi ücretsiz deneyin
            </span>
          </span>
          <h1 aria-label={H1}>
            {H1.split(" ").map((w, i) => (
              <span key={i} aria-hidden>
                <span className={i === 3 ? "w grad grad-a" : i > 3 ? "w grad grad-b" : "w"} style={v({ "--i": i })}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="od-lead" data-in style={v({ "--d": "520ms" })}>
            Tahsilat, teklif, stok ve ekibin puantajı aynı kayıtta. Kahya bu kayıtlardan cevap verir; telefonda da
            masada da.
          </p>
          <div className="od-cta" data-in style={v({ "--d": "640ms" })}>
            <a href={site.app.register} className="btn btn-brass">
              Hemen başla
              <svg
                className="arr"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <Link href="/tanitim-filmi" className="btn btn-line">
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden className="text-brass">
                <path d="M7 4l13 8-13 8z" fill="currentColor" />
              </svg>
              Tanıtım filmini izle
            </Link>
          </div>
          <ul className="od-checks" data-in style={v({ "--d": "760ms" })}>
            {[
              "Cari ve tahsilat",
              "Tekliften satışa",
              "Stok ve depolar",
              "Personel ve puantaj",
              "Görev ve onaylar",
              "Kahya AI",
            ].map((t) => (
              <li key={t}>
                <Check />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="od-stage" id="od-stage">
          <div className="od-depth">
            <Sat
              n={1}
              d={1400}
              icon={SAT}
              bg="rgb(79 214 170 / 0.12)"
              fg="#4fd6aa"
              title="+₺48.200"
              sub="Tahsilat, cariye işlendi"
              cls="num pos"
            />
            <Sat
              n={2}
              d={1600}
              icon="M5 12l5 5 9-10"
              bg="rgb(79 214 170 / 0.12)"
              fg="#4fd6aa"
              title="Teklif kabul edildi"
              sub="Linkten onay, satışa döndü"
            />
            <Sat
              n={3}
              d={1800}
              icon={icons.clock.d}
              bg="rgb(255 255 255 / 0.06)"
              fg="#a3b8b2"
              title="Ahmet T. işe giriş"
              sub="Puantaj, 08:58"
            />
            <div className="od-tilt" id="od-tilt">
              <div className="od-ghost od-ghost-2" aria-hidden>
                <span>Teklifler</span>
              </div>
              <div className="od-ghost od-ghost-1" aria-hidden>
                <span>Cariler</span>
              </div>
              <div className="od-deskin">
                <div
                  className="od-desk"
                  role="img"
                  aria-label="Kahya'da bir ofis günü, örnek veriyle: bu ayın geliri, vadesi geçen alacak, işteki ekip ve gün içindeki kayıtlar"
                >
                  <div className="od-head" aria-hidden>
                    <b>Bugün</b>
                    <span className="sub" id="od-today">
                      Bugün
                    </span>
                    <span className="od-sample">Örnek veri</span>
                    <span className="od-live">
                      <i />
                      Canlı
                    </span>
                  </div>
                  <LiveDesk />
                  <div className="od-ask" aria-hidden>
                    <div className="q">
                      <Image src="/brand/kahya-mark.svg" alt="" width={18} height={18} unoptimized />
                      Vadesi geçen müşterilerim kimler?
                    </div>
                    <p>
                      2 müşteri, toplam <b className="num">₺36.000</b>. En eskisi 50 gün: Akdeniz Yapı Malzemeleri.
                    </p>
                    <div className="src">Kaynak: Cari yaşlandırma</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="od-strip" aria-label="Kahya'nın hazır geldiği sektörler">
        <div className="od-track">
          {[...strip, ...strip].map((s, i) => (
            <Link
              key={`${s.slug}-${i}`}
              href={`/sektorler/${s.slug}`}
              tabIndex={i < strip.length ? undefined : -1}
              aria-hidden={i < strip.length ? undefined : true}
            >
              {short[s.slug]}
            </Link>
          ))}
        </div>
      </nav>

      <div className="wrap">
        <div className="od-facts" id="od-facts">
          {[
            ["30", " gün", "Kurumsal paket deneme, sonra Ücretsiz pakete iner; veriniz kalır."],
            ["100", " soru", "Her firmada her ay Kahya AI'ya ücretsiz."],
            ["", "Excel'den", "Cari, personel ve açılış bakiyeleri önizlemeyle aktarılır."],
            ["", "Tek hesap", "Telefonda ana ekrandan, masada tarayıcıdan."],
          ].map(([n, rest, text], i) => (
            <div key={rest} className="od-fact" data-r style={v({ "--i": i })}>
              <b>
                {n ? (
                  <span className="num grad" data-count={n}>
                    {n}
                  </span>
                ) : null}
                {rest}
              </b>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <section className="od-s od-pin" id="od-flow" aria-labelledby="od-flow-h">
          <div className="od-pin-in">
            <div className="od-sh" data-sh>
              <p className="chip">Tek kayıt</p>
              <h2 style={{ marginTop: 20 }} id="od-flow-h" aria-label="Bir iş, baştan sona aynı kayıtta.">
                {"Bir iş, baştan sona aynı kayıtta.".split(" ").map((w, i, arr) => (
                  <span key={i} aria-hidden>
                    <span className={i >= arr.length - 2 ? "w grad grad-b" : "w"} style={v({ "--i": i })}>
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </h2>
              <p>
                Teklif kabul edilince satışa döner, ürün stoktan düşer, tahsilat cariye işlenir. Aynı şeyi dört ayrı
                yere yazmazsınız.
              </p>
            </div>
            <div className="od-walk" id="od-walk">
              <ol className="od-wsteps">
                {flow.map(({ Icon, ...f }, i) => (
                  <li key={f.h} className={i === 0 ? "on" : undefined}>
                    <button type="button" aria-pressed={i === 0} data-step={i}>
                      <span className="od-wn num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="od-wt">
                        <span className="od-wh">
                          <Icon size={18} strokeWidth={1.8} aria-hidden />
                          {f.h}
                        </span>
                        <span className="od-wd">
                          <span>
                            {f.d}
                            {f.plan ? <em>{f.plan}</em> : null}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              <div className="od-win">
                <div className="od-wbar">
                  <span className="od-wcust">
                    Ege Muhasebe Bürosu <span className="od-sample">Örnek veri</span>
                  </span>
                  <ol className="od-chain" aria-label="Bağlı kayıtlar">
                    {flow.map((f, i) => (
                      <li key={f.h} className={i === 0 ? "on" : undefined}>
                        {f.ref}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="od-panes">
                  <div className="od-pane on">
                    <div className="od-ph">
                      <span>
                        <small>Teklif</small>
                        <b className="num">TKL-2026-0112</b>
                      </span>
                      <span className="od-tag ok">Kabul edildi</span>
                    </div>
                    <div className="od-lines">
                      <div>
                        <span>
                          Ergonomik ofis sandalyesi <small>5 × ₺1.250,00</small>
                        </span>
                        <b className="num">₺6.250,00</b>
                      </div>
                      <div>
                        <span>KDV %20</span>
                        <b className="num">₺1.250,00</b>
                      </div>
                      <div className="tot">
                        <span>Toplam</span>
                        <b className="num">₺7.500,00</b>
                      </div>
                    </div>
                    <p className="od-pfoot">Müşteri 3 Kasım 14:20&apos;de linkten açtı ve onayladı.</p>
                  </div>
                  <div className="od-pane" aria-hidden>
                    <div className="od-ph">
                      <span>
                        <small>Satış</small>
                        <b className="num">FT-2026-0409</b>
                      </span>
                      <span className="od-tag">Vade 30 gün</span>
                    </div>
                    <div className="od-lines">
                      <div>
                        <span>
                          Ergonomik ofis sandalyesi <small>5 × ₺1.250,00</small>
                        </span>
                        <b className="num">₺6.250,00</b>
                      </div>
                      <div>
                        <span>KDV %20</span>
                        <b className="num">₺1.250,00</b>
                      </div>
                      <div className="tot">
                        <span>Toplam</span>
                        <b className="num">₺7.500,00</b>
                      </div>
                    </div>
                    <p className="od-pfoot">TKL-2026-0112 tekliften oluşturuldu; hiçbir alan yeniden yazılmadı.</p>
                  </div>
                  <div className="od-pane" aria-hidden>
                    <div className="od-ph">
                      <span>
                        <small>Stok</small>
                        <b>Ergonomik ofis sandalyesi</b>
                      </span>
                      <span className="od-tag warn">Kritik seviyede</span>
                    </div>
                    <div className="od-lines">
                      <div>
                        <span>Ana depo</span>
                        <b className="num">18 → 13 adet</b>
                      </div>
                      <div>
                        <span>Şube depo</span>
                        <b className="num">6 adet</b>
                      </div>
                      <div className="tot">
                        <span>Satış FT-2026-0409</span>
                        <b className="num warn">−5 adet</b>
                      </div>
                    </div>
                    <p className="od-pfoot">Kritik seviye 15 adet; altına inen ürün stok listesinde işaretlenir.</p>
                  </div>
                  <div className="od-pane" aria-hidden>
                    <div className="od-ph">
                      <span>
                        <small>Cari</small>
                        <b>Ege Muhasebe Bürosu</b>
                      </span>
                      <span className="od-tag ok">Bakiye ₺0,00</span>
                    </div>
                    <div className="od-lines">
                      <div>
                        <span>
                          Satış FT-2026-0409 <small>3 Kasım</small>
                        </span>
                        <b className="num">₺7.500,00</b>
                      </div>
                      <div>
                        <span>
                          Tahsilat, havale <small>4 Kasım</small>
                        </span>
                        <b className="num pos">−₺7.500,00</b>
                      </div>
                      <div className="tot">
                        <span>Bakiye</span>
                        <b className="num">₺0,00</b>
                      </div>
                    </div>
                    <p className="od-pfoot">Hesap ekstresi müşteriye link olarak gider.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="od-s" aria-labelledby="od-ai-h">
          <div className="od-sh" data-sh>
            <h2 id="od-ai-h" aria-label="Sorun, Kahya kendi kayıtlarınızdan cevap versin.">
              {"Sorun, Kahya kendi kayıtlarınızdan cevap versin.".split(" ").map((w, i, arr) => (
                <span key={i} aria-hidden>
                  <span className={i >= arr.length - 2 ? "w grad grad-b" : "w"} style={v({ "--i": i })}>
                    {w}
                  </span>{" "}
                </span>
              ))}
            </h2>
            <p>
              Kahya yalnızca erişebildiğiniz kayıtlara bakar, her cevabın kaynağını gösterir ve bir şey kaydetmeden önce
              onayınızı ister.
            </p>
          </div>
          <div className="od-bento">
            <AskKahya />
            <div className="od-box" data-r style={v({ "--i": 1 })}>
              <h3>
                Puantaj <span className="od-sample">Örnek veri</span>
              </h3>
              <p>Her gün giriş-çıkış saati ve yevmiyesiyle; onaylanan izin kendiliğinden işlenir.</p>
              <div className="od-week" id="od-week">
                <div className="od-wrow hd" aria-hidden>
                  <span />
                  {["Pzt", "Sal", "Çar", "Per", "Cum"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                {week.map(([name, days], y) => (
                  <div key={name} className="od-wrow">
                    <b>{name}</b>
                    {days.map((c, x) => (
                      <i
                        key={x}
                        className={c || undefined}
                        style={v({ "--i": x + y })}
                        title={c === "off" ? "Gelmedi" : c === "leave" ? "İzinli" : "Çalıştı"}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="od-legend">
                <span style={v({ "--c": "rgb(79 214 170 / 0.45)" })}>Çalıştı</span>
                <span style={v({ "--c": "rgb(227 178 97 / 0.55)" })}>İzinli</span>
                <span style={v({ "--c": "rgb(255 143 115 / 0.55)" })}>Gelmedi</span>
              </div>
              <div className="od-total">
                <span className="k">Ayın hakediş toplamı</span>
                <span>Personel kartında</span>
              </div>
              <p className="od-note">Bordro ve SGK bildirgesi hazırlanmaz.</p>
            </div>
          </div>
        </section>
      </div>
      <OfficeDayMotion />
    </div>
  );
}
