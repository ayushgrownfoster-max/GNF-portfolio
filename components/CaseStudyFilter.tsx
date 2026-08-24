"use client";

import clsx from "clsx";

interface CaseStudyFilterProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
}

export default function CaseStudyFilter({
  filters,
  active,
  onChange,
}: CaseStudyFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {["All", ...filters].map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={clsx(
            "rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300",
            active === filter
              ? "border-ink bg-ink text-paper"
              : "border-ink/20 text-ink/60 hover:border-ink/60 hover:text-ink"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
