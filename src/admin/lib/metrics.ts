import { ADMIN_ORDERS } from "@/admin/data/orders";
import { ADMIN_CUSTOMERS } from "@/admin/data/customers";
import { PRODUCT_BY_SLUG, PRODUCTS, totalStock } from "@/website/data/products";
import { CATEGORIES, CATEGORY_LABEL } from "@/website/constants/categories";
import type { AdminOrder, AdminOrderStatus } from "@/admin/types";

const ONE_DAY = 24 * 60 * 60 * 1000;

export function withinRange(o: AdminOrder, from: Date, to: Date) {
  const t = +new Date(o.createdAt);
  return t >= +from && t <= +to;
}

/** All orders that fall within [from, to], excluding cancelled. */
export function ordersInRange(from: Date, to: Date) {
  return ADMIN_ORDERS.filter(
    (o) => withinRange(o, from, to) && o.status !== "CANCELLED",
  );
}

export function revenueInRange(from: Date, to: Date): number {
  return ordersInRange(from, to).reduce((sum, o) => sum + o.total, 0);
}

export function ordersByStatus(): Record<AdminOrderStatus, number> {
  const out: Record<AdminOrderStatus, number> = {
    PLACED: 0,
    CONFIRMED: 0,
    PACKED: 0,
    SHIPPED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
  };
  for (const o of ADMIN_ORDERS) out[o.status] += 1;
  return out;
}

export interface RevenuePoint {
  date: string; // YYYY-MM-DD
  revenue: number;
  orders: number;
}

/** Daily revenue series for [from, to]. */
export function revenueSeries(from: Date, to: Date): RevenuePoint[] {
  const bucketKey = (d: Date) => d.toISOString().slice(0, 10);
  const map = new Map<string, RevenuePoint>();
  for (let t = +from; t <= +to; t += ONE_DAY) {
    const key = bucketKey(new Date(t));
    map.set(key, { date: key, revenue: 0, orders: 0 });
  }
  for (const o of ADMIN_ORDERS) {
    if (!withinRange(o, from, to) || o.status === "CANCELLED") continue;
    const key = bucketKey(new Date(o.createdAt));
    const bucket = map.get(key);
    if (!bucket) continue;
    bucket.revenue += o.total;
    bucket.orders += 1;
  }
  return Array.from(map.values());
}

export interface TopProductRow {
  slug: string;
  name: string;
  image: string;
  units: number;
  revenue: number;
}

export function topProducts(n: number, from?: Date, to?: Date): TopProductRow[] {
  const rows = new Map<string, TopProductRow>();
  for (const o of ADMIN_ORDERS) {
    if (o.status === "CANCELLED") continue;
    if (from && to && !withinRange(o, from, to)) continue;
    for (const item of o.items) {
      const product = PRODUCT_BY_SLUG[item.productSlug];
      if (!product) continue;
      const existing = rows.get(item.productSlug);
      const revenue = item.price * item.quantity;
      if (existing) {
        existing.units += item.quantity;
        existing.revenue += revenue;
      } else {
        rows.set(item.productSlug, {
          slug: item.productSlug,
          name: product.name,
          image: product.images[0],
          units: item.quantity,
          revenue,
        });
      }
    }
  }
  return Array.from(rows.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, n);
}

export interface CategoryRevenueRow {
  slug: string;
  name: string;
  revenue: number;
  units: number;
}

export function salesByCategory(from?: Date, to?: Date): CategoryRevenueRow[] {
  const rows: Record<string, CategoryRevenueRow> = {};
  for (const c of CATEGORIES) {
    rows[c.slug] = { slug: c.slug, name: c.name, revenue: 0, units: 0 };
  }
  for (const o of ADMIN_ORDERS) {
    if (o.status === "CANCELLED") continue;
    if (from && to && !withinRange(o, from, to)) continue;
    for (const item of o.items) {
      const product = PRODUCT_BY_SLUG[item.productSlug];
      if (!product) continue;
      const row = rows[product.category];
      if (!row) continue;
      row.revenue += item.price * item.quantity;
      row.units += item.quantity;
    }
  }
  return Object.values(rows).sort((a, b) => b.revenue - a.revenue);
}

export function lowStockProducts(threshold = 3) {
  return PRODUCTS.filter((p) => {
    const inv = p.inventory;
    if (!inv) return false;
    return Object.values(inv).some(
      (n) => n !== undefined && n > 0 && n <= threshold,
    );
  });
}

export function soldOutProducts() {
  return PRODUCTS.filter((p) => totalStock(p) === 0);
}

export interface KpiBlock {
  current: number;
  previous: number;
  delta: number; // percent change
}

function kpiBlock(curr: number, prev: number): KpiBlock {
  const delta = prev === 0 ? (curr > 0 ? 100 : 0) : ((curr - prev) / prev) * 100;
  return { current: curr, previous: prev, delta };
}

export function dashboardKpis(now = new Date()) {
  const days30 = new Date(+now - 30 * ONE_DAY);
  const days60 = new Date(+now - 60 * ONE_DAY);

  const ordersThis = ordersInRange(days30, now);
  const ordersPrev = ordersInRange(days60, days30);
  const revenueThis = ordersThis.reduce((s, o) => s + o.total, 0);
  const revenuePrev = ordersPrev.reduce((s, o) => s + o.total, 0);
  const aovThis = ordersThis.length ? revenueThis / ordersThis.length : 0;
  const aovPrev = ordersPrev.length ? revenuePrev / ordersPrev.length : 0;
  const customersThis = new Set(ordersThis.map((o) => o.customer.email)).size;
  const customersPrev = new Set(ordersPrev.map((o) => o.customer.email)).size;

  return {
    revenue: kpiBlock(revenueThis, revenuePrev),
    orders: kpiBlock(ordersThis.length, ordersPrev.length),
    aov: kpiBlock(aovThis, aovPrev),
    customers: kpiBlock(customersThis, customersPrev),
  };
}

export { CATEGORY_LABEL, ADMIN_ORDERS, ADMIN_CUSTOMERS };
