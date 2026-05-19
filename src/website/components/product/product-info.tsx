"use client";

import * as React from "react";
import { Heart, Minus, Plus, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import type { Product, Size } from "@/website/types";
import { Button } from "@/website/components/ui/button";
import { Badge } from "@/website/components/ui/badge";
import { Price } from "@/website/components/common/price";
import { Rating } from "@/website/components/common/rating";
import { Magnetic } from "@/website/components/animations/magnetic-button";
import { useCartStore } from "@/website/store/cart";
import { useUIStore } from "@/website/store/ui";
import { useWishlistStore } from "@/website/store/wishlist";
import { StockIndicator } from "./stock-indicator";
import { dispatchFlyToCart } from "@/website/components/animations/fly-to-cart";
import { cn } from "@/website/lib/cn";

interface ProductInfoProps {
  product: Product;
  colorIndex: number;
  onColorChange: (index: number) => void;
}

export function ProductInfo({ product, colorIndex, onColorChange }: ProductInfoProps) {
  const [size, setSize] = React.useState<Size | null>(null);
  const [qty, setQty] = React.useState(1);

  const add = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const wished = useWishlistStore((s) => s.has(product.slug));
  const toggleWish = useWishlistStore((s) => s.toggle);

  const color = product.colors[colorIndex];

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      quantity: qty,
    });
    // Open the drawer a beat after the animation lands.
    setTimeout(() => setCartOpen(true), 700);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2">
          {product.badges.map((b) => (
            <Badge
              key={b}
              variant={b === "SALE" ? "sale" : b === "NEW" ? "accent" : "dark"}
            >
              {b.replace("_", " ")}
            </Badge>
          ))}
        </div>
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-fg-muted)]">
          {product.gender}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
      </div>

      <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />

      <p className="text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
        {product.description}
      </p>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Colour · <span className="text-[color:var(--color-fg-muted)]">{color.name}</span>
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => onColorChange(i)}
              aria-label={c.name}
              title={c.name}
              className="relative h-10 w-10 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: c.hex,
                borderColor: i === colorIndex ? "#fff" : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">Size</p>
          <button className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)] underline-offset-4 hover:text-white hover:underline">
            Size guide
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => {
            const stockForSize = product.inventory?.[s];
            const soldOut = stockForSize === 0;
            return (
              <button
                key={s}
                onClick={() => !soldOut && setSize(s)}
                disabled={soldOut}
                aria-disabled={soldOut}
                title={soldOut ? `${s} — sold out` : undefined}
                className={cn(
                  "relative inline-flex h-11 min-w-12 items-center justify-center rounded-md border px-4 text-xs font-medium uppercase tracking-wider transition-colors",
                  size === s
                    ? "border-white bg-white text-[color:var(--color-ink)]"
                    : "border-[color:var(--color-border-strong)] text-white hover:border-white/60",
                  soldOut &&
                    "cursor-not-allowed border-[color:var(--color-border)] text-white/30 hover:border-[color:var(--color-border)] line-through decoration-white/30",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
        <div className="mt-3">
          <StockIndicator product={product} selectedSize={size} />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="inline-flex h-14 items-center rounded-md border border-[color:var(--color-border-strong)]">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="inline-flex h-full w-12 items-center justify-center text-white/70 transition-colors hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty(qty + 1)}
            className="inline-flex h-full w-12 items-center justify-center text-white/70 transition-colors hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <Magnetic strength={0.2} className="flex-1">
          <Button
            size="lg"
            variant="primary"
            disabled={!size}
            onClick={handleAdd}
            className="w-full"
          >
            {size ? `Add to bag — ${qty}` : "Select a size"}
          </Button>
        </Magnetic>
        <Button
          variant="outline"
          size="lg"
          onClick={() => toggleWish(product.slug)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="!w-14 px-0"
        >
          <Heart className={cn("h-5 w-5", wished && "fill-[color:var(--color-accent)] text-[color:var(--color-accent)]")} />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-4 sm:grid-cols-3">
        <Perk icon={<Truck className="h-4 w-4" />} label="Free shipping over $120" />
        <Perk icon={<RotateCcw className="h-4 w-4" />} label="30-day returns" />
        <Perk icon={<ShieldCheck className="h-4 w-4" />} label="Lifetime craft guarantee" />
      </div>
    </div>
  );
}

function Perk({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[color:var(--color-fg-muted)]">
      <span className="text-white/70">{icon}</span>
      {label}
    </div>
  );
}
