import { ImageResponse } from "next/og";
import { PRODUCT_BY_SLUG } from "@/website/data/products";
import { SITE } from "@/website/constants/site";
import { formatCurrency } from "@/website/lib/format";

export const runtime = "nodejs";
export const dynamic = "force-static";

type Params = Promise<{ slug: string }>;

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(_req: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG[slug];

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#fff",
            fontSize: 48,
            fontFamily: "sans-serif",
          }}
        >
          {SITE.name}
        </div>
      ),
      { width: WIDTH, height: HEIGHT },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle accent glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle at center, rgba(199,255,62,0.15), transparent 60%)",
            display: "flex",
          }}
        />

        {/* Left: product image */}
        <div
          style={{
            width: 520,
            height: HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111113",
            borderRight: "1px solid #232327",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt=""
            width={520}
            height={HEIGHT}
            style={{ objectFit: "cover", width: 520, height: HEIGHT }}
          />
        </div>

        {/* Right: copy */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 64px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                fontSize: 18,
                letterSpacing: 6,
                color: "#c7ff3e",
                textTransform: "uppercase",
                fontWeight: 700,
                display: "flex",
              }}
            >
              {SITE.name}
            </span>
            <span
              style={{
                fontSize: 18,
                letterSpacing: 4,
                color: "#b8b8be",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              {product.category.replace(/-/g, " ")} · {product.gender}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -1.5,
                display: "flex",
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 700,
                color: "#fff",
                display: "flex",
                gap: 16,
                alignItems: "baseline",
              }}
            >
              <span style={{ display: "flex" }}>{formatCurrency(product.price)}</span>
              {product.compareAtPrice && (
                <span
                  style={{
                    fontSize: 26,
                    color: "#b8b8be",
                    textDecoration: "line-through",
                    display: "flex",
                  }}
                >
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              color: "#b8b8be",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Engineered for the rise.
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
