"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Client } from "@/lib/types";

interface ClientBrand {
  name: string;
  category: string;
  region: string;
}

const CLIENT_BRANDS: ClientBrand[] = [
  { name: "ThoughtSpot", category: "AI & Search Analytics", region: "Global / USA" },
  { name: "Numeric", category: "Financial Tech & Accounting", region: "USA" },
  { name: "Riot Platforms", category: "Infrastructure & Energy Tech", region: "USA" },
  { name: "UNA Fitness", category: "Health & Fitness Chain", region: "India" },
  { name: "Digicomplish", category: "RPO & Recruitment", region: "India / UK" },
  { name: "Netciples", category: "IT & Cloud Solutions", region: "Global" },
  { name: "Primrose School", category: "Education & Academics", region: "USA" },
  { name: "Aptibit", category: "Software & Technology", region: "India" },
  { name: "Bootz To Heelz", category: "Apparel & Retail", region: "USA" },
  { name: "MPME Abrasives", category: "Industrial Manufacturing", region: "India / GCC" },
  { name: "Munshi OS", category: "B2B SaaS & Productivity", region: "India" },
  { name: "Belt Conveyor Guarding", category: "Industrial Safety", region: "North America" },
  { name: "Table Tutor", category: "EdTech & Learning", region: "Global" },
  { name: "Bell", category: "Telecommunications", region: "Canada" },
  { name: "Check Point", category: "Cybersecurity & Network", region: "Global" },
  { name: "Sparx Digital", category: "Digital Services", region: "UK" },
  { name: "Baruni Solutions", category: "Enterprise Services", region: "Dubai / GCC" },
  { name: "Slatt Capital", category: "Commercial Capital", region: "USA" },
  { name: "Swopelees", category: "B2B Services", region: "USA" },
  { name: "Hypertel Group", category: "Telecom Infrastructure", region: "Global" },
  { name: "The Gate PM Management", category: "Property & Real Estate", region: "GCC" },
];

export default function ClientCarousel({ clients }: { clients?: Client[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, CLIENT_BRANDS.length - visibleCount);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section
      className="border-y border-ink/10 py-16 bg-paper relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-site px-6 md:px-10">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              BUSINESSES I HAVE WORKED WITH
            </span>
            <p className="mt-1 font-display text-xl md:text-2xl font-bold text-ink">
              Trusted by 21+ global teams across USA, UK, India &amp; GCC
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous businesses"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-all hover:bg-ink hover:text-paper hover:border-ink shadow-sm"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              aria-label="Next businesses"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-all hover:bg-ink hover:text-paper hover:border-ink shadow-sm"
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{
              x: `-${currentIndex * (100 / visibleCount)}%`,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            {CLIENT_BRANDS.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="w-full shrink-0 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-mist/35 p-6 transition-all duration-300 hover:border-ink/25 hover:bg-mist/80 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-dim">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Client Partner
                      </span>
                      <span className="text-[10px] font-medium text-ink/40 uppercase">
                        {brand.region}
                      </span>
                    </div>

                    <h4 className="font-display text-xl md:text-2xl font-bold text-ink tracking-tight group-hover:text-accent-dim transition-colors">
                      {brand.name}
                    </h4>

                    <p className="mt-2 text-xs text-ink/60 line-clamp-2">
                      {brand.category}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-[11px] font-medium text-ink/50">
                    <span>Campaign Delivery</span>
                    <span className="text-accent-dim font-bold">✓ Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination bar */}
        <div className="mt-8 flex items-center justify-between">
          <span className="text-xs font-mono text-ink/40">
            {String(currentIndex + 1).padStart(2, "0")} / {String(CLIENT_BRANDS.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: Math.min(8, maxIndex + 1) }).map((_, i) => {
              const targetIdx = Math.round((i / 7) * maxIndex);
              const isActive = Math.abs(currentIndex - targetIdx) <= 1;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(targetIdx)}
                  aria-label={`Go to client group ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-6 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
