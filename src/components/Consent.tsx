"use client";

import { useEffect, useState } from "react";

import { site } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "kahya-consent";
/** The footer's "Çerez tercihleri" asks for the banner again with this event. */
export const CONSENT_EVENT = "kahya:consent";

type Choice = "granted" | "denied";

const read = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

/** Google Analytics loads only after a yes; nothing is set before it. */
function loadAnalytics(id: string) {
  if (document.getElementById("ga")) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag reads the arguments object itself.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id);
  const s = document.createElement("script");
  s.id = "ga";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

/** The cookie banner (only when an Analytics id is set): yes loads Analytics, no keeps the site cookie-free. */
export function Consent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const choice = read();
    if (choice === "granted") loadAnalytics(GA_ID);
    // Shown after the first paint, so it never counts as the page's largest paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (choice === null) setOpen(true);
    const ask = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, ask);
    return () => window.removeEventListener(CONSENT_EVENT, ask);
  }, []);

  if (!GA_ID || !open) return null;

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {}
    if (choice === "granted") loadAnalytics(GA_ID);
    // A no after a yes: the cookies already set go once the page reloads without Analytics.
    else if (document.getElementById("ga")) location.reload();
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Çerez tercihi"
      className="stage-in fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_60px_-24px_rgb(12_31_28/0.4)] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md sm:p-5"
    >
      <p className="text-[0.95rem] leading-relaxed text-ink">
        Siteyi nasıl kullandığınızı görmek için Google Analytics çerezlerini kullanmak istiyoruz. İzin vermezseniz
        hiçbir çerez kaydedilmez.{" "}
        <a href={site.legal.cookies} target="_blank" rel="noopener" className="link">
          Çerez politikası
        </a>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => decide("granted")} className="btn btn-petrol flex-1">
          Kabul et
        </button>
        <button type="button" onClick={() => decide("denied")} className="btn btn-line flex-1">
          Reddet
        </button>
      </div>
    </div>
  );
}

/** Opens the banner again (the footer link); renders nothing without an Analytics id. */
export function ConsentLink({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))} className={className}>
      Çerez tercihleri
    </button>
  );
}
