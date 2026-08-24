import type { Client } from "@/lib/types";
import Marquee from "./Marquee";

export default function ClientMarquee({ clients }: { clients: Client[] }) {
  return (
    <Marquee speedSeconds={36}>
      {clients.map((client, i) => (
        <span
          key={`${client.name}-${i}`}
          className="mx-8 shrink-0 whitespace-nowrap font-display text-2xl text-ink/30 grayscale transition-all duration-300 hover:text-ink hover:grayscale-0 md:text-3xl"
        >
          {client.name}
        </span>
      ))}
    </Marquee>
  );
}
