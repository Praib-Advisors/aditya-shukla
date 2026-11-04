"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import type { Lang } from "@/lib/i18n";

/**
 * A round button that appears once the visitor has scrolled a screen or so. A thin gold ring around it fills as
 * the page is read, and pressing it glides back to the top.
 */
export function BackToTop({ lang }: { lang: Lang }) {
  const ring = useRef<SVGCircleElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(1 - p);
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: { duration?: number }) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={lang === "en" ? "Back to top" : "ऊपर जाएँ"}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`group fixed bottom-6 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#f9f1e6] text-navy shadow-[0_12px_28px_-12px_rgba(23,43,64,.55)] transition duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:bg-navy hover:text-gold md:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
        <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="1.5" />
        <circle ref={ring} cx="24" cy="24" r="22.5" fill="none" stroke="#B58A43" strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
      </svg>
      <ArrowUp size={18} aria-hidden className="transition duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
