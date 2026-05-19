import type { Product, ProductColor, Size } from "@/website/types";

const UNSPLASH = "https://images.unsplash.com";

const img = (id: string, w = 1200) =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Cohesive Unsplash photo IDs by visual role. Reused intentionally so the mock
// catalogue feels visually unified. Swap with real product photography later —
// the data shape is the contract; images are interchangeable.
const SHOTS = {
  // Men
  manBlackTee: "photo-1583743814966-8936f5b7be1a",
  manAtl: "photo-1622445275576-721325763afe",
  manCream: "photo-1503342217505-b0a15ec3261c",
  manCompression: "photo-1571019613454-1cb2f99b2d8b",
  manRedCompression: "photo-1517438476312-10d79c5f0b6c",
  manHoodie: "photo-1556821840-3a63f95609a7",
  manPolo: "photo-1620799140408-edc6dcb6d633",
  manTrouser: "photo-1552902865-b72c031ac5ea",
  manShorts: "photo-1483721310020-03333e577078",
  manSplit: "photo-1534438327276-14e5300c3a48",
  manStudio: "photo-1521146764736-56c929d59c83",
  // Women
  womanTee: "photo-1518611012118-696072aa579a",
  womanCrop: "photo-1525171254930-643fc658b64e",
  womanLeggings: "photo-1571019614242-c5c5dee9f50b",
  womanBra: "photo-1532974297617-c0f05fe48bff",
  womanTrouser: "photo-1606902965551-dce093cda6e7",
  womanFlow: "photo-1583454110551-21f2fa2afe61",
  womanOversized: "photo-1604176354204-9268737828e4",
  // Lifestyle
  studio: "photo-1517836357463-d25dfeac3438",
} as const;

// Brand-wide colour palette. Reuse across products for consistency. Add to it
// when new colourways appear in the inventory.
const PALETTE: Record<string, { hex: string; image?: string }> = {
  Black: { hex: "#0a0a0a" },
  White: { hex: "#f6f5f1" },
  "Navy Blue": { hex: "#1a2342" },
  Pink: { hex: "#eaa8b8" },
  Mehroon: { hex: "#6a1530" },
  Red: { hex: "#c22030" },
  Pista: { hex: "#a7c993" },
  Brown: { hex: "#5e3a1b" },
  Grey: { hex: "#6c6c70" },
  "Olive Green": { hex: "#5b6240" },
  Olive: { hex: "#5b6240" },
  Silver: { hex: "#c4c4c8" },
  Khaki: { hex: "#a89968" },
  Cream: { hex: "#efe6ce" },
  "Cream/Brown": { hex: "#a78256" },
  "Ice Blue": { hex: "#c9dde6" },
  "Northern Teal": { hex: "#1e6f70" },
};

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const ADULT_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
const WOMEN_SIZES = ["XS", "S", "M", "L", "XL"] as const;

// Helper: turn a list of colour names into ProductColor objects, using a shared
// thumbnail. Falls back to a tinted neutral if the palette doesn't know the name.
function colors(names: string[], thumbnail: string): ProductColor[] {
  return names.map((name) => {
    const swatch = PALETTE[name] ?? { hex: "#444" };
    return { name, hex: swatch.hex, image: thumbnail };
  });
}

// Inventory pattern â†’ per-size stock map. Lets us write `stock(sizes, "low-mid-out")`
// rather than hand-writing every size's count. Patterns are stable, so demos look
// consistent across reloads.
type StockPattern = "plenty" | "balanced" | "scarce" | "out-mid";
const PATTERN_VALUES: Record<StockPattern, number[]> = {
  plenty:    [18, 22, 25, 20, 14, 10],
  balanced:  [12,  9,  7,  6,  4,  8],
  scarce:    [ 5,  4,  3,  2,  1,  6],
  "out-mid": [ 7,  4,  0,  3,  6,  2], // pattern with a middle size sold out
};
function stock(sizes: readonly Size[], pattern: StockPattern): Partial<Record<Size, number>> {
  const values = PATTERN_VALUES[pattern];
  const out: Partial<Record<Size, number>> = {};
  sizes.forEach((s, i) => {
    out[s] = values[i % values.length];
  });
  return out;
}

export const PRODUCTS: Product[] = [
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ COMPRESSION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "round-neck-compression-shirt",
    name: "Round Neck Compression Shirt",
    category: "compression",
    gender: "UNISEX",
    price: 58,
    compareAtPrice: 72,
    currency: "USD",
    description:
      "Seamless 3D-knit compression with mapped ventilation across the spine. Locks in form, lets out heat.",
    features: [
      "Seamless 3D-knit construction",
      "Mapped ventilation zones",
      "4-way stretch nylon/elastane",
      "Anti-odor finish",
    ],
    images: [img(SHOTS.manCompression), img(SHOTS.manRedCompression), img(SHOTS.manStudio)],
    colors: colors(
      ["Black", "Navy Blue", "Pista", "Pink", "White"],
      img(SHOTS.manCompression, 600),
    ),
    sizes: [...ADULT_SIZES],
    rating: 4.9,
    reviewCount: 540,
    badges: ["BEST_SELLER", "SALE"],
    inventory: stock([...ADULT_SIZES], "out-mid"),
    inStock: true,
    sku: "VR-CP-RNC",
  },
  {
    slug: "zipper-compression-shirt",
    name: "Zipper Compression Shirt",
    category: "compression",
    gender: "UNISEX",
    price: 68,
    currency: "USD",
    description:
      "Quarter-zip compression with thumb loops and reflective branding. Built for warm-up to working set.",
    features: [
      "Quarter-zip mock neck",
      "Thumb-loop cuffs",
      "Reflective Vresta wordmark",
      "Quick-dry yarn",
    ],
    images: [img(SHOTS.manRedCompression), img(SHOTS.manCompression)],
    colors: colors(
      ["Black", "White", "Red", "Navy Blue", "Mehroon"],
      img(SHOTS.manRedCompression, 600),
    ),
    sizes: [...ADULT_SIZES],
    rating: 4.8,
    reviewCount: 312,
    badges: ["NEW"],
    inventory: stock([...ADULT_SIZES], "balanced"),
    inStock: true,
    sku: "VR-CP-ZIP",
  },
  {
    slug: "mens-compression-shirt",
    name: "Men's Compression Shirt",
    category: "compression",
    gender: "MEN",
    price: 58,
    currency: "USD",
    description:
      "Our flagship compression shirt — engineered for hypertrophy days, recovery days, and everything between.",
    features: [
      "Seamless 3D-knit",
      "Sweat-mapped venting",
      "Antimicrobial yarn",
      "Sculpted shoulder seam",
    ],
    images: [img(SHOTS.manCompression), img(SHOTS.manStudio)],
    colors: colors(
      ["Black", "White", "Navy Blue", "Mehroon", "Ice Blue"],
      img(SHOTS.manCompression, 600),
    ),
    sizes: [...ADULT_SIZES],
    rating: 4.9,
    reviewCount: 410,
    badges: ["BEST_SELLER"],
    inventory: stock([...ADULT_SIZES], "scarce"),
    inStock: true,
    sku: "VR-CP-MEN",
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DRY FIT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "mens-dry-fit-shirt",
    name: "Men's Dry Fit Shirt",
    category: "dry-fit",
    gender: "MEN",
    price: 48,
    currency: "USD",
    description:
      "Lightweight performance jersey with rapid-dry yarns. The everyday training tee.",
    features: [
      "Quick-dry interlock knit",
      "Sweat-wicking yarn",
      "Tagless neckline",
      "Tailored athletic cut",
    ],
    images: [img(SHOTS.manCream), img(SHOTS.manStudio)],
    colors: colors(
      ["Black", "White", "Cream", "Brown", "Grey"],
      img(SHOTS.manCream, 600),
    ),
    sizes: [...ADULT_SIZES],
    rating: 4.7,
    reviewCount: 198,
    badges: [],
    inventory: stock([...ADULT_SIZES], "plenty"),
    inStock: true,
    sku: "VR-DF-MEN",
  },
  {
    slug: "womens-dry-fit-shirt",
    name: "Women's Dry Fit Shirt",
    category: "dry-fit",
    gender: "WOMEN",
    price: 46,
    currency: "USD",
    description:
      "A sculpted cropped knit dry-fit tee. Compressive ribbed knit with a round neck.",
    features: [
      "Compressive ribbed knit",
      "Cropped hem",
      "Quick-dry yarn",
      "Sweat-mapped panels",
    ],
    images: [img(SHOTS.womanTee), img(SHOTS.womanCrop)],
    colors: colors(
      ["Black", "Navy Blue", "Pink", "Mehroon", "White"],
      img(SHOTS.womanTee, 600),
    ),
    sizes: [...WOMEN_SIZES],
    rating: 4.8,
    reviewCount: 246,
    badges: ["NEW"],
    inventory: stock([...WOMEN_SIZES], "balanced"),
    inStock: true,
    sku: "VR-DF-WMN",
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ OVERSIZED TEES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "mens-oversized-shirt",
    name: "Men's Oversized Shirt",
    category: "oversized-tees",
    gender: "MEN",
    price: 52,
    currency: "USD",
    description:
      "Heavyweight 240gsm cotton with a relaxed drop-shoulder fit. Pre-shrunk, garment-dyed, built to outlast the algorithm.",
    features: [
      "240gsm combed ring-spun cotton",
      "Drop-shoulder, oversized fit",
      "Garment-dyed for softer hand-feel",
      "Reinforced shoulder seams",
    ],
    images: [img(SHOTS.manBlackTee), img(SHOTS.manStudio), img(SHOTS.manSplit)],
    colors: colors(
      ["Black", "White", "Northern Teal", "Mehroon", "Ice Blue"],
      img(SHOTS.manBlackTee, 600),
    ),
    sizes: [...ALL_SIZES],
    rating: 4.8,
    reviewCount: 312,
    badges: ["BEST_SELLER"],
    inventory: stock([...ALL_SIZES], "balanced"),
    inStock: true,
    sku: "VR-OS-MEN",
  },
  {
    slug: "womens-oversized-shirt",
    name: "Women's Oversized Shirt",
    category: "oversized-tees",
    gender: "WOMEN",
    price: 50,
    currency: "USD",
    description:
      "A relaxed silhouette in heavyweight cotton — built to layer, drape, and outlast the trend.",
    features: [
      "240gsm cotton",
      "Drop-shoulder fit",
      "Cropped hem option",
      "Pre-shrunk",
    ],
    images: [img(SHOTS.womanOversized), img(SHOTS.womanTee)],
    colors: colors(
      ["Black", "Mehroon", "Silver", "Ice Blue", "Navy Blue"],
      img(SHOTS.womanOversized, 600),
    ),
    sizes: [...WOMEN_SIZES],
    rating: 4.7,
    reviewCount: 184,
    badges: ["NEW"],
    inventory: stock([...WOMEN_SIZES], "scarce"),
    inStock: true,
    sku: "VR-OS-WMN",
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ POLOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "mens-polo-shirt",
    name: "Men's Polo Shirt",
    category: "polos",
    gender: "MEN",
    price: 64,
    currency: "USD",
    description:
      "Off-floor polish without the dress shirt stiffness. Technical piquÃ© with a clean placket.",
    features: [
      "Technical piquÃ© knit",
      "Hidden two-button placket",
      "Side vents",
      "Tonal embroidered Vresta hit",
    ],
    images: [img(SHOTS.manPolo), img(SHOTS.manAtl)],
    colors: colors(
      ["Black", "White", "Cream", "Pista", "Mehroon"],
      img(SHOTS.manPolo, 600),
    ),
    sizes: [...ADULT_SIZES],
    rating: 4.7,
    reviewCount: 168,
    badges: [],
    inventory: stock([...ADULT_SIZES], "plenty"),
    inStock: true,
    sku: "VR-PL-MEN",
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SPORTS BRAS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "sports-bra",
    name: "Sports Bra",
    category: "sports-bras",
    gender: "WOMEN",
    price: 44,
    currency: "USD",
    description:
      "Locked-in medium-to-high impact support with a sweat-wicking lining. The studio go-to.",
    features: [
      "Medium-to-high impact",
      "Removable pads",
      "Compressive knit",
      "Wide racerback",
    ],
    images: [img(SHOTS.womanBra), img(SHOTS.womanTee)],
    colors: colors(["Black", "White", "Mehroon"], img(SHOTS.womanBra, 600)),
    sizes: [...WOMEN_SIZES],
    rating: 4.8,
    reviewCount: 264,
    badges: ["BEST_SELLER"],
    inventory: stock([...WOMEN_SIZES], "out-mid"),
    inStock: true,
    sku: "VR-SB-001",
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ LEGGINGS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "leggings",
    name: "Sculpt Leggings",
    category: "leggings",
    gender: "WOMEN",
    price: 72,
    compareAtPrice: 88,
    currency: "USD",
    description:
      "High-rise sculpt leggings with a contour waistband. The legging the rest are measured against.",
    features: [
      "High-rise contour waistband",
      "Sculpted seam-work",
      "Squat-proof opacity",
      "4-way stretch",
    ],
    images: [img(SHOTS.womanLeggings), img(SHOTS.womanCrop)],
    colors: colors(
      ["Black", "Navy Blue", "Mehroon", "Grey", "Pista"],
      img(SHOTS.womanLeggings, 600),
    ),
    sizes: [...WOMEN_SIZES],
    rating: 4.9,
    reviewCount: 540,
    badges: ["BEST_SELLER", "SALE"],
    inventory: stock([...WOMEN_SIZES], "scarce"),
    inStock: true,
    sku: "VR-LG-SCL",
  },
  {
    slug: "flow-leggings",
    name: "Flow Leggings",
    category: "leggings",
    gender: "WOMEN",
    price: 78,
    currency: "USD",
    description:
      "Butter-soft modal leggings with a high-rise waist. Studio comfort, all-day wear.",
    features: [
      "Buttery modal blend",
      "High-rise waistband",
      "Hidden waistband pocket",
      "Soft-hand finish",
    ],
    images: [img(SHOTS.womanFlow), img(SHOTS.womanLeggings)],
    colors: colors(
      ["Black", "Silver", "Mehroon", "Navy Blue", "Khaki"],
      img(SHOTS.womanFlow, 600),
    ),
    sizes: [...WOMEN_SIZES],
    rating: 4.8,
    reviewCount: 198,
    badges: ["NEW"],
    inventory: stock([...WOMEN_SIZES], "balanced"),
    inStock: true,
    sku: "VR-LG-FLW",
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ TROUSERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "mens-trousers",
    name: "Men's Trousers",
    category: "trousers",
    gender: "MEN",
    price: 92,
    currency: "USD",
    description:
      "Tapered technical trousers with a clean drape. Studio to street, with no transition needed.",
    features: [
      "Technical twill weave",
      "Tapered leg",
      "Hidden zip pocket",
      "Adjustable waist drawcord",
    ],
    images: [img(SHOTS.manTrouser), img(SHOTS.manStudio)],
    colors: colors(
      ["Black", "Grey", "Navy Blue", "Cream/Brown"],
      img(SHOTS.manTrouser, 600),
    ),
    sizes: [...ADULT_SIZES],
    rating: 4.7,
    reviewCount: 142,
    badges: [],
    inventory: stock([...ADULT_SIZES], "balanced"),
    inStock: true,
    sku: "VR-TR-MEN",
  },
  {
    slug: "womens-trousers",
    name: "Women's Trousers",
    category: "trousers",
    gender: "WOMEN",
    price: 86,
    currency: "USD",
    description:
      "A tailored straight-leg trouser in technical jersey. Sleek waist, soft drape.",
    features: [
      "Technical jersey",
      "Straight leg",
      "Side seam pockets",
      "Contoured waistband",
    ],
    images: [img(SHOTS.womanTrouser), img(SHOTS.womanFlow)],
    colors: colors(
      ["Black", "Mehroon", "Grey", "Olive", "Navy Blue"],
      img(SHOTS.womanTrouser, 600),
    ),
    sizes: [...WOMEN_SIZES],
    rating: 4.8,
    reviewCount: 184,
    badges: ["NEW"],
    inventory: stock([...WOMEN_SIZES], "plenty"),
    inStock: true,
    sku: "VR-TR-WMN",
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ OVERSIZED TROUSERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "mens-oversized-trousers",
    name: "Men's Oversized Trousers",
    category: "oversized-trousers",
    gender: "MEN",
    price: 96,
    currency: "USD",
    description:
      "A wide-leg, drop-rise trouser in heavyweight twill. The off-day uniform.",
    features: [
      "Heavyweight twill",
      "Wide-leg silhouette",
      "Bonded waistband",
      "Adjustable drawcord",
    ],
    images: [img(SHOTS.manTrouser), img(SHOTS.studio)],
    colors: colors(
      ["Black", "Silver", "Navy Blue", "Grey"],
      img(SHOTS.manTrouser, 600),
    ),
    sizes: [...ADULT_SIZES],
    rating: 4.7,
    reviewCount: 122,
    badges: [],
    inventory: stock([...ADULT_SIZES], "balanced"),
    inStock: true,
    sku: "VR-OT-MEN",
  },
  {
    slug: "womens-oversized-trousers",
    name: "Women's Oversized Trousers",
    category: "oversized-trousers",
    gender: "WOMEN",
    price: 92,
    currency: "USD",
    description:
      "Relaxed wide-leg trousers with a contour waistband. Built for movement, dressed for anywhere.",
    features: [
      "Heavyweight modal blend",
      "Wide-leg drape",
      "High-rise contour waistband",
      "Side seam pockets",
    ],
    images: [img(SHOTS.womanTrouser), img(SHOTS.womanFlow)],
    colors: colors(
      ["Black", "Brown", "Grey", "Navy Blue", "Olive Green"],
      img(SHOTS.womanTrouser, 600),
    ),
    sizes: [...WOMEN_SIZES],
    rating: 4.8,
    reviewCount: 156,
    badges: ["NEW"],
    inventory: stock([...WOMEN_SIZES], "scarce"),
    inStock: true,
    sku: "VR-OT-WMN",
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SHORTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "shorts",
    name: 'Training Shorts 7"',
    category: "shorts",
    gender: "MEN",
    price: 54,
    currency: "USD",
    description:
      "Featherweight woven 4-way stretch short with side splits for full range of motion.",
    features: [
      "4-way stretch woven",
      "Side split hem",
      "Internal phone pocket",
      "Liner included",
    ],
    images: [img(SHOTS.manShorts), img(SHOTS.manSplit)],
    colors: colors(
      ["Black", "Navy Blue", "Cream", "Silver"],
      img(SHOTS.manShorts, 600),
    ),
    sizes: [...ADULT_SIZES],
    rating: 4.7,
    reviewCount: 198,
    badges: [],
    inventory: stock([...ADULT_SIZES], "balanced"),
    inStock: true,
    sku: "VR-SH-001",
  },
];

export const PRODUCT_BY_SLUG: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p]),
);

export function totalStock(product: Product): number {
  if (!product.inventory) return Infinity;
  return Object.values(product.inventory).reduce((sum, n) => sum + (n ?? 0), 0);
}

export function productsByCategory(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function relatedProducts(slug: string, limit = 4): Product[] {
  const product = PRODUCT_BY_SLUG[slug];
  if (!product) return [];
  const sameCat = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== slug,
  );
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  // Fall back to same-gender or any if the category is too small.
  const sameGender = PRODUCTS.filter(
    (p) => p.gender === product.gender && p.slug !== slug && !sameCat.includes(p),
  );
  return [...sameCat, ...sameGender].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  ).slice(0, 8);
}
