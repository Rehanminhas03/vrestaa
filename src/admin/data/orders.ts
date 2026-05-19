import type {
  AdminOrder,
  AdminOrderLineItem,
  AdminOrderStatus,
  AdminTimelineEntry,
} from "@/admin/types";
import { makeRng } from "@/admin/lib/seed";
import { PRODUCTS } from "@/website/data/products";

const FIRST_NAMES = [
  "Mateo",
  "Priya",
  "Damian",
  "Ana",
  "Joel",
  "Tomas",
  "Reece",
  "Sara",
  "Diego",
  "Zara",
  "Marcus",
  "Elena",
  "Kai",
  "Layla",
  "Nico",
  "Aisha",
  "Liam",
  "Yara",
  "Theo",
  "Maya",
];

const LAST_NAMES = [
  "Reyes",
  "Khan",
  "Whitfield",
  "Soto",
  "Tanaka",
  "Lorenz",
  "Marsh",
  "Knight",
  "Alvarez",
  "Park",
  "Chen",
  "Vasquez",
  "Mensah",
  "Nakamura",
  "Patel",
  "O'Brien",
  "Garcia",
  "Sullivan",
  "Murphy",
  "Lim",
];

const COUNTRIES = [
  { code: "US", name: "United States", cities: ["Los Angeles", "Brooklyn", "Austin", "Chicago", "Miami"] },
  { code: "GB", name: "United Kingdom", cities: ["London", "Manchester"] },
  { code: "AU", name: "Australia", cities: ["Sydney", "Melbourne"] },
  { code: "CA", name: "Canada", cities: ["Toronto", "Vancouver"] },
  { code: "DE", name: "Germany", cities: ["Berlin"] },
];

const PAYMENT_METHODS = [
  "Visa ••4242",
  "Mastercard ••9134",
  "Apple Pay",
  "PayPal",
] as const;

const STATUS_FLOW: AdminOrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
];

/**
 * Build a status timeline that walks from PLACED up to the order's current
 * status. Each step is roughly 12–36h after the previous.
 */
function buildTimeline(
  createdAt: Date,
  finalStatus: AdminOrderStatus,
  rng: ReturnType<typeof makeRng>,
): AdminTimelineEntry[] {
  if (finalStatus === "CANCELLED") {
    return [
      { status: "PLACED", at: createdAt.toISOString() },
      {
        status: "CANCELLED",
        at: new Date(createdAt.getTime() + rng.int(2, 18) * 3600_000).toISOString(),
        note: "Customer requested cancellation",
      },
    ];
  }
  const finalIdx = STATUS_FLOW.indexOf(finalStatus);
  const timeline: AdminTimelineEntry[] = [];
  let cursor = createdAt.getTime();
  for (let i = 0; i <= finalIdx; i++) {
    timeline.push({ status: STATUS_FLOW[i], at: new Date(cursor).toISOString() });
    cursor += rng.int(12, 36) * 3600_000;
  }
  return timeline;
}

function generateOrder(idx: number, rng: ReturnType<typeof makeRng>): AdminOrder {
  // Spread orders across the last 90 days, weighted toward more recent.
  const daysAgo = Math.floor(rng.next() ** 1.4 * 90);
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - daysAgo);
  createdAt.setHours(rng.int(8, 22), rng.int(0, 59), 0, 0);

  // Status distribution: bias toward DELIVERED for older orders.
  const status: AdminOrderStatus = rng.weighted<AdminOrderStatus>([
    ["DELIVERED", daysAgo > 14 ? 70 : 5],
    ["SHIPPED", daysAgo > 7 && daysAgo <= 14 ? 35 : 10],
    ["PACKED", daysAgo > 3 && daysAgo <= 7 ? 25 : 5],
    ["CONFIRMED", daysAgo > 1 && daysAgo <= 3 ? 20 : 5],
    ["PLACED", daysAgo <= 1 ? 25 : 3],
    ["CANCELLED", 6],
  ]);

  const firstName = rng.pick(FIRST_NAMES);
  const lastName = rng.pick(LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/'/g, "")}@example.com`;

  const country = rng.pick(COUNTRIES);
  const city = rng.pick(country.cities);

  // 1–4 line items
  const lineCount = rng.weighted([
    [1, 30],
    [2, 40],
    [3, 20],
    [4, 10],
  ]);
  const items: AdminOrderLineItem[] = [];
  const picked = new Set<string>();
  for (let i = 0; i < lineCount; i++) {
    let p = rng.pick(PRODUCTS);
    let tries = 0;
    while (picked.has(p.slug) && tries < 5) {
      p = rng.pick(PRODUCTS);
      tries++;
    }
    picked.add(p.slug);
    const colour = rng.pick(p.colors);
    const size = rng.pick(p.sizes);
    const qty = rng.weighted([
      [1, 75],
      [2, 18],
      [3, 5],
      [4, 2],
    ]);
    items.push({
      id: `${p.slug}__${size}__${colour.name}`,
      productSlug: p.slug,
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.images[0],
      color: { name: colour.name, hex: colour.hex },
      size,
      quantity: qty,
    });
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 120 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const orderNumber = `VRESTA-${String(20000 + idx).padStart(6, "0")}`;

  return {
    id: orderNumber.toLowerCase().replace(/-/g, "_"),
    number: orderNumber,
    createdAt: createdAt.toISOString(),
    status,
    customer: {
      email,
      name: fullName,
    },
    items,
    subtotal,
    shipping,
    tax,
    total,
    currency: "USD",
    shippingAddress: {
      name: fullName,
      line1: `${rng.int(1, 9999)} ${rng.pick(["Iron", "Maple", "Oak", "Sunset", "Mission", "Park", "Market"])} St`,
      city,
      region: country.code === "US" ? rng.pick(["CA", "NY", "TX", "IL", "FL"]) : "",
      postalCode: String(rng.int(10000, 99999)),
      country: country.name,
    },
    paymentMethod: rng.pick([...PAYMENT_METHODS]),
    timeline: buildTimeline(createdAt, status, rng),
  };
}

const rng = makeRng(0xc0ffee);
export const ADMIN_ORDERS: AdminOrder[] = Array.from({ length: 48 }, (_, i) =>
  generateOrder(i, rng),
).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

export const ADMIN_ORDER_BY_ID: Record<string, AdminOrder> = Object.fromEntries(
  ADMIN_ORDERS.map((o) => [o.id, o]),
);
