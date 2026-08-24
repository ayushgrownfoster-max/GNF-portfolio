"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";

/* ─── Scroll-expand hero images ─── */
const HERO_IMAGES = [
  { seed: "photo-1522202176988-66273c2fd55f", alt: "Creative team collaborating on brand strategy" },
  { seed: "photo-1497366216548-37526070297c", alt: "Modern agency workspace" },
];

function ScrollExpandImage({ seed, alt, index }: { seed: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const scaleX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.65, 1, 1, 1, 0.65]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["24px", "0px", "0px", "0px", "24px"]);

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto overflow-hidden mt-4"
      style={{ scaleX, borderRadius, height: "clamp(260px, 32vw, 520px)", width: "100%", transformOrigin: "center" }}
    >
      <Image
        src={`https://images.unsplash.com/${seed}?w=2400&h=1200&fit=crop`}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
    </motion.div>
  );
}

/* ─── Main Hero Component ─── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative flex flex-col pt-32 pb-16 overflow-hidden min-h-screen">
      {/* Ambient background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_80%_0%,rgba(201,243,29,0.16),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-site px-6 md:px-10 flex flex-col z-10">
        
        {/* Top Content: Massive Text */}
        <div className="w-full pt-10 lg:pt-16 pb-12">
          <RevealText
            as="h1"
            lines={["Your Creative, Media &", "Technology", "Transformation Partner"]}
            className="font-display text-[2.5rem] leading-[1.1] md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-ink tracking-tight"
          />
        </div>

        {/* Bottom Content: Full Width Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full relative h-[60vh] lg:h-[80vh] min-h-[500px] rounded-t-3xl overflow-hidden shadow-2xl"
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
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-ink/20" />
        </motion.div>
      </div>

      {/* Hero images strip — scroll-expand effect below the fold */}
      <div className="mt-8 w-full z-10">
        <div className="flex flex-col gap-4">
          {HERO_IMAGES.map((img, i) => (
            <ScrollExpandImage key={img.seed} {...img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
