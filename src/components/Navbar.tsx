"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { href, type Lang } from "@/lib/i18n";
import { nav, ui } from "@/content/ui";
import { site } from "@/lib/site";

export function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  // Thin gold line along the bottom edge of the bar that fills as the page is read.
  const bar = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 8);
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
  }, [pathname]);

  // One gold underline that glides to the link under the pointer, and back to the current page when it leaves.
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  const mark = useRef<HTMLSpanElement>(null);
  const place = useCallback((el: HTMLElement | null) => {
    const m = mark.current;
    if (!m) return;
    if (!el) { m.style.opacity = "0"; return; }
    m.style.opacity = "1";
    const box = m.parentElement!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    m.style.width = `${r.width - pad * 2}px`;
    m.style.transform = `translateX(${r.left - box.left + pad}px)`;
  }, []);

  const isActive = (slug: string) => {
    const target = href(lang, slug);
    return slug === "" ? pathname === target : pathname === target || pathname.startsWith(target + "/");
  };

  const links = nav.filter((n) => n.slug !== "contact");
  const contact = nav.find((n) => n.slug === "contact")!;
  const activeIndex = links.findIndex((n) => isActive(n.slug));

  useEffect(() => {
    const home = () => place(items.current[activeIndex] ?? null);
    home();
    window.addEventListener("resize", home);
    return () => window.removeEventListener("resize", home);
  }, [activeIndex, place]);

  return (
    <header
      className={`nav-in sticky top-0 z-50 border-b bg-[#f9f1e6] transition-[box-shadow,border-color] duration-500 ${
        scrolled ? "border-gold/60 shadow-[0_14px_30px_-18px_rgba(23,43,64,.55)]" : "border-gold/30 shadow-none"
      }`}
    >
      <div className="wrap flex h-14 items-center justify-between gap-6 lg:h-16 xl:gap-6">
        <Link href={href(lang)} className="group flex shrink-0 items-center py-1.5 pr-2" aria-label={site.name[lang]}>
          <Image
            src="/signature-dark.png"
            alt=""
            width={900}
            height={203}
            priority
            className="h-10 w-auto origin-left transition duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-90 sm:h-11 lg:h-12 xl:h-14"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center xl:flex">
          <ul className="relative flex items-center" onMouseLeave={() => place(items.current[activeIndex] ?? null)}>
            <span ref={mark} aria-hidden className="pointer-events-none absolute bottom-0.5 left-0 h-0.5 bg-gold opacity-0 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]" />
            {links.map((n, i) => (
              <li key={n.slug} className="nav-item" style={{ ["--i" as string]: i }}>
                <Link
                  ref={(el) => { items.current[i] = el; }}
                  href={href(lang, n.slug)}
                  aria-current={isActive(n.slug) ? "page" : undefined}
                  onMouseEnter={(e) => place(e.currentTarget)}
                  onFocus={(e) => place(e.currentTarget)}
                  onBlur={() => place(items.current[activeIndex] ?? null)}
                  className={`group relative block whitespace-nowrap rounded-sm px-4 py-2 text-[.98rem] tracking-[.005em] transition duration-300 hover:-translate-y-px hover:bg-navy/[.06] hover:text-navy ${
                    isActive(n.slug) ? "font-medium text-navy" : "text-navy/75"
                  }`}
                >
                  {n.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={href(lang, contact.slug)}
            aria-current={isActive(contact.slug) ? "page" : undefined}
            className={`nav-item group relative ml-4 inline-flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-[3px] border px-5 py-3 text-[.92rem] font-medium tracking-wide transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-navy hover:shadow-[0_12px_24px_-14px_rgba(23,43,64,.6)] ${
              isActive(contact.slug) ? "border-gold bg-gold text-navy" : "border-navy bg-navy text-white"
            }`}
            style={{ ["--i" as string]: links.length }}
          >
            {contact.label[lang]}
            <ArrowUpRight size={15} aria-hidden className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? ui.close[lang] : ui.menu[lang]}
          className="relative grid size-11 place-items-center border border-navy/30 text-navy transition duration-300 hover:border-gold hover:text-gold-deep active:scale-95 xl:hidden"
        >
          <Menu size={20} className={`absolute transition duration-300 ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
          <X size={20} className={`absolute transition duration-300 ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
        </button>
      </div>

      {/* Phone and tablet menu: slides down, links follow one after another */}
      <nav
        id="mobile-nav"
        aria-label="Primary"
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 top-14 overflow-y-auto bg-[#f9f1e6] transition duration-300 ease-out xl:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <ul className="wrap py-6">
          {nav.map((n, i) => (
            <li
              key={n.slug}
              className={`border-b border-navy/10 transition duration-500 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
            >
              <Link
                href={href(lang, n.slug)}
                onClick={() => setOpen(false)}
                aria-current={isActive(n.slug) ? "page" : undefined}
                className={`group flex min-h-14 items-center justify-between font-serif text-2xl transition duration-300 hover:translate-x-1 hover:text-gold-deep ${isActive(n.slug) ? "text-gold-deep" : "text-navy"}`}
              >
                {n.label[lang]}
                <ArrowUpRight size={18} aria-hidden className="opacity-0 transition duration-300 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <span ref={bar} aria-hidden className="pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left scale-x-0 bg-gold" />
    </header>
  );
}
