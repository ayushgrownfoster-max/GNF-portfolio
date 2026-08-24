import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CaseStudyCard from "@/components/CaseStudyCard";
import ServiceList from "@/components/ServiceList";
import Marquee from "@/components/Marquee";
import ClientMarquee from "@/components/ClientMarquee";
import CaseStudyStats from "@/components/CaseStudyStats";
import Testimonial from "@/components/Testimonial";
import InsightCard from "@/components/InsightCard";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import {
  getFeaturedCaseStudies,
  getServices,
  getClients,
  getSiteStats,
  getTestimonials,
  getInsights,
} from "@/lib/wordpress";

export const revalidate = 300;

const MARQUEE_WORDS = [
  "STRATEGY", "CREATIVE", "DESIGN", "SEO", "SOCIAL", "PERFORMANCE", "TECHNOLOGY", "CONTENT",
];

export default async function HomePage() {
  const [featured, services, clients, siteStats, testimonials, insights] =
    await Promise.all([
      getFeaturedCaseStudies(),
      getServices(),
      getClients(),
      getSiteStats(),
      getTestimonials(),
      getInsights(),
    ]);

  // Large / two small / large / horizontal editorial pattern from the brief.
  const layoutPattern: Array<"large" | "medium" | "horizontal"> = [
    "large", "medium", "medium", "large", "horizontal",
  ];

  return (
    <>
      <Hero />

      {/* Featured Case Studies */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selected Work" lines={["Work That Made", "An Impact"]} />
            <Link
              href="/work"
              className="text-sm font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              View all work →
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
            {featured.map((cs, i) => {
              const size = layoutPattern[i % layoutPattern.length];
              return (
                <div key={cs.slug} className={size !== "medium" ? "md:col-span-2" : undefined}>
                  <CaseStudyCard caseStudy={cs} size={size} priority={i === 0} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Marquee */}
      <section className="border-y border-ink/10 py-8">
        <Marquee speedSeconds={26}>
          {MARQUEE_WORDS.map((word) => (
            <span key={word} className="mx-6 font-display text-2xl text-ink/20 md:text-4xl">
              {word}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Services */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-site">
          <SectionHeading eyebrow="What We Do" lines={["Capabilities Built", "Around Outcomes"]} />
          <div className="mt-16">
            <ServiceList services={services} />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-mist px-6 py-28 md:px-10">
        <div className="mx-auto max-w-site">
          <RevealText
            as="h2"
            lines={["We don't just market brands.", "We help them grow."]}
            className="font-display text-display-md text-balance"
          />
          <p className="mt-8 max-w-xl text-lg text-ink/60">
            Grow N Foster is a creative and digital marketing agency focused
            on meaningful brand experiences, measurable growth, and strong
            digital identities — for brands that would rather be remembered
            than merely recognized.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            More about the agency →
          </Link>
        </div>
      </section>

      {/* Client logos */}
      <section className="border-y border-ink/10 py-16">
        <ClientMarquee clients={clients} />
      </section>

      {/* Results */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-site">
          <SectionHeading eyebrow="By the Numbers" lines={["Results, Not", "Just Reports"]} />
          <div className="mt-16">
            <CaseStudyStats stats={siteStats} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink px-6 py-28 text-paper md:px-10">
        <div className="mx-auto max-w-site">
          <span className="mb-10 block text-xs font-medium uppercase tracking-[0.2em] text-paper/50">
            Client Voices
          </span>
          <Testimonial items={testimonials} />
        </div>
      </section>

      {/* Insights teaser */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Insights" lines={["Thinking Out Loud"]} />
            <Link
              href="/insights"
              className="text-sm font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              View all insights →
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {insights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 pb-28 pt-8 md:px-10">
        <div className="mx-auto max-w-site rounded-3xl bg-mist px-8 py-20 text-center md:px-16">
          <RevealText
            as="h2"
            lines={["Have a brand that", "deserves to grow?"]}
            className="mx-auto font-display text-display-md text-balance"
          />
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact">
              Start a Project <span aria-hidden>→</span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
