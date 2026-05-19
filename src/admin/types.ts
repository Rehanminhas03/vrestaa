import type { CartLineItem, Size } from "@/website/types";

export type AdminOrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export const ORDER_STATUS_FLOW: AdminOrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
];

export interface AdminOrderLineItem extends Omit<CartLineItem, "maxQuantity"> {
  /** Which product SKU this line corresponds to. Used for analytics drill-down. */
  productSlug: string;
}

export interface AdminShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface AdminCustomerSummary {
  email: string;
  name: string;
  avatar?: string;
}

export interface AdminTimelineEntry {
  status: AdminOrderStatus;
  /** ISO timestamp */
  at: string;
  /** Optional admin/system note attached to this step */
  note?: string;
}

export interface AdminOrder {
  id: string;
  number: string; // VRESTA-018342
  createdAt: string; // ISO
  status: AdminOrderStatus;
  customer: AdminCustomerSummary;
  items: AdminOrderLineItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: "USD";
  shippingAddress: AdminShippingAddress;
  paymentMethod: "Visa ••4242" | "Mastercard ••9134" | "Apple Pay" | "PayPal";
  timeline: AdminTimelineEntry[];
  note?: string;
}

export interface AdminCustomer {
  email: string;
  name: string;
  avatar?: string;
  firstOrderAt: string;
  lastOrderAt: string;
  totalOrders: number;
  lifetimeValue: number;
  /** Most-shipped-to country, derived from order history */
  country: string;
  tag: "VIP" | "Returning" | "New";
  /** Order IDs */
  orderIds: string[];
}

export type SizeStock = Partial<Record<Size, number>>;
