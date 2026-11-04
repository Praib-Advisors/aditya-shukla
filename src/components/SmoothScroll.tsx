"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Gives mouse-wheel scrolling an eased, inertial feel. Touch screens keep their own native momentum scrolling,
 * and visitors who prefer reduced motion get the browser's normal scrolling. Overlays that scroll on their own
 * (the phone menu, the photo lightbox) carry data-lenis-prevent so they keep working.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -72 },
    });
    lenisRef.current = lenis;
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A new page always starts at the top.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
