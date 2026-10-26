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
  "fills your sales calendar.",
  "books qualified meetings.",
  "scales B2B & trade pipelines.",
  "converts cold outreach into buyers.",
];

const STATS = [
  { value: "200+", label: "meetings and enquiries generated" },
  { value: "27%", label: "average LinkedIn acceptance rate" },
  { value: "43%", label: "average email open rate" },
  { value: "10+", label: "years in digital marketing" },
];

/* ─── Main Hero Component ─── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const typedText = useTypewriter(TAGLINES);

  return (
    <section ref={containerRef} className="relative flex flex-col pt-24 pb-0 overflow-hidden">
      {/* Ambient background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_80%_0%,rgba(201,243,29,0.18),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-site px-6 md:px-10 flex flex-col z-10">

        {/* ── Hero Text Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full pt-6 pb-6"
        >
          {/* Eyebrow Pill */}


          {/* H1 Headline */}
          <RevealText
            as="h1"
            lines={["Lead generation that", "fills your sales calendar."]}
            className="font-display text-[2.6rem] leading-[1.04] md:text-[4rem] lg:text-[5.2rem] xl:text-[6.2rem] font-bold text-ink tracking-tight max-w-5xl"
          />

          {/* Typing tagline — dynamic punch */}
          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 min-h-[2.5rem]">
            <span className="font-display text-xl md:text-2xl text-ink/40 font-light">
              Campaigns that
            </span>
            <span className="font-display text-xl md:text-2xl font-bold text-ink">
              {typedText}
              <span className="inline-block w-[2.5px] h-[0.9em] bg-ink ml-1 align-middle animate-blink" />
            </span>
          </div>

          {/* Subtext from the design */}
          <div className="mt-6 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45 mb-2">
              How I generate leads
            </p>
            <p className="text-base md:text-lg text-ink/75 leading-relaxed">
              I generate qualified leads for your business through LinkedIn, email, SEO, local search, and social media with paid ads, and hand your team warm enquiries. For businesses in the USA, Canada, UK, India and the GCC.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold text-ink shadow-sm transition-all hover:bg-ink hover:text-paper"
            >
              See my work <span aria-hidden>↓</span>
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01a3b32123f9eff361?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-4 text-sm font-semibold text-ink transition-all hover:border-ink hover:bg-mist"
            >
              Hire me on Upwork <span aria-hidden>↗</span>
            </a>
          </div>
        </motion.div>

        {/* ── Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-ink/10 my-6"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink">
                {s.value}
              </span>
              <span className="mt-1 text-xs md:text-sm font-medium text-ink/55 leading-snug">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Visual Editorial Showcase Banner (No Video) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full relative rounded-3xl overflow-hidden bg-[#141414] p-8 md:p-12 border border-ink/10 text-paper mb-8 shadow-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,243,29,0.15),transparent_65%)]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                ABOUT TWINKLE SINGHAL
              </span>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-paper leading-snug">
                I don&apos;t just run campaigns. <br className="hidden sm:inline" />
                <span className="text-paper/70 font-normal">I help businesses grow with predictable pipeline.</span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-5 shadow-lg self-start md:self-auto min-w-[260px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/50 mb-1">
                Proven Client Outcomes
              </p>
              <p className="font-display text-base font-semibold text-paper">
                200+ Meetings · 10+ Yrs
              </p>
              <p className="text-xs text-accent mt-1 font-medium">
                USA · UK · Canada · GCC · India
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
