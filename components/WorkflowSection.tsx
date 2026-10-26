"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

const STEPS: WorkflowStep[] = [
  {
    number: "01",
    title: "Discovery and goals",
    description:
      "We agree what a good result looks like and who your ideal buyer is: role, industry, company size and region.",
    deliverable: "You get: A clear brief",
  },
  {
    number: "02",
    title: "Audit and plan",
    description:
      "I audit your website, profiles and current campaigns, review your competitors and build a three-month plan.",
    deliverable: "You get: A plan you can approve",
  },
  {
    number: "03",
    title: "Build the foundation",
    description:
      "Verified prospect lists, warmed sending setups, ad creatives, content and tracking, all ready before launch.",
    deliverable: "You get: Everything ready to go live",
  },
  {
    number: "04",
    title: "Launch and outreach",
    description:
      "LinkedIn, email, SEO, local search, social media and ads go live and are managed week by week.",
    deliverable: "You get: Steady activity every week",
  },
  {
    number: "05",
    title: "Capture and route leads",
    description:
      "Interested replies are booked into your calendar and tracked in your CRM. Ad leads are verified and routed to your team fast.",
    deliverable: "You get: Warm, qualified leads",
  },
  {
    number: "06",
    title: "Report and improve",
    description:
      "Regular reports show what moved, and the next month's plan builds on the data.",
    deliverable: "You get: Weekly or monthly reports",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="px-6 py-28 md:px-10 bg-mist/40 border-y border-ink/5">
      <div className="mx-auto max-w-site">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="MY WORKFLOW"
            lines={["From first message to", "steady leads"]}
          />
          <p className="mt-6 text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
            The same six steps run behind every service, so you always know what is happening and what comes next.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col justify-between rounded-2xl bg-paper p-8 shadow-sm border border-ink/8 hover:shadow-md hover:border-ink/20 transition-all duration-300"
            >
              <div>
                <span className="font-display text-accent-dim font-bold text-2xl md:text-3xl block mb-4">
                  {step.number}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-3 group-hover:text-accent-dim transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-ink/10">
                <span className="inline-block rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-ink/80 border border-ink/10">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
