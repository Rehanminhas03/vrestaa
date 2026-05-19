import { Hero } from "@/website/components/home/hero";
import { FeaturedCategories } from "@/website/components/home/featured-categories";
import { ProductRail } from "@/website/components/home/product-rail";
import { BrandStory } from "@/website/components/home/brand-story";
import { VideoSection } from "@/website/components/home/video-section";
import { Testimonials } from "@/website/components/home/testimonials";
import { InstagramGallery } from "@/website/components/home/instagram-gallery";
import { Newsletter } from "@/website/components/home/newsletter";
import { PRODUCTS } from "@/website/data/products";
import { ROUTES } from "@/website/constants/routes";

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
