import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import CaseStudyStats from "@/components/CaseStudyStats";
import ClientMarquee from "@/components/ClientMarquee";
import { getSiteStats, getClients } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description:
    "Twinka Singhal is a digital marketing and lead generation specialist with 10+ years of experience working with clients globally.",
};

export default async function AboutPage() {
  const [siteStats, clients] = await Promise.all([getSiteStats(), getClients()]);

  return (
    <>
      <section className="px-6 pb-20 pt-40 md:px-10">
        <div className="mx-auto max-w-site">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            About Twinka Singhal
          </span>
          <RevealText
            as="h1"
            lines={["I don't just run campaigns.", "I help businesses grow."]}
            className="font-display text-display-lg text-balance"
          />
          <p className="mt-10 max-w-2xl text-lg text-ink/70 leading-relaxed">
            I&apos;m Twinka Singhal, a digital marketing specialist with 10+ years of experience working with clients across India, the USA, the UK, Canada, Australia, Dubai and the GCC. I believe in real client relationships. My own growth is tied to yours, so I plan carefully, keep you updated and focus on results you can measure.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-site">
          <CaseStudyStats stats={siteStats} />
        </div>
      </section>

      <section className="border-y border-ink/10 py-16">
        <div className="mx-auto max-w-site px-6 md:px-10 mb-8">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink/45 text-center">
            BUSINESSES I HAVE WORKED WITH
          </span>
        </div>
        <ClientMarquee clients={clients} />
      </section>

      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-site grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
              How I Work
            </span>
            <h2 className="font-display text-display-sm text-balance">
              Plan before action. Real relationships. Measured outcomes.
            </h2>
          </div>
          <div className="space-y-4 text-ink/70 leading-relaxed">
            <p>
              Every project starts with an audit, a clear plan, and an agreed ideal customer. Whether structuring cold email domains, deploying Sales Navigator LinkedIn touchpoints, or scaling Meta and Google ad ROAS, I treat each channel like an accountable sales driver.
            </p>
            <p>
              You always know what was done and what moved in plain language through weekly check-ins and monthly reporting.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
