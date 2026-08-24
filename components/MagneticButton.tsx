"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  onClick,
  href,
  className,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion(href ? "a" : "button") as typeof motion.button;

  return (
    <Comp
      // @ts-expect-error - ref type varies with the underlying element
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-ink hover:text-paper",
        className
      )}
    >
      {children}
    </Comp>
  );
}
