import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Container } from "@/website/components/common/container";
import { ProductView } from "@/website/components/product/product-view";
import { ProductTabs } from "@/website/components/product/product-tabs";
import { ReviewsSection } from "@/website/components/product/reviews-section";
import { RelatedProducts } from "@/website/components/product/related-products";
import { RecentlyViewed } from "@/website/components/product/recently-viewed";
import { StickyAddToCart } from "@/website/components/product/sticky-add-to-cart";
import { TrackView } from "@/website/components/product/track-view";
import { PRODUCTS, PRODUCT_BY_SLUG } from "@/website/data/products";
import { CATEGORY_LABEL } from "@/website/constants/categories";
import { ROUTES } from "@/website/constants/routes";
import { productJsonLd } from "@/website/lib/product-jsonld";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG[slug];
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: `/og/product/${slug}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [`/og/product/${slug}`],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG[slug];
  if (!product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        // SSR-injected, escaped by JSON.stringify. Lets Google render rich
        // Shopping-style results for this product.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <TrackView slug={slug} />
      <Container size="wide" className="pt-8 md:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]"
        >
          <Link href={ROUTES.shop} className="hover:text-white">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={ROUTES.category(product.category)} className="hover:text-white">
            {CATEGORY_LABEL[product.category]}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{product.name}</span>
        </nav>
      </Container>

      <Container size="wide" className="py-8 md:py-12">
        <ProductView product={product} />
      </Container>

      <Container size="wide" className="pt-12">
        <ProductTabs product={product} />
      </Container>

      <Container size="wide">
        <ReviewsSection
          productSlug={slug}
          averageRating={product.rating}
          totalCount={product.reviewCount}
        />
        <RelatedProducts slug={slug} />
        <RecentlyViewed excludeSlug={slug} />
      </Container>

      <StickyAddToCart product={product} />
    </>
  );
}
