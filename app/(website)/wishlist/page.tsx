"use client";

import { Heart } from "lucide-react";
import { Container } from "@/website/components/common/container";
import { ProductCard } from "@/website/components/product/product-card";
import { EmptyState } from "@/website/components/common/empty-state";
import { useWishlistStore } from "@/website/store/wishlist";
import { useMounted } from "@/website/hooks/use-mounted";
import { PRODUCT_BY_SLUG } from "@/website/data/products";
import { ROUTES } from "@/website/constants/routes";

export default function WishlistPage() {
  const slugs = useWishlistStore((s) => s.slugs);
  const mounted = useMounted();

  const products = slugs.map((s) => PRODUCT_BY_SLUG[s]).filter(Boolean);

  return (
    <Container size="wide" className="py-12 md:py-20">
      <header className="mb-10 flex flex-col gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          Saved for later
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
          Wishlist
        </h1>
        {mounted && products.length > 0 && (
          <p className="text-sm text-[color:var(--color-fg-muted)]">
            {products.length} item{products.length !== 1 && "s"} you&apos;ve saved.
          </p>
        )}
      </header>

      {!mounted ? null : products.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-6 w-6" />}
          title="No saved pieces yet"
          description="Tap the heart on any product to start your wishlist."
          cta={{ label: "Browse the shop", href: ROUTES.shop }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </Container>
  );
}
