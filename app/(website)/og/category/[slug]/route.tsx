import { ImageResponse } from "next/og";
import { CATEGORIES } from "@/website/constants/categories";
import { productsByCategory } from "@/website/data/products";
import { SITE } from "@/website/constants/site";

export const runtime = "nodejs";
export const dynamic = "force-static";

type Params = Promise<{ slug: string }>;

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(_req: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const sample = productsByCategory(slug).slice(0, 3);

  if (!cat) {
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
          flexDirection: "column",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 540,
            height: 540,
            background:
              "radial-gradient(circle at center, rgba(199,255,62,0.18), transparent 60%)",
            display: "flex",
          }}
        />

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
            {SITE.name} — Category
          </span>
          <span
            style={{
              fontSize: 86,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.02,
              display: "flex",
            }}
          >
            {cat.name}
          </span>
          <span
            style={{
              fontSize: 26,
              color: "#b8b8be",
              display: "flex",
              marginTop: 8,
            }}
          >
            {cat.tagline}
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 18,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {sample.map((p) => (
            <div
              key={p.slug}
              style={{
                width: 220,
                height: 280,
                background: "#111113",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid #232327",
                display: "flex",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.images[0]}
                alt=""
                width={220}
                height={280}
                style={{ objectFit: "cover", width: 220, height: 280 }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
