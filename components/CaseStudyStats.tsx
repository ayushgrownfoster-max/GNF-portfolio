import type { Stat } from "@/lib/types";
import AnimatedCounter from "./AnimatedCounter";
import clsx from "clsx";

interface CaseStudyStatsProps {
  stats: Stat[];
  theme?: "light" | "dark";
}

export default function CaseStudyStats({ stats, theme = "light" }: CaseStudyStatsProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-2 gap-10 py-8 md:grid-cols-4",
        theme === "dark" ? "text-paper" : "text-ink"
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <AnimatedCounter
            value={stat.value}
            className="block font-display text-stat"
          />
          <span
            className={clsx(
              "mt-2 block text-sm uppercase tracking-[0.1em]",
              theme === "dark" ? "text-paper/60" : "text-ink/50"
            )}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
