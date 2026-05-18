"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const MAX = 8;

interface RecentlyViewedState {
  slugs: string[];
  push: (slug: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      slugs: [],
      push: (slug) => {
        const filtered = get().slugs.filter((s) => s !== slug);
        set({ slugs: [slug, ...filtered].slice(0, MAX) });
      },
      clear: () => set({ slugs: [] }),
    }),
    {
      name: "vresta-recently-viewed",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
