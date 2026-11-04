import nodemailer from "nodemailer";

import { site } from "@/lib/site";

/**
 * The contact form's endpoint: one mail to the support inbox (reply-to the sender) over SMTP (SMTP_HOST, SMTP_PORT,
 * SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO). A filled honeypot is answered as if sent; a sender may post five times
 * an hour.
 */
const TOPICS: Record<string, string> = {
  fiyat: "Fiyat teklifi",
  demo: "Tanıtım",
  aktarim: "Veri aktarımı",
  diger: "Diğer",
};
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT)
    return Response.json({ error: "Çok fazla deneme. Bir saat sonra yeniden deneyin." }, { status: 429 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  if (str(body.website, 200)) return Response.json({ ok: true }, { status: 202 });

  const name = str(body.name, 120);
  const email = str(body.email, 254);
  const message = str(body.message, 2000);
  const topic = TOPICS[str(body.topic, 20)] ?? TOPICS.diger;
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || body.kvkkAccepted !== true) {
    return Response.json({ error: "Zorunlu alanları doldurun." }, { status: 400 });
  }
  const rows: [string, string][] = [
    ["Konu", topic],
    ["Çözüm", str(body.solution, 120)],
    ["Ad soyad", name],
    ["Firma", str(body.company, 160)],
    ["E-posta", email],
    ["Telefon", str(body.phone, 40)],
  ];

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS)
    return Response.json({ error: "Gönderim ayarlı değil." }, { status: 503 });
  const port = Number(SMTP_PORT ?? 465);
  const mailer = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const shown = rows.filter(([, v]) => v);
  try {
    await mailer.sendMail({
      from: MAIL_FROM ?? `Kahya <${site.email}>`,
      to: MAIL_TO ?? site.email,
      replyTo: email,
      subject: `Kahya sitesi: ${topic}, ${name}`,
      text: `${shown.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
      html: `<table>${shown
        .map(([k, v]) => `<tr><td style="color:#667;padding:2px 12px 2px 0">${k}</td><td>${esc(v)}</td></tr>`)
        .join("")}</table><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
  } catch {
    return Response.json({ error: "Mesaj gönderilemedi." }, { status: 502 });
  }
  hits.set(ip, [...recent, now]);
  return Response.json({ ok: true }, { status: 202 });
}
