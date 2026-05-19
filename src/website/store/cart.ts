"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLineItem } from "@/website/types";

interface CartState {
  items: CartLineItem[];
  add: (item: CartLineItem) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
}

const lineId = (slug: string, size: string, color: string) =>
  `${slug}__${size}__${color}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const id = lineId(item.slug, item.size, item.color.name);
        const items = get().items;
        const existing = items.find((i) => i.id === id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === id
                ? { ...i, quantity: Math.min((i.maxQuantity ?? 99), i.quantity + item.quantity) }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { ...item, id }] });
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(quantity, i.maxQuantity ?? 99) } : i,
          ),
        });
      },
      clear: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "vresta-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
