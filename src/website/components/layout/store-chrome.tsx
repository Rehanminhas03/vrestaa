"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/website/components/layout/announcement-bar";
import { Header } from "@/website/components/layout/header";
import { Footer } from "@/website/components/layout/footer";
import { ScrollProgress } from "@/website/components/animations/scroll-progress";
import { BackToTop } from "@/website/components/common/back-to-top";

/**
 * Renders the storefront chrome (announcement bar, header, footer, scroll
 * progress, back-to-top) UNLESS we're inside the admin surface — admin has
 * its own layout and shouldn't inherit any of this.
 */
export function StoreChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
