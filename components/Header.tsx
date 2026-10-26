"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Workflow", href: "/#workflow" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

/* ─── Logo typing pill ─── */
const LOGO_TAGS = ["Lead Gen", "LinkedIn", "Cold Email", "SEO & AEO", "Meta & Google Ads"];

function useLogoTypewriter(phrases: string[], speed = 65, pause = 2200, del = 40) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx];
    if (!deleting && char < current.length) {
      const t = setTimeout(() => setChar((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && char === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && char > 0) {
      const t = setTimeout(() => setChar((c) => c - 1), del);
      return () => clearTimeout(t);
    }
    if (deleting && char === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
    }
  }, [char, deleting, idx, phrases, speed, pause, del]);

  useEffect(() => {
    setText(phrases[idx].slice(0, char));
  }, [char, idx, phrases]);

  return text;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const logoTag = useLogoTypewriter(LOGO_TAGS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={clsx(
        "fixed inset-x-0 top-0 z-[900] transition-all duration-500 ease-grow",
        scrolled
          ? "bg-paper/90 backdrop-blur-md py-3 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-6 md:px-10">
        {/* Logo + typing tag */}
        <Link href="/" className="flex items-center gap-0 group">
          <span className="font-display text-lg font-bold tracking-tight">
            Twinka Singhal<span className="text-accent-dim font-bold">.</span>
          </span>
          {/* Dot separator + typing pill */}
          <span className="ml-2 flex items-center gap-1.5 text-ink/40 text-sm font-medium transition-all">
            <span className="text-ink/25 font-bold">·</span>
            <span
              className="text-[11px] font-semibold tracking-wide text-ink/50 overflow-hidden whitespace-nowrap"
              style={{ minWidth: "92px" }}
            >
              {logoTag}
              <span className="inline-block w-[1.5px] h-[0.85em] bg-ink/40 ml-0.5 align-middle animate-blink" />
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-ink/80 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MagneticButton href="/contact" className="hidden md:inline-flex">
          Start a Project <span aria-hidden>→</span>
        </MagneticButton>

        <MobileMenu />
      </div>
    </motion.header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={clsx(
            "block h-[1.5px] w-6 bg-ink transition-transform duration-300",
            open && "translate-y-[3.5px] rotate-45"
          )}
        />
        <span
          className={clsx(
            "block h-[1.5px] w-6 bg-ink transition-transform duration-300",
            open && "-translate-y-[3.5px] -rotate-45"
          )}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 top-[64px] z-[900] flex flex-col gap-1 bg-paper px-6 pb-8 pt-4 shadow-lg"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 py-4 text-lg font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper"
          >
            Start a Project →
          </Link>
        </motion.div>
      )}
    </div>
  );
}
