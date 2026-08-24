"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyFilter from "./CaseStudyFilter";

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  filterBy?: "industry" | "services";
  showFilter?: boolean;
}

// Repeating layout pattern from the brief: large / two small / large /
// horizontal. Cycles regardless of how many items pass the active filter.
const PATTERN: Array<"large" | "medium" | "horizontal"> = [
  "large", "medium", "medium", "large", "horizontal", "medium", "medium", "large",
];

export default function CaseStudyGrid({
  caseStudies,
  filterBy = "services",
  showFilter = true,
}: CaseStudyGridProps) {
  const [active, setActive] = useState("All");

  const filters = useMemo(() => {
    const all = caseStudies.flatMap((c) => c[filterBy]);
    return Array.from(new Set(all));
  }, [caseStudies, filterBy]);

  const filtered = useMemo(() => {
    if (active === "All") return caseStudies;
    return caseStudies.filter((c) => c[filterBy].includes(active));
  }, [caseStudies, active, filterBy]);

  return (
    <div>
      {showFilter && (
        <CaseStudyFilter filters={filters} active={active} onChange={setActive} />
      )}

      <motion.div layout className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((cs, i) => {
            const size = PATTERN[i % PATTERN.length];
            return (
              <motion.div
                key={cs.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={size !== "medium" ? "md:col-span-2" : undefined}
              >
                <CaseStudyCard caseStudy={cs} size={size} priority={i < 2} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-ink/50">
          No projects match that filter yet — try another one.
        </p>
      )}
    </div>
  );
}
