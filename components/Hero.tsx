"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import RevealText from "./RevealText";

/* ─── Typing Effect Hook ─── */
function useTypewriter(phrases: string[], speed = 55, pauseMs = 2000, deleteSpeed = 30) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), deleteSpeed);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }
  }, [charIdx, deleting, phraseIdx, phrases, speed, pauseMs, deleteSpeed]);

  useEffect(() => {
    setDisplayed(phrases[phraseIdx].slice(0, charIdx));
  }, [charIdx, phraseIdx, phrases]);

  return displayed;
}

const TAGLINES = [
  "Brands that grow.",
  "Stories that stick.",
  "Digital that converts.",
  "Creative that performs.",
  "Marketing with meaning.",
];

const STATS = [
  { value: "250+", label: "Projects Delivered" },
  { value: "85+", label: "Brands Grown" },
  { value: "3.8×", label: "Average ROAS" },
  { value: "12+", label: "Industries" },
];

/* ─── Main Hero Component ─── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const typedText = useTypewriter(TAGLINES);

  return (
    <section ref={containerRef} className="relative flex flex-col pt-20 pb-0 overflow-hidden">
      {/* Ambient background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_80%_0%,rgba(201,243,29,0.16),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-site px-6 md:px-10 flex flex-col z-10">

        {/* ── Hero Text Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full pt-6 pb-4"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-ink/30" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink/45">
              Creative &amp; Digital Agency — Mumbai, India
            </span>
          </div>

          {/* H1 Headline */}
          <RevealText
            as="h1"
            lines={["Your Creative, Media &", "Technology", "Transformation Partner"]}
            className="font-display text-[2.4rem] leading-[1.06] md:text-[3.8rem] lg:text-[5rem] xl:text-[6rem] font-bold text-ink tracking-tight"
          />

          {/* Typing tagline — large, prominent */}
          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 min-h-[3rem]">
            <span className="font-display text-2xl md:text-3xl text-ink/40 font-light">
              We build
            </span>
            <span className="font-display text-2xl md:text-3xl font-bold text-ink">
              {typedText}
              <span className="inline-block w-[2.5px] h-[0.9em] bg-ink ml-1 align-middle animate-blink" />
            </span>
          </div>
        </motion.div>

        {/* ── Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-x-8 gap-y-3 py-4 border-y border-ink/8 mb-5"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="font-display text-2xl md:text-3xl font-bold text-ink">{s.value}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">{s.label}</span>
            </div>
          ))}
          <div className="ml-auto hidden md:flex items-center gap-2 text-xs font-medium text-ink/50">
            <Link href="/work" className="hover:text-ink transition-colors underline underline-offset-4 decoration-ink/20 hover:decoration-ink">
              View our work →
            </Link>
          </div>
        </motion.div>

        {/* ── Full Width Video ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full relative h-[55vh] lg:h-[72vh] min-h-[420px] rounded-t-3xl overflow-hidden shadow-2xl"
          style={{ y: yBg, opacity: opacityBg }}
        >
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/40" />

          {/* Overlay text on video */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper/60 mb-1">
                  Our Story
                </p>
                <p className="font-display text-xl md:text-2xl font-semibold text-paper max-w-sm leading-snug">
                  We don't just market brands. We help them grow.
                </p>
              </div>

              {/* Floating badge */}
              <div className="bg-paper/90 backdrop-blur-md rounded-2xl px-5 py-3.5 shadow-xl border border-ink/5 self-start md:self-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40 mb-1">
                  Results-Driven Agency
                </p>
                <p className="font-display text-sm font-semibold text-ink">
                  250+ Projects · 85+ Brands · 3.8× ROAS
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
