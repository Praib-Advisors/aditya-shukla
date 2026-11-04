import { NextResponse } from "next/server";

/**
 * Enquiry endpoint. Nothing is stored here. Set CONTACT_WEBHOOK_URL (for example a Slack/Teams incoming
 * webhook or a form service) and each valid enquiry is forwarded to it. Without it the endpoint answers 503,
 * so the visitor is told the truth instead of a message silently disappearing.
 */
const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 10 * 60_000;
const LIMIT = 5;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now - h.t < WINDOW) {
    if (h.n >= LIMIT) return NextResponse.json({ ok: false }, { status: 429 });
    h.n++;
  } else {
    hits.set(ip, { n: 1, t: now });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (clean(body.website, 50)) return NextResponse.json({ ok: true }); // honeypot: pretend success

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const message = clean(body.message, 3000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });

  const text = `New enquiry\nName: ${name}\nEmail: ${email}\nOrganisation: ${clean(body.org, 160)}\nSubject: ${clean(body.topic, 80)}\n\n${message}`;
  const res = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text }) }).catch(() => null);
  return NextResponse.json({ ok: !!res?.ok }, { status: res?.ok ? 200 : 502 });
}
