"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

const t = {
  name: { en: "Full name", hi: "पूरा नाम" },
  email: { en: "Email address", hi: "ईमेल पता" },
  org: { en: "Organisation (optional)", hi: "संस्था (वैकल्पिक)" },
  topic: { en: "Subject of enquiry", hi: "पूछताछ का विषय" },
  message: { en: "Message", hi: "संदेश" },
  send: { en: "Send enquiry", hi: "संदेश भेजें" },
  sending: { en: "Sending…", hi: "भेजा जा रहा है…" },
  ok: { en: "Thank you. Your enquiry has been received.", hi: "धन्यवाद। आपका संदेश प्राप्त हो गया है।" },
  fail: { en: "The message could not be sent. Please try again later.", hi: "संदेश भेजा नहीं जा सका। कृपया कुछ समय बाद पुनः प्रयास करें।" },
  topics: {
    en: ["NAREDCO Uttar Pradesh", "Media and press", "Legal and professional", "Ananya Foundation", "Other"],
    hi: ["NAREDCO उत्तर प्रदेश", "मीडिया एवं प्रेस", "विधिक एवं व्यावसायिक", "अनन्या फाउंडेशन", "अन्य"],
  },
};

const field = "mt-2 w-full min-h-12 border border-navy/25 bg-white px-4 py-3 text-navy focus:border-gold";

export function ContactForm({ lang }: { lang: Lang }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fail">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), lang }),
      });
      setState(res.ok ? "ok" : "fail");
      if (res.ok) form.reset();
    } catch {
      setState("fail");
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6" noValidate={false}>
      <label className="block text-sm font-semibold text-navy">{t.name[lang]}
        <input name="name" required maxLength={120} autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-semibold text-navy">{t.email[lang]}
        <input name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-semibold text-navy">{t.org[lang]}
        <input name="org" maxLength={160} autoComplete="organization" className={field} />
      </label>
      <label className="block text-sm font-semibold text-navy">{t.topic[lang]}
        <select name="topic" className={field}>
          {t.topics[lang].map((x) => <option key={x}>{x}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold text-navy">{t.message[lang]}
        <textarea name="message" required minLength={10} maxLength={3000} rows={6} className={field} />
      </label>
      {/* Honeypot: real visitors never see or fill this. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-0 opacity-0" />
      <div>
        <button type="submit" disabled={state === "sending"} className="btn btn-ink disabled:opacity-60">
          {state === "sending" ? t.sending[lang] : t.send[lang]}
        </button>
      </div>
      <p role="status" aria-live="polite" className={state === "fail" ? "text-red-800" : "text-navy"}>
        {state === "ok" ? t.ok[lang] : state === "fail" ? t.fail[lang] : ""}
      </p>
    </form>
  );
}
