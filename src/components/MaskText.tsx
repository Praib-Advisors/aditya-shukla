"use client";

import { Fragment } from "react";
import { useReveal } from "@/components/useReveal";

/** A heading's words rise out of a mask one after another when the heading scrolls into view. */
export function MaskText({ children, delay = 0 }: { children: string; delay?: number }) {
  const [ref, state] = useReveal<HTMLSpanElement>(0.3);
  const words = children.split(" ");
  return (
    <span ref={ref}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[.16em] -mb-[.16em] align-bottom">
            <span
              className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
              style={{
                transform: state === "hidden" ? "translateY(115%)" : "none",
                transitionDelay: state === "shown" ? `${delay + i * 60}ms` : "0ms",
              }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
