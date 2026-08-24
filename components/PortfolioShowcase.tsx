"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import { useCursor } from "./CustomCursor";

interface PortfolioShowcaseProps {
  projects: PortfolioProject[];
}

const CATEGORIES = [
  { id: "mern", label: "MERN Stack" },
  { id: "wordpress", label: "WordPress Websites" },
  { id: "squarespace", label: "Squarespace Websites" },
] as const;

export default function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<"mern" | "wordpress" | "squarespace">("mern");
  const [projectIndices, setProjectIndices] = useState<Record<string, number>>({
    mern: 0,
    wordpress: 0,
    squarespace: 0,
  });
  const [screenshotIndices, setScreenshotIndices] = useState<Record<string, number>>({});

  const { setLabel } = useCursor();

  // Get projects for active category
  const categoryProjects = projects.filter((p) => p.category === activeCategory);
  const activeProjectIndex = projectIndices[activeCategory] ?? 0;
  const activeProject = categoryProjects[activeProjectIndex];

  // Helper to change project index within category
  const changeProject = (direction: number) => {
    const total = categoryProjects.length;
    if (total === 0) return;
    setProjectIndices((prev) => {
      const current = prev[activeCategory] ?? 0;
      const nextIndex = (current + direction + total) % total;
      return { ...prev, [activeCategory]: nextIndex };
    });
  };

  // Helper to change screenshot index of active project
  const getScreenshotIndex = (projectSlug: string) => screenshotIndices[projectSlug] ?? 0;

  const changeScreenshot = (projectSlug: string, direction: number, maxScreenshots: number) => {
    setScreenshotIndices((prev) => {
      const current = prev[projectSlug] ?? 0;
      const nextIndex = (current + direction + maxScreenshots) % maxScreenshots;
      return { ...prev, [projectSlug]: nextIndex };
    });
  };

  if (!activeProject) return null;

  const activeScreenshotIndex = getScreenshotIndex(activeProject.slug);

  return (
    <section className="px-6 py-28 md:px-10 bg-mist/30 border-y border-ink/5">
      <div className="mx-auto max-w-site">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <SectionHeading eyebrow="Portfolio" lines={["Websites &", "Software Solutions"]} />
          <Link
            href="/portfolio"
            className="text-sm font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink transition-all"
          >
            Explore full portfolio →
          </Link>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-6 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  isActive ? "text-paper" : "text-ink/60 hover:text-ink hover:bg-ink/5"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-ink rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Split Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Description & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                {/* Project Context */}
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-ink/50">
                  <span>{activeProject.client}</span>
                  <span className="h-1 w-1 rounded-full bg-ink/30" />
                  <span>{activeProject.year}</span>
                </div>

                {/* Project Title */}
                <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight">
                  {activeProject.title}
                </h3>

                {/* Description */}
                <p className="text-base text-ink/70 leading-relaxed max-w-md">
                  {activeProject.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-ink/5 rounded-full text-xs font-medium text-ink/80 border border-ink/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Details Call to Action */}
                <div className="pt-4">
                  <Link
                    href={`/portfolio/${activeProject.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink group"
                  >
                    <span className="underline underline-offset-4 decoration-ink/30 group-hover:decoration-ink transition-colors">
                      View Project Details
                    </span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Panel */}
            <div className="flex items-center gap-6 mt-12 pt-6 border-t border-ink/10">
              <div className="flex gap-3">
                <button
                  onClick={() => changeProject(-1)}
                  className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-colors group"
                  aria-label="Previous Project"
                  onMouseEnter={() => setLabel("CLICK")}
                  onMouseLeave={() => setLabel("")}
                >
                  <span className="transform group-hover:-translate-x-0.5 transition-transform">←</span>
                </button>
                <button
                  onClick={() => changeProject(1)}
                  className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-colors group"
                  aria-label="Next Project"
                  onMouseEnter={() => setLabel("CLICK")}
                  onMouseLeave={() => setLabel("")}
                >
                  <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              {/* Slide Counter Indicator */}
              <span className="text-xs font-semibold uppercase tracking-widest text-ink/40">
                {String(activeProjectIndex + 1).padStart(2, "0")} / {String(categoryProjects.length).padStart(2, "0")} Projects
              </span>
            </div>
          </div>

          {/* Right Column: Screenshot Slider in Mockup */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Browser Windows Mockup */}
            <div className="relative w-full rounded-2xl border border-ink/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-paper overflow-hidden flex flex-col">
              {/* Browser Header Bar */}
              <div className="bg-ink/5 border-b border-ink/10 px-4 py-3 flex items-center justify-between">
                {/* Window Dots */}
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-ink/10" />
                  <span className="w-3 h-3 rounded-full bg-ink/10" />
                  <span className="w-3 h-3 rounded-full bg-ink/10" />
                </div>
                {/* Dummy URL Search Bar */}
                <div className="bg-paper/85 rounded-md px-10 py-1 text-[11px] text-ink/40 font-mono tracking-tight flex items-center gap-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] max-w-xs w-full justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                  {activeProject.liveUrl?.replace("https://", "") || "localhost:3000"}
                </div>
                {/* Dummy actions */}
                <div className="w-12 h-1 bg-transparent" />
              </div>

              {/* Slider Image Container */}
              <div className="relative aspect-[16/10] bg-mist/40 overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeProject.slug}-${activeScreenshotIndex}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeProject.screenshots[activeScreenshotIndex].url}
                      alt={`${activeProject.title} Screenshot ${activeScreenshotIndex + 1}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Hover Controls for Screenshot Sliding */}
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Screenshot navigation buttons inside the screen mockup */}
                <div className="absolute inset-y-0 left-4 flex items-center z-20">
                  <button
                    onClick={() => changeScreenshot(activeProject.slug, -1, activeProject.screenshots.length)}
                    className="w-10 h-10 rounded-full bg-paper/95 shadow-md flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-all transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
                    aria-label="Previous Screenshot"
                    onMouseEnter={() => setLabel("CLICK")}
                    onMouseLeave={() => setLabel("")}
                  >
                    ←
                  </button>
                </div>

                <div className="absolute inset-y-0 right-4 flex items-center z-20">
                  <button
                    onClick={() => changeScreenshot(activeProject.slug, 1, activeProject.screenshots.length)}
                    className="w-10 h-10 rounded-full bg-paper/95 shadow-md flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-all transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
                    aria-label="Next Screenshot"
                    onMouseEnter={() => setLabel("CLICK")}
                    onMouseLeave={() => setLabel("")}
                  >
                    →
                  </button>
                </div>

                {/* Indicator Dots */}
                <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 z-20">
                  {activeProject.screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setScreenshotIndices((prev) => ({ ...prev, [activeProject.slug]: idx }))
                      }
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeScreenshotIndex === idx ? "bg-ink w-4 shadow-sm" : "bg-ink/30 hover:bg-ink/50"
                      }`}
                      aria-label={`Go to screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
