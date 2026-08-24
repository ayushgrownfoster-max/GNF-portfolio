"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { Media } from "@/lib/types";

interface RevealImageProps {
  media: Media;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function RevealImage({
  media,
  className,
  sizes = "100vw",
  priority = false,
}: RevealImageProps) {
  return (
    <div className={clsx("relative overflow-hidden bg-mist", className)}>
      <motion.div
        className="absolute inset-0 z-10 bg-ink origin-bottom"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={media.url}
          alt={media.alt || ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
