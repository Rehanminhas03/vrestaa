import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "compression",
    name: "Compression",
    tagline: "Second-skin engineering",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "dry-fit",
    name: "Dry Fit",
    tagline: "Sweat-mapped performance",
    image:
      "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "oversized-tees",
    name: "Oversized Tees",
    tagline: "Drop-shoulder swagger",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "polos",
    name: "Polo Shirts",
    tagline: "Off-floor polish",
    image:
      "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "sports-bras",
    name: "Sports Bras",
    tagline: "Locked-in support",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "leggings",
    name: "Leggings",
    tagline: "Sculpted to move",
    image:
      "https://images.unsplash.com/photo-1525171254930-643fc658b64e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "trousers",
    name: "Trousers",
    tagline: "Tapered, tireless",
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "oversized-trousers",
    name: "Oversized Trousers",
    tagline: "Wide-leg, all-day flow",
    image:
      "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "shorts",
    name: "Shorts",
    tagline: "Cut for movement",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80",
  },
];

export const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name]),
);
