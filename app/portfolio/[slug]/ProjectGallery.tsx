"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject } from "@/lib/types";
import { useCursor } from "@/components/CustomCursor";

interface ProjectGalleryProps {
  project: PortfolioProject;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setLabel } = useCursor();

  const changeImage = (direction: number) => {
    const total = project.screenshots.length;
    setActiveIndex((prev) => (prev + direction + total) % total);
  };

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-[16/10] bg-mist/40 rounded-2xl border border-ink/10 overflow-hidden group shadow-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={project.screenshots[activeIndex].url}
              alt={`${project.title} Screenshot ${activeIndex + 1}`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover Controls */}
        <div className="absolute inset-y-0 left-4 flex items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => changeImage(-1)}
            className="w-10 h-10 rounded-full bg-paper/95 shadow-md flex items-center justify-center hover:bg-ink hover:text-paper transition-all"
            aria-label="Previous Image"
            onMouseEnter={() => setLabel("CLICK")}
            onMouseLeave={() => setLabel("")}
          >
            ←
          </button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => changeImage(1)}
            className="w-10 h-10 rounded-full bg-paper/95 shadow-md flex items-center justify-center hover:bg-ink hover:text-paper transition-all"
            aria-label="Next Image"
            onMouseEnter={() => setLabel("CLICK")}
            onMouseLeave={() => setLabel("")}
          >
            →
          </button>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-4 right-4 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono font-bold tracking-widest px-3 py-1.5 rounded-md shadow-sm">
          {activeIndex + 1} / {project.screenshots.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {project.screenshots.map((screen, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 aspect-[16/10] w-24 rounded-lg overflow-hidden border transition-all ${
                isActive ? "border-ink scale-95 shadow-sm" : "border-ink/10 hover:border-ink/30 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={screen.url}
                alt={`${project.title} Thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
