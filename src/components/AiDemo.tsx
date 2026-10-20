"use client";

import { Check, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/cn";

type Scenario = {
  ask: string;
  reply: string;
  card: { title: string; rows: [string, string][] };
  action: string;
  done: string;
};

// Example data, in the shape the app's proposal cards use.
const scenarios: Scenario[] = [
  {
    ask: "Bugün ne var?",
    reply: "Günün özeti hazır. Bir de takip görevi öneriyorum:",
    card: {
      title: "Günün özeti",
      rows: [
        ["Bugün biten görev", "2"],
        ["Onayınızı bekleyen izin", "1"],
        ["Vadesi bugün olan tahsilat", "₺18.400"],
      ],
    },
    action: "Görevi oluştur",
    done: "Görev oluşturuldu",
  },
  {
    ask: "Vadesi geçenlere hatırlatma hazırla",
    reply: "3 müşterinin vadesi geçmiş. WhatsApp ekstre linklerini hazırladım:",
    card: {
      title: "Tahsilat hatırlatması",
      rows: [
        ["Akın Yapı", "₺12.500"],
        ["Deniz Mimarlık", "₺7.250"],
        ["Ece Tekstil", "₺4.980"],
      ],
    },
    action: "Onayla",
    done: "Taslaklar hazır, gönderim sizde",
  },
];

/** 0 typing, 1 thinking, 2 reply, 3 card, 4 approved */
type Step = 0 | 1 | 2 | 3 | 4;

/**
 * A short, looping Kahya AI conversation: question, a proposal card, and the
 * approval that saves it. Plays while on screen; reduced motion shows the
 * finished exchange.
 */
export function AiDemo() {
  const [s, setS] = useState(0);
  const [step, setStep] = useState<Step>(4);
  const [typed, setTyped] = useState(scenarios[0].ask.length);
  const [live, setLive] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.4 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    let cancelled = false;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => !cancelled && fn(), ms));

    const run = (i: number) => {
      const ask = scenarios[i].ask;
      setS(i);
      setStep(0);
      setTyped(0);
      for (let c = 1; c <= ask.length; c++) at(c * 55, () => setTyped(c));
      const t = ask.length * 55;
      at(t + 300, () => setStep(1));
      at(t + 1500, () => setStep(2));
      at(t + 2100, () => setStep(3));
      at(t + 4300, () => setStep(4));
      at(t + 7600, () => run((i + 1) % scenarios.length));
    };
    run(0);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [live]);

  const sc = scenarios[s];

  return (
    <div
      ref={root}
      aria-label="Kahya AI örnek sohbet"
      role="img"
      className="w-full max-w-md rounded-2xl border border-white/10 bg-pine-900/90 p-4 text-left text-[0.92rem] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b border-white/8 pb-3 text-sm font-bold text-white">
        <span className="grid size-7 place-items-center rounded-lg bg-brass text-pine-950">
          <Sparkles size={15} aria-hidden />
        </span>
        Kahya AI
        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-sage">
          <span className="size-1.5 rounded-full bg-sage" /> çevrimiçi
        </span>
      </div>

      <div className="flex min-h-[19rem] flex-col gap-3 pt-4">
        <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-white/10 px-3.5 py-2.5 text-white">
          {sc.ask.slice(0, typed)}
          {step === 0 && <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-white" />}
        </p>

        {step === 1 && (
          <p className="flex w-fit gap-1 rounded-xl rounded-bl-sm bg-white/6 px-3.5 py-3.5" aria-hidden>
            {[0, 0.15, 0.3].map((d) => (
              <span key={d} className="dot size-1.5 rounded-full bg-white" style={{ "--i": `${d}s` } as CSSProperties} />
            ))}
          </p>
        )}

        {step >= 2 && <p className="intro max-w-[90%] text-white/80">{sc.reply}</p>}

        {step >= 3 && (
          <div className="intro rounded-xl bg-white p-3.5 text-ink">
            <p className="text-xs font-bold uppercase tracking-wide text-petrol">{sc.card.title}</p>
            <ul className="mt-2 divide-y divide-line">
              {sc.card.rows.map(([k, v]) => (
                <li key={k} className="flex justify-between gap-4 py-1.5 text-[0.88rem]">
                  <span className="text-muted">{k}</span>
                  <span className="font-bold tabular-nums">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.85rem] font-bold transition-colors duration-300",
                  step === 4 ? "bg-petrol text-white" : "pulse-ring bg-brass text-pine-950",
                )}
              >
                {step === 4 && <Check size={15} aria-hidden />}
                {step === 4 ? sc.done : sc.action}
              </span>
              {step === 3 && <span className="px-2 text-[0.85rem] font-semibold text-muted">Düzenle</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
