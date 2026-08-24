import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import CaseStudyStats from "@/components/CaseStudyStats";
import ClientMarquee from "@/components/ClientMarquee";
import { getSiteStats, getClients } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description:
    "Grow N Foster is a creative and digital marketing agency focused on meaningful brand experiences, measurable growth, and strong digital identities.",
};

export default async function AboutPage() {
  const [siteStats, clients] = await Promise.all([getSiteStats(), getClients()]);

  return (
    <>
      <section className="px-6 pb-20 pt-40 md:px-10">
        <div className="mx-auto max-w-site">
          <RevealText
            as="h1"
            lines={["We don't just market brands.", "We help them grow."]}
            className="font-display text-display-lg text-balance"
          />
          <p className="mt-10 max-w-2xl text-lg text-ink/60">
            Grow N Foster is a creative and digital marketing agency focused
            on creating meaningful brand experiences, measurable growth, and
            strong digital identities. We're built for founders and marketing
            teams who want a partner that treats every project like a
            business problem first, a creative brief second.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-site">
          <CaseStudyStats stats={siteStats} />
        </div>
      </section>

      <section className="border-y border-ink/10 py-16">
        <ClientMarquee clients={clients} />
      </section>

      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-site grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
              How We Work
            </span>
            <h2 className="font-display text-display-sm text-balance">
              Strategy first. Craft always. No department silos.
            </h2>
          </div>
          <p className="text-ink/60">
            Every case study starts with a business problem, not a channel.
            Strategists, designers, and performance specialists sit on the
            same team from day one — so the creative idea and the media plan
            are built together, not stitched together after the fact.
          </p>
        </div>
      </section>
    </>
  );
}
