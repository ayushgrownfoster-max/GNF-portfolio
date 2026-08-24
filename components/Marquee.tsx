import clsx from "clsx";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "forward" | "reverse";
  speedSeconds?: number;
  className?: string;
}

/** Duplicates its children so the CSS marquee-track keyframe (see globals.css)
 * can loop seamlessly at -50% translation. */
export default function Marquee({
  children,
  direction = "forward",
  speedSeconds = 30,
  className,
}: MarqueeProps) {
  return (
    <div className={clsx("overflow-hidden", className)}>
      <div
        className="marquee-track"
        data-dir={direction === "reverse" ? "reverse" : undefined}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
