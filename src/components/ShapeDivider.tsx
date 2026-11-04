/**
 * Section divider: one soft wave, used the same way at every join so the page reads as a single system.
 *
 * It takes no space of its own (zero-height wrapper) and is drawn over the edge of a section, filled with the
 * colour of the section on the other side of the join. That way it also works against photographs and gradients.
 *
 *  - mode "rise": the NEXT section's colour rises into the bottom of the section above (default).
 *  - mode "hang": the PREVIOUS section's colour hangs into the top of the section below (use when the next one is a photo).
 *  - flip: mirrors the wave left to right, so consecutive joins alternate instead of repeating.
 *
 * Decorative only: aria-hidden, no client JavaScript.
 */
export type DividerColor = "ivory" | "sand" | "navy";

const colors: Record<DividerColor, string> = {
  ivory: "var(--color-ivory)",
  sand: "var(--color-sand)",
  navy: "var(--color-navy)",
};

const EDGE = "M0,34 C180,6 360,6 540,26 C720,46 900,52 1080,30 C1260,8 1380,10 1440,22";

export function ShapeDivider({
  fill, mode = "rise", flip = false,
}: { fill: DividerColor; mode?: "rise" | "hang"; flip?: boolean }) {
  const transform = `${flip ? "scaleX(-1) " : ""}${mode === "hang" ? "scaleY(-1)" : ""}`.trim();
  return (
    <div aria-hidden className="pointer-events-none relative z-10 h-0">
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        focusable="false"
        className={`absolute left-0 h-6 w-full sm:h-8 md:h-12 lg:h-16 ${mode === "hang" ? "top-[-1px]" : "bottom-[-1px]"}`}
        style={transform ? { transform } : undefined}
      >
        <path d={`${EDGE} L1440,64 L0,64 Z`} fill={colors[fill]} />
        <path d={EDGE} fill="none" stroke="var(--color-gold)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" opacity=".85" />
        <path d="M0,42 C180,14 360,14 540,34 C720,54 900,60 1080,38 C1260,16 1380,18 1440,30" fill="none" stroke="var(--color-gold)" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity=".35" />
      </svg>
    </div>
  );
}
