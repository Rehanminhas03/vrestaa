"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Container } from "@/components/common/container";
import { useUIStore } from "@/store/ui";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { ROUTES } from "@/constants/routes";
import { CATEGORIES } from "@/constants/categories";
import { GenderMenu } from "./gender-menu";
import { CART_ICON_ID } from "@/components/animations/fly-to-cart";
import { cn } from "@/lib/cn";

type NavKey = "shop" | "men" | "women";

interface NavEntry {
  key: NavKey;
  label: string;
  href: string;
  hasDropdown: true;
}

const NAV: NavEntry[] = [
  { key: "shop", label: "Shop", href: ROUTES.shop, hasDropdown: true },
  { key: "men", label: "Men", href: "/shop?gender=men", hasDropdown: true },
  { key: "women", label: "Women", href: "/shop?gender=women", hasDropdown: true },
];

export function Header() {
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const cartCount = useCartStore((s) => s.count());
  const wishCount = useWishlistStore((s) => s.slugs.length);
  const cartPulse = useUIStore((s) => s.cartPulse);

  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  const [openMenu, setOpenMenu] = React.useState<NavKey | null>(null);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.78)" : "rgba(10,10,10,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "blur(0px)",
      }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 w-full border-b border-transparent transition-colors data-[scrolled=true]:border-[color:var(--color-border)]"
      data-scrolled={scrolled}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white md:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Logo />
          </div>

          <nav className="hidden md:flex md:items-center md:gap-7" aria-label="Main">
            {NAV.map((entry) => (
              <div
                key={entry.key}
                onMouseEnter={() => setOpenMenu(entry.key)}
                className="relative"
              >
                <Link
                  href={entry.href}
                  className={cn(
                    "inline-flex h-20 items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-white",
                    openMenu === entry.key && "text-white",
                  )}
                  aria-haspopup={entry.hasDropdown}
                  aria-expanded={openMenu === entry.key}
                >
                  {entry.label}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 opacity-60 transition-transform duration-300",
                      openMenu === entry.key && "rotate-180 opacity-100",
                    )}
                  />
                </Link>
              </div>
            ))}
            <Link
              href={ROUTES.about}
              className="inline-flex h-20 items-center text-xs font-medium uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-white"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-1 text-white/80">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center transition-colors hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href={ROUTES.login}
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center transition-colors hover:text-white md:inline-flex"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href={ROUTES.wishlist}
              aria-label="Wishlist"
              className="relative hidden h-10 w-10 items-center justify-center transition-colors hover:text-white sm:inline-flex"
            >
              <Heart className="h-5 w-5" />
              {wishCount > 0 && <CountBubble value={wishCount} />}
            </Link>
            <button
              id={CART_ICON_ID}
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex h-10 w-10 items-center justify-center transition-colors hover:text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <CountBubble value={cartCount} pulseKey={cartPulse} />}
            </button>
          </div>
        </div>
      </Container>

      <ShopMegaMenu
        open={openMenu === "shop"}
        onMouseEnter={() => setOpenMenu("shop")}
        onClose={() => setOpenMenu(null)}
      />
      <GenderMenu
        open={openMenu === "men"}
        gender="MEN"
        onMouseEnter={() => setOpenMenu("men")}
        onClose={() => setOpenMenu(null)}
      />
      <GenderMenu
        open={openMenu === "women"}
        gender="WOMEN"
        onMouseEnter={() => setOpenMenu("women")}
        onClose={() => setOpenMenu(null)}
      />
    </motion.header>
  );
}

function CountBubble({ value, pulseKey }: { value: number; pulseKey?: number }) {
  return (
    <motion.span
      key={pulseKey ?? 0}
      initial={false}
      animate={{ scale: [1, 1.35, 1] }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[color:var(--color-accent)] px-1 text-[10px] font-bold text-[color:var(--color-ink)]"
    >
      {value}
    </motion.span>
  );
}

const SHOP_FEATURE = {
  title: "New Drop — Phase 03",
  copy: "Compression rebuilt. Engineered for the next set.",
  image:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
  href: ROUTES.category("compression"),
};

function ShopMegaMenu({
  open,
  onMouseEnter,
  onClose,
}: {
  open: boolean;
  onMouseEnter: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onClose}
      className="overflow-hidden border-b border-[color:var(--color-border)] bg-[color:var(--color-charcoal)]/95 backdrop-blur-xl"
      aria-hidden={!open}
    >
      <Container size="wide" className="grid grid-cols-12 gap-10 py-10">
        <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-3">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
              Tops
            </p>
            <ul className="space-y-3 text-sm text-white/85">
              {["compression", "dry-fit", "oversized-tees", "polos", "sports-bras"].map(
                (slug) => {
                  const cat = CATEGORIES.find((c) => c.slug === slug);
                  if (!cat) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={ROUTES.category(slug)}
                        onClick={onClose}
                        className="transition-colors hover:text-[color:var(--color-accent)]"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
              Bottoms
            </p>
            <ul className="space-y-3 text-sm text-white/85">
              {["leggings", "trousers", "oversized-trousers", "shorts"].map((slug) => {
                const cat = CATEGORIES.find((c) => c.slug === slug);
                if (!cat) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={ROUTES.category(slug)}
                      onClick={onClose}
                      className="transition-colors hover:text-[color:var(--color-accent)]"
                    >
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
              Discover
            </p>
            <ul className="space-y-3 text-sm text-white/85">
              <li>
                <Link
                  href={ROUTES.shop}
                  onClick={onClose}
                  className="transition-colors hover:text-[color:var(--color-accent)]"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?sort=newest"
                  onClick={onClose}
                  className="transition-colors hover:text-[color:var(--color-accent)]"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?badge=best_seller"
                  onClick={onClose}
                  className="transition-colors hover:text-[color:var(--color-accent)]"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?badge=sale"
                  onClick={onClose}
                  className="text-[color:var(--color-accent)] transition-colors hover:text-white"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Link
          href={SHOP_FEATURE.href}
          onClick={onClose}
          className="group relative col-span-12 block aspect-[5/3] overflow-hidden rounded-xl md:col-span-5"
        >
          <Image
            src={SHOP_FEATURE.image}
            alt={SHOP_FEATURE.title}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              Featured
            </p>
            <h4 className="mt-1 font-display text-2xl font-semibold text-white">
              {SHOP_FEATURE.title}
            </h4>
            <p className="mt-1 max-w-xs text-sm text-white/70">{SHOP_FEATURE.copy}</p>
          </div>
        </Link>
      </Container>
    </motion.div>
  );
}
