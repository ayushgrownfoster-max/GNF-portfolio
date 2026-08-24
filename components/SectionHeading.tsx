import clsx from "clsx";
import RevealText from "./RevealText";

interface SectionHeadingProps {
  eyebrow?: string;
  lines: string[];
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  lines,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={clsx(align === "center" && "text-center", className)}>
      {eyebrow && (
        <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
          {eyebrow}
        </span>
      )}
      <RevealText
        as="h2"
        lines={lines}
        className="font-display text-display-md text-balance"
      />
    </div>
  );
}
