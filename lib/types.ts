/**
 * These types mirror the shape data will arrive in from the WordPress REST
 * API + ACF once the CMS is connected (see lib/wordpress.ts). Keeping them
 * centralized means the placeholder data and the real API response can be
 * swapped in without touching component code.
 */

export interface Media {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Stat {
  value: string; // e.g. "+193%", "3.2X", "43K+"
  label: string; // e.g. "Organic Growth"
}

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  company: string;
  avatar?: Media;
}

export interface GalleryItem {
  type: "image" | "video" | "gif";
  layout: "full" | "half" | "third" | "horizontal" | "fullscreen";
  media: Media;
  caption?: string;
}

export interface TimelineStep {
  label: string;
  title: string;
  body: string;
}

export interface CaseStudySEO {
  title: string;
  description: string;
  ogImage?: Media;
  canonical: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  year: number;
  industry: string[];
  services: string[];
  platform: string[];
  campaignType?: string;
  tags: string[];
  featured: boolean;

  thumbnail: Media;
  heroMedia: Media;
  heroIsVideo?: boolean;

  shortDescription: string;
  description: string;

  challenge: string;
  insight: string;
  strategy: TimelineStep[];
  solution: string;
  execution: GalleryItem[];
  gallery: GalleryItem[];

  headlineResult: Stat; // shown on the card, e.g. "43K Followers in 6 Hours"
  stats: Stat[]; // shown on the results section of the case study page

  testimonial?: Testimonial;
  seo: CaseStudySEO;
}

export interface Service {
  number: string; // "01"
  title: string;
  description: string;
  image?: Media;
}

export interface Client {
  name: string;
  logo: Media;
}

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: Media;
  author: string;
  categories: string[];
  tags: string[];
  publishedAt: string; // ISO date
  readingTime: number; // minutes
}

export interface SiteStat {
  value: string;
  label: string;
}
