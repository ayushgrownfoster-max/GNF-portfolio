import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import RevealImage from "@/components/RevealImage";
import { getPortfolioProjects, getPortfolioProjectBySlug } from "@/lib/wordpress";
import ProjectGallery from "./ProjectGallery";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getPortfolioProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnail.url],
    },
  };
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getPortfolioProjectBySlug(params.slug);
  if (!project) notFound();

  // Find adjacent project for easy navigation
  const allProjects = await getPortfolioProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="px-6 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-site">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50 hover:text-ink transition-colors mb-10"
        >
          ← Back to Portfolio
        </Link>

        {/* Layout: Info & Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Project Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink/50">
                <span>{project.client}</span>
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span>{project.year}</span>
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span>
                  {project.category === "mern" ? "MERN Stack" : project.category === "wordpress" ? "WordPress" : "Squarespace"}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
                {project.title}
              </h1>
            </div>

            {/* Long Description */}
            <div className="prose prose-neutral text-ink/80 leading-relaxed text-base space-y-4">
              <p>{project.longDescription}</p>
            </div>

            {/* Tech Stack Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink/40">Technologies & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-medium text-ink/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Website Link */}
            {project.liveUrl && (
              <div className="pt-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-paper text-sm font-semibold rounded-full hover:bg-ink/80 transition-colors shadow-sm"
                >
                  Visit Live Project ↗
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Image Gallery */}
          <div className="lg:col-span-7 space-y-8">
            {/* Gallery component with thumbnail selector */}
            <ProjectGallery project={project} />

            {/* Challenge & Solution details */}
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-ink/10">
                {project.challenge && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-ink/40">The Challenge</h3>
                    <p className="text-sm text-ink/75 leading-relaxed">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-ink/40">The Solution</h3>
                    <p className="text-sm text-ink/75 leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-28 pt-12 border-t border-ink/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Next Project</span>
            <Link href={`/portfolio/${nextProject.slug}`} className="block group">
              <h4 className="font-display text-2xl text-ink font-semibold group-hover:text-ink/75 transition-colors">
                {nextProject.title} →
              </h4>
            </Link>
          </div>

          <Link
            href="/portfolio"
            className="text-sm font-semibold underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors"
          >
            Back to all projects
          </Link>
        </div>
      </div>
    </article>
  );
}
