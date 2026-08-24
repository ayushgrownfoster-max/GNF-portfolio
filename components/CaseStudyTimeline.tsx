"use client";

import { motion } from "framer-motion";
import type { TimelineStep } from "@/lib/types";

export default function CaseStudyTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-ink/15 pt-6"
        >
          <span className="font-display text-3xl text-ink/30">{step.label}</span>
          <h4 className="mt-3 font-display text-xl">{step.title}</h4>
          <p className="mt-2 text-ink/60">{step.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
