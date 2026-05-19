"use client";

import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/website/components/animations/reveal";
import { Rating } from "@/website/components/common/rating";
import { Button } from "@/website/components/ui/button";
import { reviewsForProduct } from "@/website/data/reviews";
import { formatDate } from "@/website/lib/format";

interface ReviewsSectionProps {
  productSlug: string;
  averageRating: number;
  totalCount: number;
}

export function ReviewsSection({ productSlug, averageRating, totalCount }: ReviewsSectionProps) {
  const reviews = reviewsForProduct(productSlug);

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
    return { star, count, pct };
  });

  return (
    <section className="border-t border-[color:var(--color-border)] py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            Reviews
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            What our athletes say
          </h3>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl font-bold text-white">
              {averageRating.toFixed(1)}
            </span>
            <Rating value={averageRating} />
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Based on {totalCount} reviews
          </p>

          <div className="mt-6 space-y-2">
            {breakdown.map((row) => (
              <div key={row.star} className="flex items-center gap-3">
                <span className="w-4 text-xs text-white/70">{row.star}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-[color:var(--color-accent)] transition-all duration-500"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs tabular-nums text-[color:var(--color-fg-muted)]">
                  {row.count}
                </span>
              </div>
            ))}
          </div>

          <Button variant="outline" size="md" className="mt-8 w-full">
            Write a review
          </Button>
        </div>

        <div className="lg:col-span-8">
          {reviews.length === 0 ? (
            <p className="text-sm text-[color:var(--color-fg-muted)]">
              No reviews yet for this piece. Be the first to share yours.
            </p>
          ) : (
            <ul className="space-y-6">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.05}>
                  <li className="rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-semibold text-white">{r.title}</h4>
                        <p className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
                          {r.author} · {formatDate(r.date)}
                        </p>
                      </div>
                      <Rating value={r.rating} />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/85">{r.body}</p>
                    {r.verified && (
                      <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified purchase
                      </p>
                    )}
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
