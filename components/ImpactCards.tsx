"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCursor } from "./CustomCursor";

interface ImpactCardItem {
  tag: string;
  stat: string;
  statLabel: string;
  title: string;
  client: string;
  href?: string;
}

const IMPACT_ITEMS: ImpactCardItem[] = [
  {
    tag: "SEO, AEO AND GEO",
    stat: "187,100+",
    statLabel: "monthly organic visitors",
    title: "Growing organic traffic and AI search visibility",
    client: "ThoughtSpot",
    href: "/work",
  },
  {
    tag: "PERFORMANCE MARKETING",
    stat: "95%+",
    statLabel: "fake lead reduction",
    title: "Solving the fake lead problem with OTP verification",
    client: "NCR Real Estate Developer",
    href: "/work",
  },
  {
    tag: "EMAIL MARKETING",
    stat: "6",
    statLabel: "tours booked",
    title: "A $4,000 offer that brought families back for a tour",
    client: "Primrose School of Rockland",
    href: "/work",
  },
];

export default function ImpactCards() {
  const { setLabel } = useCursor();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {IMPACT_ITEMS.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex flex-col justify-between rounded-3xl bg-[#161616] p-8 md:p-10 text-paper transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl border border-white/10"
          onMouseEnter={() => setLabel("VIEW")}
          onMouseLeave={() => setLabel("")}
        >
          {/* Subtle gradient glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div>
            {/* Tag badge */}
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
              {item.tag}
            </div>

            {/* Stat */}
            <div className="mt-8">
              <span className="block font-display text-4xl lg:text-5xl font-bold tracking-tight text-paper">
                {item.stat}
              </span>
              <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-paper/50">
                {item.statLabel}
              </span>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-paper/40 block mb-1">
              {item.client}
            </span>
            <h3 className="font-display text-lg lg:text-xl font-medium leading-snug text-paper/90 group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-paper/60 group-hover:text-paper transition-colors">
              <span>View outcome</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
