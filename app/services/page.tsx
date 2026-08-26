import { getServices } from "@/lib/wordpress";
import ServiceList from "@/components/ServiceList";
import RevealText from "@/components/RevealText";

export const metadata = {
  title: "Services | Grow N Foster",
  description: "Our core capabilities in building measurable growth.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="flex-1 pt-32 pb-24 md:pt-40 overflow-hidden">
      <div className="mx-auto max-w-site px-6 md:px-10">
        {/* Header */}
        <div className="mb-20 md:mb-32 max-w-3xl">
          <RevealText
            as="h1"
            lines={["What We Do"]}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-ink uppercase tracking-tight"
          />
          <p className="mt-8 text-lg text-ink/70">
            We build measurable growth for brands that refuse to look like everyone else.
          </p>
        </div>

        {/* The interactive Service List component */}
        <ServiceList services={services} />
      </div>
    </main>
  );
}