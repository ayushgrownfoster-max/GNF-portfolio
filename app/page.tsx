import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ImpactCards from "@/components/ImpactCards";
import CapabilitySlider from "@/components/CapabilitySlider";
import LeadGenServices from "@/components/LeadGenServices";
import WorkflowSection from "@/components/WorkflowSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import ClientCarousel from "@/components/ClientCarousel";
import CaseStudyStats from "@/components/CaseStudyStats";
import Testimonial from "@/components/Testimonial";
import RevealText from "@/components/RevealText";
import {
  getClients,
  getSiteStats,
  getTestimonials,
} from "@/lib/wordpress";

export const revalidate = 300;

export default async function HomePage() {
  const [clients, siteStats, testimonials] =
    await Promise.all([
      getClients(),
      getSiteStats(),
      getTestimonials(),
    ]);

  return (
    <>
      {/* ── 01. Hero Section (No Video) ── */}
      <Hero />

      {/* ── 02. Skills & Capabilities Slider (Lead Gen, LinkedIn, Email, SEO, etc.) ── */}
      <CapabilitySlider />

      {/* ── 03. Selected Work: High-Impact Verified Results ── */}
      <section id="work" className="px-6 py-28 md:px-10 bg-mist/30">
        <div className="mx-auto max-w-site">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="SELECTED WORK"
              lines={["Work that made", "an impact"]}
            />
            <a
              href="#services"
              className="text-sm font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              Explore service outcomes ↓
            </a>
          </div>

          {/* Top 3 High-Impact Cards (ThoughtSpot, NCR Real Estate, Primrose) */}
          <ImpactCards />
        </div>
      </section>

      {/* ── 04. How I Generate Leads (Services & Client Proof) ── */}
      <LeadGenServices />

      {/* ── 05. Workflow: From First Message to Steady Leads ── */}
      <WorkflowSection />

      {/* ── 06. About Me & What you can expect from me ── */}
      <AboutSection />

      {/* ── 07. Businesses I Have Worked With Carousel (ThoughtSpot, Numeric, etc.) ── */}
      <ClientCarousel clients={clients} />

      {/* ── 08. By The Numbers (Results, Not Just Reports) ── */}
      <section className="px-6 py-28 md:px-10 bg-mist/20">
        <div className="mx-auto max-w-site">
          <SectionHeading
            eyebrow="BY THE NUMBERS"
            lines={["Results, not", "just reports"]}
          />
          <div className="mt-16">
            <CaseStudyStats stats={siteStats} />
          </div>
        </div>
      </section>

      {/* ── 09. Client Testimonials ── */}
      <section className="bg-ink px-6 py-28 text-paper md:px-10">
        <div className="mx-auto max-w-site">
          <span className="mb-10 block text-xs font-medium uppercase tracking-[0.2em] text-paper/50">
            Client Voices &amp; Reviews
          </span>
          <Testimonial items={testimonials} />
        </div>
      </section>

      {/* ── 10. FAQ: Questions I Get Asked ── */}
      <FAQSection />

      {/* ── 11. Let's Talk CTA ── */}
      <section className="px-6 pb-28 pt-8 md:px-10">
        <div className="mx-auto max-w-site rounded-3xl bg-mist px-8 py-20 text-center md:px-16 border border-ink/5">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
            LET&apos;S TALK
          </span>
          <RevealText
            as="h2"
            lines={["Have a business that", "deserves to grow?"]}
            className="mx-auto font-display text-display-md text-balance"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-paper transition-all hover:bg-accent hover:text-ink"
            >
              Start a project <span aria-hidden>→</span>
            </Link>
            <a
              href="https://www.upwork.com/freelancers/~01a3b32123f9eff361?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-4 text-sm font-semibold text-ink transition-all hover:border-ink hover:bg-paper"
            >
              Hire me on Upwork <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
