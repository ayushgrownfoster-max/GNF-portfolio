import type { MetadataRoute } from "next";
import { getCaseStudies, getInsights } from "@/lib/wordpress";

const BASE_URL = "https://www.grownfoster.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, insights] = await Promise.all([
    getCaseStudies(),
    getInsights(),
  ]);

  const staticRoutes = [
    "", "/work", "/services", "/about", "/insights", "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const caseStudyRoutes = caseStudies.map((c) => ({
    url: `${BASE_URL}/work/${c.slug}`,
    lastModified: new Date(),
  }));

  const insightRoutes = insights.map((i) => ({
    url: `${BASE_URL}/insights/${i.slug}`,
    lastModified: new Date(i.publishedAt),
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...insightRoutes];
}
