import { getServices } from "@/lib/wordpress";
import ServiceList from "@/components/ServiceList";
import RevealText from "@/components/RevealText";

export const metadata = {
  title: "Services | Twinkle Singhal",
  description: "Lead generation, LinkedIn outreach, cold email, SEO & AEO, and paid performance marketing capabilities.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="flex-1 pt-32 pb-24 md:pt-40 overflow-hidden">
      <div className="mx-auto max-w-site px-6 md:px-10">
        {/* Header */}
        <div className="mb-20 md:mb-32 max-w-3xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            HOW I GENERATE LEADS
          </span>
          <RevealText
            as="h1"
            lines={["Services that", "bring you leads"]}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-ink uppercase tracking-tight"
          />
          <p className="mt-8 text-lg text-ink/70">
            Every service is a proven way to put qualified buyers in front of your business.
          </p>
        </div>

        {/* The interactive Service List component */}
        <ServiceList services={services} />
      </div>
    </main>
  );
}