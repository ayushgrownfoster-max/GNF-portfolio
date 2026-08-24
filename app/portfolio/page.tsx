import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import PortfolioGrid from "./PortfolioGrid";
import { getPortfolioProjects } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our software applications, custom MERN stack platforms, bespoke WordPress sites, and elegant Squarespace designs.",
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <section className="px-6 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-site">
        <RevealText
          as="h1"
          lines={["Systems built to perform.", "Designs made to inspire."]}
          className="font-display text-display-lg text-balance"
        />
        <p className="mt-8 max-w-lg text-lg text-ink/60">
          A curated selection of our work spanning complex MERN software products, 
          custom WordPress enterprise platforms, and sleek Squarespace design integrations.
        </p>

        <div className="mt-16">
          <PortfolioGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
