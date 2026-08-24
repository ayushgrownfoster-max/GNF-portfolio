import type { CaseStudy } from "@/lib/types";
import RevealText from "./RevealText";
import RevealImage from "./RevealImage";

export default function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="px-6 pb-16 pt-40 md:px-10">
      <div className="mx-auto max-w-site">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
          <span>{caseStudy.client}</span>
          <span aria-hidden>/</span>
          <span>{caseStudy.industry.join(", ")}</span>
          <span aria-hidden>/</span>
          <span>{caseStudy.year}</span>
        </div>

        <RevealText
          as="h1"
          lines={caseStudy.title.split(" ").reduce<string[]>((lines, word, i) => {
            const lineIdx = Math.floor(i / 3);
            lines[lineIdx] = lines[lineIdx] ? `${lines[lineIdx]} ${word}` : word;
            return lines;
          }, [])}
          className="mt-6 font-display text-display-lg text-balance"
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {caseStudy.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-medium text-ink/70"
            >
              {s}
            </span>
          ))}
        </div>

        <RevealImage
          media={caseStudy.heroMedia}
          priority
          sizes="100vw"
          className="mt-14 aspect-[16/9] w-full md:aspect-[21/9]"
        />
      </div>
    </section>
  );
}
