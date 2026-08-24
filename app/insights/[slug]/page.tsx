import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RevealImage from "@/components/RevealImage";
import { getInsights, getInsightBySlug } from "@/lib/wordpress";

export const revalidate = 300;

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.excerpt,
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      images: [insight.featuredImage.url],
      type: "article",
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: { slug: string };
}) {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) notFound();

  const date = new Date(insight.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="px-6 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
          <span>{insight.categories[0]}</span>
          <span aria-hidden>·</span>
          <span>{date}</span>
          <span aria-hidden>·</span>
          <span>{insight.readingTime} min read</span>
        </div>

        <h1 className="mt-6 font-display text-display-md text-balance">
          {insight.title}
        </h1>
        <p className="mt-4 text-sm text-ink/50">By {insight.author}</p>

        <RevealImage
          media={insight.featuredImage}
          priority
          className="mt-12 aspect-[16/9] w-full"
        />

        <div className="prose prose-neutral mt-12 max-w-none text-ink/80">
          {/* NOTE: once connected to WordPress, insight.content will be
              rendered block/HTML content from the CMS via a sanitizer
              (e.g. rehype/dompurify) rather than raw text. */}
          <p>{insight.content}</p>
        </div>
      </div>
    </article>
  );
}
