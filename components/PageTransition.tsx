"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const maskVariants = {
  initial: { scaleY: 0 },
  animate: { scaleY: 0, transition: { duration: 0.01 } },
  exit: {
    scaleY: [0, 1, 1, 0],
    transition: { duration: 0.8, times: [0, 0.4, 0.6, 1], ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[998] origin-top bg-ink pointer-events-none"
          variants={maskVariants}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
