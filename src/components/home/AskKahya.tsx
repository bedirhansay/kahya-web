"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { answers } from "./office-day-data";

const THINK_MS = 900;
const NEXT_MS = 6500;

/**
 * Kahya AI, played out: a question is asked, Kahya thinks for a moment, the answer is laid out. Once in view the
 * questions take turns; picking one stops the turns. Reduced motion: the picked answer, at once.
 */
export function AskKahya() {
  const [cur, setCur] = useState(0);
  const [phase, setPhase] = useState<"on" | "think" | "laying">("on");
  const auto = useRef(true);
  const box = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  const ask = (k: number) => {
    setCur(k);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("on");
      return;
    }
    setPhase("think");
  };

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => en?.isIntersecting && setSeen(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Thinking → the answer lays out on the next frames.
  useEffect(() => {
    if (phase === "think") {
      const t = setTimeout(() => setPhase("laying"), THINK_MS);
      return () => clearTimeout(t);
    }
    if (phase === "laying") {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("on")));
      return () => cancelAnimationFrame(r);
    }
  }, [phase]);

  // The next question, while nobody has picked one.
  useEffect(() => {
    if (!seen || !auto.current || phase !== "on" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => auto.current && ask((cur + 1) % answers.length), NEXT_MS);
    return () => clearTimeout(t);
  }, [seen, phase, cur]);

  const a = answers[cur]!;
  return (
    <div className="od-box" data-r style={{ "--i": 0 } as CSSProperties} ref={box}>
      <h3>
        Kahya AI <span className="od-sample">Örnek veri</span>
      </h3>
      <p>Cari, teklif, stok ve puantaj üzerine soru sorun; hatırlatma ya da kayıt taslağını o hazırlasın.</p>
      <div className="od-chips" role="group" aria-label="Örnek sorular">
        {answers.map((x, i) => (
          <button
            key={x.q}
            type="button"
            className="od-chip"
            aria-pressed={i === cur}
            onClick={() => {
              auto.current = false;
              ask(i);
            }}
          >
            {x.q}
          </button>
        ))}
      </div>
      <div className={`od-answer ${phase === "on" ? "on" : phase === "think" ? "think" : ""}`} aria-live="polite">
        <div className="od-typing" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="od-who step">
          <Image src="/brand/kahya-mark.svg" alt="" width={20} height={20} unoptimized />
          Kahya<span>Bu ay 2 / 100 soru</span>
        </div>
        <p className="step" style={{ marginTop: 10 }}>
          {a.p[0]}
          <b className="num">{a.p[1]}</b>
          {a.p[2]}
        </p>
        <div className="step">
          {a.rows.map(([n, s, val]) => (
            <div key={n} className="od-arow">
              <span className="ck" aria-hidden>
                ✓
              </span>
              <div>
                {n}
                <small>{s}</small>
              </div>
              <span className={`amt num ${a.cls}`}>{val}</span>
            </div>
          ))}
        </div>
        <div className="od-afoot step">
          <span>Kaynak: {a.src}</span>
          <span className="ok">{a.ok}</span>
        </div>
        <p className="od-note step">Yanıtlar yapay zekâ ile üretilir; kontrol edin.</p>
      </div>
    </div>
  );
}
