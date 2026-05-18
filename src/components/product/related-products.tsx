import { SectionHeading } from "@/components/common/section-heading";
import { ProductCard } from "./product-card";
import { relatedProducts } from "@/data/products";

interface RelatedProductsProps {
  slug: string;
}

export function RelatedProducts({ slug }: RelatedProductsProps) {
  const related = relatedProducts(slug, 4);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-[color:var(--color-border)] py-16 md:py-24">
      <SectionHeading eyebrow="You may also like" title="Pair it with." />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
