import type { Product } from "@/types";
import { SITE } from "@/constants/site";
import { totalStock } from "@/data/products";

/**
 * Build a schema.org/Product JSON-LD object for a given product.
 * Embed via <script type="application/ld+json"> on the product detail page
 * so Google can render rich shopping results.
 */
export function productJsonLd(product: Product) {
  const inStock = totalStock(product) > 0;
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/product/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price.toFixed(2),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: product.reviewCount > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating.toFixed(1),
          reviewCount: product.reviewCount,
        }
      : undefined,
  };
}
