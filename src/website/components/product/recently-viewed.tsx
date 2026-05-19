"use client";

import { SectionHeading } from "@/website/components/common/section-heading";
import { ProductCard } from "./product-card";
import { useRecentlyViewedStore } from "@/website/store/recently-viewed";
import { useMounted } from "@/website/hooks/use-mounted";
import { PRODUCT_BY_SLUG } from "@/website/data/products";

interface RecentlyViewedProps {
  excludeSlug?: string;
}

export function RecentlyViewed({ excludeSlug }: RecentlyViewedProps) {
  const slugs = useRecentlyViewedStore((s) => s.slugs);
  const mounted = useMounted();

  if (!mounted) return null;

  const products = slugs
    .filter((s) => s !== excludeSlug)
    .map((s) => PRODUCT_BY_SLUG[s])
    .filter(Boolean)
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="border-t border-[color:var(--color-border)] py-16 md:py-24">
      <SectionHeading eyebrow="Recently viewed" title="Pick up where you left off." />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
