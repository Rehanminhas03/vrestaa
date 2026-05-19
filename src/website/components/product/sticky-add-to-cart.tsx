"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/website/components/ui/button";
import { Price } from "@/website/components/common/price";
import { useCartStore } from "@/website/store/cart";
import { useUIStore } from "@/website/store/ui";
import type { Product, Size } from "@/website/types";

interface StickyAddToCartProps {
  product: Product;
}

// Mobile-only floating bar that drops in once the primary CTA is scrolled out.
// On desktop we rely on the lg:sticky gallery and inline CTA, so we hide it â‰¥ lg.
export function StickyAddToCart({ product }: StickyAddToCartProps) {
  const [show, setShow] = React.useState(false);
  const [size, setSize] = React.useState<Size | null>(null);
  const add = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));

  return (
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-30 border-t border-[color:var(--color-border)] bg-[color:var(--color-charcoal)]/95 backdrop-blur-xl lg:hidden"
    >
      <div className="container-px mx-auto flex max-w-7xl items-center gap-3 py-3">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white/5">
          <Image
            src={product.images[0]}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-white">{product.name}</p>
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <select
            value={size ?? ""}
            onChange={(e) => setSize((e.target.value || null) as Size | null)}
            aria-label="Size"
            className="h-11 rounded-md border border-[color:var(--color-border-strong)] bg-transparent px-2 text-xs uppercase tracking-wider text-white focus:border-white focus:outline-none"
          >
            <option value="" disabled className="bg-[color:var(--color-charcoal)]">
              Size
            </option>
            {product.sizes.map((s) => (
              <option key={s} value={s} className="bg-[color:var(--color-charcoal)]">
                {s}
              </option>
            ))}
          </select>
          <Button
            size="md"
            variant="primary"
            disabled={!size}
            onClick={() => {
              if (!size) return;
              add({
                id: "",
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                color: { name: product.colors[0].name, hex: product.colors[0].hex },
                size,
                quantity: 1,
              });
              setCartOpen(true);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
