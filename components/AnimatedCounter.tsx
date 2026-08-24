"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g. "+193%", "3.2X", "43K+", "250+"
  className?: string;
  durationMs?: number;
}

/** Parses the leading numeric portion of a stat string (handling decimals),
 * animates it up once, and re-attaches the original prefix/suffix. */
export default function AnimatedCounter({
  value,
  className,
  durationMs = 1400,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(value.replace(/[0-9.]/g, (c) => (c === "." ? "." : "0")));

  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);

  useEffect(() => {
    if (!inView || !match) {
      if (!match) setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
