import Link from "next/link";
import RevealText from "./RevealText";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-4 pt-24 text-paper md:px-10 overflow-hidden relative">
      <div className="mx-auto max-w-site relative z-10">
        <RevealText
          as="h2"
          lines={["Have a brand", "that deserves to grow?"]}
          className="font-display text-display-lg text-balance"
        />
        <Link
          href="/contact"
          className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-paper/30 px-7 py-4 text-base font-medium transition-colors hover:bg-paper hover:text-ink"
        >
          Start a Project <span aria-hidden>→</span>
        </Link>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-paper/15 pt-10 text-sm text-paper/70 md:grid-cols-4">
          <div>
            <p className="mb-3 font-medium text-paper">Grow N Foster</p>
            <p>A creative &amp; digital<br />marketing agency.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/work" className="hover:text-paper transition-colors">Work</Link>
            <Link href="/services" className="hover:text-paper transition-colors">Services</Link>
            <Link href="/about" className="hover:text-paper transition-colors">About</Link>
            <Link href="/portfolio" className="hover:text-paper transition-colors">Portfolio</Link>
          </div>
          <div className="flex flex-col gap-2">
            <a href="mailto:hello@grownfoster.com" className="hover:text-paper transition-colors">hello@grownfoster.com</a>
            <a href="tel:+911234567890" className="hover:text-paper transition-colors">+91 12345 67890</a>
            <span>Mumbai, India</span>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">Instagram</a>
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">LinkedIn</a>
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">X (Twitter)</a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between pb-8">
          <span>&copy; {new Date().getFullYear()} Grow N Foster. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-paper transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-paper transition-colors">Terms</Link>
          </div>
        </div>

        {/* Huge full-width wordmark */}
        <div className="w-full flex items-center justify-center mt-8 -mb-4 md:-mb-8">
          <svg className="w-full h-auto text-paper/20 select-none" viewBox="0 0 1000 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <text x="50%" y="85%" dominantBaseline="middle" textAnchor="middle" className="font-display uppercase font-bold tracking-tighter" style={{ fontSize: '120px' }}>
              GROW N FOSTER
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
