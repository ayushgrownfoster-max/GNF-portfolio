"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import SectionHeading from "./SectionHeading";

interface Metric {
  value: string;
  label: string;
}

interface ClientCard {
  tag: string;
  client: string;
  industry: string;
  description: string;
  metrics: Metric[];
}

interface ServiceGroup {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  projectCount: string;
  clients: ClientCard[];
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "linkedin",
    number: "01",
    title: "LinkedIn outreach",
    subtitle: "Connection and follow-up sequences built on Sales Navigator, written for each segment.",
    projectCount: "7 client projects",
    clients: [
      {
        tag: "LINKEDIN OUTREACH",
        client: "Digicomplish",
        industry: "RPO",
        description:
          "LinkedIn outreach that puts an RPO firm in front of hiring leaders. Targeted HR and talent acquisition heads with Sales Navigator lists and personalised follow-up sequences.",
        metrics: [
          { value: "29%", label: "acceptance rate" },
          { value: "9%", label: "reply rate" },
          { value: "18", label: "meetings booked" },
        ],
      },
      {
        tag: "LINKEDIN OUTREACH",
        client: "Netciples",
        industry: "IT",
        description:
          "A 12-week LinkedIn outreach plan for an IT services company: 180 connection requests a week through Sales Navigator, with every qualified lead logged in a shared tracker.",
        metrics: [
          { value: "27%", label: "acceptance rate" },
          { value: "8%", label: "reply rate" },
          { value: "31", label: "qualified leads in 12 weeks" },
        ],
      },
      {
        tag: "LINKEDIN OUTREACH",
        client: "MPME Abrasives & Munshi OS",
        industry: "Manufacturing / Industrial Software",
        description:
          "Outreach to plant, maintenance and procurement heads at foundries, forging and fabrication units for shotblasting abrasives and plant operations software.",
        metrics: [
          { value: "24%", label: "acceptance rate" },
          { value: "7%", label: "reply rate" },
          { value: "11", label: "buyer enquiries" },
        ],
      },
      {
        tag: "LINKEDIN OUTREACH",
        client: "Bell & Check Point",
        industry: "Cybersecurity & Telecommunications",
        description:
          "Account-based outreach to IT and security leaders evaluating business network, telecom and cybersecurity solutions.",
        metrics: [
          { value: "22%", label: "acceptance rate" },
          { value: "6%", label: "reply rate" },
          { value: "15", label: "meetings booked" },
        ],
      },
      {
        tag: "LINKEDIN OUTREACH",
        client: "Sparx Digital & Baruni Solutions",
        industry: "IT",
        description:
          "LinkedIn outreach to businesses in the UAE and India looking for managed IT, cloud and custom software partners.",
        metrics: [
          { value: "26%", label: "acceptance rate" },
          { value: "8%", label: "reply rate" },
          { value: "13", label: "meetings booked" },
        ],
      },
      {
        tag: "LINKEDIN OUTREACH",
        client: "Slatt Capital",
        industry: "Financial Services",
        description:
          "Outreach to commercial property owners and investors who need financing for office, retail, industrial and multifamily assets.",
        metrics: [
          { value: "31%", label: "acceptance rate" },
          { value: "10%", label: "reply rate" },
          { value: "16", label: "financing calls" },
        ],
      },
      {
        tag: "LINKEDIN OUTREACH",
        client: "Hypertel Group",
        industry: "Telecommunications",
        description:
          "LinkedIn outreach to Canadian business owners and IT managers looking for business internet and VoIP phone systems.",
        metrics: [
          { value: "28%", label: "acceptance rate" },
          { value: "9%", label: "reply rate" },
          { value: "12", label: "meetings booked" },
        ],
      },
    ],
  },
  {
    id: "email",
    number: "02",
    title: "Email marketing",
    subtitle: "Cold and nurture email campaigns, from warmed sending setups to booked calls.",
    projectCount: "7 client projects",
    clients: [
      {
        tag: "EMAIL MARKETING",
        client: "Primrose School of Rockland, MA",
        industry: "Education",
        description:
          "A $4,000 tuition offer that brought families back for a tour. Split past enquiries into two lists and ran a 6-email Mailchimp campaign from the school owner's own inbox.",
        metrics: [
          { value: "48%", label: "open rate" },
          { value: "11", label: "parent replies" },
          { value: "6", label: "tours booked" },
        ],
      },
      {
        tag: "COLD EMAIL",
        client: "Aptibit",
        industry: "AI & Software Development",
        description:
          "Cold email outreach that opened new B2B conversations. Warmed sending domains, verified lists and short sequences pitching custom AI, computer vision and enterprise software to business buyers.",
        metrics: [
          { value: "42%", label: "open rate" },
          { value: "4.8%", label: "reply rate" },
          { value: "12", label: "meetings booked" },
        ],
      },
      {
        tag: "EMAIL MARKETING",
        client: "Bootz To Heelz",
        industry: "Business Coaching",
        description:
          "Nurture emails to business owners and corporate leaders that turned subscribers into leadership coaching calls.",
        metrics: [
          { value: "44%", label: "open rate" },
          { value: "3.9%", label: "click rate" },
          { value: "14", label: "discovery calls" },
        ],
      },
      {
        tag: "COLD EMAIL",
        client: "Belt Conveyor Guarding",
        industry: "Manufacturing",
        description:
          "Cold email to safety and maintenance managers at North American mining and bulk-handling sites that need compliant conveyor guards.",
        metrics: [
          { value: "39%", label: "open rate" },
          { value: "3.6%", label: "reply rate" },
          { value: "9", label: "guarding assessments booked" },
        ],
      },
      {
        tag: "EMAIL MARKETING",
        client: "Table Tutor",
        industry: "SaaS",
        description:
          "Email sequences to restaurant owners and managers that moved sign-ups toward a demo of the staff training app.",
        metrics: [
          { value: "41%", label: "open rate" },
          { value: "4.2%", label: "click rate" },
          { value: "22", label: "demo sign-ups" },
        ],
      },
      {
        tag: "EMAIL MARKETING",
        client: "Swopelees",
        industry: "Real Estate",
        description:
          "Listing emails to businesses and investors looking to buy or lease commercial space in Chester County, Pennsylvania.",
        metrics: [
          { value: "46%", label: "open rate" },
          { value: "5.1%", label: "click rate" },
          { value: "19", label: "property enquiries" },
        ],
      },
      {
        tag: "COLD EMAIL",
        client: "The Gate PM Management",
        industry: "Property Renovation",
        description:
          "Cold email to UK landlords and property managers planning renovation work.",
        metrics: [
          { value: "40%", label: "open rate" },
          { value: "4.2%", label: "reply rate" },
          { value: "10", label: "site visits booked" },
        ],
      },
    ],
  },
  {
    id: "seo",
    number: "03",
    title: "SEO, AEO and GEO",
    subtitle:
      "Technical, on-page and content SEO, plus answer-first content built to earn citations in AI Overviews, ChatGPT, Gemini and Perplexity.",
    projectCount: "4 client projects",
    clients: [
      {
        tag: "SEO, AEO AND GEO",
        client: "ThoughtSpot",
        industry: "AI analytics and business intelligence",
        description: "Growing organic traffic and AI search visibility.",
        metrics: [
          { value: "187,100+", label: "monthly organic visitors" },
          { value: "47,900+", label: "ranking keywords" },
          { value: "2,100+", label: "AI platform mentions" },
        ],
      },
      {
        tag: "SEO, AEO AND GEO",
        client: "Numeric",
        industry: "Accounting and finance software",
        description: "Increasing search visibility for accounting software.",
        metrics: [
          { value: "39,000+", label: "monthly organic visitors" },
          { value: "17,900+", label: "ranking keywords" },
          { value: "777", label: "AI-cited pages" },
        ],
      },
      {
        tag: "SEO, AEO AND GEO",
        client: "Riot Platforms",
        industry: "Digital infrastructure & Bitcoin mining",
        description: "Increasing organic traffic by 54.1%.",
        metrics: [
          { value: "54.1%", label: "reported organic traffic growth" },
          { value: "65,600+", label: "monthly organic visitors" },
          { value: "1,300+", label: "AI mentions" },
        ],
      },
      {
        tag: "LOCAL SEO",
        client: "UNA Fitness",
        industry: "Fitness and wellness",
        description: "Building local search visibility for online fitness coaching.",
        metrics: [
          { value: "5", label: "local SEO blogs in one reported week" },
          { value: "Top 3", label: "Google map ranking" },
        ],
      },
    ],
  },
  {
    id: "gbp",
    number: "04",
    title: "Google Business Profile",
    subtitle: "Profile optimisation, city pages and local citations that bring in local enquiries.",
    projectCount: "2 client projects",
    clients: [
      {
        tag: "GOOGLE BUSINESS PROFILE",
        client: "UNA Fitness",
        industry: "Fitness and wellness",
        description:
          "Prepared Google Business Profile content and service information, with location pages for target US cities.",
        metrics: [
          { value: "5", label: "local SEO blogs in one reported week" },
          { value: "100%", label: "profile completeness & citations" },
        ],
      },
      {
        tag: "LOCAL SEO & CONVERSIONS",
        client: "Dr. Ankur Dental Clinic",
        industry: "Dental care",
        description:
          "A dentist web portal with calendar booking and optimised local service SEO indexing.",
        metrics: [
          { value: "+180%", label: "bookings growth" },
          { value: "92%", label: "friction drop" },
          { value: "25K+", label: "local reach" },
        ],
      },
    ],
  },
  {
    id: "ads",
    number: "05",
    title: "Social media marketing and paid ads",
    subtitle:
      "Social media management and creatives, plus Meta and Google ad campaigns built for qualified leads and high ROAS.",
    projectCount: "14 client projects",
    clients: [
      {
        tag: "META & GOOGLE ADS",
        client: "Pilates Studio",
        industry: "Boutique Fitness",
        description:
          "Filling a ₹1.5L Pilates membership in Gurugram. Targeted HNI behavior clusters and Gurugram's posh residential sectors, excluding mass-market fitness browsers.",
        metrics: [
          { value: "₹90 - 700", label: "cost per lead" },
          { value: "2 to 5%", label: "click-through rate" },
          { value: "10 to 15%", label: "lead-to-trial rate" },
        ],
      },
      {
        tag: "B2B TRADE ADS",
        client: "Indian Food Exporter, UAE",
        industry: "Import & Export",
        description:
          "Reaching Dubai's decision-makers with Meta and Google Ads. Targeted UAE retail buyers, trading houses and procurement heads with direct Click-to-WhatsApp trade ads.",
        metrics: [
          { value: "₹500 - 1,500", label: "cost per B2B lead" },
          { value: "1 to 3%", label: "click-through rate" },
          { value: "15 to 20%", label: "lead-to-conversation rate" },
        ],
      },
      {
        tag: "MULTI-LOCATION SCALING",
        client: "25-Location Fitness Chain",
        industry: "Fitness Network",
        description:
          "One campaign, 25 gyms. Centralized all 25 locations under one master campaign with automatic branch lead routing to front desks.",
        metrics: [
          { value: "₹50 - 350", label: "network average CPL" },
          { value: "2 to 5%", label: "click-through rate" },
          { value: "20 to 35%", label: "lead-to-trial rate" },
        ],
      },
      {
        tag: "HIGH-TICKET REAL ESTATE",
        client: "NCR Real Estate Developer",
        industry: "Real Estate",
        description:
          "Solving the fake lead problem with OTP verification. Integrated SMS OTP verification directly into ad forms, delivering 100% phone-verified buyer leads to sales agents.",
        metrics: [
          { value: "₹250 - 1,000", label: "cost per verified lead" },
          { value: "95%+", label: "fake lead reduction" },
          { value: "10 to 15%", label: "lead-to-site visit rate" },
        ],
      },
      {
        tag: "HEALTHCARE ADS",
        client: "HealthStream Diagnostics",
        industry: "Healthcare & Diagnostics",
        description:
          "Meta ad campaigns promoting full-body health checkup packages with home sample collection across Delhi NCR.",
        metrics: [
          { value: "₹180", label: "cost per booking" },
          { value: "4.2%", label: "click-through rate" },
          { value: "320+", label: "monthly checkups" },
        ],
      },
      {
        tag: "E-COMMERCE SHOPPING",
        client: "Aura Living Goods",
        industry: "Home & Lifestyle E-Commerce",
        description:
          "Google Shopping and Performance Max campaigns targeting high-intent home decor buyers across tier-1 cities.",
        metrics: [
          { value: "4.5x", label: "average ROAS" },
          { value: "₹450", label: "cost per acquisition" },
          { value: "+180%", label: "quarterly sales growth" },
        ],
      },
      {
        tag: "B2B SAAS SEARCH",
        client: "Planora BIM Viewer",
        industry: "Industrial SaaS / 3D Web",
        description:
          "Google Search campaigns capturing architects and structural engineers seeking 3D WebGL BIM file review software.",
        metrics: [
          { value: "₹1,200", label: "cost per demo request" },
          { value: "6.8%", label: "search CTR" },
          { value: "42", label: "enterprise demos a month" },
        ],
      },
      {
        tag: "LOCAL SERVICE ADS",
        client: "Apex Dental Care",
        industry: "Dental & Healthcare",
        description:
          "Hyper-local Meta Ads for teeth whitening and clear aligners targeting residents within a 5km clinic radius.",
        metrics: [
          { value: "₹220", label: "cost per consultation" },
          { value: "18%", label: "consultation booking rate" },
          { value: "65+", label: "new patients a month" },
        ],
      },
      {
        tag: "FINTECH SEARCH",
        client: "Stallion Commercial Finance",
        industry: "Financial Services",
        description:
          "Search campaigns targeting commercial real estate investors looking for working capital and asset loans.",
        metrics: [
          { value: "₹1,800", label: "cost per loan enquiry" },
          { value: "5.4%", label: "CTR on intent keywords" },
          { value: "28", label: "qualified loan leads a month" },
        ],
      },
      {
        tag: "LUXURY RETAIL ADS",
        client: "Velvet Couture Dubai",
        industry: "Luxury Fashion & Retail",
        description:
          "Instagram Catalog and Story ads targeting GCC luxury shoppers for haute couture evening wear collections.",
        metrics: [
          { value: "5.2x", label: "blended ROAS" },
          { value: "3.8%", label: "ad CTR" },
          { value: "140+", label: "high-ticket orders" },
        ],
      },
      {
        tag: "LOGISTICS SEARCH",
        client: "Urban Logistics India",
        industry: "Supply Chain & Freight",
        description:
          "Google Search campaigns targeting manufacturers searching for reliable inter-city freight and warehousing.",
        metrics: [
          { value: "₹950", label: "cost per contract lead" },
          { value: "8.2%", label: "conversion rate" },
          { value: "35", label: "corporate contract enquiries" },
        ],
      },
      {
        tag: "REAL ESTATE ADS",
        client: "Metropolis Workspaces",
        industry: "Commercial Co-Working",
        description:
          "Lead generation campaigns targeting startups and SMB founders needing private office desks in Bengaluru.",
        metrics: [
          { value: "₹340", label: "cost per desk lead" },
          { value: "22%", label: "tour visit rate" },
          { value: "85", label: "hotdesk enquiries a month" },
        ],
      },
      {
        tag: "MANAGED IT SEARCH",
        client: "CloudCraft Tech Solutions",
        industry: "Cloud & Managed IT",
        description:
          "Google Search ads bidding on AWS migration, cloud security and managed IT services keywords.",
        metrics: [
          { value: "₹1,450", label: "cost per SQL" },
          { value: "4.9%", label: "search CTR" },
          { value: "19", label: "signed SLA clients" },
        ],
      },
      {
        tag: "D2C META SCALING",
        client: "BioGen Organics",
        industry: "D2C FMCG / Skincare",
        description:
          "Advantage+ Shopping campaigns running user-generated video ads for organic skincare products.",
        metrics: [
          { value: "3.9x", label: "ROAS at scale" },
          { value: "₹310", label: "CPA per customer" },
          { value: "1,200+", label: "orders a month" },
        ],
      },
    ],
  },
];

export default function LeadGenServices() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    linkedin: true, // LinkedIn outreach expanded by default
  });

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId !== "all") {
      setExpandedGroups((prev) => ({
        ...prev,
        [tabId]: true,
      }));
    }
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    SERVICE_GROUPS.forEach((g) => {
      all[g.id] = true;
    });
    setExpandedGroups(all);
  };

  const collapseAll = () => {
    setExpandedGroups({});
  };

  const displayedGroups =
    activeTab === "all"
      ? SERVICE_GROUPS
      : SERVICE_GROUPS.filter((g) => g.id === activeTab);

  return (
    <section id="services" className="px-6 py-28 md:px-10 bg-paper">
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="HOW I GENERATE LEADS"
            lines={["Services that", "bring you leads"]}
          />
          <p className="mt-6 text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
            Every service below is a way to put qualified buyers in front of your business. Click any service to expand and explore the client work behind it.
          </p>
        </div>

        {/* Filter Pills & Expand Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTabChange("all")}
              className={clsx(
                "px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all",
                activeTab === "all"
                  ? "bg-ink text-paper"
                  : "bg-mist/70 text-ink/70 hover:bg-mist hover:text-ink"
              )}
            >
              All Services (34 Projects)
            </button>
            {SERVICE_GROUPS.map((grp) => (
              <button
                key={grp.id}
                onClick={() => handleTabChange(grp.id)}
                className={clsx(
                  "px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all",
                  activeTab === grp.id
                    ? "bg-ink text-paper"
                    : "bg-mist/70 text-ink/70 hover:bg-mist hover:text-ink"
                )}
              >
                {grp.number} {grp.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs font-semibold text-ink/60 hover:text-ink px-3 py-1.5 rounded-full border border-ink/15 hover:border-ink hover:bg-mist/40 transition-all"
            >
              Expand all +
            </button>
            <button
              onClick={collapseAll}
              className="text-xs font-semibold text-ink/60 hover:text-ink px-3 py-1.5 rounded-full border border-ink/15 hover:border-ink hover:bg-mist/40 transition-all"
            >
              Collapse all −
            </button>
          </div>
        </div>

        {/* Services & Client Project Cards */}
        <div className="mt-12 space-y-6">
          {displayedGroups.map((group) => {
            const isExpanded = !!expandedGroups[group.id];

            return (
              <div
                key={group.id}
                className="relative rounded-3xl border border-ink/10 bg-mist/20 p-6 md:p-8 transition-all hover:border-ink/25 hover:shadow-sm"
              >
                {/* Category Header Strip — Clickable */}
                <div
                  onClick={() => toggleGroup(group.id)}
                  className="cursor-pointer group/header flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-accent-dim font-bold text-xl md:text-2xl">
                        {group.number}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-ink group-hover/header:text-accent-dim transition-colors">
                        {group.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm md:text-base text-ink/65 max-w-2xl">
                      {group.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-center shrink-0">
                    <span className="inline-block rounded-full bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70 border border-ink/10">
                      {group.projectCount}
                    </span>

                    {/* Plus / Minus Expand Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(group.id);
                      }}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.title}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-paper text-ink shadow-sm transition-all duration-300 group-hover/header:bg-ink group-hover/header:text-paper group-hover/header:border-ink"
                    >
                      <motion.span
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="text-2xl font-light leading-none select-none"
                      >
                        +
                      </motion.span>
                    </button>
                  </div>
                </div>

                {/* Expandable Cards Grid */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${group.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 pt-8 border-t border-ink/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.clients.map((client, idx) => (
                          <motion.div
                            key={`${client.client}-${idx}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: (idx % 6) * 0.04,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col justify-between rounded-2xl bg-[#141414] p-6 text-paper border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                          >
                            <div>
                              {/* Top tag & industry pill */}
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-accent/90">
                                  {client.tag}
                                </span>
                                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/60">
                                  {client.industry}
                                </span>
                              </div>

                              {/* Client Title */}
                              <h4 className="font-display text-lg md:text-xl font-bold text-paper mb-2.5 group-hover:text-accent transition-colors">
                                {client.client}
                              </h4>

                              {/* Brief description */}
                              <p className="text-xs md:text-sm text-paper/70 leading-relaxed">
                                {client.description}
                              </p>
                            </div>

                            {/* Metrics Strip */}
                            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-2">
                              {client.metrics.map((m, mIdx) => (
                                <div key={mIdx} className="flex flex-col">
                                  <span className="font-display text-base md:text-lg font-bold text-paper">
                                    {m.value}
                                  </span>
                                  <span className="text-[10px] uppercase tracking-wider text-paper/50 leading-tight mt-0.5">
                                    {m.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
