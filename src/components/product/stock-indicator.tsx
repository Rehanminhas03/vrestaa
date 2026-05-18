"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Size, Product } from "@/types";

interface StockIndicatorProps {
  product: Product;
  selectedSize?: Size | null;
  className?: string;
}

const LOW_THRESHOLD = 4;

/**
 * Inline pill shown under the size selector on a product detail page.
 * - If a size is selected and it's sold out → "Sold out — pick another size"
 * - If selected and stock <= LOW_THRESHOLD → "Only N left in {size}"
 * - If no size selected and at least one size has low stock → generic "Selling fast"
 * - Otherwise renders nothing
 */
export function StockIndicator({ product, selectedSize, className }: StockIndicatorProps) {
  if (!product.inventory) return null;

  if (selectedSize) {
    const count = product.inventory[selectedSize];
    if (count === undefined) return null;
    if (count === 0) {
      return (
        <Pill className={className} tone="danger">
          Sold out in {selectedSize} · pick another size
        </Pill>
      );
    }
    if (count <= LOW_THRESHOLD) {
      return (
        <Pill className={className} tone="accent" icon>
          Only {count} left in {selectedSize}
        </Pill>
      );
    }
    return null;
  }

  const someLow = Object.values(product.inventory).some(
    (n) => n !== undefined && n > 0 && n <= LOW_THRESHOLD,
  );
  if (someLow) {
    return (
      <Pill className={className} tone="accent" icon>
        Selling fast
      </Pill>
    );
  }
  return null;
}

function Pill({
  children,
  tone,
  icon,
  className,
}: {
  children: React.ReactNode;
  tone: "accent" | "danger";
  icon?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
        tone === "accent" &&
          "bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] ring-1 ring-inset ring-[color:var(--color-accent)]/30",
        tone === "danger" &&
          "bg-[color:var(--color-danger)]/10 text-[color:var(--color-danger)] ring-1 ring-inset ring-[color:var(--color-danger)]/30",
        className,
      )}
    >
      {icon && <Flame className="h-3 w-3" />}
      {children}
    </span>
  );
}
