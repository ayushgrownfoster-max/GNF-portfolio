import Image from "next/image";
import Link from "next/link";
import type { Insight } from "@/lib/types";

export default function InsightCard({ insight }: { insight: Insight }) {
  const date = new Date(insight.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/insights/${insight.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Image
          src={insight.featuredImage.url}
          alt={insight.featuredImage.alt || insight.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-grow group-hover:scale-105"
        />
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.1em] text-ink/50">
          <span>{insight.categories[0]}</span>
          <span aria-hidden>·</span>
          <span>{insight.readingTime} min read</span>
        </div>
        <h3 className="mt-2 font-display text-xl leading-snug">{insight.title}</h3>
        <p className="mt-2 text-sm text-ink/60">{date}</p>
      </div>
    </Link>
  );
}
