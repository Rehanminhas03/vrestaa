export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type CategorySlug =
  | "compression"
  | "dry-fit"
  | "oversized-tees"
  | "polos"
  | "sports-bras"
  | "leggings"
  | "trousers"
  | "oversized-trousers"
  | "shorts";

export type Badge = "NEW" | "BEST_SELLER" | "LIMITED" | "SALE";

export type Gender = "MEN" | "WOMEN" | "UNISEX";

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  gender: Gender;
  price: number;
  compareAtPrice?: number;
  currency: "USD";
  description: string;
  features: string[];
  images: string[];
  colors: ProductColor[];
  sizes: Size[];
  /**
   * Units in stock keyed by size. 0 means sold out for that size. A missing
   * key means "not offered in that size" (use `sizes[]` for that distinction).
   */
  inventory?: Partial<Record<Size, number>>;
  rating: number;
  reviewCount: number;
  badges: Badge[];
  inStock: boolean;
  sku: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}
