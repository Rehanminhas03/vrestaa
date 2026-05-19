import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/website/components/common/container";
import { CategoryTabs } from "@/website/components/shop/category-tabs";
import { ProductGrid } from "@/website/components/shop/product-grid";
import { CATEGORIES } from "@/website/constants/categories";
import { productsByCategory } from "@/website/data/products";
import { parseGenderParam } from "@/website/lib/products-filter";
import type { CategorySlug } from "@/website/types";

type Params = Promise<{ category: string }>;
type SearchParams = Promise<{ gender?: string }>;

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return { title: "Shop" };
  return {
    title: cat.name,
    description: `Shop ${cat.name}. ${cat.tagline}.`,
    openGraph: {
      title: cat.name,
      description: cat.tagline,
      images: [{ url: `/og/category/${cat.slug}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: cat.name,
      description: cat.tagline,
      images: [`/og/category/${cat.slug}`],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { category } = await params;
  const { gender } = await searchParams;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const genderFilter = parseGenderParam(gender);
  const products = productsByCategory(category);

  return (
    <Container size="wide" className="py-12 md:py-20">
      <header className="mb-10 flex flex-col gap-4 md:gap-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          Category
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
          {cat.name}
        </h1>
        <p className="max-w-xl text-sm text-[color:var(--color-fg-muted)] md:text-base">
          {cat.tagline}
        </p>
      </header>

      <div className="mb-8">
        <CategoryTabs active={cat.slug as CategorySlug} />
      </div>

      <ProductGrid products={products} genderFilter={genderFilter} />
    </Container>
  );
}
