"use client";

import { useReveal } from "@/components/useReveal";

type Variant = "up" | "left" | "right" | "fade" | "mask";

// Sideways entrances are only used from tablet width up; on a phone they would push the page wider than the screen.
const hidden: Record<Variant, string> = {
  up: "translate-y-6 opacity-0",
  left: "translate-y-6 opacity-0 md:translate-y-0 md:-translate-x-8",
  right: "translate-y-6 opacity-0 md:translate-y-0 md:translate-x-8",
  fade: "opacity-0",
  mask: "",
};
const shown: Record<Variant, string> = {
  up: "translate-y-0 opacity-100",
  left: "translate-x-0 translate-y-0 opacity-100",
  right: "translate-x-0 translate-y-0 opacity-100",
  fade: "opacity-100",
  mask: "",
};

/**
 * Brings its children in as they scroll into view. "up", "left" and "right" slide in from that side, "fade" only
 * fades, and "mask" wipes the content open from the top. Children can react to the state through
 * group-data-[state=hidden]/r:… classes (the gold rules under headings do this).
 */
export function Reveal({ children, delay = 0, variant = "up", className = "" }: {
  children: React.ReactNode; delay?: number; variant?: Variant; className?: string;
}) {
  const [ref, state] = useReveal<HTMLDivElement>();
  const wait = { transitionDelay: state === "shown" ? `${delay}ms` : "0ms" };
  return (
    <div
      ref={ref}
      data-state={state}
      style={variant === "mask" ? undefined : wait}
      className={`group/r transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
        state === "hidden" ? hidden[variant] : shown[variant]
      } ${className}`}
    >
      {variant === "mask" ? (
        // The wipe is on an inner box: a browser treats a fully clipped element as not on screen, so the outer
        // box (the one being watched) stays unclipped. The open state is wider than the box so shadows are not cut.
        <div
          style={wait}
          className={`h-full transition-[clip-path,opacity] duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
            state === "hidden" ? "opacity-0 [clip-path:inset(0_0_100%_0)]" : "opacity-100 [clip-path:inset(-3rem)]"
          }`}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
