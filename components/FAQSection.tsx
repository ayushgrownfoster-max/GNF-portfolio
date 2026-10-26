"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Can I hire you for just one service?",
    answer:
      "Yes. You can start with one channel, such as LinkedIn outreach or SEO, and add others later.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I work with clients across India, the USA, Canada, the UK, Australia, Dubai and the GCC.",
  },
  {
    question: "How will I see progress?",
    answer:
      "Through regular reports. Email and LinkedIn campaigns are reported weekly, and SEO is reported monthly.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "A short brief on your business and goals, plus access to the accounts we will work in, such as Google Analytics, Search Console, Google Business Profile or your ad accounts.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="px-6 py-28 md:px-10 bg-paper">
      <div className="mx-auto max-w-site">
        <div className="max-w-3xl mb-16">
          <SectionHeading
            eyebrow="FAQ"
            lines={["Questions I get asked"]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => toggle(idx)}
                className="cursor-pointer rounded-2xl bg-mist/50 p-6 md:p-8 border border-ink/8 hover:border-ink/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg md:text-xl font-bold text-ink">
                    {faq.question}
                  </h3>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink text-sm font-semibold">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm md:text-base text-ink/70 leading-relaxed pt-2 border-t border-ink/10">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
