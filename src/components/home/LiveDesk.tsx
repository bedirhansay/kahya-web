"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { dayEvents, icons, INCOME_AFTER, INCOME_BEFORE, type DayEvent } from "./office-day-data";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;
const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");
const FIRST = 5;
const PAST = [38, 54, 30, 66, 48, 72];

function EventRow({ e, isNew }: { e: DayEvent; isNew: boolean }) {
  const ic = icons[e.i];
  return (
    <div className={isNew ? "od-ev new" : "od-ev"}>
      <time className="num">{e.t}</time>
      <span className="ic" style={{ background: ic.bg, color: ic.fg }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={ic.d} />
        </svg>
      </span>
      <span className="t">
        {e.txt} <small>{e.sub}</small>
      </span>
      <span className={`a num ${e.cls ?? ""}`}>{e.a}</span>
    </div>
  );
}

/**
 * The window's numbers and the day's records. It opens mid-morning (five records in, the collection counted); after
 * the first paint the rest of the day arrives every few seconds, then a new day starts. Reduced motion: still.
 */
export function LiveDesk() {
  const [k, setK] = useState(FIRST);
  const [past, setPast] = useState(PAST);
  const income = useRef<HTMLDivElement>(null);
  const got = dayEvents.slice(0, k).some((e) => e.income);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => !document.hidden && setK((n) => (n >= dayEvents.length ? 1 : n + 1)), 2400);
    const b = setInterval(() => !document.hidden && setPast((p) => p.map((h, i) => Math.max(18, Math.min(80, PAST[i]! + (Math.random() * 14 - 7))))), 1800);
    return () => (clearInterval(t), clearInterval(b));
  }, []);

  // The month's income counts toward its new figure when the collection arrives (and back when a new day starts).
  const shown = useRef(INCOME_AFTER);
  useEffect(() => {
    const el = income.current;
    const to = got ? INCOME_AFTER : INCOME_BEFORE;
    if (!el || shown.current === to) return;
    const from = shown.current, t0 = performance.now();
    shown.current = to;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1100);
      el.textContent = tl(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [got]);

  const rows = dayEvents.slice(0, k).reverse().slice(0, 5);
  return (
    <>
      <div className="od-grid" aria-hidden>
        <div className="od-cell" style={v({ "--i": 0 })}>
          <div className="k">Bu ay gelir</div>
          <div className="od-big num" ref={income}>
            {tl(INCOME_AFTER)}
          </div>
          <span className="od-delta num">Önceki ay ₺288.450</span>
          <div className="od-bars">
            {[...past, got ? 88 : 40].map((h, i) => (
              <span key={i} className={i === 6 ? "now" : undefined} style={v({ "--h": `${h}%`, "--i": i })} />
            ))}
          </div>
          <div className="od-days">
            {["Sa", "Ça", "Pe", "Cu", "Ct", "Pz", "Pt"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
        <div className="od-stack">
          <div className="od-cell" style={v({ "--i": 1 })}>
            <div className="od-mini">
              <span className="k">Vadesi geçen</span>
              <span className="v num warn">₺36.000</span>
            </div>
            <div className="od-meter">
              <i />
            </div>
          </div>
          <div className="od-cell" style={v({ "--i": 2 })}>
            <div className="od-mini">
              <span className="k">Şu an işte</span>
              <span className="v num">5</span>
            </div>
            <div className="od-ppl">
              {[
                ["SA", "#2f6f63"],
                ["MK", "#6b5a2e"],
                ["EY", "#3c4f7a"],
                ["AT", "#7a3c4f"],
                ["BD", "#2e5e6b"],
              ].map(([t, c]) => (
                <span key={t} style={{ background: c }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="od-log" aria-hidden style={v({ "--i": 3 })}>
        {rows.map((e, i) => (
          <EventRow key={e.t} e={e} isNew={i === 0 && k !== FIRST} />
        ))}
      </div>
    </>
  );
}
