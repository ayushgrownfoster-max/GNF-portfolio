import clsx from "clsx";
import type { GalleryItem } from "@/lib/types";
import RevealImage from "./RevealImage";

export default function CaseStudyGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((item, i) => (
        <RevealImage
          key={i}
          media={item.media}
          sizes={
            item.layout === "full" || item.layout === "fullscreen"
              ? "100vw"
              : item.layout === "half"
              ? "(min-width: 768px) 50vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          className={clsx(
            item.layout === "full" || item.layout === "fullscreen"
              ? "md:col-span-3 aspect-[16/9]"
              : item.layout === "half"
              ? "md:col-span-3 lg:col-span-2 aspect-[4/3]"
              : "aspect-[4/3]",
            item.layout === "horizontal" && "md:col-span-3 aspect-[21/9]"
          )}
        />
      ))}
    </div>
  );
}
