"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/website/components/common/container";
import { CATEGORIES } from "@/website/constants/categories";
import { PRODUCTS } from "@/website/data/products";
import { ROUTES } from "@/website/constants/routes";
import { genderMatches } from "@/website/lib/products-filter";
import type { Gender } from "@/website/types";

interface GenderMenuProps {
  open: boolean;
  gender: Gender;
  onMouseEnter: () => void;
  onClose: () => void;
}

const FEATURES: Record<Gender, { title: string; copy: string; image: string; href: string }> = {
  MEN: {
    title: "The Men's Floor",
    copy: "Compression engineered for hypertrophy days. Sculpted fits, premium hand-feel.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    href: "/shop?gender=men",
  },
  WOMEN: {
    title: "The Women's Floor",
    copy: "Sculpt leggings, contour bras, modal trousers — the studio uniform.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80",
    href: "/shop?gender=women",
  },
  UNISEX: {
    title: "Unisex",
    copy: "Pieces for everyone.",
    image:
      "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=1200&q=80",
    href: "/shop",
  },
};

// Lazily compute "which categories actually have at least one product for this gender",
// so the menu never advertises an empty category.
function categoriesForGender(gender: Gender) {
  const allowed = new Set(
    PRODUCTS.filter((p) => genderMatches(p, gender)).map((p) => p.category),
  );
  return CATEGORIES.filter((c) => allowed.has(c.slug));
}

export function GenderMenu({ open, gender, onMouseEnter, onClose }: GenderMenuProps) {
  const feature = FEATURES[gender];
  const cats = categoriesForGender(gender);
  const genderParam = gender.toLowerCase();
  const half = Math.ceil(cats.length / 2);
  const colA = cats.slice(0, half);
  const colB = cats.slice(half);

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
        <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
              Shop {gender === "MEN" ? "men's" : "women's"}
            </p>
            <ul className="space-y-3 text-sm text-white/85">
              {colA.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`${ROUTES.category(cat.slug)}?gender=${genderParam}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--color-accent)]"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
              More
            </p>
            <ul className="space-y-3 text-sm text-white/85">
              {colB.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`${ROUTES.category(cat.slug)}?gender=${genderParam}`}
                    onClick={onClose}
                    className="transition-colors hover:text-[color:var(--color-accent)]"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/shop?gender=${genderParam}&sort=newest`}
                  onClick={onClose}
                  className="transition-colors hover:text-[color:var(--color-accent)]"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href={`/shop?gender=${genderParam}&badge=best_seller`}
                  onClick={onClose}
                  className="transition-colors hover:text-[color:var(--color-accent)]"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href={`/shop?gender=${genderParam}&badge=sale`}
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
          href={feature.href}
          onClick={onClose}
          className="group relative col-span-12 block aspect-[5/3] overflow-hidden rounded-xl md:col-span-5"
        >
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                Featured
              </p>
              <h4 className="mt-1 font-display text-2xl font-semibold text-white">
                {feature.title}
              </h4>
              <p className="mt-1 max-w-xs text-sm text-white/70">{feature.copy}</p>
            </div>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--color-ink)] transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </Container>
    </motion.div>
  );
}
