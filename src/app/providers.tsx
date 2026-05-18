"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchModal } from "@/components/layout/search-modal";
import { QuickView } from "@/components/product/quick-view";
import { FlyToCart } from "@/components/animations/fly-to-cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <CartDrawer />
      <MobileNav />
      <SearchModal />
      <QuickView />
      <FlyToCart />
    </MotionConfig>
  );
}
