"use client";

import { AlertCircle, ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const topics = [
  { key: "fiyat", label: "Fiyat teklifi" },
  { key: "demo", label: "Tanıtım" },
  { key: "aktarim", label: "Veri aktarımı" },
  { key: "diger", label: "Diğer" },
] as const;
type Topic = (typeof topics)[number]["key"];
type Name = "name" | "email" | "message" | "kvkk";
type Errors = Partial<Record<Name, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The rules, in Turkish and in the page's voice (the browser's own bubbles are turned off). */
function check(f: FormData): Errors {
  const v = (k: string) => String(f.get(k) ?? "").trim();
  const e: Errors = {};
  if (!v("name")) e.name = "Adınızı ve soyadınızı yazın.";
  if (!v("email")) e.email = "Size dönebilmemiz için e-posta adresinizi yazın.";
  else if (!EMAIL.test(v("email"))) e.email = "E-posta adresi eksik görünüyor, örneğin ad@firma.com.";
  if (!v("message")) e.message = "Ne istediğinizi kısaca yazın.";
  if (f.get("kvkk") !== "on") e.kvkk = "Göndermek için aydınlatma metnini onaylayın.";
  return e;
}

const fieldCls = (bad?: string) =>
  cn(
    "mt-2 w-full rounded-[10px] border bg-pine-950/60 px-3.5 py-3 text-[0.98rem] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted/60",
    bad
      ? "border-[#ff8f73]/70 shadow-[0_0_0_4px_rgb(255_143_115/0.1)]"
      : "border-line hover:border-mint/30 focus:border-brass/70 focus:shadow-[0_0_0_4px_rgb(134_212_187/0.12)]",
  );

function Num({ n }: { n: string }) {
  return <span className="mr-2 text-[0.875rem] font-semibold tracking-wider text-brass tabular-nums">{n}</span>;
}

function Hint({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <span id={id} className="stage-in mt-2 flex items-center gap-1.5 text-[0.88rem] font-normal text-[#ffb4a2]">
      <AlertCircle size={15} aria-hidden className="shrink-0" />
      {children}
    </span>
  );
}

/**
 * The site's message form. It posts to the site's own endpoint, which mails support (reply-to the sender);
 * ?konu=fiyat&cozum=… from a "Fiyat talep et" button fills the topic and the message.
 */
export function ContactForm({ konu, cozum }: { konu?: string | null; cozum?: string | null }) {
  const [topic, setTopic] = useState<Topic>(topics.some((t) => t.key === konu) ? (konu as Topic) : "fiyat");
  const [message, setMessage] = useState(
    cozum ? `${cozum} için fiyat teklifi almak istiyoruz. Ekibimiz ... kişi.` : "",
  );
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [fail, setFail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const form = useRef<HTMLFormElement>(null);

  // A field's message goes as soon as it is put right.
  const recheck = (n: Name) => {
    if (!errors[n] || !form.current) return;
    const next = check(new FormData(form.current));
    setErrors((e) => ({ ...e, [n]: next[n] }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const found = check(f);
    setErrors(found);
    const first = (Object.keys(found) as Name[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const text = (k: string) => String(f.get(k) ?? "").trim();
    setState("sending");
    try {
      const res = await fetch(site.contactApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: text("name"),
          email: text("email"),
          phone: text("phone"),
          company: text("company"),
          topic,
          ...(cozum ? { solution: cozum.slice(0, 120) } : {}),
          message: text("message"),
          website: text("website"),
          kvkkAccepted: true,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setFail(res.status === 429 && data?.error ? data.error : "");
        throw new Error(String(res.status));
      }
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="stage-in flex min-h-[30rem] flex-col items-center justify-center text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full border border-brass/50 bg-brass/10 text-brass shadow-[0_0_40px_rgb(134_212_187/0.25)]">
          <Check size={26} aria-hidden />
        </span>
        <h2 className="mt-6 font-display text-[1.7rem] font-bold">Mesajınız ulaştı</h2>
        <p className="mt-2 max-w-sm leading-relaxed text-muted">Ekibimiz bir iş günü içinde e-postanıza dönüş yapar.</p>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={submit} className="grid gap-5" noValidate>
      <fieldset>
        <legend className="text-[0.92rem] font-medium text-ink/85">
          <Num n="01" />
          Konu
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-1 rounded-[12px] border border-line bg-pine-950/60 p-1 sm:grid-cols-4">
          {topics.map((t) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={topic === t.key}
              onClick={() => setTopic(t.key)}
              className={cn(
                "min-h-11 rounded-[9px] px-3 py-2.5 text-[0.92rem] font-semibold transition-[background-color,color,box-shadow] duration-300",
                topic === t.key
                  ? "bg-brass text-pine-950 shadow-[0_6px_20px_-8px_rgb(134_212_187/0.6)]"
                  : "text-ink/60 hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[0.92rem] font-medium text-ink/85">
          <Num n="02" />
          Ad soyad
          <input
            name="name"
            maxLength={120}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "e-name" : undefined}
            onInput={() => recheck("name")}
            className={fieldCls(errors.name)}
          />
          <Hint id="e-name">{errors.name}</Hint>
        </label>
        <label className="block text-[0.92rem] font-medium text-ink/85">
          <Num n="03" />
          Firma
          <input name="company" maxLength={160} autoComplete="organization" className={fieldCls()} />
        </label>
      </div>
      <label className="block text-[0.92rem] font-medium text-ink/85">
        <Num n="04" />
        E-posta
        <input
          name="email"
          type="email"
          inputMode="email"
          maxLength={200}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "e-email" : undefined}
          onInput={() => recheck("email")}
          className={fieldCls(errors.email)}
        />
        <Hint id="e-email">{errors.email}</Hint>
      </label>
      <label className="block text-[0.92rem] font-medium text-ink/85">
        <Num n="05" />
        Telefon <span className="font-normal text-muted">(isteğe bağlı)</span>
        <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={fieldCls()} />
      </label>
      <label className="block text-[0.92rem] font-medium text-ink/85">
        <Num n="06" />
        Mesajınız
        <textarea
          name="message"
          maxLength={2000}
          rows={5}
          value={message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "e-message" : undefined}
          onChange={(e) => {
            setMessage(e.target.value);
            recheck("message");
          }}
          className={cn(fieldCls(errors.message), "resize-y")}
        />
        <Hint id="e-message">{errors.message}</Hint>
      </label>
      {/* Left empty by people; bots fill it and the endpoint drops the message. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state === "error" && (
        <p
          role="alert"
          className="stage-in flex items-start gap-3 rounded-[12px] border border-[#ff8f73]/35 bg-[#ff8f73]/[0.07] px-4 py-3.5 text-[0.94rem] text-[#ffc9bb]"
        >
          <AlertCircle size={18} aria-hidden className="mt-0.5 shrink-0 text-[#ff8f73]" />
          <span>
            {fail || `Mesaj şu an gönderilemedi. Birazdan yeniden deneyin ya da ${site.email} adresine yazın.`}
          </span>
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-sm">
          <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-muted">
            <input
              name="kvkk"
              type="checkbox"
              aria-invalid={!!errors.kvkk}
              aria-describedby={errors.kvkk ? "e-kvkk" : undefined}
              onChange={() => recheck("kvkk")}
              className="mt-1 size-4 shrink-0 cursor-pointer accent-[#86d4bb]"
            />
            <span>
              <a href={site.legal.kvkk} target="_blank" rel="noopener" className="link">
                Aydınlatma metnini
              </a>{" "}
              okudum; bilgilerimin bana dönüş yapmak için işlenmesini kabul ediyorum.
            </span>
          </label>
          <Hint id="e-kvkk">{errors.kvkk}</Hint>
        </div>
        <button type="submit" disabled={state === "sending"} className="btn btn-brass group/s min-w-40">
          {state === "sending" ? (
            <>
              <LoaderCircle size={17} className="animate-spin" aria-hidden />
              Gönderiliyor
            </>
          ) : (
            <>
              Gönder
              <ArrowRight
                size={17}
                aria-hidden
                className="transition-transform duration-300 group-hover/s:translate-x-0.5"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/** The form filled from ?konu=…&cozum=… (render inside <Suspense>, with a plain <ContactForm /> as its fallback). */
export function ContactFormFromQuery() {
  const q = useSearchParams();
  return <ContactForm key={q.toString()} konu={q.get("konu")} cozum={q.get("cozum")} />;
}
