"use client";

import { create } from "zustand";

export interface FlyEvent {
  /** Image URL to animate */
  src: string;
  /** Source rect (in viewport coords) the image flies from */
  fromRect: { x: number; y: number; width: number; height: number };
  /** Counter so repeated adds from the same rect still re-trigger the animation */
  nonce: number;
}

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  quickViewSlug: string | null;
  flyEvent: FlyEvent | null;
  cartPulse: number;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setQuickView: (slug: string | null) => void;
  triggerFlyToCart: (src: string, fromRect: { x: number; y: number; width: number; height: number }) => void;
  clearFlyEvent: () => void;
  bumpCartPulse: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  quickViewSlug: null,
  flyEvent: null,
  cartPulse: 0,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setQuickView: (quickViewSlug) => set({ quickViewSlug }),
  triggerFlyToCart: (src, fromRect) =>
    set({ flyEvent: { src, fromRect, nonce: get().cartPulse + 1 } }),
  clearFlyEvent: () => set({ flyEvent: null }),
  bumpCartPulse: () => set({ cartPulse: get().cartPulse + 1 }),
}));
