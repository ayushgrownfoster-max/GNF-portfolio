import type { MetadataRoute } from "next";
import { getCaseStudies, getPortfolioProjects } from "@/lib/wordpress";

const BASE_URL = "https://www.grownfoster.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, portfolioProjects] = await Promise.all([
    getCaseStudies(),
    getPortfolioProjects(),
  ]);

  const staticRoutes = [
    "", "/work", "/services", "/about", "/portfolio", "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const caseStudyRoutes = caseStudies.map((c) => ({
    url: `${BASE_URL}/work/${c.slug}`,
    lastModified: new Date(),
  }));

  const portfolioRoutes = portfolioProjects.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: new Date(), // Using default current date since we don't have publishedAt on projects
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...portfolioRoutes];
}
