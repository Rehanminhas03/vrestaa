"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/common/price";
import { Rating } from "@/components/common/rating";
import { useUIStore } from "@/store/ui";
import { useCartStore } from "@/store/cart";
import { dispatchFlyToCart } from "@/components/animations/fly-to-cart";
import { PRODUCT_BY_SLUG } from "@/data/products";
import { ROUTES } from "@/constants/routes";
import type { Product, Size } from "@/types";
import * as React from "react";

export function QuickView() {
  const slug = useUIStore((s) => s.quickViewSlug);
  const close = useUIStore((s) => s.setQuickView);
  const product = slug ? PRODUCT_BY_SLUG[slug] : null;

  return (
    <Dialog open={!!slug} onOpenChange={(o) => !o && close(null)}>
      <DialogContent className="max-w-4xl p-0">
        <DialogTitle className="sr-only">{product?.name ?? "Quick view"}</DialogTitle>
        {/*
          Keying by slug remounts the inner panel when the product changes,
          which resets local selection state without using an effect.
        */}
        {product && <QuickViewInner key={product.slug} product={product} onClose={() => close(null)} />}
      </DialogContent>
    </Dialog>
  );
}

function QuickViewInner({ product, onClose }: { product: Product; onClose: () => void }) {
  const add = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const [colorIndex, setColorIndex] = React.useState(0);
  const [size, setSize] = React.useState<Size | null>(null);
  const color = product.colors[colorIndex];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative aspect-square md:aspect-auto md:min-h-[480px] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 480px, 100vw"
          className="object-cover"
        />
        {product.badges[0] && (
          <Badge variant="accent" className="absolute left-4 top-4">
            {product.badges[0].replace("_", " ")}
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
            {product.gender}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
            {product.name}
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} />
          </div>
        </div>

        <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />

        <p className="text-sm text-[color:var(--color-fg-muted)]">{product.description}</p>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Colour · <span className="text-[color:var(--color-fg-muted)]">{color.name}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIndex(i)}
                aria-label={c.name}
                className="relative h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: c.hex,
                  borderColor: i === colorIndex ? "#fff" : "transparent",
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`inline-flex h-10 min-w-12 items-center justify-center rounded-md border px-3 text-xs font-medium uppercase tracking-wider transition-colors ${
                  size === s
                    ? "border-white bg-white text-[color:var(--color-ink)]"
                    : "border-[color:var(--color-border-strong)] text-white hover:border-white/60"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            variant="primary"
            className="flex-1"
            disabled={!size}
            onClick={(e) => {
              if (!size) return;
              dispatchFlyToCart(e.currentTarget, product.images[0]);
              add({
                id: "",
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                color: { name: color.name, hex: color.hex },
                size,
                quantity: 1,
              });
              onClose();
              setTimeout(() => setCartOpen(true), 700);
            }}
          >
            {size ? "Add to bag" : "Select a size"}
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={ROUTES.product(product.slug)} onClick={onClose}>
              Full details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
