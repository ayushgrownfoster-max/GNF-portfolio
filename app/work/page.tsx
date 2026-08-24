import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import { getCaseStudies } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies across branding, performance marketing, SEO, and creative campaigns for brands across industries.",
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <section className="px-6 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-site">
        <RevealText
          as="h1"
          lines={["Enter the world", "of our work."]}
          className="font-display text-display-lg text-balance"
        />
        <p className="mt-8 max-w-lg text-lg text-ink/60">
          Every project here started as a business problem, not a brief for
          more content. Filter by what you're solving for.
        </p>

        <div className="mt-16">
          <CaseStudyGrid caseStudies={caseStudies} filterBy="services" />
        </div>
      </div>
    </section>
  );
}
