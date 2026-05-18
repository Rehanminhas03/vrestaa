"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Rating } from "@/components/common/rating";
import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <section className="border-t border-[color:var(--color-border)] py-24 md:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Voices from the floor"
          title="What athletes are saying."
        />

        <div ref={emblaRef} className="mt-12 overflow-hidden">
          <div className="flex gap-6">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.id}
                className="min-w-0 shrink-0 basis-full md:basis-[55%] lg:basis-[42%]"
              >
                <div className="flex h-full flex-col gap-6 rounded-2xl border border-[color:var(--color-border)] bg-white/[0.02] p-8 md:p-10">
                  <Quote className="h-6 w-6 text-[color:var(--color-accent)]" />
                  <p className="text-balance text-lg leading-relaxed text-white md:text-xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <span className="relative h-11 w-11 overflow-hidden rounded-full bg-white/5">
                        <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-[color:var(--color-fg-muted)]">{t.role}</p>
                      </div>
                    </div>
                    <Rating value={t.rating} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => embla?.scrollTo(i)}
                className={cn(
                  "h-1 rounded-full transition-all",
                  selected === i ? "w-8 bg-white" : "w-1.5 bg-white/30",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Previous"
              onClick={() => embla?.scrollPrev()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] text-white transition-all hover:border-white hover:bg-white hover:text-[color:var(--color-ink)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={() => embla?.scrollNext()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] text-white transition-all hover:border-white hover:bg-white hover:text-[color:var(--color-ink)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
