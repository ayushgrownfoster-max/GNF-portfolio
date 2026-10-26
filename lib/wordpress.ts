import type {
  CaseStudy,
  Service,
  Client,
  Testimonial,
  Insight,
  SiteStat,
  PortfolioProject,
} from "./types";

/**
 * ------------------------------------------------------------------------
 * API ABSTRACTION LAYER
 * ------------------------------------------------------------------------
 * Every WordPress request funnels through this file. Components never call
 * fetch() against the WP REST API directly — they call these functions.
 *
 * TO CONNECT REAL WORDPRESS:
 * 1. Set WORDPRESS_API_URL in .env.local, e.g.
 *      WORDPRESS_API_URL=https://cms.grownfoster.com/wp-json
 * 2. Register the "case_study", "insight", "testimonial", "service", and
 *    "client" custom post types + ACF field groups described in the
 *    project's CMS spec.
 * 3. Replace the body of each function below with a `fetchWP()` call
 *    (already stubbed out) that hits the matching REST route and maps the
 *    raw WP/ACF JSON onto the types in lib/types.ts.
 * 4. Delete the placeholder arrays at the bottom of this file.
 *
 * Nothing in /app or /components needs to change when you do this — that's
 * the point of the abstraction.
 * ------------------------------------------------------------------------
 */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

/** Thin wrapper around fetch() with Next.js ISR caching baked in. Not used
 * yet (placeholder data is returned instead) but ready to switch on. */
async function fetchWP<T>(path: string, revalidateSeconds = 300): Promise<T> {
  if (!WORDPRESS_API_URL) {
    throw new Error(
      "WORDPRESS_API_URL is not set — see the header comment in lib/wordpress.ts"
    );
  }
  const res = await fetch(`${WORDPRESS_API_URL}${path}`, {
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`WordPress API error on ${path}: ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return PLACEHOLDER_CASE_STUDIES;
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return PLACEHOLDER_CASE_STUDIES.filter((c) => c.featured);
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | undefined> {
  return PLACEHOLDER_CASE_STUDIES.find((c) => c.slug === slug);
}

export async function getAdjacentCaseStudy(
  slug: string
): Promise<CaseStudy | undefined> {
  const idx = PLACEHOLDER_CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (idx === -1) return undefined;
  return PLACEHOLDER_CASE_STUDIES[(idx + 1) % PLACEHOLDER_CASE_STUDIES.length];
}

export async function getIndustries(): Promise<string[]> {
  return Array.from(new Set(PLACEHOLDER_CASE_STUDIES.flatMap((c) => c.industry)));
}

export async function getServiceTags(): Promise<string[]> {
  return Array.from(new Set(PLACEHOLDER_CASE_STUDIES.flatMap((c) => c.services)));
}

// ---------------------------------------------------------------------------
// Services (agency capabilities section, not to be confused with the
// per-case-study "services" taxonomy above)
// ---------------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  return PLACEHOLDER_SERVICES;
}

// ---------------------------------------------------------------------------
// Clients / logos
// ---------------------------------------------------------------------------

export async function getClients(): Promise<Client[]> {
  return PLACEHOLDER_CLIENTS;
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  return PLACEHOLDER_TESTIMONIALS;
}

// ---------------------------------------------------------------------------
// Insights / blog
// ---------------------------------------------------------------------------

export async function getInsights(): Promise<Insight[]> {
  return PLACEHOLDER_INSIGHTS;
}

export async function getInsightBySlug(slug: string): Promise<Insight | undefined> {
  return PLACEHOLDER_INSIGHTS.find((i) => i.slug === slug);
}

// ---------------------------------------------------------------------------
// Portfolio / projects
// ---------------------------------------------------------------------------

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return PLACEHOLDER_PORTFOLIO;
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  return PLACEHOLDER_PORTFOLIO.find((p) => p.slug === slug);
}

export async function getPortfolioProjectsByCategory(category: "mern" | "wordpress" | "squarespace"): Promise<PortfolioProject[]> {
  return PLACEHOLDER_PORTFOLIO.filter((p) => p.category === category);
}

// ---------------------------------------------------------------------------
// Homepage stats strip
// ---------------------------------------------------------------------------

export async function getSiteStats(): Promise<SiteStat[]> {
  return [
    { value: "200+", label: "Meetings & Enquiries" },
    { value: "3.8X", label: "Average ROAS" },
    { value: "43%", label: "Average Email Open Rate" },
    { value: "27%", label: "LinkedIn Acceptance Rate" },
  ];
}

// ---------------------------------------------------------------------------
// PLACEHOLDER DATA
// Shaped exactly like the real content will be once WordPress is connected.
// Delete this section once fetchWP() is wired up.
// ---------------------------------------------------------------------------

const img = (seed: string, w = 1600, h = 1000): { url: string; alt: string; width: number; height: number } => ({
  url: `https://images.unsplash.com/${seed}?w=${w}&h=${h}&fit=crop`,
  alt: "",
  width: w,
  height: h,
});

const PLACEHOLDER_CASE_STUDIES: CaseStudy[] = [
  {
    slug: "dominos-43k-followers",
    title: "43K Followers in 6 Hours",
    shortTitle: "43K in 6 Hours",
    client: "Domino's",
    year: 2026,
    industry: ["Food & Beverage"],
    services: ["Social Media Marketing", "Creative Design"],
    platform: ["Instagram", "Twitter"],
    campaignType: "Real-time campaign",
    tags: ["social", "campaign", "real-time"],
    featured: true,
    thumbnail: img("photo-1513104890138-7c749659a591"),
    heroMedia: img("photo-1513104890138-7c749659a591", 2400, 1350),
    shortDescription:
      "A live, reactive social campaign that turned a single cultural moment into the brand's fastest follower growth on record.",
    description:
      "Domino's needed a way to show up inside a live cultural moment without looking like every other brand piling on. We built a real-time creative pipeline that could publish inside minutes, not days.",
    challenge:
      "Domino's social presence was consistent but predictable. During a major live event, the brand risked being drowned out by faster, louder competitors reacting in real time.",
    insight:
      "Audiences don't reward brands for showing up late to a moment — they reward the fastest, funniest, most specific reaction. Speed had to become a creative advantage, not a constraint.",
    strategy: [
      { label: "01", title: "War Room", body: "A live creative + community team embedded for the full event window." },
      { label: "02", title: "Modular Templates", body: "Pre-built layouts that could be filled with reactive copy in under 3 minutes." },
      { label: "03", title: "Always-on Listening", body: "Real-time social listening flagged trending moments as they happened." },
    ],
    solution:
      "A pre-approved library of on-brand templates let the team publish reactive posts within minutes of key moments, paired with a rapid-response approval flow.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1571091718767-18b5b1457add", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1571997478779-2adcbbe9ab2f") },
      { type: "image", layout: "half", media: img("photo-1601924582970-9238bcb495d9") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1601924582970-9238bcb495d9", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1550547660-d9450f859349") },
      { type: "image", layout: "third", media: img("photo-1571091718767-18b5b1457add") },
      { type: "image", layout: "third", media: img("photo-1513104890138-7c749659a591") },
    ],
    headlineResult: { value: "43K", label: "Followers in 6 Hours" },
    stats: [
      { value: "43K+", label: "Followers" },
      { value: "6", label: "Hours" },
      { value: "3.4X", label: "Engagement" },
      { value: "+82%", label: "Reach" },
    ],
    testimonial: {
      quote:
        "Grow N Foster didn't just execute the campaign. They understood the business problem behind it.",
      name: "Anaya Kapoor",
      designation: "Head of Marketing",
      company: "Domino's India",
    },
    seo: {
      title: "Domino's: 43K Followers in 6 Hours | Grow N Foster",
      description:
        "How a real-time creative pipeline turned one cultural moment into Domino's fastest social growth on record.",
      canonical: "/work/dominos-43k-followers",
    },
  },
  {
    slug: "urbanest-real-estate-relaunch",
    title: "Rebuilding Trust in a Cold Market",
    shortTitle: "Rebuilding Trust",
    client: "Urbanest",
    year: 2025,
    industry: ["Real Estate"],
    services: ["Branding", "Website Design", "Performance Marketing"],
    platform: ["Google Ads", "Web"],
    campaignType: "Brand relaunch",
    tags: ["branding", "web", "performance"],
    featured: true,
    thumbnail: img("photo-1560518883-ce09059eeffa"),
    heroMedia: img("photo-1560518883-ce09059eeffa", 2400, 1350),
    shortDescription:
      "A full identity and site rebuild that repositioned a mid-size developer as the most transparent name in the city.",
    description:
      "Urbanest had the inventory but not the trust. We rebuilt the brand from the inside out, starting with the one thing buyers actually wanted: clarity.",
    challenge:
      "Rising interest rates and a string of delayed projects across the category had made buyers deeply skeptical of any new developer messaging.",
    insight:
      "In a low-trust category, the brand that shows its work — literally — wins. Transparency had to be a design principle, not a tagline.",
    strategy: [
      { label: "01", title: "Radical Transparency", body: "Live construction-progress tracking built directly into the site." },
      { label: "02", title: "Identity Reset", body: "A calmer, more editorial visual language distinct from competitor noise." },
      { label: "03", title: "Intent-first Media", body: "Performance campaigns built around high-intent search, not awareness." },
    ],
    solution:
      "A new identity system paired with a site that let prospective buyers track live construction progress, rebuilding confidence project by project.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1600585154340-be6161a56a0c", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1600607687939-ce8a6c25118c") },
      { type: "image", layout: "half", media: img("photo-1600566753086-00f18fb6b3ea") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1600607687939-ce8a6c25118c", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1600566753086-00f18fb6b3ea") },
      { type: "image", layout: "third", media: img("photo-1600585154340-be6161a56a0c") },
      { type: "image", layout: "third", media: img("photo-1560518883-ce09059eeffa") },
    ],
    headlineResult: { value: "+193%", label: "Organic Growth" },
    stats: [
      { value: "+193%", label: "Organic Growth" },
      { value: "+87%", label: "Qualified Leads" },
      { value: "3.2X", label: "ROAS" },
      { value: "+120K", label: "Site Visits" },
    ],
    testimonial: {
      quote:
        "For the first time, our marketing felt as serious as our engineering.",
      name: "Rohan Mehta",
      designation: "VP Marketing",
      company: "Urbanest",
    },
    seo: {
      title: "Urbanest: Rebuilding Trust in a Cold Market | Grow N Foster",
      description:
        "A full identity and website rebuild that repositioned a real-estate developer around transparency.",
      canonical: "/work/urbanest-real-estate-relaunch",
    },
  },
  {
    slug: "carewell-healthcare-seo",
    title: "Owning Local Search in Healthcare",
    shortTitle: "Owning Local Search",
    client: "Carewell Clinics",
    year: 2025,
    industry: ["Healthcare"],
    services: ["SEO", "Local SEO", "Content Marketing"],
    platform: ["Google", "Web"],
    tags: ["seo", "local", "content"],
    featured: true,
    thumbnail: img("photo-1576091160399-112ba8d25d1d"),
    heroMedia: img("photo-1576091160399-112ba8d25d1d", 2400, 1350),
    shortDescription:
      "A city-by-city local SEO overhaul that took a 12-clinic network from page three to page one for its highest-intent searches.",
    description:
      "Carewell had strong clinical outcomes and near-invisible search presence. We rebuilt their local SEO foundation clinic by clinic.",
    challenge:
      "Patients were choosing competitors purely on search visibility — Carewell's actual quality of care never entered the decision.",
    insight:
      "Local healthcare search is won at the level of individual clinics, not the brand. Every location needed to be treated as its own SEO project.",
    strategy: [
      { label: "01", title: "Location Audits", body: "Clinic-by-clinic technical and content audits across all 12 sites." },
      { label: "02", title: "Structured Content", body: "Condition-specific pages built around real patient search intent." },
      { label: "03", title: "Review Velocity", body: "A systemized flow for collecting and responding to patient reviews." },
    ],
    solution:
      "Location-specific landing pages, structured data, and a review-generation system moved every clinic onto page one within two quarters.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1519494026892-80bbd2d6fd0d", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1587854692152-cbe660dbde88") },
      { type: "image", layout: "half", media: img("photo-1631217868264-e5b90bb7e133") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1587854692152-cbe660dbde88", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1631217868264-e5b90bb7e133") },
      { type: "image", layout: "third", media: img("photo-1519494026892-80bbd2d6fd0d") },
      { type: "image", layout: "third", media: img("photo-1576091160399-112ba8d25d1d") },
    ],
    headlineResult: { value: "+312%", label: "Organic Bookings" },
    stats: [
      { value: "12/12", label: "Clinics on Page 1" },
      { value: "+312%", label: "Organic Bookings" },
      { value: "+58%", label: "Review Volume" },
      { value: "9mo", label: "Time to Rank" },
    ],
    seo: {
      title: "Carewell Clinics: Owning Local Search | Grow N Foster",
      description:
        "How a location-by-location SEO overhaul moved a 12-clinic healthcare network to page one.",
      canonical: "/work/carewell-healthcare-seo",
    },
  },
  {
    slug: "loomkraft-ecommerce-growth",
    title: "Scaling a D2C Brand Past Its Ceiling",
    shortTitle: "Scaling Past the Ceiling",
    client: "Loomkraft",
    year: 2026,
    industry: ["E-commerce", "Retail"],
    services: ["Performance Marketing", "Meta Ads", "Creative Design"],
    platform: ["Meta", "Web"],
    tags: ["ecommerce", "performance", "creative"],
    featured: false,
    thumbnail: img("photo-1441984904996-e0b6ba687e04"),
    heroMedia: img("photo-1441984904996-e0b6ba687e04", 2400, 1350),
    shortDescription:
      "A creative-testing engine that broke a plateaued D2C textile brand out of its growth ceiling.",
    description:
      "Loomkraft's paid performance had flatlined for two straight quarters. We rebuilt the creative testing process from scratch.",
    challenge:
      "CAC had crept up for six months straight while the same three ad creatives kept getting refreshed rather than replaced.",
    insight:
      "The brand wasn't out of audience — it was out of new ideas. Creative fatigue, not targeting, was the real ceiling.",
    strategy: [
      { label: "01", title: "Creative Velocity", body: "A weekly production line generating 15+ new ad concepts." },
      { label: "02", title: "Structured Testing", body: "A rigorous test-and-kill framework replacing gut-feel decisions." },
      { label: "03", title: "Catalog Expansion", body: "Dynamic product ads pulling from the full catalog, not bestsellers only." },
    ],
    solution:
      "A high-velocity creative pipeline paired with disciplined test-and-kill rules on ad spend broke the plateau within one quarter.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1445205170230-053b83016050", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1445205170230-053b83016050") },
      { type: "image", layout: "half", media: img("photo-1441984904996-e0b6ba687e04") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1445205170230-053b83016050", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1441984904996-e0b6ba687e04") },
      { type: "image", layout: "third", media: img("photo-1441986300917-64674bd600d8") },
      { type: "image", layout: "third", media: img("photo-1472851294608-062f824d29cc") },
    ],
    headlineResult: { value: "-38%", label: "CAC" },
    stats: [
      { value: "-38%", label: "CAC" },
      { value: "+215%", label: "Revenue" },
      { value: "3.9X", label: "ROAS" },
      { value: "18", label: "New Creatives / Week" },
    ],
    seo: {
      title: "Loomkraft: Scaling a D2C Brand | Grow N Foster",
      description:
        "How a high-velocity creative testing engine broke a plateaued D2C brand's growth ceiling.",
      canonical: "/work/loomkraft-ecommerce-growth",
    },
  },
  {
    slug: "brightpath-education-branding",
    title: "Giving a New School a 100-Year Feel",
    shortTitle: "A 100-Year Feel",
    client: "Brightpath Schools",
    year: 2025,
    industry: ["Education"],
    services: ["Branding", "Website Design"],
    platform: ["Web"],
    tags: ["branding", "education", "web"],
    featured: false,
    thumbnail: img("photo-1523050854058-8df90110c9f1"),
    heroMedia: img("photo-1523050854058-8df90110c9f1", 2400, 1350),
    shortDescription:
      "A founding brand identity built to feel established on day one, not like a first-year startup.",
    description:
      "Brightpath was opening its doors for the first time but needed parents to trust it like an institution with decades behind it.",
    challenge:
      "New schools compete against institutions with generational trust. Brightpath had zero track record to point to.",
    insight:
      "Trust for a new school comes from craft and restraint, not from claims. The brand had to look considered, not eager.",
    strategy: [
      { label: "01", title: "Heritage Cues", body: "A visual language borrowing structure from long-established institutions." },
      { label: "02", title: "Founder Story", body: "Leading with the founding team's philosophy, not generic promises." },
      { label: "03", title: "Enrollment Funnel", body: "A site built around the actual parent decision journey." },
    ],
    solution:
      "A restrained, editorial identity and a site structured around real parent questions replaced the generic new-school playbook.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1580582932707-520aed937b7b", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1503676260728-1c00da094a0b") },
      { type: "image", layout: "half", media: img("photo-1523050854058-8df90110c9f1") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1503676260728-1c00da094a0b", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1580582932707-520aed937b7b") },
      { type: "image", layout: "third", media: img("photo-1523050854058-8df90110c9f1") },
      { type: "image", layout: "third", media: img("photo-1571260899304-425eee4c7efc") },
    ],
    headlineResult: { value: "92%", label: "Seats Filled at Launch" },
    stats: [
      { value: "92%", label: "Seats Filled at Launch" },
      { value: "+140%", label: "Enquiry Rate" },
      { value: "4.2X", label: "Site Time-on-Page" },
    ],
    seo: {
      title: "Brightpath Schools Branding | Grow N Foster",
      description:
        "A founding brand identity for a new school built to feel established from day one.",
      canonical: "/work/brightpath-education-branding",
    },
  },
  {
    slug: "meridian-fintech-launch",
    title: "Launching a Fintech Brand Nobody Had to Explain",
    shortTitle: "A Brand Nobody Had to Explain",
    client: "Meridian",
    year: 2026,
    industry: ["Finance", "Technology"],
    services: ["Branding", "Digital Marketing", "Website Design"],
    platform: ["Web", "Google Ads"],
    tags: ["fintech", "branding", "launch"],
    featured: false,
    thumbnail: img("photo-1454165804606-c3d57bc86b40"),
    heroMedia: img("photo-1454165804606-c3d57bc86b40", 2400, 1350),
    shortDescription:
      "A category-defining launch identity and go-to-market site for a new consumer investing app.",
    description:
      "Meridian's product was simple; its category's marketing was not. We built a brand that explained the product without a single onboarding video.",
    challenge:
      "Consumer fintech marketing had become a wall of jargon. Meridian risked launching into the same noise as everyone else.",
    insight:
      "The clearest fintech brand in the room wins the download. Plain language was the actual differentiator, not another feature callout.",
    strategy: [
      { label: "01", title: "Plain-language System", body: "A copy system that banned category jargon outright." },
      { label: "02", title: "Trust Signals", body: "Security and regulation made visually central, not buried in a footer." },
      { label: "03", title: "Launch Funnel", body: "A waitlist-to-download funnel tuned for a single hard launch day." },
    ],
    solution:
      "A jargon-free identity and launch site turned a crowded category pitch into a one-sentence promise, backed by a tightly tuned acquisition funnel.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1611974789855-9c2a0a7236a3", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1560472354-b33ff0c44a43") },
      { type: "image", layout: "half", media: img("photo-1454165804606-c3d57bc86b40") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1560472354-b33ff0c44a43", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1611974789855-9c2a0a7236a3") },
      { type: "image", layout: "third", media: img("photo-1454165804606-c3d57bc86b40") },
      { type: "image", layout: "third", media: img("photo-1563986768609-322da13575f3") },
    ],
    headlineResult: { value: "50K", label: "Waitlist Signups" },
    stats: [
      { value: "50K", label: "Waitlist Signups" },
      { value: "+64%", label: "Day-1 Downloads vs Target" },
      { value: "2.1X", label: "ROAS" },
    ],
    seo: {
      title: "Meridian Fintech Launch | Grow N Foster",
      description:
        "A category-defining launch identity and go-to-market site for a consumer investing app.",
      canonical: "/work/meridian-fintech-launch",
    },
  },
];

const PLACEHOLDER_SERVICES: Service[] = [
  { number: "01", title: "LinkedIn Outreach", description: "Connection and follow-up sequences built on Sales Navigator, written for decision-maker segments." },
  { number: "02", title: "Email Marketing & Cold Email", description: "Cold and nurture email campaigns, from warmed sending setups to booked calendar calls." },
  { number: "03", title: "SEO, AEO & GEO", description: "Technical and content SEO engineered to earn citations in AI Overviews, ChatGPT, Gemini and Perplexity." },
  { number: "04", title: "Google Business Profile", description: "Profile optimisation, location pages and local citations that drive calls and local walk-ins." },
  { number: "05", title: "Performance Marketing", description: "Meta and Google ad campaigns optimized for verified leads, low CPL and high ROAS." },
  { number: "06", title: "Lead Verification & Qualification", description: "Integrated OTP SMS verification and form validation that eliminates spam leads completely." },
  { number: "07", title: "CRM & Routing Automation", description: "Direct calendar booking and automated lead routing straight to your sales team's inbox and CRM." },
  { number: "08", title: "Creative & Copywriting", description: "High-converting ad angles, cold email copy, and landing page architecture built for conversions." },
];

const PLACEHOLDER_CLIENTS: Client[] = [
  "ThoughtSpot", "Numeric", "Riot Platforms", "UNA Fitness", "Digicomplish",
  "Netciples", "Primrose School", "Aptibit", "Bootz To Heelz", "MPME Abrasives",
  "Munshi OS", "Belt Conveyor Guarding", "Table Tutor", "Bell", "Check Point",
  "Sparx Digital", "Baruni Solutions", "Slatt Capital", "Swopelees", "Hypertel Group",
  "The Gate PM Management",
].map((name) => ({ name, logo: img(`photo-1560518883-ce09059eeffa`, 400, 200) }));

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Twinka's SEO and AI search visibility strategy delivered 187,000+ monthly organic visitors and hundreds of citations across AI search engines.",
    name: "Enterprise SaaS Lead",
    designation: "VP Marketing",
    company: "ThoughtSpot",
  },
  {
    quote: "Integrating OTP verification into our real estate ads solved our fake lead issue overnight. Lead quality jumped to 95% verified buyers.",
    name: "Senior Sales Director",
    designation: "Acquisition Head",
    company: "NCR Real Estate Developer",
  },
  {
    quote: "A single targeted email nurture campaign with the $4,000 tuition offer brought 6 high-value families back for campus tours within weeks.",
    name: "School Director",
    designation: "Owner",
    company: "Primrose School of Rockland, MA",
  },
];

const PLACEHOLDER_INSIGHTS: Insight[] = [
  {
    slug: "creative-fatigue-is-a-growth-problem",
    title: "Creative Fatigue Is a Growth Problem, Not a Content Problem",
    excerpt: "Why plateaued paid performance is usually a creative-supply issue in disguise.",
    content: "Full article content goes here — sourced from WordPress as rendered HTML/blocks.",
    featuredImage: img("photo-1553877522-43269d4ea984", 1600, 1000),
    author: "Grow N Foster Team",
    categories: ["Performance Marketing"],
    tags: ["paid media", "creative"],
    publishedAt: "2026-06-02",
    readingTime: 6,
  },
  {
    slug: "local-seo-is-won-clinic-by-clinic",
    title: "Local SEO Is Won Clinic by Clinic, Not Brand by Brand",
    excerpt: "What a 12-location healthcare rollout taught us about treating every location as its own project.",
    content: "Full article content goes here — sourced from WordPress as rendered HTML/blocks.",
    featuredImage: img("photo-1576091160399-112ba8d25d1d", 1600, 1000),
    author: "Grow N Foster Team",
    categories: ["SEO"],
    tags: ["local seo", "healthcare"],
    publishedAt: "2026-05-14",
    readingTime: 5,
  },
  {
    slug: "the-case-for-boring-brand-launches",
    title: "The Case for a Boring Fintech Brand Launch",
    excerpt: "Plain language beat clever positioning for one consumer investing app's first 50,000 users.",
    content: "Full article content goes here — sourced from WordPress as rendered HTML/blocks.",
    featuredImage: img("photo-1454165804606-c3d57bc86b40", 1600, 1000),
    author: "Grow N Foster Team",
    categories: ["Branding"],
    tags: ["fintech", "launch"],
    publishedAt: "2026-04-22",
    readingTime: 7,
  },
];

export const PLACEHOLDER_PORTFOLIO: PortfolioProject[] = [
  // --- MERN STACK ---
  {
    slug: "veloce-saas-analytics",
    title: "Veloce SaaS Analytics",
    category: "mern",
    description: "A real-time metrics dashboard offering dynamic reporting, live user monitoring, and modular charting templates.",
    longDescription: "Veloce SaaS is a custom business intelligence platform designed to handle high-throughput event streaming. Built on MongoDB, Express, React, and Node.js, the system processes over 10 million daily active events, rendering interactive data tables, drag-and-drop widget layouts, and instantaneous PDF report generation. We streamlined the DB query pipelines to achieve sub-50ms API responses.",
    tags: ["MERN", "SaaS", "Dashboard"],
    techStack: ["MongoDB", "Express", "React", "Node.js", "TailwindCSS", "Chart.js", "Websockets"],
    client: "Veloce Tech",
    year: 2026,
    thumbnail: img("photo-1551288049-bebda4e38f71"),
    screenshots: [
      img("photo-1551288049-bebda4e38f71"),
      img("photo-1460925895917-afdab827c52f"),
      img("photo-1504868584819-f8e8b4b6d7e3")
    ],
    liveUrl: "https://veloce-analytics.demo",
    challenge: "Processing high volumes of user behavior event data in real time and visualizing it without causing client-side rendering bottlenecks or database lockups.",
    solution: "We integrated redis caching alongside MongoDB aggregation pipelines and implemented a virtualized dashboard list system in React for smooth scrolling over millions of records."
  },
  {
    slug: "pulse-ecommerce-marketplace",
    title: "Pulse E-commerce Marketplace",
    category: "mern",
    description: "A full-featured multi-vendor e-commerce platform with rich catalog filters, instant search, and integrated Stripe payments.",
    longDescription: "Pulse Marketplace is a modular storefront supporting thousands of concurrent shoppers and merchant storefronts. Featuring server-side rendering for optimal SEO, advanced fuzzy search query logic, and automated vendor payout routing via Stripe Connect. The administration interface provides comprehensive inventory tracking and order fulfillment tracking.",
    tags: ["MERN", "E-commerce", "Stripe"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Stripe API", "ElasticSearch"],
    client: "Pulse Group",
    year: 2025,
    thumbnail: img("photo-1531403009284-440f080d1e12"),
    screenshots: [
      img("photo-1531403009284-440f080d1e12"),
      img("photo-1555066931-4365d14bab8c"),
      img("photo-1522542550221-31fd19575a2d")
    ],
    liveUrl: "https://pulse-shop.demo",
    challenge: "Synchronizing multi-vendor inventory changes, real-time checkout locks, and managing high traffic spikes during product drops.",
    solution: "Implemented transactional database constraints and distributed job queues using BullMQ to handle concurrent checkout logic and inventory updates."
  },
  {
    slug: "omnitask-workspace",
    title: "OmniTask Teams",
    category: "mern",
    description: "A real-time project management and collaboration suite featuring Kanban boards, live chat, and team workspaces.",
    longDescription: "OmniTask is a web-based workflow platform for creative agencies. It utilizes Socket.io to keep kanban boards, task descriptions, comment sections, and user presence markers in perfect sync across all active team members. Features include drag-and-drop timeline planning, automated daily summaries, and integrations with Slack and Google Drive.",
    tags: ["MERN", "Collaboration", "Productivity"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Framer Motion", "TailwindCSS"],
    client: "Omni Labs Ltd",
    year: 2026,
    thumbnail: img("photo-1618005182384-a83a8bd57fbe"),
    screenshots: [
      img("photo-1618005182384-a83a8bd57fbe"),
      img("photo-1611162617213-7d7a39e9b1d7"),
      img("photo-1581291518633-83b4ebd1d83e")
    ],
    liveUrl: "https://omnitask-teams.demo",
    challenge: "Handling message queues and resolving merge conflicts when multiple users edited the same task cards concurrently.",
    solution: "Used operational transformation algorithms and real-time cursor tracking to show who is editing what, locking specific sub-fields during active typing."
  },
  // --- WORDPRESS ---
  {
    slug: "aether-capital-vc",
    title: "Aether Capital Website",
    category: "wordpress",
    description: "An editorial-style website for a venture capital firm featuring custom post types, Gutenberg blocks, and dynamic portfolio filters.",
    longDescription: "Aether Capital is a modern venture firm representing high-growth startups. We engineered a custom WordPress theme from scratch utilizing Advanced Custom Fields (ACF) and Gutenberg blocks. This enables their internal marketing team to spin up new portfolio showcases, investment news, and founder spotlight pages in seconds, all while maintaining perfect layout control and design system compliance.",
    tags: ["WordPress", "Custom Theme", "ACF Pro"],
    techStack: ["WordPress", "PHP", "TailwindCSS", "Alpine.js", "ACF Pro", "WP GraphQL"],
    client: "Aether Ventures",
    year: 2025,
    thumbnail: img("photo-1486406146926-c627a92ad1ab"),
    screenshots: [
      img("photo-1486406146926-c627a92ad1ab"),
      img("photo-1497366216548-37526070297c"),
      img("photo-1507679799987-c73779587ccf")
    ],
    liveUrl: "https://aether-vc.demo",
    challenge: "Delivering a highly custom layout with sophisticated typography and page layout flexibility for editors without sacrificing loading speed.",
    solution: "Built a block-based component system in PHP/Tailwind, compiling assets dynamically and caching page structures aggressively using WP Rocket and Cloudflare."
  },
  {
    slug: "solstice-luxury-estore",
    title: "Solstice Luxury Store",
    category: "wordpress",
    description: "A premium WooCommerce boutique featuring custom checkout optimization and high-performance product filters.",
    longDescription: "Solstice is an international luxury apparel brand. We converted their standard WooCommerce installation into a high-converting editorial e-store. Complete with AJAX-based cart drawers, multi-currency localization, smart tax calculation APIs, and a custom Gutenberg-based product story builder that blends lifestyle content with commerce.",
    tags: ["WordPress", "WooCommerce", "AJAX"],
    techStack: ["WordPress", "WooCommerce", "PHP", "TailwindCSS", "Vanilla JS", "Stripe Gateway"],
    client: "Solstice Apparel Group",
    year: 2025,
    thumbnail: img("photo-1441986300917-64674bd600d8"),
    screenshots: [
      img("photo-1441986300917-64674bd600d8"),
      img("photo-1511556532299-8f662fc26c06"),
      img("photo-1441984904996-e0b6ba687e04")
    ],
    liveUrl: "https://solstice-boutique.demo",
    challenge: "Combating high shopping cart abandonment rate and optimizing image asset load times for hundreds of high-resolution product photos.",
    solution: "We restructured the checkout flow into a single-page interactive app, deferred non-critical JS resources, and configured WebP image compression pipelines."
  },
  {
    slug: "vanguard-design-agency",
    title: "Vanguard Design Portfolio",
    category: "wordpress",
    description: "An interactive, typography-centric agency portfolio showcasing media and branding campaigns.",
    longDescription: "Vanguard is a creative brand consultancy. We built an immersive WordPress portfolio featuring dynamic WebGL page transitions, customized project pages, and an integrated blog CMS. The site leverages native Gutenberg blocks mapping directly to React frontend components via a headless API.",
    tags: ["WordPress", "Creative Portfolio", "Headless"],
    techStack: ["WordPress CMS", "Next.js", "TailwindCSS", "Framer Motion", "Three.js", "GraphQL"],
    client: "Vanguard Creative",
    year: 2026,
    thumbnail: img("photo-1542744094-3a31f103e35f"),
    screenshots: [
      img("photo-1542744094-3a31f103e35f"),
      img("photo-1507238691740-187a5b1d37b8"),
      img("photo-1531538606174-0f90ff5dce83")
    ],
    liveUrl: "https://vanguard-agency.demo",
    challenge: "Implementing high-fidelity page transitions and custom interactive components while allowing non-technical editors to control page hierarchy and content fields.",
    solution: "Created a headless Next.js frontend querying WordPress via WPGraphQL, utilizing dynamic layout blocks mapping custom Gutenberg elements."
  },
  // --- SQUARESPACE ---
  {
    slug: "lumiere-photo-studio",
    title: "Lumiere Photography Studio",
    category: "squarespace",
    description: "A minimal, image-centric photography portfolio built using Squarespace's fluid engine and custom CSS injection.",
    longDescription: "Lumiere Studio is a high-fashion photography agency. We built their digital home using Squarespace, utilizing custom CSS injection, customized grid systems, and custom layouts. The site provides a clean, grid-based portfolio gallery with lazy loading and high-fidelity image displays.",
    tags: ["Squarespace", "Custom CSS", "Fluid Engine"],
    techStack: ["Squarespace", "Custom CSS", "Javascript", "Fluid Engine", "Adobe Fonts"],
    client: "Lumiere Studio Group",
    year: 2026,
    thumbnail: img("photo-1516035069371-29a1b244cc32"),
    screenshots: [
      img("photo-1516035069371-29a1b244cc32"),
      img("photo-1500485035595-cbe6f645feb1"),
      img("photo-1554080353-a576cf803bda")
    ],
    liveUrl: "https://lumiere-studio.squarespace.com",
    challenge: "Overcoming standard grid layout limitations in Squarespace to achieve an asymmetrical, editorial magazine-style aesthetic.",
    solution: "Engineered responsive CSS custom grids and media query overrides, utilizing CSS variables to adjust positioning of text and image overlays."
  },
  {
    slug: "savor-dining-wine",
    title: "Savor Dining & Wine Restaurant",
    category: "squarespace",
    description: "An elegant, interactive restaurant showcase page featuring menu navigation and integrated reservation modules.",
    longDescription: "Savor is a fine-dining restaurant based in New York. We built their Squarespace site around a visual storytelling flow. Complete with responsive menu tabs, custom typography integration, OpenTable booking widgets, and social media media streams.",
    tags: ["Squarespace", "OpenTable Integration", "Web Design"],
    techStack: ["Squarespace", "Custom CSS", "OpenTable API", "Google Maps API", "Fluid Layouts"],
    client: "Savor Restaurant Group",
    year: 2025,
    thumbnail: img("photo-1517248135467-4c7edcad34c4"),
    screenshots: [
      img("photo-1517248135467-4c7edcad34c4"),
      img("photo-1555396273-367ea4eb4db5"),
      img("photo-1550966871-3ed3cdb5ed0c")
    ],
    liveUrl: "https://savor-dining.squarespace.com",
    challenge: "Integrating custom menu displays and booking popups that render natively across all devices without slow load times.",
    solution: "Used Squarespace's developer modes to inject custom scripts and structured HTML blocks, optimizing images and minimizing font weights."
  },
  {
    slug: "bespoke-living-interiors",
    title: "Bespoke Living Interiors",
    category: "squarespace",
    description: "An immersive, image-rich portfolio page for a boutique luxury interior design studio.",
    longDescription: "Bespoke Living focuses on luxury home architecture. We built a gorgeous Squarespace portfolio showcasing projects room-by-room. The site incorporates custom parallax scroll actions, image sliders, and detailed client testimonial sections.",
    tags: ["Squarespace", "Parallax Design", "Interior Design"],
    techStack: ["Squarespace", "Custom CSS", "Javascript", "Google Fonts", "Fluid Engine"],
    client: "Bespoke Living Interiors",
    year: 2026,
    thumbnail: img("photo-1618221195710-dd6b41faaea6"),
    screenshots: [
      img("photo-1618221195710-dd6b41faaea6"),
      img("photo-1616486338812-3dadae4b4ace"),
      img("photo-1615529182904-14819c35db37")
    ],
    liveUrl: "https://bespoke-living.squarespace.com",
    challenge: "Creating smooth parallax scroll effects and a fluid project slide deck within the constraints of the standard Squarespace platform.",
    solution: "Injected lightweight custom JS scrolling listeners and styled custom CSS animations to create bespoke parallax behaviors."
  }
];
