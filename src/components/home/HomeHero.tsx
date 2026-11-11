"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PhoneFrame } from "@/components/PhoneFrame";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export type HeroSlide = {
  /** Short name, shown as "01 / Cari ve tahsilat". */
  tag: string;
  /** The benefit, three lines; the last one carries the accent tone. */
  lines: [string, string, string];
  points: [string, string, string];
  href: string;
  shot: { src: string; alt: string; width: number; height: number };
  /** The same screen on a phone, as the installed app (390 px wide, bottom tab bar). */
  phone: { src: string; alt: string; width: number; height: number };
  /** One real event from the same screen. */
  event: { title: string; value: string };
};

const sectorsShort: [string, string][] = [
  ["wholesale-and-distribution", "Toptan ticaret"],
  ["construction-and-subcontracting", "İnşaat ve taşeron"],
  ["logistics-and-transport", "Lojistik ve nakliye"],
  ["consulting-and-agencies", "Danışmanlık ve ajans"],
  ["accounting-firms", "Mali müşavir"],
  ["real-estate", "Emlak ofisi"],
];

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * The home opening: five slides, each a real Kahya screen on a laptop and on a phone. The only motion on the page: a cross-fade every 8 s,
 * paused under the pointer or keyboard focus; with reduced motion the first slide stays.
 */
export function HomeHero({ slides }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [still, setStill] = useState(true);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setStill(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (still || hold) return;
    const t = setTimeout(() => !document.hidden && setI((n) => (n + 1) % slides.length), 8000);
    return () => clearTimeout(t);
  }, [i, still, hold, slides.length]);

  const s = slides[i];
  const fade = "transition-opacity duration-700 ease-out motion-reduce:transition-none";

  return (
    <section
      ref={root}
      aria-labelledby="giris"
      className="home-hero on-dark relative isolate overflow-hidden bg-paper"
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={(e) => !root.current?.contains(e.relatedTarget as Node) && setHold(false)}
    >
      <div aria-hidden className="home-hero-plane" />
      <div aria-hidden className="home-hero-grid" />

      <div className="wrap grid gap-10 pb-12 pt-[104px] md:pt-[128px] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14 lg:pb-16">
        <div className="home-in min-w-0">
          <h1 id="giris" className="sr-only">
            Kahya: küçük ofisler için ön muhasebe ve iş takibi
          </h1>
          <p className="text-[0.95rem] font-semibold text-brand">
            <span className="tabular-nums">{pad(i)}</span> / {s.tag}
          </p>
          {/* All headlines share one cell; only the shown one is read out. */}
          <div className="mt-5 grid">
            {slides.map((x, n) => (
              <p
                key={x.tag}
                aria-hidden={n !== i}
                className={cn(
                  "font-display text-[clamp(2.3rem,1.5rem+2.5vw,3.9rem)] font-bold leading-[1.05] tracking-[-0.03em] [grid-area:1/1]",
                  fade,
                  n === i ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                {x.lines.map((l, k) => (
                  <span key={l} className={cn("block", k === 2 && "text-gold-300")}>
                    {l}
                  </span>
                ))}
              </p>
            ))}
          </div>
          <p className="lead mt-6 max-w-xl text-muted">
            Cari, tahsilat, kasa ve banka, ekip ve müşteri tek yerde. Fatura ve beyanname muhasebe programınızda, müşavirinizde kalır.
          </p>
          <div className="mt-6 grid">
            {slides.map((x, n) => (
              <ul
                key={x.tag}
                aria-hidden={n !== i}
                className={cn("grid gap-2 [grid-area:1/1]", fade, n === i ? "opacity-100" : "opacity-0")}
              >
                {x.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-ink/85">
                    <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div role="group" aria-label="Slaytlar" className="flex items-center gap-1">
              {slides.map((x, n) => (
                <button
                  key={x.tag}
                  type="button"
                  aria-label={`${pad(n)}: ${x.tag}`}
                  aria-current={n === i}
                  onClick={() => setI(n)}
                  className={cn(
                    "relative min-h-11 min-w-11 px-1 text-[0.95rem] font-semibold tabular-nums transition-colors",
                    n === i ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {pad(n)}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-1.5 bottom-2 h-0.5 rounded-full transition-colors",
                      n === i ? "bg-brand" : "bg-transparent",
                    )}
                  />
                </button>
              ))}
            </div>
            <Link href={s.href} className="link inline-flex min-h-11 items-center gap-1.5">
              İncele <span className="sr-only">: {s.tag}</span>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 max-lg:hidden">
            <Buttons />
          </div>
          <Trust className="mt-8 max-lg:hidden" />
        </div>

        <figure className="home-in relative min-w-0">
          <div className="home-laptop max-lg:hidden">
            <div className="home-laptop-screen grid">
              {slides.map((x, n) => (
                <Image
                  key={x.shot.src}
                  src={x.shot.src}
                  alt={x.shot.alt}
                  width={x.shot.width}
                  height={x.shot.height}
                  priority={n === 0}
                  aria-hidden={n !== i}
                  sizes="52vw"
                  className={cn("h-auto w-full [grid-area:1/1]", fade, n === i ? "opacity-100" : "opacity-0")}
                />
              ))}
            </div>
            <div aria-hidden className="home-laptop-base" />
          </div>
          <PhoneFrame time="9:41" className="home-phone-front mx-auto max-w-[300px] lg:max-w-none">
            <div className="grid">
              {slides.map((x, n) => (
                <Image
                  key={x.phone.src}
                  src={x.phone.src}
                  alt={x.phone.alt}
                  width={x.phone.width}
                  height={x.phone.height}
                  priority={n === 0}
                  aria-hidden={n !== i}
                  sizes="(min-width: 1024px) 15vw, 300px"
                  className={cn("h-auto w-full [grid-area:1/1]", fade, n === i ? "opacity-100" : "opacity-0")}
                />
              ))}
            </div>
          </PhoneFrame>
          <div className="home-event grid" aria-live="off">
            {slides.map((x, n) => (
              <div
                key={x.tag}
                aria-hidden={n !== i}
                className={cn("[grid-area:1/1]", fade, n === i ? "opacity-100" : "opacity-0")}
              >
                <span className="block text-[0.8rem] text-muted">{x.event.title}</span>
                <b className="mt-0.5 block font-semibold tabular-nums">{x.event.value}</b>
              </div>
            ))}
          </div>
          <figcaption className="mt-4 text-sm text-muted max-lg:text-center lg:mt-10">Uygulamanın kendi ekranları, örnek veriyle.</figcaption>
        </figure>

        <div className="lg:hidden">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Buttons />
          </div>
          <Trust className="mt-6" />
        </div>
      </div>

      <nav aria-label="Kahya'nın hazır geldiği sektörler" className="relative border-t border-line">
        <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-1 py-4 text-[0.92rem]">
          <span className="text-muted">Hazır gelir:</span>
          {sectorsShort.map(([slug, name]) => (
            <Link key={slug} href={`/sectors/${slug}`} className="min-h-11 content-center text-ink/80 hover:text-ink">
              {name}
            </Link>
          ))}
          <Link href="/sectors" className="link min-h-11 content-center">
            Tüm sektörler
          </Link>
        </div>
      </nav>
    </section>
  );
}

function Buttons() {
  return (
    <>
      <a href={site.app.register} className="btn btn-brass">
        Ücretsiz başlayın
      </a>
      <Link href="#bir-gun" className="btn btn-line-dark">
        Nasıl çalışır
      </Link>
    </>
  );
}

function Trust({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-1.5 text-[0.92rem] text-muted", className)}>
      <li>Kurulum yok: tarayıcıdan ve telefondan açılır.</li>
      <li>Verinizin tamamını istediğiniz an dışarı alırsınız.</li>
    </ul>
  );
}
