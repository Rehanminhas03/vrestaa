"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistState {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        const slugs = get().slugs;
        set({
          slugs: slugs.includes(slug)
            ? slugs.filter((s) => s !== slug)
            : [slug, ...slugs],
        });
      },
      has: (slug) => get().slugs.includes(slug),
      remove: (slug) => set({ slugs: get().slugs.filter((s) => s !== slug) }),
      clear: () => set({ slugs: [] }),
    }),
    {
      name: "vresta-wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
