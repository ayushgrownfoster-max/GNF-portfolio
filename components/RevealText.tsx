"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface RevealTextProps {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

/**
 * Reveals an array of lines one after another, each masked by its own
 * overflow-hidden wrapper so the text slides up from below rather than
 * fading in place. Used for the hero headline and section titles.
 *
 * NOTE: Uses `animate` (not `whileInView`) so it always fires on mount.
 * whileInView can silently skip on client-side navigation when the element
 * is already in the viewport before the Intersection Observer attaches,
 * leaving text permanently hidden behind overflow:hidden.
 */
export default function RevealText({
  lines,
  className,
  delay = 0,
  as: Tag = "h2",
}: RevealTextProps) {
  return (
    <Tag className={clsx("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.08,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

