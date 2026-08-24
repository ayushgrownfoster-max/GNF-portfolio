import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getAdjacentCaseStudy,
} from "@/lib/wordpress";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyStats from "@/components/CaseStudyStats";
import CaseStudyGallery from "@/components/CaseStudyGallery";
import CaseStudyTimeline from "@/components/CaseStudyTimeline";
import CaseStudyCard from "@/components/CaseStudyCard";
import SectionHeading from "@/components/SectionHeading";
import Testimonial from "@/components/Testimonial";

export const revalidate = 300;

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    alternates: { canonical: caseStudy.seo.canonical },
    openGraph: {
      title: caseStudy.seo.title,
      description: caseStudy.seo.description,
      images: caseStudy.seo.ogImage ? [caseStudy.seo.ogImage.url] : [caseStudy.heroMedia.url],
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) notFound();

  const next = await getAdjacentCaseStudy(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: "/work" },
      { "@type": "ListItem", position: 2, name: caseStudy.title, item: caseStudy.seo.canonical },
    ],
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CaseStudyHero caseStudy={caseStudy} />

      <article className="px-6 md:px-10">
        <div className="mx-auto max-w-site space-y-24 pb-24 md:space-y-32">
          <StorySection eyebrow="The Challenge" body={caseStudy.challenge} />
          <StorySection eyebrow="The Insight" body={caseStudy.insight} />

          <div>
            <SectionHeading eyebrow="The Strategy" lines={["How We", "Approached It"]} />
            <div className="mt-12">
              <CaseStudyTimeline steps={caseStudy.strategy} />
            </div>
          </div>

          <StorySection eyebrow="The Solution" body={caseStudy.solution} />

          <div>
            <SectionHeading eyebrow="Execution" lines={["Bringing It", "To Life"]} />
            <div className="mt-12">
              <CaseStudyGallery items={caseStudy.execution} />
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Gallery" lines={["The Full", "Campaign"]} />
            <div className="mt-12">
              <CaseStudyGallery items={caseStudy.gallery} />
            </div>
          </div>

          <div className="rounded-3xl bg-ink px-6 py-16 text-paper md:px-16">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-paper/50">
              Results
            </span>
            <CaseStudyStats stats={caseStudy.stats} theme="dark" />
          </div>

          {caseStudy.testimonial && (
            <div>
              <span className="mb-10 block text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
                Impact
              </span>
              <Testimonial items={[caseStudy.testimonial]} />
            </div>
          )}
        </div>
      </article>

      {next && (
        <section className="border-t border-ink/10 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-site">
            <span className="mb-8 block text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
              Next Case Study
            </span>
            <Link href={`/work/${next.slug}`} className="block max-w-2xl">
              <CaseStudyCard caseStudy={next} size="large" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

function StorySection({ eyebrow, body }: { eyebrow: string; body: string }) {
  return (
    <div>
      <span className="mb-6 block text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
        {eyebrow}
      </span>
      <p className="max-w-3xl font-display text-display-sm text-balance">{body}</p>
    </div>
  );
}
