"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/common/price";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/constants/routes";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";
import { EASE_OUT_QUART } from "@/lib/motion";
import { totalStock } from "@/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority, className }: ProductCardProps) {
  const wished = useWishlistStore((s) => s.has(product.slug));
  const toggle = useWishlistStore((s) => s.toggle);
  const setQuickView = useUIStore((s) => s.setQuickView);

  const [hoverImage, setHoverImage] = React.useState(false);

  const primary = product.images[0];
  const secondary = product.images[1] ?? primary;
  const stock = totalStock(product);
  const isSoldOut = stock === 0;
  const isLowStock = stock > 0 && stock < 8;

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
      className={cn("group relative flex flex-col", className)}
    >
      <Link
        href={ROUTES.product(product.slug)}
        className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-[color:var(--color-surface)]"
        onMouseEnter={() => setHoverImage(true)}
        onMouseLeave={() => setHoverImage(false)}
      >
        <Image
          src={primary}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={cn(
            "object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            hoverImage && secondary !== primary ? "opacity-0 scale-[1.04]" : "scale-100",
          )}
        />
        {secondary !== primary && (
          <Image
            src={secondary}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={cn(
              "absolute inset-0 object-cover transition-opacity duration-[800ms]",
              hoverImage ? "opacity-100" : "opacity-0",
            )}
          />
        )}

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {isSoldOut ? (
            <Badge variant="dark">Sold out</Badge>
          ) : isLowStock ? (
            <Badge variant="accent">Selling fast</Badge>
          ) : null}
          {product.badges.map((b) => (
            <Badge
              key={b}
              variant={
                b === "SALE" ? "sale" : b === "NEW" ? "accent" : b === "LIMITED" ? "dark" : "default"
              }
            >
              {b.replace("_", " ")}
            </Badge>
          ))}
        </div>

        {isSoldOut && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[2px]">
            <span className="rounded-full border border-white/40 bg-black/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
              Sold out
            </span>
          </div>
        )}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <CardIconButton
            label={wished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              toggle(product.slug);
            }}
            active={wished}
          >
            <Heart className={cn("h-4 w-4", wished && "fill-current")} />
          </CardIconButton>
          <CardIconButton
            label="Quick view"
            onClick={(e) => {
              e.preventDefault();
              setQuickView(product.slug);
            }}
          >
            <Eye className="h-4 w-4" />
          </CardIconButton>
        </div>

        <div
          className={cn(
            "absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          <div className="flex items-center justify-between rounded-full bg-[color:var(--color-ink)]/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <span>Quick add</span>
            <div className="flex gap-1.5">
              {product.sizes.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[9px] text-white/85"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={ROUTES.product(product.slug)}
            className="block text-sm font-medium text-white transition-colors hover:text-[color:var(--color-accent)]"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 truncate text-xs uppercase tracking-wide text-[color:var(--color-fg-muted)]">
            {product.colors.length} colour{product.colors.length !== 1 && "s"}
          </p>
        </div>
        <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" align="right" />
      </div>
    </motion.article>
  );
}

function CardIconButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/90 backdrop-blur-md transition-all hover:scale-105 hover:border-white/30",
        active && "text-[color:var(--color-accent)] border-[color:var(--color-accent)]/40",
      )}
    >
      {children}
    </button>
  );
}
