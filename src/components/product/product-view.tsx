"use client";

import * as React from "react";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import type { Product } from "@/types";

/**
 * Client orchestrator for the product detail page. Owns the active colour so
 * the gallery's primary image can swap when the user picks a different
 * variant. Keeps `ProductInfo` purely presentational w.r.t. colour state.
 */
export function ProductView({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = React.useState(0);
  const color = product.colors[colorIndex];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery
        images={product.images}
        alt={product.name}
        primaryImageOverride={color?.image}
      />
      <ProductInfo
        product={product}
        colorIndex={colorIndex}
        onColorChange={setColorIndex}
      />
    </div>
  );
}
