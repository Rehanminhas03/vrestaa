import type { Gender, Product } from "@/website/types";

/**
 * Returns true if a product should appear in a gender-filtered view.
 * MEN view includes MEN + UNISEX; WOMEN view includes WOMEN + UNISEX.
 */
export function genderMatches(product: Product, gender: Gender | null): boolean {
  if (!gender) return true;
  return product.gender === gender || product.gender === "UNISEX";
}

export function parseGenderParam(value: string | undefined): Gender | null {
  if (!value) return null;
  const v = value.toUpperCase();
  if (v === "MEN" || v === "WOMEN") return v;
  return null;
}
