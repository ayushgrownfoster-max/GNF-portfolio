"use client";

import { motion } from "framer-motion";
import RevealText from "./RevealText";

const PRINCIPLES = [
  {
    number: "01",
    title: "Real relationships",
    body: "I work with clients, not for invoices. My own growth is tied to yours.",
  },
  {
    number: "02",
    title: "Plan before action",
    body: "Every project starts with an audit, a clear plan and an agreed ideal customer.",
  },
  {
    number: "03",
    title: "Measured results",
    body: "I focus on numbers you can check: meetings booked, rankings, cost per lead and ROAS.",
  },
  {
    number: "04",
    title: "Clear reporting",
    body: "You always know what was done and what moved, in plain language.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-28 md:px-10 bg-mist/60">
      <div className="mx-auto max-w-site">
        {/* Top Split: Story & Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-20 border-b border-ink/10">
          <div className="lg:col-span-6">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
              ABOUT ME
            </span>
            <RevealText
              as="h2"
              lines={["I don't just run campaigns.", "I help businesses grow."]}
              className="font-display text-display-md text-balance leading-tight"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-base md:text-lg text-ink/75 leading-relaxed pt-2">
            <p>
              I&apos;m <strong className="text-ink font-semibold">Twinkle Singhal</strong>, a digital marketing and lead generation specialist with <strong className="text-ink font-semibold">10+ years of experience</strong> working with clients across India, the USA, the UK, Canada, Australia, Dubai and the GCC.
            </p>
            <p>
              I believe in real client relationships. My own growth is tied to yours, so I plan carefully, keep you updated and focus on results you can measure: booked meetings, qualified pipeline, top search rankings, and predictable ROAS.
            </p>
            <div className="pt-2">
              <a
                href="https://www.upwork.com/freelancers/~01a3b32123f9eff361?mp_source=share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-sm transition-all hover:bg-accent hover:text-ink"
              >
                Hire me on Upwork <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Split: What you can expect from me */}
        <div className="mt-20">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            HOW I WORK
          </span>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-ink mb-12">
            What you can expect from me
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((p, idx) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl bg-paper p-8 shadow-sm border border-ink/8 flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-accent-dim font-bold text-2xl mb-3 block">
                    {p.number}
                  </span>
                  <h4 className="font-display text-xl font-bold text-ink mb-2">
                    {p.title}
                  </h4>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
