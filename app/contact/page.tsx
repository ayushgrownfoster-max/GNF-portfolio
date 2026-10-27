import type { Metadata } from "next";
import Image from "next/image";
import RevealText from "@/components/RevealText";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Twinka Singhal",
  description: "Start a project or book a lead generation consultation with Twinka Singhal.",
};

// Studio workspace images with verified Unsplash URLs
const studioImages = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    alt: "Grow N Foster Studio Workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
    alt: "Case Study Design Process",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    alt: "Team Collaboration Meeting",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    alt: "Modern Creative Agency Office",
  },
  {
    src: "https://images.unsplash.com/photo-1542744836-550523357000?q=80&w=800&auto=format&fit=crop",
    alt: "Strategy & Branding Sprint",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    alt: "Digital Product Prototyping",
  },
];

// Portfolio Highlights Data
const portfolioItems = [
  {
    id: 1,
    title: "Fintech Growth Case Study",
    category: "Brand Strategy & UX",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    description: "Complete rebrand and mobile app design leading to 140% user acquisition boost within 3 months.",
  },
  {
    id: 2,
    title: "E-Commerce Scaling",
    category: "Product Redesign",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    description: "Headless Shopify platform architecture with optimized checkout experience driving 42% higher conversion.",
  },
  {
    id: 3,
    title: "SaaS Brand Identity",
    category: "Identity & Motion",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    description: "Positioning strategy, 3D motion design system, and global UI component library for an enterprise AI platform.",
  },
  {
    id: 4,
    title: "HealthTech Platform",
    category: "Web & Mobile App",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    description: "Patient-centric telehealth portal simplifying appointments, remote vitals monitoring, and prescription management.",
  },
  {
    id: 5,
    title: "Luxury Hospitality Digital",
    category: "Digital Experience",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    description: "Immersive story-driven web portal and direct reservation engine for a global chain of boutique hotels.",
  },
  {
    id: 6,
    title: "Sustainable Apparel Campaign",
    category: "Content & Marketing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    description: "Omnichannel digital brand strategy and video production driving viral reach across global eco-conscious audiences.",
  },
];

export default function ContactPage() {
  const marqueeStudioImages = [...studioImages, ...studioImages];
  const marqueePortfolio = [...portfolioItems, ...portfolioItems];

  return (
    <section className="relative overflow-hidden pb-28 pt-36">
      {/* CSS Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-continuous {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite !important;
          pointer-events: none;
        }
        .animate-portfolio-continuous {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite !important;
        }
      `}</style>

      {/* Background Accent Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 h-80 w-80 rounded-full bg-ink/5 blur-3xl"
      />

      <div className="mx-auto max-w-site px-6 md:px-12 lg:px-20">
        {/* Main Header & Form Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">

          {/* Left Column: Context & Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-ink/50">
                Let's Connect
              </span>

              <RevealText
                as="h1"
                lines={["Have a brand", "that deserves", "to grow?"]}
                className="font-display text-display-lg text-balance leading-tight text-ink"
              />

              <p className="mt-6 max-w-md text-base md:text-lg text-ink/70 leading-relaxed">
                Tell us where you're stuck and where you want to be. We'll come
                back with a point of view, not a template proposal.
              </p>
            </div>

            {/* Structured Contact Information Cards */}
            <div className="grid grid-cols-1 gap-3 pt-2 border-t border-ink/10 text-sm">
              <div className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-ink/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-ink transition-transform group-hover:scale-105">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink/40">Email</p>
                  <a href="mailto:twinkasinghal8@gmail.com" className="font-medium text-ink transition-colors hover:underline">
                    twinkasinghal8@gmail.com
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-ink/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-ink transition-transform group-hover:scale-105">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink/40">Upwork Profile</p>
                  <a href="https://www.upwork.com/freelancers/~01a3b32123f9eff361?mp_source=share" target="_blank" rel="noopener noreferrer" className="font-medium text-ink transition-colors hover:underline">
                    Hire on Upwork
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-ink/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-ink transition-transform group-hover:scale-105">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink/40">Location</p>
                  <p className="font-medium text-ink">India · Working with USA, UK, GCC &amp; Global Clients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-ink/10 bg-surface/50 p-6 shadow-xl backdrop-blur-md md:p-10">
              <ContactForm />
            </div>
          </div>

        </div>

        {/* Team Image - Placed below the Form & Details Grid */}
        <div className="relative mt-16 aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-3xl border border-ink/10 shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
            alt="Grow N Foster team collaboration"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </div>




    </section>
  );
}