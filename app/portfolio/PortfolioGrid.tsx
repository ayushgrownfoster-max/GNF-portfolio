"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject } from "@/lib/types";
import { useCursor } from "@/components/CustomCursor";

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

const CATEGORY_FILTERS = [
  { id: "all", label: "All Work" },
  { id: "mern", label: "MERN Stack" },
  { id: "wordpress", label: "WordPress" },
  { id: "squarespace", label: "Squarespace" },
] as const;

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [filter, setFilter] = useState<"all" | "mern" | "wordpress" | "squarespace">("all");
  const { setLabel } = useCursor();

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-6">
        {CATEGORY_FILTERS.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                isActive ? "text-paper" : "text-ink/60 hover:text-ink hover:bg-ink/5"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="gridCategoryFilterBg"
                  className="absolute inset-0 bg-ink rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Projects */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="block"
                onMouseEnter={() => setLabel("VIEW")}
                onMouseLeave={() => setLabel("")}
              >
                {/* Thumbnail Card */}
                <div className="relative overflow-hidden bg-mist aspect-[16/10] rounded-xl border border-ink/5 shadow-sm">
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={project.thumbnail.url}
                      alt={project.thumbnail.alt || project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-paper flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Project Details <span className="text-sm">→</span>
                    </span>
                  </div>
                </div>

                {/* Details under thumbnail */}
                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">
                      {project.category === "mern" ? "MERN Stack" : project.category === "wordpress" ? "WordPress" : "Squarespace"}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink/20" />
                    <span className="text-[10px] font-semibold text-ink/40">{project.year}</span>
                  </div>
                  <h3 className="font-display text-xl text-ink font-semibold group-hover:text-ink/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink/60 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
