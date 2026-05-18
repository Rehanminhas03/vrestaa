import { Hero } from "@/components/home/hero";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { ProductRail } from "@/components/home/product-rail";
import { BrandStory } from "@/components/home/brand-story";
import { VideoSection } from "@/components/home/video-section";
import { Testimonials } from "@/components/home/testimonials";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { Newsletter } from "@/components/home/newsletter";
import { PRODUCTS } from "@/data/products";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  const trending = PRODUCTS.filter((p) => p.badges.includes("BEST_SELLER")).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.badges.includes("NEW")).slice(0, 8);

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <ProductRail
        eyebrow="Best sellers"
        title="The pieces athletes can't stop reordering."
        description="From the rack to the platform — these earned their spot."
        href={ROUTES.shop + "?badge=best_seller"}
        products={trending}
      />
      <BrandStory />
      <ProductRail
        eyebrow="Just landed"
        title="New arrivals."
        description="The latest additions to the line."
        href={ROUTES.shop + "?sort=newest"}
        products={newArrivals}
      />
      <VideoSection />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
