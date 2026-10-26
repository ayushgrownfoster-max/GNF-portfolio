import Link from "next/link";
import RevealText from "./RevealText";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-4 pt-24 text-paper md:px-10 overflow-hidden relative">
      <div className="mx-auto max-w-site relative z-10">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
          LET&apos;S TALK
        </span>
        <RevealText
          as="h2"
          lines={["Have a business that", "deserves to grow?"]}
          className="font-display text-display-lg text-balance"
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-paper px-7 py-4 text-base font-semibold text-ink transition-all hover:bg-accent hover:text-ink"
          >
            Start a project <span aria-hidden>→</span>
          </Link>
          <a
            href="https://www.upwork.com/freelancers/~01a3b32123f9eff361?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-paper/30 px-7 py-4 text-base font-medium transition-colors hover:bg-paper hover:text-ink"
          >
            Hire me on Upwork <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-paper/15 pt-10 text-sm text-paper/70 md:grid-cols-4">
          <div>
            <p className="mb-3 font-display font-semibold text-paper text-base">Twinka Singhal.</p>
            <p className="leading-relaxed">
              Lead generation, SEO and performance marketing for businesses that want to grow.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-xs uppercase tracking-wider text-paper/40 mb-1">Navigation</span>
            <Link href="/#work" className="hover:text-paper transition-colors">Work</Link>
            <Link href="/#services" className="hover:text-paper transition-colors">Services</Link>
            <Link href="/#workflow" className="hover:text-paper transition-colors">Workflow</Link>
            <Link href="/#about" className="hover:text-paper transition-colors">About</Link>
            <Link href="/contact" className="hover:text-paper transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-xs uppercase tracking-wider text-paper/40 mb-1">Connect</span>
            <a href="mailto:twinkasinghal8@gmail.com" className="hover:text-paper transition-colors">
              twinkasinghal8@gmail.com
            </a>
            <a href="https://www.upwork.com/freelancers/~01a3b32123f9eff361?mp_source=share" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors">
              Upwork profile ↗
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors">
              LinkedIn ↗
            </a>
            <span className="text-paper/40">India · Working Globally</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-xs uppercase tracking-wider text-paper/40 mb-1">Featured Proof</span>
            <span className="text-paper/80">ThoughtSpot (187K+ visitors)</span>
            <span className="text-paper/80">NCR Real Estate (95% OTP)</span>
            <span className="text-paper/80">Primrose School ($4K tuition)</span>
            <span className="text-paper/80">200+ booked enquiries</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between pb-6">
          <span>&copy; {new Date().getFullYear()} Twinka Singhal. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-paper transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-paper transition-colors">Terms of Work</Link>
          </div>
        </div>

        {/* Huge full-width wordmark */}
        <div className="w-full flex items-center justify-center mt-6 -mb-4 md:-mb-8">
          <svg
            className="w-full h-auto text-paper/20 select-none"
            viewBox="0 0 1250 120"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="85%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-display uppercase font-bold tracking-tighter"
              style={{ fontSize: "105px" }}
            >
              TWINKA SINGHAL
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}

