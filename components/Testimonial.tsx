"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial as TestimonialType } from "@/lib/types";

export default function Testimonial({ items }: { items: TestimonialType[] }) {
  const [index, setIndex] = useState(0);
  const current = items[index];
  if (!current) return null;

  return (
    <div>
      <div className="relative min-h-[220px] md:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-3xl font-display text-display-sm text-balance">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="mt-8 text-sm text-ink/60">
              <span className="font-medium text-ink">{current.name}</span>
              {" — "}
              {current.designation}, {current.company}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-10 flex gap-3">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-ink" : "w-4 bg-ink/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
