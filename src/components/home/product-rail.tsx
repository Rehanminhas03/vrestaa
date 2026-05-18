"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";
import { cn } from "@/lib/cn";

interface ProductRailProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  products: Product[];
}

export function ProductRail({
  eyebrow,
  title,
  description,
  href,
  products,
}: ProductRailProps) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla]);

  return (
    <section className="border-t border-[color:var(--color-border)] py-24 md:py-32">
      <Container size="wide">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            href={href}
            hrefLabel="View all"
          />
          <div className="hidden gap-2 md:flex">
            <RailArrow
              direction="prev"
              disabled={!canPrev}
              onClick={() => embla?.scrollPrev()}
            />
            <RailArrow
              direction="next"
              disabled={!canNext}
              onClick={() => embla?.scrollNext()}
            />
          </div>
        </div>

        <div ref={emblaRef} className="mt-10 overflow-hidden">
          <div className="flex gap-5">
            {products.map((p) => (
              <div
                key={p.slug}
                className="min-w-0 shrink-0 basis-[78%] sm:basis-[42%] md:basis-[32%] lg:basis-[24%]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function RailArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] text-white transition-all",
        "hover:border-white hover:bg-white hover:text-[color:var(--color-ink)]",
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[color:var(--color-border-strong)] disabled:hover:bg-transparent disabled:hover:text-white",
      )}
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );
}
