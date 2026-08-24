"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";
import { useCursor } from "./CustomCursor";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  size?: "large" | "medium" | "horizontal";
  priority?: boolean;
}

export default function CaseStudyCard({
  caseStudy,
  size = "medium",
  priority = false,
}: CaseStudyCardProps) {
  const { setLabel } = useCursor();

  const aspect =
    size === "large" ? "aspect-[4/5] md:aspect-[16/10]" :
    size === "horizontal" ? "aspect-[21/9]" :
    "aspect-[4/5]";

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group block"
      onMouseEnter={() => setLabel("VIEW")}
      onMouseLeave={() => setLabel("")}
    >
      <div className={`relative overflow-hidden bg-mist ${aspect}`}>
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={caseStudy.thumbnail.url}
            alt={caseStudy.thumbnail.alt || caseStudy.title}
            fill
            priority={priority}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-8">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-paper/80">
            View Case Study →
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
            {caseStudy.client}
          </span>
          <h3 className="mt-1 font-display text-xl md:text-2xl">
            {caseStudy.shortTitle}
          </h3>
          <p className="mt-1 text-sm text-ink/60">
            {caseStudy.services.slice(0, 2).join(" • ")}
          </p>
        </div>
        <span className="whitespace-nowrap text-sm text-ink/50">{caseStudy.year}</span>
      </div>
    </Link>
  );
}
