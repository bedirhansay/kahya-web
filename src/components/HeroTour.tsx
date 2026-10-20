"use client";

import { Bot, FolderKanban, Home, Mail, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Img } from "@/components/Img";
import { cn } from "@/lib/cn";

const stops = [
  {
    key: "home",
    label: "Ana Sayfa",
    icon: Home,
    caption: "Ayın geliri ve gideri, vadesi gelen ödemeler, haftanın takvimi",
    src: "/screens/home.webp",
    alt: "Kahya Ana Sayfa: aylık gelir, gider, kâr ve vadesi gelen ödemeler",
  },
  {
    key: "mail",
    label: "E-posta",
    icon: Mail,
    caption: "Firmanızın e-postası, gönderenin cari kaydı ve ekleriyle",
    src: "/screens/mail.webp",
    alt: "Kahya e-posta kutusu: gelen kutusu, açık e-posta ve ekleri",
  },
  {
    key: "cari",
    label: "Cariler",
    icon: Users,
    caption: "Bakiye ve bütün hareketler, cari kartında bir arada",
    src: "/screens/cari.webp",
    alt: "Kahya cari kartı: bakiye, iletişim bilgileri ve hareket geçmişi",
  },
  {
    key: "project",
    label: "Projeler",
    icon: FolderKanban,
    caption: "Görevler, bütçe ve ilerleme aynı sayfada",
    src: "/screens/project.webp",
    alt: "Kahya proje sayfası: görevler, durumları, sorumlular ve proje bilgileri",
  },
  {
    key: "ai",
    label: "Kahya AI",
    icon: Bot,
    caption: "Söyleyin, Kahya hazırlasın, siz onaylayın",
    src: "/screens/ai.webp",
    alt: "Kahya AI: vadesi geçen müşteriler için hazırlanan hatırlatma kartı",
  },
] as const;

const STOP_MS = 6000;

/**
 * The hero's product tour: real screens, one at a time, at a readable size.
 * It advances on its own while in view (a progress line shows when), pauses
 * on hover or focus, and only moves on click for reduced-motion visitors.
 */
export function HeroTour() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const [still, setStill] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  const running = inView && !held && !still;
  const next = () => setActive((i) => (i + 1) % stops.length);

  return (
    <div
      ref={root}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div
        role="tablist"
        aria-label="Kahya ekranları"
        className="mx-auto flex max-w-full gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:w-fit sm:justify-center"
      >
        {stops.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              id={`tour-tab-${s.key}`}
              aria-selected={on}
              aria-controls="tour-panel"
              onClick={() => setActive(i)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 overflow-hidden rounded-md px-3.5 py-2.5 text-[0.93rem] font-semibold transition-colors",
                on ? "bg-white/10 text-white" : "text-white/55 hover:text-white/85",
              )}
            >
              <s.icon size={17} aria-hidden className={on ? "text-brass" : undefined} />
              {s.label}
              {on && (
                <span
                  key={`${active}-${still}`}
                  aria-hidden
                  onAnimationEnd={next}
                  className="animate-tour-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brass"
                  style={{
                    animationDuration: `${STOP_MS}ms`,
                    animationPlayState: running ? "running" : "paused",
                    ...(still && { animation: "none", transform: "scaleX(1)" }),
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 min-h-[1.5em] text-[0.98rem] text-white/65">
        {stops[active].caption}
      </p>

      <div className="tour-stage mt-6 [perspective:1600px] md:mt-8">
        <figure
          id="tour-panel"
          role="tabpanel"
          aria-labelledby={`tour-tab-${stops[active].key}`}
          className="tour-frame frame frame-dark relative mx-auto max-w-6xl"
        >
          <div className="flex h-7 items-center gap-1.5 border-b border-line bg-mist px-3" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#e5e9e7]" />
            <span className="size-2.5 rounded-full bg-[#e5e9e7]" />
            <span className="size-2.5 rounded-full bg-[#e5e9e7]" />
          </div>
          {/* Phones crop in on the content, so the screen stays readable. */}
          <div className="relative aspect-square bg-paper sm:aspect-[16/10]">
            {stops.map((s, i) => (
              <Img
                key={s.key}
                src={s.src}
                alt={i === active ? s.alt : ""}
                aria-hidden={i !== active}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "low"}
                sizes="(min-width: 1216px) 1152px, (min-width: 640px) 100vw, 160vw"
                className={cn(
                  "object-cover object-[16%_0] transition-[opacity,transform] duration-700 sm:object-left-top ease-[var(--ease-out-quint)]",
                  i === active ? "scale-100 opacity-100" : "scale-[1.015] opacity-0",
                )}
              />
            ))}
          </div>
        </figure>
      </div>
    </div>
  );
}
