"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  /**
   * If provided, this image is shown as the first slide; the rest of `images`
   * follow (deduped). Lets the parent swap the primary slide when the colour
   * variant changes without remounting the carousel.
   */
  primaryImageOverride?: string;
}

export function ProductGallery({ images, alt, primaryImageOverride }: ProductGalleryProps) {
  const resolvedImages = React.useMemo(() => {
    if (!primaryImageOverride) return images;
    return [primaryImageOverride, ...images.filter((src) => src !== primaryImageOverride)];
  }, [images, primaryImageOverride]);

  const [emblaRef, embla] = useEmblaCarousel({ loop: false });
  const [selected, setSelected] = React.useState(0);

  // When the primary override changes, snap the carousel back to slide 0 so the
  // newly-selected colour is the visible one.
  React.useEffect(() => {
    if (!embla) return;
    embla.scrollTo(0, true);
  }, [embla, primaryImageOverride]);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const [zoomed, setZoomed] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:gap-6">
      <div className="relative">
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-xl bg-[color:var(--color-surface)]"
        >
          <div className="flex">
            {resolvedImages.map((src, i) => (
              <div key={src + i} className="relative aspect-[4/5] w-full shrink-0">
                <Image
                  src={src}
                  alt={`${alt} — image ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={cn(
                    "object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    zoomed ? "scale-[1.2]" : "scale-100",
                  )}
                  onClick={() => setZoomed(!zoomed)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Previous image"
          onClick={() => embla?.scrollPrev()}
          className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next image"
          onClick={() => embla?.scrollNext()}
          className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {selected + 1} / {resolvedImages.length}
        </span>
      </div>

      {resolvedImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {resolvedImages.map((src, i) => (
            <button
              key={src + "-thumb-" + i}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md transition-all",
                selected === i
                  ? "ring-2 ring-white ring-offset-2 ring-offset-[color:var(--color-ink)]"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="100px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
