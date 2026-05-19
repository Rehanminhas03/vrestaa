import type { AdminCustomer } from "@/admin/types";
import { ADMIN_ORDERS } from "./orders";

/**
 * Customers are derived from the seeded orders — group by email, compute
 * LTV, tag by spend. This keeps the two data sources in sync.
 */
function buildCustomers(): AdminCustomer[] {
  const byEmail = new Map<string, AdminCustomer>();

  for (const order of ADMIN_ORDERS) {
    const key = order.customer.email;
    const country = order.shippingAddress.country;
    const orderDate = order.createdAt;
    const orderValue = order.status === "CANCELLED" ? 0 : order.total;

    const existing = byEmail.get(key);
    if (existing) {
      existing.totalOrders += 1;
      existing.lifetimeValue += orderValue;
      existing.orderIds.push(order.id);
      if (orderDate < existing.firstOrderAt) existing.firstOrderAt = orderDate;
      if (orderDate > existing.lastOrderAt) existing.lastOrderAt = orderDate;
    } else {
      byEmail.set(key, {
        email: key,
        name: order.customer.name,
        firstOrderAt: orderDate,
        lastOrderAt: orderDate,
        totalOrders: 1,
        lifetimeValue: orderValue,
        country,
        tag: "New",
        orderIds: [order.id],
      });
    }
  }

  // Compute tags
  for (const c of byEmail.values()) {
    if (c.lifetimeValue >= 500 || c.totalOrders >= 4) c.tag = "VIP";
    else if (c.lifetimeValue >= 200 || c.totalOrders >= 2) c.tag = "Returning";
    else c.tag = "New";
  }

  return Array.from(byEmail.values()).sort(
    (a, b) => b.lifetimeValue - a.lifetimeValue,
  );
}

export const ADMIN_CUSTOMERS: AdminCustomer[] = buildCustomers();

export const ADMIN_CUSTOMER_BY_EMAIL: Record<string, AdminCustomer> = Object.fromEntries(
  ADMIN_CUSTOMERS.map((c) => [c.email, c]),
);
