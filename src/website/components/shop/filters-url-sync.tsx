"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useFiltersStore, type SortKey } from "@/website/store/filters";
import type { Size } from "@/website/types";

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];
const ALL_SORTS: SortKey[] = ["featured", "newest", "price-asc", "price-desc", "rating"];

/**
 * Bidirectional sync between the shop filter Zustand store and the URL.
 * - On mount: seeds the store from current ?searchParams (browser â†’ store).
 * - After mount: pushes store changes back into the URL via router.replace
 *   (store â†’ browser, no history entry per toggle).
 *
 * Gender lives in the URL via the page-prop pattern and is intentionally
 * not managed here.
 */
export function FiltersUrlSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sizes = useFiltersStore((s) => s.sizes);
  const colors = useFiltersStore((s) => s.colors);
  const priceMin = useFiltersStore((s) => s.priceMin);
  const priceMax = useFiltersStore((s) => s.priceMax);
  const sort = useFiltersStore((s) => s.sort);

  // Hydrate from URL once on mount.
  const hydrated = React.useRef(false);
  React.useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const sp = searchParams;
    const next: Partial<{
      sizes: Size[];
      colors: string[];
      priceMin: number;
      priceMax: number;
      sort: SortKey;
    }> = {};

    const sizesParam = sp.get("sizes");
    if (sizesParam) {
      const parsed = sizesParam
        .split(",")
        .map((s) => s.trim())
        .filter((s): s is Size => ALL_SIZES.includes(s as Size));
      if (parsed.length) next.sizes = parsed;
    }

    const colorsParam = sp.get("colors");
    if (colorsParam) {
      next.colors = colorsParam.split(",").map((c) => c.trim()).filter(Boolean);
    }

    const minStr = sp.get("priceMin");
    const maxStr = sp.get("priceMax");
    if (minStr && Number.isFinite(Number(minStr))) next.priceMin = Number(minStr);
    if (maxStr && Number.isFinite(Number(maxStr))) next.priceMax = Number(maxStr);

    const sortParam = sp.get("sort");
    if (sortParam && ALL_SORTS.includes(sortParam as SortKey)) {
      next.sort = sortParam as SortKey;
    }

    if (Object.keys(next).length === 0) return;
    // Intentional URL â†’ store sync on mount. Guarded by `hydrated.current` so
    // it fires exactly once. Calls Zustand's external setState, not React's.
    useFiltersStore.setState(next);
  }, [searchParams]);

  // Push store changes back into the URL.
  React.useEffect(() => {
    if (!hydrated.current) return;

    const sp = new URLSearchParams(searchParams.toString());

    if (sizes.length) sp.set("sizes", sizes.join(","));
    else sp.delete("sizes");

    if (colors.length) sp.set("colors", colors.join(","));
    else sp.delete("colors");

    if (priceMin > 0) sp.set("priceMin", String(priceMin));
    else sp.delete("priceMin");

    if (priceMax < 250) sp.set("priceMax", String(priceMax));
    else sp.delete("priceMax");

    if (sort !== "featured") sp.set("sort", sort);
    else sp.delete("sort");

    const query = sp.toString();
    const next = query ? `${pathname}?${query}` : pathname;
    router.replace(next, { scroll: false });
    // We intentionally exclude searchParams from deps — it's only the initial
    // seed source. Subsequent updates come from the store.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes, colors, priceMin, priceMax, sort, pathname, router]);

  return null;
}
