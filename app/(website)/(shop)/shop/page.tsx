import type { Metadata } from "next";
import { Container } from "@/website/components/common/container";
import { CategoryTabs } from "@/website/components/shop/category-tabs";
import { ProductGrid } from "@/website/components/shop/product-grid";
import { PRODUCTS } from "@/website/data/products";
import { SITE } from "@/website/constants/site";
import { parseGenderParam } from "@/website/lib/products-filter";

type SearchParams = Promise<{ gender?: string }>;

export const metadata: Metadata = {
  title: "Shop",
  description: `Shop the full ${SITE.name} catalogue — compression, oversized, leggings, and more.`,
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { gender } = await searchParams;
  const genderFilter = parseGenderParam(gender);

  const heading = genderFilter === "MEN" ? "Built for the men's floor." : genderFilter === "WOMEN" ? "Built for the women's floor." : "Every piece, one floor.";
  const eyebrow = genderFilter === "MEN" ? "Men's catalogue" : genderFilter === "WOMEN" ? "Women's catalogue" : "The catalogue";

  return (
    <Container size="wide" className="py-12 md:py-20">
      <header className="mb-10 flex flex-col gap-4 md:gap-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
          {heading}
        </h1>
        <p className="max-w-xl text-sm text-[color:var(--color-fg-muted)] md:text-base">
          {PRODUCTS.length} products engineered for the rise. Filter by size, colour, and price — sort by what matters to you.
        </p>
      </header>

      <div className="mb-8">
        <CategoryTabs active="all" />
      </div>

      <ProductGrid products={PRODUCTS} genderFilter={genderFilter} />
    </Container>
  );
}
