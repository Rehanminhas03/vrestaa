"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { CartDrawer } from "@/website/components/layout/cart-drawer";
import { MobileNav } from "@/website/components/layout/mobile-nav";
import { SearchModal } from "@/website/components/layout/search-modal";
import { QuickView } from "@/website/components/product/quick-view";
import { FlyToCart } from "@/website/components/animations/fly-to-cart";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <MotionConfig reducedMotion="user">
      {children}
      {/* Storefront-only modals/drawers don't belong inside the admin shell. */}
      {!isAdmin && (
        <>
          <CartDrawer />
          <MobileNav />
          <SearchModal />
          <QuickView />
          <FlyToCart />
        </>
      )}
    </MotionConfig>
  );
}
