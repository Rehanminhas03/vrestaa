"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RevenueChart } from "./revenue-chart";
import { KpiTile } from "./kpi-tile";
import { formatCurrency } from "@/website/lib/format";
import { cn } from "@/website/lib/cn";
import type { RevenuePoint, TopProductRow, CategoryRevenueRow } from "@/admin/lib/metrics";

const RANGES = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
];

// Range data is pre-computed in the server component (`/admin/analytics`) and
// passed in keyed by range length. Pure data; no fetching here.
export function AnalyticsView({
  rangeSeries,
  rangeTop,
  rangeCategory,
}: {
  rangeSeries: Record<number, RevenuePoint[]>;
  rangeTop: Record<number, TopProductRow[]>;
  rangeCategory: Record<number, CategoryRevenueRow[]>;
}) {
  const [days, setDays] = React.useState(30);
  const series = rangeSeries[days];
  const top = rangeTop[days];
  const byCategory = rangeCategory[days];

  const revenue = series.reduce((s, p) => s + p.revenue, 0);
  const orders = series.reduce((s, p) => s + p.orders, 0);
  const aov = orders > 0 ? revenue / orders : 0;
  const maxRevenue = byCategory[0]?.revenue ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
          Range
        </span>
        {RANGES.map((r) => (
          <button
            key={r.days}
            onClick={() => setDays(r.days)}
            className={cn(
              "inline-flex h-7 items-center rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
              days === r.days
                ? "bg-white text-[color:var(--color-ink)]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiTile label="Revenue" value={formatCurrency(revenue)} hint={`Last ${days} days`} />
        <KpiTile label="Orders" value={String(orders)} hint={`Last ${days} days`} />
        <KpiTile label="Average order" value={formatCurrency(aov)} hint={`Last ${days} days`} />
      </div>

      <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
        <h2 className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
          Revenue · last {days} days
        </h2>
        <div className="mt-4">
          <RevenueChart data={series} height={320} />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
          <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
            Sales by category
          </h2>
          <CategoryBars rows={byCategory} max={maxRevenue} />
        </section>

        <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
          <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
            Top SKUs
          </h2>
          <ol className="space-y-3">
            {top.map((p, i) => (
              <li key={p.slug} className="flex items-center gap-3 text-sm">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-[10px] font-bold tabular-nums text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-white">{p.name}</p>
                  <p className="text-xs text-[color:var(--color-fg-muted)]">{p.units} units sold</p>
                </div>
                <span className="font-semibold tabular-nums text-white">
                  {formatCurrency(p.revenue)}
                </span>
              </li>
            ))}
            {top.length === 0 && (
              <p className="text-sm text-[color:var(--color-fg-muted)]">No sales in this range.</p>
            )}
          </ol>
        </section>
      </div>

      <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
        <h2 className="mb-2 font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
          Conversion funnel
        </h2>
        <p className="mb-4 text-xs text-[color:var(--color-fg-muted)]">
          Demo data · wires to real analytics post-Firebase
        </p>
        <FunnelMock orders={orders} />
      </section>
    </div>
  );
}

function CategoryBars({ rows, max }: { rows: CategoryRevenueRow[]; max: number }) {
  if (max === 0) {
    return <p className="text-sm text-[color:var(--color-fg-muted)]">No sales in this range.</p>;
  }
  return (
    <ul className="flex flex-col gap-3">
      {rows.map((r) => {
        const pct = max === 0 ? 0 : (r.revenue / max) * 100;
        return (
          <li key={r.slug} className="text-xs">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-white/85">{r.name}</span>
              <span className="font-semibold tabular-nums text-white">
                {formatCurrency(r.revenue)}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-[color:var(--color-accent)]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function FunnelMock({ orders }: { orders: number }) {
  // Reverse-engineer plausible funnel from order count.
  const checkouts = Math.round(orders * 1.4);
  const carts = Math.round(orders * 6.5);
  const sessions = Math.round(orders * 28);

  const data = [
    { stage: "Sessions", value: sessions },
    { stage: "Carts", value: carts },
    { stage: "Checkouts", value: checkouts },
    { stage: "Orders", value: orders },
  ];
  const max = data[0].value || 1;

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 24, right: 24 }}>
          <CartesianGrid stroke="#232327" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" hide domain={[0, max]} />
          <YAxis
            type="category"
            dataKey="stage"
            stroke="#b8b8be"
            tick={{ fill: "#b8b8be", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              background: "#111113",
              border: "1px solid #232327",
              borderRadius: 8,
              fontSize: 12,
              color: "#fff",
            }}
          />
          <Bar dataKey="value" fill="#c7ff3e" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
