"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { FilterSidebar } from "./filter-sidebar";
import { SortDropdown } from "./sort-dropdown";
import { useFiltersStore } from "@/store/filters";
import { EmptyState } from "@/components/common/empty-state";
import { SlidersHorizontal } from "lucide-react";
import type { Gender, Product } from "@/types";
import { ROUTES } from "@/constants/routes";
import { genderMatches } from "@/lib/products-filter";
import { FiltersUrlSync } from "./filters-url-sync";

interface ProductGridProps {
  products: Product[];
  genderFilter?: Gender | null;
}

export function ProductGrid({ products, genderFilter = null }: ProductGridProps) {
  const sizes = useFiltersStore((s) => s.sizes);
  const colors = useFiltersStore((s) => s.colors);
  const priceMin = useFiltersStore((s) => s.priceMin);
  const priceMax = useFiltersStore((s) => s.priceMax);
  const sort = useFiltersStore((s) => s.sort);

  const filtered = React.useMemo(() => {
    let list = products.filter((p) => {
      if (!genderMatches(p, genderFilter)) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false;
      if (colors.length && !colors.some((c) => p.colors.some((pc) => pc.name === c)))
        return false;
      return true;
    });

    switch (sort) {
      case "newest":
        list = [...list].sort((a, b) => Number(b.badges.includes("NEW")) - Number(a.badges.includes("NEW")));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [products, genderFilter, sizes, colors, priceMin, priceMax, sort]);

  return (
    <div className="grid grid-cols-12 gap-8 lg:gap-12">
      <FiltersUrlSync />
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <FilterSidebar />
        </div>
      </aside>

      <div className="col-span-12 lg:col-span-9">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            {filtered.length} item{filtered.length !== 1 && "s"}
          </p>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="max-w-sm">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
            <SortDropdown />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No products match these filters"
            description="Try widening your size or price range — or clear filters and start fresh."
            cta={{ label: "Browse all", href: ROUTES.shop }}
          />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
