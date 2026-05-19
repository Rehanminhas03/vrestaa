"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/website/components/ui/input";
import { Button } from "@/website/components/ui/button";
import { formatCurrency, formatDate } from "@/website/lib/format";
import { cn } from "@/website/lib/cn";
import type { AdminCustomer } from "@/admin/types";

type TagFilter = "all" | "VIP" | "Returning" | "New";

const TAG_STYLES: Record<AdminCustomer["tag"], string> = {
  VIP: "bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] ring-1 ring-inset ring-[color:var(--color-accent)]/30",
  Returning: "bg-blue-400/10 text-blue-300 ring-1 ring-inset ring-blue-400/30",
  New: "bg-white/8 text-white/85 ring-1 ring-inset ring-white/15",
};

interface CustomersTableProps {
  customers: AdminCustomer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  const [tag, setTag] = React.useState<TagFilter>("all");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((c) => {
      if (tag !== "all" && c.tag !== tag) return false;
      if (q && !`${c.name} ${c.email} ${c.country}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [customers, tag, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-muted)]" />
          <Input
            placeholder="Search name, email, country…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Tier
          </span>
          {(["all", "VIP", "Returning", "New"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={cn(
                "inline-flex h-7 items-center rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
                tag === t
                  ? "bg-white text-[color:var(--color-ink)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
          {(tag !== "all" || query.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTag("all");
                setQuery("");
              }}
              className="ml-auto"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)]">
        <div className="border-b border-[color:var(--color-border)] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
          {filtered.length} of {customers.length} customers
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Country</th>
                <th className="px-5 py-3">Orders</th>
                <th className="px-5 py-3">LTV</th>
                <th className="px-5 py-3">Last order</th>
                <th className="px-5 py-3">Tag</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-border)]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-[color:var(--color-fg-muted)]">
                    No customers match the current filters.
                  </td>
                </tr>
              )}
              {filtered.map((c) => (
                <tr
                  key={c.email}
                  className="cursor-pointer transition-colors hover:bg-white/[0.02]"
                  onClick={(e) => {
                    const link = e.currentTarget.querySelector<HTMLAnchorElement>("a[data-row-link]");
                    if (link) link.click();
                  }}
                >
                  <td className="px-5 py-4">
                    <Link
                      data-row-link
                      href={`/admin/customers/${encodeURIComponent(c.email)}`}
                      className="font-medium text-white hover:text-[color:var(--color-accent)]"
                    >
                      {c.name}
                    </Link>
                    <div className="text-xs text-[color:var(--color-fg-muted)]">{c.email}</div>
                  </td>
                  <td className="px-5 py-4 text-white/85">{c.country}</td>
                  <td className="px-5 py-4 text-white/85 tabular-nums">{c.totalOrders}</td>
                  <td className="px-5 py-4 font-semibold text-white tabular-nums">
                    {formatCurrency(c.lifetimeValue)}
                  </td>
                  <td className="px-5 py-4 text-white/85">{formatDate(c.lastOrderAt)}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]",
                        TAG_STYLES[c.tag],
                      )}
                    >
                      {c.tag}
                    </span>
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
