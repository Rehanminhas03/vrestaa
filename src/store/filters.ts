"use client";

import { create } from "zustand";
import type { Size, CategorySlug } from "@/types";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

interface FiltersState {
  category: CategorySlug | "all";
  sizes: Size[];
  colors: string[];
  priceMin: number;
  priceMax: number;
  sort: SortKey;
  setCategory: (c: CategorySlug | "all") => void;
  toggleSize: (s: Size) => void;
  toggleColor: (c: string) => void;
  setPrice: (min: number, max: number) => void;
  setSort: (s: SortKey) => void;
  reset: () => void;
}

const initial = {
  category: "all" as const,
  sizes: [] as Size[],
  colors: [] as string[],
  priceMin: 0,
  priceMax: 250,
  sort: "featured" as SortKey,
};

export const useFiltersStore = create<FiltersState>((set, get) => ({
  ...initial,
  setCategory: (category) => set({ category }),
  toggleSize: (s) => {
    const sizes = get().sizes;
    set({ sizes: sizes.includes(s) ? sizes.filter((x) => x !== s) : [...sizes, s] });
  },
  toggleColor: (c) => {
    const colors = get().colors;
    set({ colors: colors.includes(c) ? colors.filter((x) => x !== c) : [...colors, c] });
  },
  setPrice: (priceMin, priceMax) => set({ priceMin, priceMax }),
  setSort: (sort) => set({ sort }),
  reset: () => set({ ...initial }),
}));
