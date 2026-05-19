"use client";

import * as React from "react";
import Image from "next/image";
import { AlertTriangle, Pencil, Search } from "lucide-react";
import { Input } from "@/website/components/ui/input";
import { Button } from "@/website/components/ui/button";
import { formatCurrency } from "@/website/lib/format";
import { cn } from "@/website/lib/cn";
import type { Product, Gender, CategorySlug, Size } from "@/website/types";
import { CATEGORIES, CATEGORY_LABEL } from "@/website/constants/categories";
import { totalStock } from "@/website/data/products";
import { EditProductDialog } from "./edit-product-dialog";

type StockFilter = "all" | "in" | "low" | "out";
type GenderFilter = "ALL" | Gender;

interface ProductsTableProps {
  products: Product[];
}

interface ProductOverride {
  price?: number;
  compareAtPrice?: number | null;
  inventory?: Partial<Record<Size, number>>;
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [category, setCategory] = React.useState<CategorySlug | "all">("all");
  const [gender, setGender] = React.useState<GenderFilter>("ALL");
  const [stockFilter, setStockFilter] = React.useState<StockFilter>("all");
  const [query, setQuery] = React.useState("");
  const [editing, setEditing] = React.useState<Product | null>(null);
  const [overrides, setOverrides] = React.useState<Record<string, ProductOverride>>({});

  const mergedProducts = React.useMemo(
    () =>
      products.map((p) => {
        const o = overrides[p.slug];
        if (!o) return p;
        return {
          ...p,
          price: o.price ?? p.price,
          compareAtPrice: o.compareAtPrice === null ? undefined : o.compareAtPrice ?? p.compareAtPrice,
          inventory: o.inventory ?? p.inventory,
        };
      }),
    [products, overrides],
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return mergedProducts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (gender !== "ALL" && p.gender !== gender && p.gender !== "UNISEX") return false;
      const stock = totalStock(p);
      if (stockFilter === "in" && stock <= 0) return false;
      if (stockFilter === "out" && stock !== 0) return false;
      if (stockFilter === "low") {
        const hasLow = Object.values(p.inventory ?? {}).some(
          (n) => n !== undefined && n > 0 && n <= 3,
        );
        if (!hasLow) return false;
      }
      if (q && !`${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [mergedProducts, category, gender, stockFilter, query]);

  const handleSave = (
    slug: string,
    next: { price: number; compareAtPrice?: number | null; inventory: Partial<Record<Size, number>> },
  ) => {
    setOverrides((prev) => ({ ...prev, [slug]: next }));
    setEditing(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-muted)]" />
          <Input
            placeholder="Search name, SKU, category…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Category
          </span>
          <Chip active={category === "all"} onClick={() => setCategory("all")}>All</Chip>
          {CATEGORIES.map((c) => (
            <Chip
              key={c.slug}
              active={category === c.slug}
              onClick={() => setCategory(c.slug)}
            >
              {c.name}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Audience
          </span>
          <Chip active={gender === "ALL"} onClick={() => setGender("ALL")}>All</Chip>
          <Chip active={gender === "MEN"} onClick={() => setGender("MEN")}>Men</Chip>
          <Chip active={gender === "WOMEN"} onClick={() => setGender("WOMEN")}>Women</Chip>
          <Chip active={gender === "UNISEX"} onClick={() => setGender("UNISEX")}>Unisex</Chip>

          <span className="ml-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Stock
          </span>
          <Chip active={stockFilter === "all"} onClick={() => setStockFilter("all")}>All</Chip>
          <Chip active={stockFilter === "in"} onClick={() => setStockFilter("in")}>In stock</Chip>
          <Chip active={stockFilter === "low"} onClick={() => setStockFilter("low")}>Low</Chip>
          <Chip active={stockFilter === "out"} onClick={() => setStockFilter("out")}>Sold out</Chip>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)]">
        <div className="border-b border-[color:var(--color-border)] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
          {filtered.length} of {products.length} products
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Audience</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-border)]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-[color:var(--color-fg-muted)]">
                    No products match the current filters.
                  </td>
                </tr>
              )}
              {filtered.map((p) => {
                const stock = totalStock(p);
                const hasLow = Object.values(p.inventory ?? {}).some(
                  (n) => n !== undefined && n > 0 && n <= 3,
                );
                return (
                  <tr key={p.slug} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white/5">
                          <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-white">{p.name}</p>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                            {p.sku}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/85">{CATEGORY_LABEL[p.category]}</td>
                    <td className="px-5 py-4 text-white/85">{p.gender}</td>
                    <td className="px-5 py-4 text-white tabular-nums">
                      {formatCurrency(p.price)}
                      {p.compareAtPrice && (
                        <span className="ml-2 text-xs text-[color:var(--color-fg-muted)] line-through">
                          {formatCurrency(p.compareAtPrice)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "tabular-nums",
                            stock === 0 ? "text-[color:var(--color-danger)]" : "text-white",
                          )}
                        >
                          {stock === 0 ? "Sold out" : `${stock} units`}
                        </span>
                        {hasLow && stock > 0 && (
                          <AlertTriangle
                            className="h-3.5 w-3.5 text-amber-300"
                            aria-label="At least one size is low"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditing(p)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <EditProductDialog
        product={editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
        active
          ? "bg-white text-[color:var(--color-ink)]"
          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
