"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/website/components/ui/input";
import { Button } from "@/website/components/ui/button";
import { StatusPill, ORDER_STATUS_LABEL } from "./status-pill";
import { formatCurrency, formatDate } from "@/website/lib/format";
import { cn } from "@/website/lib/cn";
import type { AdminOrder, AdminOrderStatus } from "@/admin/types";

const ALL_STATUSES: AdminOrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const DATE_PRESETS: { label: string; days: number | null }[] = [
  { label: "All time", days: null },
  { label: "Today", days: 1 },
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
];

interface OrdersTableProps {
  orders: AdminOrder[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [statuses, setStatuses] = React.useState<Set<AdminOrderStatus>>(new Set());
  const [days, setDays] = React.useState<number | null>(null);
  const [query, setQuery] = React.useState("");
  // Snapshot "now" at mount so the filter remains stable across re-renders.
  // (useMemo with Date.now() inside is non-deterministic — lint flags it.)
  const [mountTime] = React.useState(() => Date.now());

  const filtered = React.useMemo(() => {
    const cutoff = days === null ? null : mountTime - days * 86_400_000;
    const q = query.trim().toLowerCase();

    return orders.filter((o) => {
      if (statuses.size > 0 && !statuses.has(o.status)) return false;
      if (cutoff !== null && +new Date(o.createdAt) < cutoff) return false;
      if (q) {
        const hay = `${o.number} ${o.customer.name} ${o.customer.email}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [orders, statuses, days, query, mountTime]);

  const toggleStatus = (s: AdminOrderStatus) => {
    setStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const clearAll = () => {
    setStatuses(new Set());
    setDays(null);
    setQuery("");
  };

  const hasActiveFilters = statuses.size > 0 || days !== null || query.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-muted)]" />
          <Input
            placeholder="Search order #, customer name, or email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Status
          </span>
          {ALL_STATUSES.map((s) => {
            const active = statuses.has(s);
            return (
              <button
                key={s}
                onClick={() => toggleStatus(s)}
                className={cn(
                  "inline-flex h-7 items-center rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "bg-white text-[color:var(--color-ink)]"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {ORDER_STATUS_LABEL[s]}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Date
          </span>
          {DATE_PRESETS.map((p) => {
            const active = days === p.days;
            return (
              <button
                key={p.label}
                onClick={() => setDays(p.days)}
                className={cn(
                  "inline-flex h-7 items-center rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "bg-white text-[color:var(--color-ink)]"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {p.label}
              </button>
            );
          })}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="ml-auto">
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)]">
        <div className="border-b border-[color:var(--color-border)] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
          {filtered.length} order{filtered.length !== 1 && "s"}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Total</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-border)]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-[color:var(--color-fg-muted)]">
                    No orders match the current filters.
                  </td>
                </tr>
              )}
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  className="cursor-pointer transition-colors hover:bg-white/[0.02]"
                  onClick={(e) => {
                    const link = e.currentTarget.querySelector<HTMLAnchorElement>("a[data-row-link]");
                    if (link) link.click();
                  }}
                >
                  <td className="px-5 py-4">
                    <Link
                      data-row-link
                      href={`/admin/orders/${o.id}`}
                      className="font-medium text-white hover:text-[color:var(--color-accent)]"
                    >
                      {o.number}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-white">{o.customer.name}</div>
                    <div className="text-xs text-[color:var(--color-fg-muted)]">{o.customer.email}</div>
                  </td>
                  <td className="px-5 py-4 text-white/85">{formatDate(o.createdAt)}</td>
                  <td className="px-5 py-4 text-white/85 tabular-nums">{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
                  <td className="px-5 py-4">
                    <StatusPill status={o.status} />
                  </td>
                  <td className="px-5 py-4 text-right font-semibold tabular-nums text-white">
                    {formatCurrency(o.total)}
                  </td>
                  <td className="px-3 py-4 text-[color:var(--color-fg-muted)]">
                    <ArrowRight className="h-4 w-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
