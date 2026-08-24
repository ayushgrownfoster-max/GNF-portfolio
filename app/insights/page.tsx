import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import InsightCard from "@/components/InsightCard";
import { getInsights } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on branding, performance marketing, SEO, and creative strategy from the Grow N Foster team.",
};

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <section className="px-6 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-site">
        <RevealText
          as="h1"
          lines={["Thinking", "out loud."]}
          className="font-display text-display-lg text-balance"
        />
        <div className="mt-20 grid grid-cols-1 gap-14 md:grid-cols-3">
          {insights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </div>
    </section>
  );
}
