"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CapabilitySlide {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  stat: string;
  statLabel: string;
  linkHref: string;
}

const CAPABILITIES: CapabilitySlide[] = [
  {
    id: "lead-gen",
    number: "01",
    title: "Lead Generation",
    tag: "B2B PIPELINE",
    description:
      "Targeted customer acquisition systems converting cold market audiences into scheduled sales calendar calls.",
    stat: "200+",
    statLabel: "Meetings & Enquiries",
    linkHref: "/#services",
  },
  {
    id: "linkedin",
    number: "02",
    title: "LinkedIn Outreach",
    tag: "SALES NAVIGATOR",
    description:
      "Precision prospect lists, 180+ weekly connection requests, and personalized follow-ups for senior decision-makers.",
    stat: "27%",
    statLabel: "Avg Acceptance Rate",
    linkHref: "/#services",
  },
  {
    id: "email",
    number: "03",
    title: "Email Marketing",
    tag: "COLD & NURTURE",
    description:
      "Warmed secondary sending infrastructure, persuasive offer copy, and automated follow-up sequences.",
    stat: "43%",
    statLabel: "Average Open Rate",
    linkHref: "/#services",
  },
  {
    id: "seo",
    number: "04",
    title: "SEO, AEO and GEO",
    tag: "SEARCH & AI VISIBILITY",
    description:
      "Technical audits, schema markup, and content engineered to rank in Google and be cited in ChatGPT, Gemini & Perplexity.",
    stat: "187K+",
    statLabel: "Monthly Organic Visitors",
    linkHref: "/#services",
  },
  {
    id: "gbp",
    number: "05",
    title: "Google Business Profile",
    tag: "LOCAL SEARCH 3-PACK",
    description:
      "Complete profile optimization, citation cleanup, and location landing pages that generate phone calls and foot traffic.",
    stat: "#1",
    statLabel: "Local 3-Pack Rankings",
    linkHref: "/#services",
  },
  {
    id: "ads",
    number: "06",
    title: "Social Media & Paid Ads",
    tag: "PERFORMANCE MARKETING",
    description:
      "Meta and Google ad campaigns optimized for verified lead quality with integrated OTP verification to block spam.",
    stat: "95%+",
    statLabel: "Verified Lead Quality",
    linkHref: "/#services",
  },
];

export default function CapabilitySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, CAPABILITIES.length - visibleCount);

  // Auto-advance slider every 4 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
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
      className="border-y border-ink/10 py-12 bg-paper relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-site px-6 md:px-10">
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">
              CORE LEAD CAPABILITIES
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous capability"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-all hover:bg-ink hover:text-paper hover:border-ink"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              aria-label="Next capability"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-all hover:bg-ink hover:text-paper hover:border-ink"
            >
              →
            </button>
          </div>
        </div>

        {/* Slider viewport */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `-${currentIndex * (100 / visibleCount)}%`,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {CAPABILITIES.map((item, idx) => (
              <div
                key={item.id}
                className="w-full shrink-0 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-mist/40 p-6 md:p-8 transition-all duration-300 hover:border-ink/30 hover:bg-mist/70 hover:shadow-lg">
                  <div>
                    {/* Top line: number + tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-bold text-ink/40">
                        {item.number}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-ink/10 bg-paper/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink/70">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl font-bold text-ink group-hover:text-ink/90 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom metrics + link */}
                  <div className="mt-8 pt-5 border-t border-ink/10 flex items-end justify-between">
                    <div>
                      <span className="block font-display text-2xl font-bold text-ink">
                        {item.stat}
                      </span>
                      <span className="text-[11px] font-medium text-ink/50 uppercase tracking-wider">
                        {item.statLabel}
                      </span>
                    </div>
                    <Link
                      href={item.linkHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/80 transition-colors group-hover:text-ink"
                    >
                      <span>Explore</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {CAPABILITIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-8 bg-ink"
                  : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
